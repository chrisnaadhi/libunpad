<script setup>
useHead({
  title: "GLAM Kandaga Unpad | Universitas Padjadjaran",
});
</script>

<template>
  <main class="main-wrapper">
    <NavigationBar />

    <section class="content">
      <slot />
    </section>

    <section class="footer">
      <FooterSection :show-list="true" />
    </section>
  </main>
</template>

<style scoped>
.main-wrapper {
  --at-apply: bg-gray-50 flex flex-col min-h-screen m-0;
}

.header .footer {
  --at-apply: min-h-10;
}

.content {
  --at-apply: flex-1;
}
</style>
