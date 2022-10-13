<script setup>
const welcome = ref("Jelajahi Koleksi Kami");
const { getItems } = useDirectusItems();

const fileBooks = await getItems({
  collection: "journal_collection",
});
</script>

<template>
  <NuxtLayout>
    <main class="container ma my-10">
      <section class="mb-10 text-center">
        <p>Pusat Pengelolaan Pengetahuan UNPAD</p>
        <h1>{{ welcome }}</h1>
        <p>Cari Koleksi Fisik, Elektronik dan lainnya.</p>
      </section>

      <section class="my-5">
        <h2>Pilihan Kami</h2>
        <CollectionBooksHighlight />
      </section>

      <section class="mt-25">
        <h2>Koleksi Lainnya</h2>
        <p>
          {{ fileBooks }}
        </p>
      </section>
    </main>
  </NuxtLayout>
</template>

<style scoped>
h1 {
  --at-apply: text-5xl my-10 font-600;
}
h2 {
  --at-apply: text-3xl my-3 font-600 text-center;
}
</style>
