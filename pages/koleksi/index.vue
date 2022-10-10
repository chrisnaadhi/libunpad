<script setup>
const welcome = ref("Jelajahi Koleksi Kami");
const bookItems = {
  buku_rekomendasi: {
    cover:
      "https://chrisnaadhi.github.io/open-library-frontpage/assets/images/books/html.png",
    judul: "Introduction to HTML: A Complete Beginner to Expert Course",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima quis fuga incidunt.",
    url: "200",
  },
};
</script>

<template>
  <main>
    <section class="ma sticky top-0">
      <NavigationBar />
    </section>

    <section class="text-center">
      <p>Pusat Pengelolaan Pengetahuan UNPAD</p>
      <h1>{{ welcome }}</h1>
      <p>Cari Koleksi Fisik, Elektronik dan lainnya.</p>
    </section>

    <section
      class="container ma grid grid-cols-none sm:grid-cols-2 md:grid-cols-4 grid-gap-2"
    >
      <CollectionBookCard>
        <template #cover>
          <img
            src="https://chrisnaadhi.github.io/open-library-frontpage/assets/images/books/html.png"
            alt=""
          />
        </template>
        <template #banner>
          <p>Rekomendasi</p>
        </template>
        <template #deskripsi>
          <h2 class="text-xl font-600">a</h2>
        </template>
        <template #action>
          <button class="btn bg-gray-200 w-full my-2 mr-0 xl:mr-2">
            Detail
          </button>
          <button class="btn bg-gray-200 w-full my-2 ml-0 xl:ml-2">
            Pinjam
          </button>
        </template>
      </CollectionBookCard>
    </section>

    <CollectionIndexContent class="my-25" />

    <section>
      <FooterSection />
    </section>
  </main>
</template>

<style scoped>
h1 {
  --at-apply: text-5xl font-600 my-14;
}

hr {
  --at-apply: ;
}
</style>
