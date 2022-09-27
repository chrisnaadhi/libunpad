<script setup lang="ts">
const ruang = useCookie("namaRuanganVisitor");
useHead({
  title: "Daftar Kunjungan Pusat Pengelolaan Pengetahuan UNPAD",
});
</script>

<template>
  <main class="background-block">
    <div class="heading-block">
      <img src="/images/lambang-unpad.png" alt="" class="w-16" />
      <h1 class="text-orange-6 font-700 text-xl md:text-4xl">
        Daftar Kunjungan
      </h1>
      <h3 class="text-dark font-800 py-2 text-xs sm:text-sm">
        Pusat Pengelolaan Pengetahuan Universitas Padjadjaran
      </h3>
    </div>
    <div>
      <VisitorDisplay v-if="ruang === undefined" />
      <VisitorForm v-else />
    </div>
    <footer class="footer-section">
      <FooterSection :show-list="false" />
    </footer>
  </main>
</template>

<style scoped>
.background-block {
  background-image: url("/images/background-image-visitor.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  --at-apply: flex flex-col items-center min-w-full;
}
.heading-block {
  --at-apply: flex flex-col items-center;
}
.footer-section {
  --at-apply: w-full;
}
</style>
