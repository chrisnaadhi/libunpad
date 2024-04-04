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

useHead({
  meta: [{ content: "text/html; charset=UTF-8", "http-equiv": "content-type" }],
});
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
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');

@media print {
  .noPrint {
    display: none;
  }
}

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

a {
  --at-apply: text-orange underline;
}

ul {
  --at-apply: list-disc;
}

ol {
  --at-apply: list-decimal;
}

li {
  --at-apply: list-outside;
}

label {
  --at-apply: font-600 pb-2 text-base md:text-md;
}

input[type="search"] {
  --at-apply: w-full border-1 border-orange;
}

textarea:disabled,
select:disabled,
input:disabled {
  --at-apply: bg-gray-3 cursor-not-allowed;
}

.input-block {
  --at-apply: flex flex-col my-5 sm:w-md md:w-full;
}

.input-area {
  --at-apply: border border-orange rounded p-3 bg-white;
}

button[type="submit"] {
  --at-apply: bg-orange;
}

button:disabled {
  --at-apply: bg-gray text-white cursor-not-allowed;
}

strong {
  --at-apply: font-semibold;
}

.kandaga-gradient {
  --at-apply: bg-clip-text text-transparent bg-gradient-to-br from-orange-500 to-gray-500;
}

.content-layer {
  --at-apply: max-w-7xl ma;
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

.loader {
  border: 4px solid #ffc250; /* Light grey */
  border-top: 4px solid #ffffff; /* Blue */
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
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
