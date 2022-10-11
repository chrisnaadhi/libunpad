<script setup>
const bookItems = booksData();
</script>

<template>
  <section class="books-collection">
    <CollectionBookCard
      v-for="buku in bookItems"
      :key="buku.tipe"
      :title="buku.judul"
      :author="buku.author"
      :description="buku.description"
      :banner="buku.tipe"
      :cover="buku.cover"
      :url-book="buku.url"
    />
  </section>
</template>

<style scoped>
.books-collection {
    --at-apply: container ma grid grid-cols-none sm:grid-cols-2 md:grid-cols-3 grid-gap-10;
}
</style>
