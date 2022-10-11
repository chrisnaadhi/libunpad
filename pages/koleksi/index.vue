<script setup>
const welcome = ref("Jelajahi Koleksi Kami");
const bookItems = {
  buku_rekomendasi: {
    cover:
      "https://chrisnaadhi.github.io/open-library-frontpage/assets/images/books/html.png",
    judul: "Introduction to HTML: A Complete Beginner to Expert Course",
    author: "Laurence Svekis",
    url: "200",
    tipe: "Rekomendasi",
  },
  buku_populer: {
    cover:
      "https://chrisnaadhi.github.io/open-library-frontpage/assets/images/books/html.png",
    judul: "Introduction to HTML: A Complete Beginner to Expert Course",
    author: "Laurence Svekis",
    url: "200",
    tipe: "Populer",
  },
};
</script>

<template>
  <NuxtLayout>
    <main>
      <section class="text-center">
        <p>Pusat Pengelolaan Pengetahuan UNPAD</p>
        <h1>{{ welcome }}</h1>
        <p>Cari Koleksi Fisik, Elektronik dan lainnya.</p>
      </section>

      <CollectionBooksHighlight />

      <CollectionIndexContent class="my-25" />
    </main>
  </NuxtLayout>
</template>

<style scoped>
h1 {
  --at-apply: text-5xl font-600 my-14;
}

hr {
  --at-apply: ;
}
</style>
