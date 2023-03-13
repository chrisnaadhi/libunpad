<script setup>
const { getItems } = useDirectusItems();

const date = new Date();
const hariIni = new Intl.DateTimeFormat("id-id", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
}).format(date);

const getExtendedTimeVisitor = await getItems(
  getDailyExtendedServiceTimeVisitor()
);

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

const dataPetugasPiket = await fetchProfilPegawai(
  getPetugasExtendedTimeService[0].petugas_pertama
);
</script>

<template>
  <div class="text-center bg-gray-200 rounded-xl p-5">
    <h3>Data Pengunjung di Jam Tambahan</h3>
    <p>{{ hariIni }}</p>
    <h3>
      Petugas:
      <span class="font-600 text-orange-6">
        {{
          !getPetugasExtendedTimeService
            ? "Tidak ada yang bertugas"
            : `${dataPetugasPiket.data.first_name} ${dataPetugasPiket.data.last_name}`
        }}
      </span>
    </h3>
    <p class="font-600">16.00 ~ 17.30</p>
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
  --at-apply: font-600 text-5xl text-orange-5;
}

h3 {
  --at-apply: text-2xl;
}
</style>
