<script setup>
// const bookItems = booksData();
const route = useRoute();

const { data: bookItems } = useFetch("/api/koleksi/buku", {
  pick: ["results"],
});
</script>

<template>
  <section class="books-collection">
    <CollectionBookCard
      v-for="buku in bookItems.results"
      :key="buku.id"
      :title="buku.judul"
      :author="buku.author"
      :description="buku.description"
      :banner="buku.tipe"
      :cover="buku.cover"
      :url-book="route.path + '/buku/' + buku.path"
      :banner-color="backgroundBanner(buku.tipe)"
    />
  </section>
</template>

<style scoped>
.books-collection {
    --at-apply: container ma grid grid-cols-none sm:grid-cols-2 md:grid-cols-4 grid-gap-7;
}
</style>
