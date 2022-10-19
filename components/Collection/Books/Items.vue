<script setup>
const route = useRoute();
const { data: books } = await useFetch("/api/v1/koleksi/buku", {
  pick: ["results"],
});

const recommendedBooks = books.value.results.filter(
  (book) => book.slugs !== route.params.id
);
</script>

<template>
  <section class="max-w-5xl ma text-center">
    <h3>Koleksi lainnya</h3>
    <p>Rekomendasi berdasarkan koleksi yang anda lihat saat ini</p>
    <section class="grid grid-cols-3 my-5 gap-4">
      <div v-for="book in recommendedBooks" class="recommended-list">
        <NuxtLink :to="book?.slugs" class="flex flex-col items-center">
          <img :src="book.cover" class="w-30" alt="" />
          <div class="hidden sm:block">
            <p class="text-sm">{{ book.judul }}</p>
            <p class="text-xs">{{ book.author }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>
  </section>
</template>

<style scoped>
h1 {
  --at-apply: text-xl font-600;
}

.recommended-list {
  --at-apply: bg-gray-1 p-5 rounded-xl transition-all-500 hover:(bg-orange-2 text-blue-9);
}

h3 {
  --at-apply: text-2xl font-600;
}
</style>
