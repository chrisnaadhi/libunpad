<script setup>
const tahun = ref([]);
const bulan = ref({
  1: {
    value: "01",
    nama: "Januari",
  },
  2: {
    value: "02",
    nama: "Februari",
  },
  3: {
    value: "03",
    nama: "Maret",
  },
  4: {
    value: "04",
    nama: "April",
  },
  5: {
    value: "05",
    nama: "Mei",
  },
  6: {
    value: "06",
    nama: "Juni",
  },
  7: {
    value: "07",
    nama: "Juli",
  },
  8: {
    value: "08",
    nama: "Agustus",
  },
  9: {
    value: "09",
    nama: "September",
  },
  10: {
    value: "10",
    nama: "Oktober",
  },
  11: {
    value: "11",
    nama: "November",
  },
  12: {
    value: "12",
    nama: "Desember",
  },
});
const selectedYear = ref("default");
const selectedMonth = ref("default");
const selectedDay = computed(() => {
  return [
    `${selectedYear.value}-${selectedMonth.value}-01`,
    `${selectedYear.value}-${selectedMonth.value}-30`,
  ];
});
const generateArrayofYears = () => {
  const now = new Date().getFullYear();
  const min = now - 10;
  const max = now + 15;

  for (let i = min; i <= max; i++) {
    tahun.value.push(i);
  }
};

onMounted(() => {
  generateArrayofYears();
});
</script>

<template>
  <section class="bg-gray-5 w-full my-3 p-3 rounded-lg">
    <section class="w-full bg-red-2 rounded-md">
      <h1 class="text-2xl font-600 py-2">Data Pengunjung Harian</h1>
    </section>
    <section class="flex gap-3 mt-3 h-full">
      <div class="w-xs rounded-md bg-blue-2">
        <h1>Filter</h1>
        <div>
          <h2>Tahun:</h2>
          <select name="tahun" id="tahun" v-model="selectedYear">
            <option value="default" selected disabled>
              Silahkan pilih tahun
            </option>
            <option v-for="angka in tahun" :value="angka">{{ angka }}</option>
          </select>
        </div>
        <div>
          <h3>Bulan:</h3>
          <select name="bulan" id="bulan" v-model="selectedMonth">
            <option value="default" selected disabled>
              Silahkan pilih bulan
            </option>
            <option v-for="item in bulan" :value="item.value">
              {{ item.nama }}
            </option>
          </select>
        </div>
        <p>{{ selectedYear }}</p>
        <p>{{ selectedMonth }}</p>
        <p>{{ selectedDay }}</p>
      </div>
      <div class="w-full h-md rounded-md bg-orange-2">
        <h1>Data</h1>
      </div>
    </section>
  </section>
</template>
