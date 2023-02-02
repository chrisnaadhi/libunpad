<script setup>
const route = useRoute();

definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <section>
    <DashboardPekerjaanProfil />
    <div class="flex justify-between py-3">
      <h1>Data Pekerjaan Anda</h1>
      <NuxtLink
        :to="route.fullPath + '/tambah'"
        class="btn bg-orange text-white"
      >
        Tambah Tugas
      </NuxtLink>
    </div>
    <DashboardPekerjaanTabel />
  </section>
</template>

<style scoped>
h1 {
  --at-apply: text-2xl;
}
</style>
