<script setup>
const { getItems } = useDirectusItems();
const { today } = getDateToday();

definePageMeta({
  layout: "dashboard",
  middleware: ["directus-auth"],
});

const dataHariIni = await getItems(
  filterPengunjungRuanganDirectus("lobby", today)
);
</script>

<template>
  <main>
    <h1 class="text-3xl pb-3">Dashboard</h1>
    <section class="flex gap-3 text-center">
      <section class="w-full h-100 flex flex-col gap-3">
        <div class="border-3 border-orange-3 rounded-lg h-1/2">Hello!</div>
        <div class="border-3 border-blue-3 rounded-lg h-1/2">Hello!</div>
      </section>
      <section class="w-full h-100">
        <div class="border-3 border-gray rounded-lg h-full">
          <h1>Pengunjung Hari ini</h1>
          <div v-if="dataHariIni.meta.filter_count !== 0">
            {{ dataHariIni.meta.filter_count }} orang.
          </div>
          <div v-else>Tidak ada data!</div>
        </div>
      </section>
    </section>
    <section class="py-5">
      <NuxtLink class="btn bg-purple" to="/"> Home </NuxtLink>
    </section>
  </main>
</template>

<style scoped>
main {
  --at-apply: w-full p-2;
}
</style>
