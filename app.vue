<script setup>
import "@splidejs/vue-splide/css";
import "@splidejs/vue-splide/css/core";
import "v-calendar/style.css";
import { mobileMenu } from "~/composables/navMenu";
import { useSearchFunction } from "~/composables/searchFunction";

useHead({
  htmlAttrs: {
    lang: "id",
  },
});

const router = useRouter();
const menu = mobileMenu();
const searchFunction = useSearchFunction();
const { finalizePendingLocaleChange } = useI18n();

router.afterEach(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  menu.isLocaleOpen = false;

  if (menu.menuState) {
    menu.menuState = false;
    menu.isLayananOpen = false;
    menu.isTentangOpen = false;
  }
  if (searchFunction.keywords) {
    searchFunction.keywords = "";
    searchFunction.isResult = false;
  }
});

const onBeforeEnter = async () => {
  await finalizePendingLocaleChange();
};
</script>

<template>
  <div>
    <ClientOnly>
      <div id="modal"></div>
    </ClientOnly>
    <NuxtLayout>
      <NuxtLoadingIndicator color="orange" />
      <NuxtPage :transition="{ onBeforeEnter }" />
    </NuxtLayout>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,900;1,200;1,300;1,400;1,600;1,700&display=swap");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Titillium Web", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Kanit", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

h1 {
  --at-apply: text-4xl;
}

h2 {
  --at-apply: text-3xl;
}

h3 {
  --at-apply: text-2xl;
}

h4 {
  --at-apply: text-xl;
}

h5 {
  --at-apply: text-lg;
}

h6 {
  --at-apply: text-base;
}

input[type="search"] {
  --at-apply: w-full border-1 border-orange;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translate(0, 30px);
}

.splide__pagination__page.is-active {
  --at-apply: bg-orange;
}

.splide__pagination__page {
  --at-apply: bg-gray;
}

.splide__arrow {
  --at-apply: bg-orange-3;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  --at-apply: bg-gray-1;
}

::-webkit-scrollbar-thumb {
  --at-apply: bg-orange-2 rounded-xl;
}
::-webkit-scrollbar-thumb:hover {
  --at-apply: bg-orange-3;
}
</style>
