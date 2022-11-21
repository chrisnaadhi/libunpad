<script setup>
defineProps(["menus"]);
</script>

<template>
  <section class="flex flex-col ml--8 mt-5 w-30 absolute bg-orange py-2 gap-2">
    <span
      v-for="(menu, index) in menus"
      :key="index"
      class="bg-white w-full text-center"
    >
      <NuxtLink :to="menu.url">{{ menu.name }}</NuxtLink>
    </span>
  </section>
</template>

<style scoped></style>
