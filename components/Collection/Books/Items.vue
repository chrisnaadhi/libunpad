<script setup>
const { data: books } = await useFetch("/api/koleksi/buku", {
  pick: ["results"],
});
</script>

<template>
  <section class="max-w-5xl ma text-center">
    <h3>Koleksi lainnya</h3>
    <p>Rekomendasi berdasarkan koleksi yang anda lihat saat ini</p>
    <section class="grid grid-cols-4 my-5">
      <div v-for="book in books.results">
        <NuxtLink :to="book.slugs" class="flex flex-col items-center">
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

h3 {
  --at-apply: text-2xl font-600;
}
</style>
