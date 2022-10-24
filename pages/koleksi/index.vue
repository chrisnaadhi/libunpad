<script setup>
const title = ref("Jelajahi Koleksi Kami");
const image = ref("https://www.svgrepo.com/show/428321/notebook.svg");
</script>

<template>
  <NuxtLayout>
    <main class="container ma my-10">
      <CollectionHeader :title="title" :image="image" />

      <section class="my-5">
        <h2>Pilihan Kami</h2>
        <CollectionBooksHighlight />
      </section>

      <section class="mt-25">
        <h2>Koleksi Lainnya</h2>
        <CollectionBlockData :left="true" title="Gallery" />
        <CollectionBlockData :left="false" title="Library" />
        <CollectionBlockData :left="true" title="Archive" />
        <CollectionBlockData :left="false" title="Museum" />
        <CollectionBlockData :left="true" title="Repository" />
      </section>
    </main>
  </NuxtLayout>
</template>

<style scoped>
h2 {
  --at-apply: text-3xl my-3 font-600 text-center;
}
</style>
