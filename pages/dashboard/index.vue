<script setup>
const { getItems } = useDirectusItems();
const { today } = getDateToday();

definePageMeta({
  layout: "dashboard",
  middleware: ["directus-auth"],
});

const fetchAllToday = await getItems({
  collection: "data_kunjungan",
  params: {
    filter: {
      date_created: {
        _gte: today,
      },
    },
    meta: "filter_count",
  },
});

let [fetchLastVisitor] = await getItems({
  collection: "data_kunjungan",
  params: {
    limit: 1,
    sort: "-date_created",
  },
  meta: "filter_count",
});
</script>

<template>
  <main>
    <h1 class="text-3xl pb-3">Dashboard</h1>
    <div class="mt--3 mb-2">
      <NuxtLink to="/" class="btn bg-orange py-0 px-3 text-xs text-white">
        &larr; Home
      </NuxtLink>
    </div>
    <section class="flex gap-3 text-center">
      <section class="w-full h-100 flex flex-col gap-3">
        <GenericMonthlyCalendar />
      </section>
      <section class="w-full h-100">
        <div class="border-3 border-gray rounded-lg">
          <h1>Total Pengunjung Hari ini</h1>
          <div v-if="fetchAllToday.meta.filter_count !== 0">
            <span class="text-5xl text-orange font-600">
              {{ fetchAllToday.meta.filter_count }}
            </span>
            <br />
            <span class="italic">orang</span>
            <div>
              <h4>Pengunjung Terakhir:</h4>
              <span class="text-orange font-600">{{
                fetchLastVisitor.biodata_user
              }}</span>
              berkunjung ke
              <span class="text-dark font-600">{{
                displayRuangan(fetchLastVisitor.nama_ruangan)
              }}</span>
            </div>
          </div>
          <div v-else>Tidak ada data!</div>
        </div>
      </section>
    </section>
  </main>
</template>

<style scoped>
main {
  --at-apply: w-full p-2;
}
</style>
