<script setup>
defineProps(["title", "image"]);
</script>

<template>
  <section class="header-top">
    <div class="container flex absolute w-full items-center justify-center">
      <img :src="image" class="mt-10 h-25 w-auto opacity-15" alt="" />
    </div>
    <p>Pusat Pengelolaan Pengetahuan UNPAD</p>
    <h1>{{ title }}</h1>
    <p>Cari Koleksi Fisik, Elektronik dan lainnya.</p>
  </section>
</template>

<style scoped>
.header-top {
  --at-apply: mb-10 text-center;
}

h1 {
  --at-apply: text-5xl my-10 font-600;
}
</style>
