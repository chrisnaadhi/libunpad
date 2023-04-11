<script setup>
definePageMeta({
  layout: "dashboard",
});

const { getItems } = useDirectusItems();
const getTotalAgenda = await getItems({
  collection: "agenda_kegiatan",
  params: {
    meta: "total_count",
  },
});
</script>

<template>
  <section>
    <h1 class="heading">Mapping Pekerjaan Pegawai Kandaga</h1>
    <div class="flex max-w-6xl ma gap-4">
      <GenericBaseCard class="card">
        <h1>Data Pekerjaan</h1>
        <p class="text-xs">
          Data Pekerjaan yang dilakukan oleh pegawai Pusat Pengelolaan
          Pengetahuan.
        </p>
        <p>Total Tugas : 300</p>
        <p>Presentase Tugas Selesai : 35%</p>
        <div class="mt-5">
          <NuxtLink to="/dashboard/tugas" class="btn bg-white"> Cek </NuxtLink>
        </div>
      </GenericBaseCard>
      <GenericBaseCard class="card">
        <h1>Data Agenda Kegiatan</h1>
        <p class="text-xs">
          Daftar Agenda Kegiatan yang telah, sedang dan akan dilaksanakan oleh
          Pusat Pengelolaan Pengetahuan.
        </p>
        <p>Total Agenda : {{ getTotalAgenda.meta.total_count }}</p>
        <p>Presentase Agenda Selesai : 25%</p>
        <div class="mt-5">
          <NuxtLink to="/dashboard/map/agenda" class="btn bg-white">
            Cek
          </NuxtLink>
        </div>
      </GenericBaseCard>
    </div>
    <div class="my-5 text-center">
      <NuxtLink to="/dashboard/map" class="btn bg-orange-2">
        Back to List
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.heading {
  --at-apply: text-4xl mb-5 text-center;
}

h1 {
  --at-apply: text-2xl;
}

.card {
  --at-apply: flex flex-col py-5 px-2 bg-orange-1 text-center;
}
</style>
