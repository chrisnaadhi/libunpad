<script setup>
useHead({
  title: "GLAM Kandaga Unpad | Universitas Padjadjaran",
});
</script>

<template>
  <main class="main-wrapper">
    <NavigationBar />

    <section class="content" role="main" id="main-content">
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
  --at-apply: bg-gray-50 flex flex-col min-h-screen m-0;
}

.footer {
  --at-apply: min-h-10 mb-16 xl:mb-0;
}

.content {
  --at-apply: flex-1;
}
</style>
