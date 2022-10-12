<script setup>
const welcome = ref("Jelajahi Koleksi Kami");
</script>

<template>
  <NuxtLayout>
    <main class="my-10 text-center">
      <section class="mb-10">
        <p>Pusat Pengelolaan Pengetahuan UNPAD</p>
        <h1 class="text-5xl my-8">{{ welcome }}</h1>
        <p>Cari Koleksi Fisik, Elektronik dan lainnya.</p>
      </section>

      <section class="my-5">
        <h1 class="text-3xl my-3">Pilihan Kami</h1>
        <CollectionBooksHighlight />
      </section>

      <section class="mt-25">
        <h1 class="text-3xl my-3">Koleksi Lainnya</h1>
      </section>
    </main>
  </NuxtLayout>
</template>

<style scoped>
h1 {
  --at-apply: font-600;
}
</style>
