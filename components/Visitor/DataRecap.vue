<script setup>
const { getItems } = useDirectusItems();

const fetchLobby = await getItems(
  filterPengunjungRuanganDirectus("lobby", "$NOW(-1 day)")
);

const fetchRBelajar = await getItems(
  filterPengunjungRuanganDirectus("r_belajar", "$NOW(-1 day)")
);

const fetchRSirkulasi = await getItems(
  filterPengunjungRuanganDirectus("r_sirkulasi", "$NOW(-1 day)")
);

const fetchRPopuler = await getItems(
  filterPengunjungRuanganDirectus("r_populer", "$NOW(-1 day)")
);

const fetchRMultimedia = await getItems(
  filterPengunjungRuanganDirectus("r_multimedia", "$NOW(-1 day)")
);

const fetchRBNI = await getItems(
  filterPengunjungRuanganDirectus("r_bni", "$NOW(-1 day)")
);

const fetchRBerkala = await getItems(
  filterPengunjungRuanganDirectus("r_berkala", "$NOW(-1 day)")
);

const fetchToday = [
  fetchLobby,
  fetchRBelajar,
  fetchRSirkulasi,
  fetchRPopuler,
  fetchRMultimedia,
  fetchRBNI,
  fetchRBerkala,
];
</script>

<template>
  <section class="main-content">
    <div class="card">
      <VisitorRecapToday />
    </div>
    <div class="card">
      <VisitorRecapMonth />
    </div>
  </section>
</template>

<style scoped>
h3 {
  --at-apply: text-2xl font-600 text-center;
}

.main-content {
  --at-apply: max-w-7xl ma flex flex-col sm:flex-row items-center justify-between text-center;
}

.card {
  --at-apply: bg-gray-200 my-5 py-5 px-8 rounded-lg min-w-xl max-w-xl;
}

.baris {
    --at-apply: flex justify-between pt-2;
}
</style>
