<script setup>
const config = useRuntimeConfig();
const { getItems } = useDirectusItems();
const dataPiketPegawai = await getItems({
  collection: "piket_layanan",
  params: {
    filter: {
      tanggal: {
        _between: ["2023-03-01", "2023-03-15"],
      },
    },
  },
});

const { data: dataPetugas } = await useFetch(
  `${config.public.directus.url}users`,
  {
    headers: {
      Authorization: `Bearer ${config.public.directus.token}`,
    },
    pick: ["data", ["id", "first_name", "last_name"]],
  }
);

const searchPetugas = (idPetugas) => {
  const petugas = dataPetugas.value.data.find((nama) => nama.id === idPetugas);
  if (!petugas) {
    return "Belum diproses";
  }
  const objPetugas = Object.assign({}, petugas);
  return `${objPetugas.first_name} ${objPetugas.last_name}`;
};
</script>

<template>
  <section class="border-3 border-orange-3 rounded-lg">
    <p>Petugas Piket Bulan Ini</p>
    <div class="grid grid-cols-3 m-2">
      <div v-for="pegawai in dataPiketPegawai" class="border-1 border-blue-3">
        <h1>{{ readableDate(pegawai.tanggal) }}</h1>
        <p>{{ searchPetugas(pegawai.petugas_pertama) }}</p>
      </div>
    </div>
  </section>
  <div class="border-3 border-blue-3 rounded-lg h-1/2">
    <p>Petugas Piket Hari Sabtu</p>
  </div>
</template>

<style>
.calendar {
  --at-apply: p-5 m-5;
}

.header {
  --at-apply: text-xl font-600;
}

.days {
  --at-apply: flex flex-wrap;
}

.day {
  width: calc(100% / 7);
  --at-apply: flex relative items-center justify-center h-20 border-solid
    border-1 border-gray;
}
</style>
