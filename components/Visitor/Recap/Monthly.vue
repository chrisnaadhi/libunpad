<script setup>
const { getItems } = useDirectusItems();
const { currentTime } = useCurrentTime();
const { thisMonth } = getThisMonth();
const bulan = getActualMonth();

const monthlyObj = {
  jan: {
    name: "Januari",
    digit: "01",
    nama_fungsi: await getItems(
      getMonthlyTotalVisitor(
        bulan.value === "01"
          ? thisMonth
          : getAllMonthly("01", "01", "31").monthly
      )
    ),
  },
  feb: {
    name: "Februari",
    digit: "02",
    nama_fungsi: await getItems(
      getMonthlyTotalVisitor(
        bulan.value === "02"
          ? thisMonth
          : getAllMonthly("02", "01", "28").monthly
      )
    ),
  },
  mar: {
    name: "Maret",
    digit: "03",
    nama_fungsi: await getItems(
      getMonthlyTotalVisitor(
        bulan.value === "03"
          ? thisMonth
          : getAllMonthly("03", "01", "31").monthly
      )
    ),
  },
  apr: {
    name: "April",
    digit: "04",
    nama_fungsi: await getItems(
      getMonthlyTotalVisitor(
        bulan.value === "04"
          ? thisMonth
          : getAllMonthly("04", "01", "30").monthly
      )
    ),
  },
  may: {
    name: "Mei",
    digit: "05",
    nama_fungsi: await getItems(
      getMonthlyTotalVisitor(
        bulan.value === "05"
          ? thisMonth
          : getAllMonthly("05", "01", "31").monthly
      )
    ),
  },
  jun: {
    name: "Juni",
    digit: "06",
    nama_fungsi: await getItems(
      getMonthlyTotalVisitor(
        bulan.value === "06"
          ? thisMonth
          : getAllMonthly("06", "01", "30").monthly
      )
    ),
  },
  jul: {
    name: "Juli",
    digit: "07",
    nama_fungsi: await getItems(
      getMonthlyTotalVisitor(
        bulan.value === "07"
          ? thisMonth
          : getAllMonthly("07", "01", "31").monthly
      )
    ),
  },
  aug: {
    name: "Agustus",
    digit: "08",
    nama_fungsi: await getItems(
      getMonthlyTotalVisitor(
        bulan.value === "08"
          ? thisMonth
          : getAllMonthly("08", "01", "31").monthly
      )
    ),
  },
  sep: {
    name: "September",
    digit: "09",
    nama_fungsi: await getItems(
      getMonthlyTotalVisitor(
        bulan.value === "09"
          ? thisMonth
          : getAllMonthly("09", "01", "30").monthly
      )
    ),
  },
  oct: {
    name: "Oktober",
    digit: "10",
    nama_fungsi: await getItems(
      getMonthlyTotalVisitor(
        bulan.value === "10"
          ? thisMonth
          : getAllMonthly("10", "01", "31").monthly
      )
    ),
  },
  nov: {
    name: "November",
    digit: "11",
    nama_fungsi: await getItems(
      getMonthlyTotalVisitor(
        bulan.value === "11"
          ? thisMonth
          : getAllMonthly("11", "01", "30").monthly
      )
    ),
  },
  dec: {
    name: "Desember",
    digit: "12",
    nama_fungsi: await getItems(
      getMonthlyTotalVisitor(
        bulan.value === "12"
          ? thisMonth
          : getAllMonthly("12", "01", "31").monthly
      )
    ),
  },
};
</script>

<template>
  <div class="bg-gray-200 rounded-xl p-5">
    <h3>Data Pengunjung Bulanan tahun {{ currentTime.getFullYear() }}</h3>
    <section class="grid grid-cols-12 grid-gap-7">
      <div v-for="bulan in monthlyObj">
        <p class="text-xl">{{ bulan.name }}</p>
        <p class="text-2xl text-orange-5">
          {{ bulan.nama_fungsi.meta.filter_count }}
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
h3 {
  --at-apply: text-2xl font-600 text-orange-5 pb-2;
}
</style>
