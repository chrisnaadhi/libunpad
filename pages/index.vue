<script setup></script>

<template>
  <NuxtLayout>
    <HeroSection />
    <div class="dummy w-full flex justify-center relative">
      <div class="background-block absolute mt--9">
        <h1>Perpustakaan Pusat UNPAD</h1>
        <h2>Cari sesuatu disini</h2>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.dummy {
  text-align: center;
  min-height: 100vw;
  @apply bg-blue-9 text-orange;
}

.background-block {
  @apply w-full text-blue-9 bg-orange md:(w-150);
}
</style>
