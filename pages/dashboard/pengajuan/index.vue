<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: ["directus-auth"],
});
</script>

<template>
  <section>
    <h1>Daftar Pengajuan Bebas Pustaka</h1>
    <PengajuanListBebasPustaka />
  </section>
</template>

<style scoped>
h1 {
  --at-apply: text-xl;
}
</style>
