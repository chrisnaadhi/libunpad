<script setup>
const route = useRoute();

const { data: bookItems, pending, error } = await useFetch("/api/koleksi/buku");
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
      :url-book="route.path + '/buku/' + buku?.slugs"
      :banner-color="backgroundBanner(buku.tipe)"
    />
  </section>
</template>

<style scoped>
.books-collection {
    --at-apply: container ma grid grid-cols-none sm:grid-cols-2 md:grid-cols-4 grid-gap-7;
}
</style>
