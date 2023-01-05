<script setup>
const { getItems } = useDirectusItems();
const currentDate = ref(new Date());
const monthName = computed(() => {
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return monthNames[currentDate.value.getMonth()];
});
const year = computed(() => currentDate.value.getFullYear());
const weeks = computed(() => {
  const firstDay = new Date(2023, currentDate.value.getMonth(), 1);
  const daysInMonth = new Date(
    year.value,
    currentDate.value.getMonth() + 1,
    0
  ).getDate();
  const emptyCells = firstDay.getDay();
  const weeks = [[]];
  for (let i = 0; i < emptyCells; i++) {
    weeks[0].push({});
  }

  let weekIndex = 0;
  for (let i = 1; i <= daysInMonth; i++) {
    if (weeks[weekIndex].length === 7) {
      weekIndex++;
      weeks.push([]);
    }
    weeks[weekIndex].push({ date: i });
  }
  return weeks;
});

const weekDays = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jum'at",
  "Sabtu",
];

const prevMonth = () => {
  currentDate.value = new Date(year.value, currentDate.value.getMonth() - 1, 1);
};
const nextMonth = () => {
  currentDate.value = new Date(year.value, currentDate.value.getMonth() + 1, 1);
};
</script>

<template>
  <section>
    <div class="flex justify-between w-full bg-white rounded">
      <button class="bg-green-2" @click="prevMonth">Sebelumnya</button>
      <div class="text-center">
        <h3 class="text-5xl font-900">{{ year }}</h3>
        <h6 class="text-2xl">{{ monthName }}</h6>
      </div>
      <button class="bg-blue-2" @click="nextMonth">Selanjutnya</button>
    </div>
    <table class="w-full bg-white">
      <thead>
        <tr>
          <th class="font-600" v-for="day in weekDays" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, index) in weeks" :key="index">
          <td v-for="day in week" :key="day.date">
            <span class="tanggal">{{ day.date }}</span>
            <p v-show="day.date" class="text-center">
              <span class="text-4xl">50</span> orang
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-xl ma flex flex-col items-center justify-center my-3;
}

td,
th,
tr {
  --at-apply: border border-dark;
}

th {
  --at-apply: bg-blue text-white border-dark;
}
</style>
