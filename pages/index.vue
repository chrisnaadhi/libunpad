<script setup>
useHead({
  meta: [
    {
      name: "description",
      content: "Kandaga GLAM Situs Resmi Kantor Pengelolaan Perpustakaan UNPAD",
    },
    {
      property: "og:title",
      content: "GLAM Kandaga Unpad",
    },
    {
      property: "og:description",
      content:
        "Situs GLAM (Gallery, Library, Archive & Museums) dari Kandaga Kantor Pengelolaan Perpustakaan Universitas Padjadjaran. Situs ini menjadi pintu pencarian dan penyajian koleksi yang dimiliki oleh Universitas Padjadjaran yang dapat diakses oleh seluruh kalangan masyarakat.",
    },
    {
      property: "og:image",
      content: "/images/kandaga-new.webp",
    },
  ],
  title: "GLAM Kandaga Unpad | Universitas Padjadjaran",
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
