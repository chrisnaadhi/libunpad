<script setup>
const { getItems } = useDirectusItems();

const fetchLobbyMonth = await getItems(
  filterPengunjungRuanganDirectus("lobby", "$NOW(-1 month)")
);

const fetchRBelajarMonth = await getItems(
  filterPengunjungRuanganDirectus("r_belajar", "$NOW(-1 month)")
);

const fetchRSirkulasiMonth = await getItems(
  filterPengunjungRuanganDirectus("r_sirkulasi", "$NOW(-1 month)")
);

const fetchRPopulerMonth = await getItems(
  filterPengunjungRuanganDirectus("r_populer", "$NOW(-1 month)")
);

const fetchRMultimediaMonth = await getItems(
  filterPengunjungRuanganDirectus("r_multimedia", "$NOW(-1 month)")
);

const fetchRBNIMonth = await getItems(
  filterPengunjungRuanganDirectus("r_bni", "$NOW(-1 month)")
);

const fetchRBerkalaMonth = await getItems(
  filterPengunjungRuanganDirectus("r_berkala", "$NOW(-1 month)")
);

const fetchAllMonth = await getItems({
  collection: "data_kunjungan",
  params: {
    filter: {
      date_created: {
        _gt: "$NOW(-1 month)",
      },
    },
    meta: "filter_count",
  },
});

const fetchMonth = [
  {
    nama_ruangan: "Lobby Utama",
    nama_fungsi: fetchLobbyMonth,
  },
  {
    nama_ruangan: "Ruang Belajar",
    nama_fungsi: fetchRBelajarMonth,
  },
  {
    nama_ruangan: "Ruang Sirkulasi",
    nama_fungsi: fetchRSirkulasiMonth,
  },
  {
    nama_ruangan: "Ruang Populer",
    nama_fungsi: fetchRPopulerMonth,
  },
  {
    nama_ruangan: "Ruang Multimedia",
    nama_fungsi: fetchRMultimediaMonth,
  },
  {
    nama_ruangan: "Ruang Berkala",
    nama_fungsi: fetchRBerkalaMonth,
  },
  {
    nama_ruangan: "BNI Coworking Space",
    nama_fungsi: fetchRBNIMonth,
  },
  {
    nama_ruangan: "Total Kunjungan Satu Bulan terakhir",
    nama_fungsi: fetchAllMonth,
  },
];
</script>

<template>
  <section>
    <h3>Data Pengunjung Satu Bulan terakhir</h3>
    <div class="baris">
      <div class="kolom" v-for="month in fetchMonth">
        <p class="text-md font-600">{{ month.nama_ruangan }}</p>
        <p class="text-6xl text-orange-5 font-600">
          {{ month.nama_fungsi.meta.filter_count }}
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
  --at-apply: flex flex-wrap justify-evenly;
}

.kolom {
  --at-apply: min-w-35 my-5;
}
</style>
