<script setup>
const config = useRuntimeConfig();
const { getItems } = useDirectusItems();
const date = new Date();
const lastDay = getTotalDays(date.getMonth(), date.getFullYear());
const firstDate = `${date.getFullYear()}-${date.getMonth() + 1}-01`;
const lastDate = `${date.getFullYear()}-${date.getMonth() + 1}-${lastDay}`;
const monthName = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
  date
);

const dataPiketPegawai = await getItems({
  collection: "piket_layanan",
  params: {
    filter: {
      tanggal: {
        _between: [firstDate, lastDate],
      },
    },
    sort: "tanggal",
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
    <div class="border-1 border-blue-3 rounded bg-gray-50 mx-2 mt-2">
      <p>Petugas Piket Bulan Ini</p>
      <h1>{{ monthName }} {{ date.getFullYear() }}</h1>
    </div>

    <div class="grid grid-cols-4 gap-2 m-2">
      <div
        v-for="pegawai in dataPiketPegawai"
        class="border-1 border-blue-3 bg-gray-50 rounded"
      >
        <h4>{{ readableDate(pegawai.tanggal) }}</h4>
        <p>{{ searchPetugas(pegawai.petugas_pertama) }}</p>
      </div>
    </div>
  </section>
</template>

<style>
h1 {
  --at-apply: text-3xl;
}

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
