<script setup>
const image = ref("https://www.svgrepo.com/show/428321/notebook.svg");
const route = useRoute();
useHead({
  title: "GLAM Kandaga Unpad | Universitas Padjadjaran",
});
</script>

<template>
  <main class="container ma my-10">
    <CollectionHeader :title="$t('collectionTitleHeader')" :image="image" />

    <section class="my-5">
      <h2>Pilihan Kami</h2>
      <CollectionBooksHighlight />
    </section>

    <section class="mt-10">
      <h2>Koleksi Lainnya</h2>
      <CollectionBlockData :left="true" title="Gallery" page="/gallery" />
      <CollectionBlockData :left="false" title="Library" page="/library" />
      <CollectionBlockData :left="true" title="Archive" page="/records" />
      <CollectionBlockData :left="false" title="Museum" page="/museum" />
      <CollectionBlockData
        :left="true"
        title="Repository"
        :page="route.fullPath + '/repository'"
      />
    </section>
  </main>
</template>

<style scoped>
h2 {
  --at-apply: text-3xl my-3 font-600 text-center;
}
</style>
