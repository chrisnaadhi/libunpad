<script setup>
const { currentTime } = useCurrentTime();
const { disableDisplay } = jamLayanan();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const dataPerpustakaan = [
  "Perpustakaan Pusat, Jatinangor",
  "Perpustakaan Fakultas, Jatinangor",
  "Perpustakaan Fakultas, Dipatiukur",
];

const cekHariLibur = ref(() => {
  let today = "";
  if (currentTime.value.getDay() === 0 || currentTime.value.getDay() === 6) {
    today = "Tutup";
  } else {
    today = "Buka";
  }
  return today;
});

onMounted(() => {
  document.addEventListener("click", () => {
    disableDisplay();
  });
});
</script>

<template>
  <main @click.stop="" class="bg-gray-1 text-center z-1">
    <div class="bg-orange max-w-50 py-2 ma">
      <p class="text-md text-white font-600">
        {{ currentTime.toLocaleDateString("id-ID", options) }}
      </p>
    </div>
    <div class="layanan-wrapper">
      <section class="pb-5 xl:pb-0" v-for="perpus in dataPerpustakaan">
        <h1 class="font-600 text-sm md:text-xl">{{ perpus }}</h1>
        <p class="display-hari">Hari ini</p>
        <p class="display-jam">
          <span
            class="text-red-6 text-sm font-600"
            v-if="cekHariLibur() === 'Tutup'"
          >
            Tutup
          </span>
          <span class="text-green-6 text-lg font-600" v-else>
            Buka:
            <span class="text-dark">08.00 -15.30</span>
          </span>
        </p>
      </section>
      <section class="pb-5 xl:pb-0">
        <h1 class="text-sm font-600 md:text-xl">Lihat Semua Lokasi</h1>
        <div class="flex items-center justify-center">
          <div class="i-mdi-calendar-clock bg-dark w-10 h-10" />
          <p class="link-layanan">Jam Layanan seluruh Perpustakaan di Unpad</p>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.layanan-wrapper {
  --at-apply: container ma flex flex-wrap items-center justify-evenly px-5 py-5 md:(flex-row;)
}
.display-hari {
  --at-apply: text-sm md:text-lg;
}
.link-layanan {
  --at-apply: max-w-40 text-sm text-orange-6 underline cursor-pointer;
}
</style>
