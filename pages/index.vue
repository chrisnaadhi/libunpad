<script setup>
useHead({
  title: "GLAM Unpad | Universitas Padjadjaran",
  meta: [
    {
      name: "description",
      content: "Situs Resmi Pusat Pengelolaan Pengetahuan UNPAD",
    },
  ],
});
</script>

<template>
  <div>
    <GenericMiniBanner />
    <NuxtLayout>
      <HeroSection />
      <HomePlatforms />
      <HomeTools />
      <HomeCollection />
    </NuxtLayout>
  </div>
</template>

<style scoped></style>
