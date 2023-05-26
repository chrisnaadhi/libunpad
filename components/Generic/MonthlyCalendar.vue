<script setup>
const config = useRuntimeConfig();
const { getItems } = useDirectusItems();
const { getUserById } = useDirectusUsers();
const date = new Date();
const lastDay = getTotalDays(date.getMonth(), date.getFullYear());
const firstDate = `${date.getFullYear()}-${date.getMonth() + 1}-01`;
const lastDate = `${date.getFullYear()}-${date.getMonth() + 1}-${lastDay}`;
const monthName = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
  date
);
const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"];
const daily = [];

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

for (let i = 0; i <= lastDay; i++) {
  // Add Petugas Object later
  console.log(i);
}
</script>

<template>
  <section class="border-3 border-orange-3 rounded-lg">
    <div class="border-1 border-blue-3 rounded bg-gray-50 mx-2 mt-2">
      <p>Petugas Piket Bulan Ini</p>
      <h1>{{ monthName }} {{ date.getFullYear() }}</h1>
    </div>

    <div class="grid grid-cols-7 gap-2 m-2">
      <div v-for="day in days">
        <div class="border-1 border-blue-5 bg-blue-1 rounded">
          <p class="font-semibold">{{ day }}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-7 gap-2 m-2">
      <div
        v-for="tgl in lastDay"
        class="border-1 border-blue-3 bg-gray-50 rounded min-h-15"
      >
        <h4 class="absolute m-1 h-full">{{ tgl }}</h4>
        <p class="flex items-center justify-center h-full">nama lengkap</p>
      </div>
    </div>

    <pre class="text-left">{{ dataPiketPegawai }}</pre>
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
