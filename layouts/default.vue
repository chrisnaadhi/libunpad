<script setup>
const switchLocalePath = useSwitchLocalePath();

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

    <section class="absolute fixed bottom-0 right-0">
      <div>
        <NuxtLink :to="switchLocalePath('id')">🇮🇩 ID</NuxtLink>
        <NuxtLink :to="switchLocalePath('en')">🇺🇸 EN</NuxtLink>
      </div>
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

.footer {
  --at-apply: min-h-10 mb-16 xl:mb-0;
}
</style>
