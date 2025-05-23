<script setup>
import "@splidejs/vue-splide/css";
import "@splidejs/vue-splide/css/core";
import { mobileMenu } from "~/composables/navMenu";
import { useSearchFunction } from "~/composables/searchFunction";

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
  htmlAttrs: {
    lang: "id",
  },
  script: [
    // {
    //   src: "https://kandaga.unpad.ac.id:8000/js/script.js",
    //   "data-domain": "kandaga.unpad.ac.id",
    //   defer: true,
    // },
    {
      src: "https://www.instagram.com/embed.js",
      async: true,
    },
  ],
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
  scroll-behavior: smooth;
  transition: all 0.2s;
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
  --at-apply: text-unpad underline;
}

ul {
  --at-apply: list-disc ml-10;
}

ol {
  --at-apply: list-decimal ml-10;
}

li {
  --at-apply: list-outside;
}

label {
  --at-apply: font-600 pb-2 text-base md:text-md;
}

input[type="search"],
input,
select {
  --at-apply: w-full border-1 border-unpad;
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
  --at-apply: border border-unpad rounded p-3 bg-white;
}

button[type="submit"] {
  --at-apply: bg-unpad;
}

button:disabled {
  --at-apply: bg-gray text-white cursor-not-allowed;
}

strong {
  --at-apply: font-semibold;
}

.kandaga-gradient {
  --at-apply: bg-clip-text text-transparent bg-gradient-to-br from-unpad to-gray-500;
}

.konten-berita img {
  --at-apply: py-5;
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
  --at-apply: bg-unpad;
}

.splide__pagination__page {
  --at-apply: bg-gray;
}

.splide__arrow {
  --at-apply: bg-orange-3;
}

.loader {
  border: 4px solid #ffc250;
  /* Light grey */
  border-top: 4px solid #ffffff;
  /* Blue */
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 2s linear infinite;
}

.all-initial {
  all: initial;
}

#contents > p {
  --at-apply: py-2;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
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
