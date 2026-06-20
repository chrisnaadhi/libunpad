<script setup>
const config = useRuntimeConfig();
const { getUserById } = useDirectusUsers();
const { getItems } = useDirectusItems();
import { onMounted, ref, computed } from "vue";

const date = ref(null);
const isClient = ref(false);

const day = new Date();
const lastDay = getTotalDays(day.getMonth(), day.getFullYear());
const firstDate = `${day.getFullYear()}-${day.getMonth() + 1}-01`;
const lastDate = `${day.getFullYear()}-${day.getMonth() + 1}-${lastDay}`;
const todayDateStr = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;
const monthName = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
  day
);

// List Pegawai Piket
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

// Data Pegawai Piket Hari ini
const getPetugasExtendedTimeService = await getItems({
  collection: "piket_layanan",
  params: {
    filter: {
      tanggal: {
        _eq: todayDateStr,
      },
    },
  },
});

const profilPetugas = await getUserById({
  id:
    getPetugasExtendedTimeService[0]?.petugas_pertama ??
    "6090A4D5-BD85-423D-9231-E50E705CFD22",
});

const displayYear = computed(() => date.value?.getFullYear() ?? day.getFullYear());
const displayReadableDate = computed(() => readableDate(date.value ?? day));
const displayJamPiket = computed(() => jamPiketPegawai((date.value ?? day).getDay()));

onMounted(() => {
  date.value = new Date();
  isClient.value = true;
});
</script>

<template>
  <section class="border-3 border-yellow-3 rounded-lg">
    <div class="border-1 border-blue-3 rounded bg-gray-50 mx-2 mt-2">
      <p>Petugas Piket Bulan Ini</p>
      <ClientOnly>
        <h1>{{ monthName }} {{ displayYear }}</h1>
        <template #fallback>
          <h1>{{ monthName }} {{ day.getFullYear() }}</h1>
        </template>
      </ClientOnly>
    </div>

    <div class="grid grid-cols-3 gap-2 m-2">
      <div
        v-for="pegawai in dataPiketPegawai"
        class="border-1 border-blue-3 bg-gray-50 rounded"
      >
        <h4>{{ readableDate(pegawai.tanggal) }}</h4>
        <p>{{ searchPetugas(pegawai.petugas_pertama) }}</p>
      </div>
    </div>
    <h2>Petugas Piket Hari Ini</h2>
    <ClientOnly>
      <h2>
        {{ displayReadableDate }} <br />
        {{ displayJamPiket }}
      </h2>
      <template #fallback>
        <h2>
          {{ readableDate(day) }} <br />
          {{ jamPiketPegawai(day.getDay()) }}
        </h2>
      </template>
    </ClientOnly>
    <h1 class="font-600 text-unpad">
      {{
        getPetugasExtendedTimeService[0] === undefined
          ? "Tidak ada Petugas"
          : `${profilPetugas.first_name} ${profilPetugas.last_name}`
      }}
    </h1>
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
