<script setup>
definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <section class="text-center">
    <h1>Mapping Agenda Kegiatan Kandaga</h1>
    <DashboardMapAgenda />
    <div class="mt-8">
      <NuxtLink to="/dashboard/map" class="btn bg-orange-2">
        Back to List
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
h1 {
  --at-apply: text-2xl mb-5 text-center;
}
</style>
