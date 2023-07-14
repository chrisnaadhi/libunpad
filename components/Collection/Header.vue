<script setup>
defineProps(["title", "image", "description"]);
</script>

<template>
  <section class="header-top">
    <div class="container flex absolute w-full items-center justify-center">
      <img :src="image" class="mt-10 h-25 w-auto opacity-15" alt="" />
    </div>
    <p>Pusat Pengelolaan Pengetahuan UNPAD</p>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
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
