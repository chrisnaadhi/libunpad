<script setup>
import "@splidejs/vue-splide/css";
import "@splidejs/vue-splide/css/core";
import { mobileMenu } from "~/composables/navMenu";

useHead({
  htmlAttrs: {
    lang: "id",
  },
});

const router = useRouter();
const route = useRoute();
const menu = mobileMenu();
const user = useDirectusUser();

router.afterEach(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  if (menu.menuState) {
    menu.menuState = false;
    menu.isLayananOpen = false;
    menu.isTentangOpen = false;
  }
});
</script>

<template>
  <div>
    <ClientOnly>
      <div id="modal"></div>
    </ClientOnly>
    <NuxtLayout>
      <NuxtLoadingIndicator color="orange" />
      <NuxtPage />
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
