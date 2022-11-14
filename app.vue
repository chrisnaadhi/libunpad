<script setup>
import "@splidejs/vue-splide/css";
import "@splidejs/vue-splide/css/core";

const router = useRouter();

router.afterEach((to, from, next) => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
</script>

<template>
  <div>
    <ClientOnly>
      <div id="modal"></div>
    </ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Titillium+Web&display=swap");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Titillium Web", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translate(0, -15px);
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
</style>
