<script setup lang="ts">
const ruang = useCookie("namaRuanganVisitor");
definePageMeta({
  layout: "kunjungan",
});
useHead({
  title: "Daftar Kunjungan Kandaga Universitas Padjadjaran",
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
        Kandaga Universitas Padjadjaran
      </h3>
    </div>
    <div>
      <VisitorDisplay v-if="!ruang" />
      <div class="flex gap-3 mt-25" v-else>
        <VisitorForm />
        <VisitorSurveyKunjungan />
      </div>
    </div>
  </main>
</template>

<style scoped>
.background-block {
  --at-apply: flex flex-col items-center min-w-full;
}

.heading-block {
  --at-apply: flex flex-col items-center;
}

.footer-section {
  --at-apply: w-full;
}
</style>
