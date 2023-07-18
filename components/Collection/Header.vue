<script setup>
defineProps(["title", "image", "description"]);
</script>

<template>
  <section class="header-top">
    <div class="absolute w-full flex justify-center">
      <img :src="image" class="mt-10 h-25 w-25 opacity-10" alt="" />
    </div>
    <p>Pusat Pengelolaan Pengetahuan UNPAD</p>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </section>
</template>

<style scoped>
.header-top {
  --at-apply: relative mb-10 text-center;
}

h1 {
  --at-apply: text-5xl my-10 font-600;
}
</style>
