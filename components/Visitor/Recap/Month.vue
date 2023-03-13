<script setup>
const { getItems } = useDirectusItems();
const { currentTime } = useCurrentTime();
const { thisMonth } = getThisMonth();

const fetchLobbyMonth = await getItems(getMonthlyVisitor("lobby", thisMonth));

const fetchRBelajarMonth = await getItems(
  getMonthlyVisitor("r_belajar", thisMonth)
);

const fetchRReferensiMonth = await getItems(
  getMonthlyVisitor("r_referensi", thisMonth)
);

const fetchRSirkulasiMonth = await getItems(
  getMonthlyVisitor("r_sirkulasi", thisMonth)
);

const fetchRPopulerMonth = await getItems(
  getMonthlyVisitor("r_populer", thisMonth)
);

const fetchRMultimediaMonth = await getItems(
  getMonthlyVisitor("r_multimedia", thisMonth)
);

const fetchRBNIMonth = await getItems(getMonthlyVisitor("r_bni", thisMonth));

const fetchRBerkalaMonth = await getItems(
  getMonthlyVisitor("r_berkala", thisMonth)
);

const fetchAllMonth = await getItems({
  collection: "data_kunjungan",
  params: {
    filter: {
      date_created: {
        _between: thisMonth,
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
  // {
  //   nama_ruangan: "Ruang Belajar",
  //   nama_fungsi: fetchRBelajarMonth,
  // },
  {
    nama_ruangan: "Ruang Referensi",
    nama_fungsi: fetchRReferensiMonth,
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
    nama_ruangan: "Total Kunjungan Bulan ini",
    nama_fungsi: fetchAllMonth,
  },
];
</script>

<template>
  <section>
    <h3>Data Pengunjung Bulan Ini</h3>
    <p class="font-600">
      Bulan {{ currentTime.toLocaleDateString("id-ID", { month: "long" }) }}
      {{ currentTime.getFullYear() }}
    </p>
    <div class="baris">
      <div class="kolom" v-for="month in fetchMonth">
        <p class="text-lg font-600">{{ month.nama_ruangan }}</p>
        <p class="text-5xl text-orange-5 font-600">
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
  --at-apply: px-3 my-1;
}
</style>
