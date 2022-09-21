<script setup>
const { getItems } = useDirectusItems();

const fetchLobbyToday = await getItems(
  filterPengunjungRuanganDirectus("lobby", "$NOW(-1 day)")
);

const fetchRBelajarToday = await getItems(
  filterPengunjungRuanganDirectus("r_belajar", "$NOW(-1 day)")
);

const fetchRSirkulasiToday = await getItems(
  filterPengunjungRuanganDirectus("r_sirkulasi", "$NOW(-1 day)")
);

const fetchRPopulerToday = await getItems(
  filterPengunjungRuanganDirectus("r_populer", "$NOW(-1 day)")
);

const fetchRMultimediaToday = await getItems(
  filterPengunjungRuanganDirectus("r_multimedia", "$NOW(-1 day)")
);

const fetchRBNIToday = await getItems(
  filterPengunjungRuanganDirectus("r_bni", "$NOW(-1 day)")
);

const fetchRBerkalaToday = await getItems(
  filterPengunjungRuanganDirectus("r_berkala", "$NOW(-1 day)")
);

const fetchAllToday = await getItems({
  collection: "data_kunjungan",
  params: {
    filter: {
      date_created: {
        _gt: "$NOW(-1 day)",
      },
    },
    meta: "filter_count",
  },
});

const fetchToday = [
  {
    nama_ruangan: "Lobby Utama",
    nama_fungsi: fetchLobbyToday,
  },
  {
    nama_ruangan: "Ruang Belajar",
    nama_fungsi: fetchRBelajarToday,
  },
  {
    nama_ruangan: "Ruang Sirkulasi",
    nama_fungsi: fetchRSirkulasiToday,
  },
  {
    nama_ruangan: "Ruang Populer",
    nama_fungsi: fetchRPopulerToday,
  },
  {
    nama_ruangan: "Ruang Multimedia",
    nama_fungsi: fetchRMultimediaToday,
  },
  {
    nama_ruangan: "Ruang Berkala",
    nama_fungsi: fetchRBerkalaToday,
  },
  {
    nama_ruangan: "BNI Coworking Space",
    nama_fungsi: fetchRBNIToday,
  },
  {
    nama_ruangan: "Total Pengunjung Hari ini",
    nama_fungsi: fetchAllToday,
  },
];
</script>

<template>
  <section>
    <h3>Data Pengunjung Hari Ini</h3>
    <div class="baris">
      <div class="kolom" v-for="today in fetchToday">
        <p class="text-md font-600">{{ today.nama_ruangan }}</p>
        <p class="text-6xl text-orange-5">
          {{ today.nama_fungsi.meta.filter_count }}
        </p>
        <p class="italic">orang</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
h3 {
  --at-apply: text-2xl font-600 text-orange-5;
}

.baris {
  --at-apply: flex flex-wrap justify-center;
}

.kolom {
  --at-apply: min-w-30 m-5;
}
</style>
