<script setup>
definePageMeta({
  layout: "dashboard",
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
  --at-apply: text-xl px-5 py-2;
}
</style>
