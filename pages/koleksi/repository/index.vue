<script setup>
definePageMeta({
  layout: "default",
});
</script>

<template>
  <section class="max-w-6xl ma">
    <h1>Repository Unpad</h1>
    <p class="text-center">
      Koleksi Karya Ilmiah dan Tugas Akhir dari Civitas Akademika Universitas
      Padjadjaran
    </p>
    <div class="grid grid-cols-2 gap-2">
      <CollectionRepositoryCard v-for="collection in 6" />
    </div>
    <div class="my-10 flex flex-col items-center">
      <NuxtLink to="/koleksi" class="btn bg-orange text-white">
        Kembali ke Koleksi
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
h1 {
  --at-apply: text-center text-4xl;
}
</style>
