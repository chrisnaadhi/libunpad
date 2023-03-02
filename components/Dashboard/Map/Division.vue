<script setup>
const route = useRoute();
let division = {
  info: {
    nama: "Divisi Institusi Informasi",
    deskripsi:
      "Divisi yang mengelola Institusi Perpustakaan dan Layanan Informasi agar dapat dengan mudah digunakan oleh Civitas Akademika Universitas Padjadjaran.",
    icon: "i-mdi-bank",
    path: route.fullPath + "/info",
  },
  km: {
    nama: "Divisi Pengelolaan Pengetahuan",
    deskripsi:
      "Divisi yang mengelola koleksi pengetahuan kedalam bentuk popular dan mudah untuk diterima oleh Civitas Akademika Universitas Padjadjaran ",
    icon: "i-mdi-book-sync",
    path: route.fullPath + "/km",
  },
  tu: {
    nama: "Divisi Tata Usaha dan SDM",
    deskripsi:
      "Divisi yang mengelola administrasi dan kebutuhan sumber daya manusia dalam mengelola layanan di Pusat Pengelolaan Pengetahuan Universitas Padjadjaran",
    icon: "i-mdi-account-convert",
    path: route.fullPath + "/tu-sdm",
  },
};
</script>

<template>
  <section>
    <div class="my-5 max-w-7xl ma">
      <GenericBaseCard class="bg-orange-1">
        <div class="flex flex-col items-center">
          <div class="i-mdi-stadium text-7xl text-orange"></div>
          <h1>Pusat Pengelolaan Pengetahuan</h1>
          <p class="text-xs">
            Pusat pengelolaan Pengetahuan Universitas Padjadjaran.
          </p>
          <p>Total Tugas : 300</p>
          <p>Presentase Tugas Selesai : 65%</p>
        </div>
        <div class="flex items-center justify-center mt-5">
          <NuxtLink
            :to="route.fullPath + '/total'"
            class="btn bg-white text-center"
          >
            Detail
          </NuxtLink>
        </div>
      </GenericBaseCard>
    </div>
    <div class="lower-division">
      <GenericBaseCard
        class="bg-orange-1 items-center"
        v-for="divisi in division"
      >
        <div class="flex flex-col items-center">
          <div :class="divisi.icon" class="text-7xl text-orange"></div>
          <h1 class="">{{ divisi.nama }}</h1>
          <p class="text-xs">{{ divisi.deskripsi }}</p>
          <p>Total Tugas : 100</p>
          <p>Presentase Tugas Selesai : 65%</p>
        </div>
        <div class="flex items-center justify-center mt-5">
          <NuxtLink :to="divisi.path" class="btn bg-white text-center">
            Detail
          </NuxtLink>
        </div>
      </GenericBaseCard>
    </div>
  </section>
</template>

<style scoped>
.upper-division, .lower-division {
  --at-apply: max-w-7xl ma flex flex-col md:flex-row gap-4 min-h-80;
}

h1 {
  --at-apply: text-center text-base md:text-lg;
}
</style>
