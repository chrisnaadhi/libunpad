<script setup lang="ts">
const { data } = await useFetch("/api/test");
</script>

<template>
  <div class="wrapper">
    <div class="bg-orange-4 ma mt--17 max-w-150 my-1 py-3 sm:rounded-lg">
      <h1 class="text-2xl md:text-3xl">Tuntaskan Penelitianmu secara Daring</h1>
    </div>
    <p class="text-sm mt-3 md:text-md xl:text-lg">
      Manfaatkan layanan dan alat-alat yang telah kami langgan secara daring,
      untuk mempercepat proses pekerjaan dan penelitian anda.
    </p>
    <div class="container content-wrapper">
      <div class="content">1</div>
      <div class="content">2</div>
      <div class="content">3</div>
      <div class="content">4</div>
    </div>
    <a href="#" class="text-gray-6 text-sm hover:(text-orange-5 underline)"
      >Lihat selengkapnya layanan dan alat yang dapat kami tawarkan →</a
    >
  </div>
</template>

<style scoped>
.wrapper {
  --at-apply: py-10 max-w-7xl ma text-center bg-gray-2 rounded-xl mt-15;
}

.content-wrapper {
  --at-apply: max-w-6xl flex flex-1 flex-wrap ma justify-center xl:(flex-nowrap);
}

.content {
  --at-apply: bg-orange w-full grow h-48 m-5 rounded-md md:(w-1/5);
}
</style>
