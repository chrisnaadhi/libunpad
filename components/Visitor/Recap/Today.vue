<script setup>
const { getItems } = useDirectusItems();
const { currentTime } = useCurrentTime();
const { today } = getDateToday();

const fetchLobbyToday = await getItems(
  filterPengunjungRuanganDirectus("lobby", today)
);

const fetchRBelajarToday = await getItems(
  filterPengunjungRuanganDirectus("r_belajar", today)
);

const fetchRReferensiToday = await getItems(
  filterPengunjungRuanganDirectus("r_referensi", today)
);

const fetchRSirkulasiToday = await getItems(
  filterPengunjungRuanganDirectus("r_sirkulasi", today)
);

const fetchRPopulerToday = await getItems(
  filterPengunjungRuanganDirectus("r_populer", today)
);

const fetchRMultimediaToday = await getItems(
  filterPengunjungRuanganDirectus("r_multimedia", today)
);

const fetchRBNIToday = await getItems(
  filterPengunjungRuanganDirectus("r_bni", today)
);

const fetchRBerkalaToday = await getItems(
  filterPengunjungRuanganDirectus("r_berkala", today)
);

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

const fetchToday = [
  {
    nama_ruangan: "Lobby Utama",
    nama_fungsi: fetchLobbyToday,
  },
  // {
  //   nama_ruangan: "Ruang Belajar",
  //   nama_fungsi: fetchRBelajarToday,
  // },
  {
    nama_ruangan: "Ruang Referensi",
    nama_fungsi: fetchRReferensiToday,
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
    nama_ruangan: "Total Kunjungan Hari ini",
    nama_fungsi: fetchAllToday,
  },
];
</script>

<template>
  <section>
    <h3>Data Pengunjung Hari Ini</h3>
    <p class="font-600">{{ currentTime.toLocaleDateString("id-ID") }}</p>
    <div class="baris">
      <div class="kolom" v-for="today in fetchToday">
        <p class="text-lg font-600">{{ today.nama_ruangan }}</p>
        <p class="text-5xl text-orange-5 font-600">
          {{ today.nama_fungsi.meta.filter_count }}
        </p>
        <p class="italic">orang</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
h3 {
  --at-apply: text-2xl font-700 text-orange-5;
}

.baris {
  --at-apply: flex flex-wrap justify-evenly;
}

.kolom {
  --at-apply: px-3 my-1;
}
</style>
