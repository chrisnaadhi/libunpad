<script setup lang="ts">
useHead({
  title: "Daftar Kunjungan Pusat Pengelolaan Pengetahuan UNPAD",
});
</script>

<template>
  <div>
    <VisitorForm />
    <footer class="footer-section">
      <FooterSection :show-list="false" />
    </footer>
  </div>
</template>

<style scoped>
.footer-section {
  --at-apply: w-full bottom-0;
}
</style>
