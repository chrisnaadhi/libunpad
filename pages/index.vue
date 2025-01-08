<script setup>
useHead({
  meta: [
    {
      name: "description",
      content:
        "Kandaga Library Situs Resmi Perpustakaan Universitas Padjadjaran yang menyediakan layanan informasi dan referensi bagi seluruh sivitas akademika Universitas Padjadjaran dan juga masyarakat umum.",
    },
    {
      property: "og:title",
      content:
        "Kandaga Library - Perpustakaan Universitas Padjadjaran | Kandaga Unpad",
    },
    {
      property: "og:description",
      content:
        "Kandaga Library Situs Resmi Perpustakaan Universitas Padjadjaran yang menyediakan layanan informasi dan referensi bagi seluruh sivitas akademika Universitas Padjadjaran dan juga masyarakat umum.",
    },
    {
      property: "og:image",
      content: "/images/kandaga-new.webp",
    },
  ],
  title:
    "Kandaga Library - Perpustakaan Universitas Padjadjaran | Kandaga Unpad",
});

const state = mobileMenu();
const windowClick = () => {
  state.menuState = false;
};
</script>

<template>
  <div @click="windowClick">
    <HeroSection />
    <HomePlatforms />
    <HomeTools />
    <HomeNews />
    <HomeCollection />
  </div>
</template>

<style scoped></style>
