<script setup>
const { getItems } = useDirectusItems();
const { getUserById } = useDirectusUsers();
const config = useRuntimeConfig();

const date = new Date();
const extendToday = extendedEveningServiceTime();
const hariIni = new Intl.DateTimeFormat("id-id", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
}).format(date);

const getExtendedTimeVisitor = await getItems({
  collection: "data_kunjungan",
  params: {
    filter: {
      date_created: {
        _between: extendToday,
      },
    },
    meta: "filter_count",
  },
});

const getPetugasExtendedTimeService = await getItems({
  collection: "piket_layanan",
  params: {
    filter: {
      tanggal: {
        _eq: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      },
    },
  },
});

const profilPetugas = await getUserById({
  id:
    getPetugasExtendedTimeService[0]?.petugas_pertama ??
    "6090A4D5-BD85-423D-9231-E50E705CFD22",
});
</script>

<template>
  <div class="text-center bg-gray-200 rounded-xl p-5">
    <h3>Data Pengunjung di Jam Tambahan</h3>
    <h5>{{ hariIni }}</h5>
    <h5>{{ jamPiketPegawai(date.getDay()) }}</h5>

    <h3>
      Petugas Piket:
      <span class="font-600 text-orange-6">
        {{
          getPetugasExtendedTimeService[0] === undefined
            ? "Tidak ada Petugas"
            : `${profilPetugas.first_name} ${profilPetugas.last_name}`
        }}
      </span>
    </h3>
    <h1>
      {{
        getExtendedTimeVisitor.meta.filter_count === 0
          ? "Belum ada Data!"
          : getExtendedTimeVisitor.meta.filter_count
      }}
    </h1>
    <p class="italic" v-show="getExtendedTimeVisitor.meta.filter_count !== 0">
      orang
    </p>
  </div>
</template>

<style scoped>
h1 {
  --at-apply: font-600 text-4xl text-orange-5;
}

h3 {
  --at-apply: text-xl;
}
</style>
