<script setup>
const { locale } = useI18n();
import { mobileMenu } from "~/composables/navMenu";
const switchLocalePath = useSwitchLocalePath();

const menu = mobileMenu();

const toggleLocale = () => {
  menu.isLocaleOpen = !menu.isLocaleOpen;
};

useHead({
  title: "GLAM Kandaga Unpad | Universitas Padjadjaran",
});
</script>

<template>
  <main class="main-wrapper">
    <NavigationBar />
    <section class="content" id="main-content">
      <ModalMobileMenu />
      <slot />
    </section>

    <section class="block transition-all-500 xl:hidden">
      <NavigationBottomBar />
    </section>

    <section class="footer" role="contentinfo">
      <FooterSection :show-list="true" />
    </section>
  </main>
</template>

<style scoped>
.main-wrapper {
  --at-apply: bg-white flex flex-col min-h-screen m-0;
}

.content {
  --at-apply: flex-1;
}

.locale-display {
  --at-apply: flex flex-col gap-2 p-2 my-2 rounded bg-orange-3 max-w-12 -translate-y-1;
}

.v-enter-active {
  --at-apply: transition-all-500 ease;
}

.v-leave-active {
  --at-apply: transition-all-800 ease-out opacity-2;
}

.v-enter-from,
v-leave-to {
  --at-apply: transition-all-500 ease-out opacity-0 translate-y-2;
}

.locale-banner {
  --at-apply: bg-orange-3 text-sm text-white rounded px-2 ml-2 hidden;
}

.locale-flag {
  --at-apply: cursor-pointer;
}

.locale-flag:hover + .locale-banner {
  --at-apply: block -translate-y-1;
}

.footer {
  --at-apply: min-h-10 mb-16 xl:mb-0;
}
</style>
