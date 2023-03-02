<script setup>
const { getItems } = useDirectusItems();
const { today } = getDateToday();

definePageMeta({
  layout: "dashboard",
  middleware: ["directus-auth"],
});

const date = new Date();

const weekly = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jum'at",
  "Sabtu",
  "Minggu",
];

const month = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const dataHariIni = await getItems(
  filterPengunjungRuanganDirectus("lobby", today)
);
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
    <section class="flex gap-3 text-center">
      <section class="w-full h-100 flex flex-col gap-3">
        <div class="border-3 border-orange-3 rounded-lg h-1/2">
          <p>Petugas Piket Hari Ini</p>
          <div class="grid grid-cols-7">
            <div v-for="day in weekly">{{ day }}</div>
          </div>
        </div>
        <div class="border-3 border-blue-3 rounded-lg h-1/2">
          <p>Petugas Piket Hari Sabtu</p>
        </div>
      </section>
      <section class="w-full h-100">
        <div class="border-3 border-gray rounded-lg h-full">
          <h1>Total Pengunjung Hari ini</h1>
          <div v-if="dataHariIni.meta.filter_count !== 0">
            <span class="text-5xl text-orange font-600">
              {{ dataHariIni.meta.filter_count }} </span
            ><br />
            <span class="italic">orang</span>
            <div>
              <h1>Pengunjung Terakhir:</h1>
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
