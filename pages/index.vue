<script setup>
useHead({
  title: "GLAM Unpad | Universitas Padjadjaran",
});
</script>

<template>
  <NuxtLayout>
    <HeroSection />
    <div class="dummy w-full flex justify-center relative">
      <div class="background-block">
        <h1 class="text-2xl sm:text-4xl">Memanfaatkan Platform Kandaga</h1>
        <p>Cara memanfaatkan platform untuk memenuhi kebutuhan akademik</p>
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
  @apply w-full text-blue-9 bg-orange absolute py-3 mt--9 md:(w-150);
}
</style>
