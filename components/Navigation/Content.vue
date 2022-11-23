<script setup>
defineProps(["menus"]);
</script>

<template>
  <section class="flex flex-col ml--8 pt-5 w-30 absolute bg-white py-2 gap-2">
    <span v-for="(menu, index) in menus" :key="index" class="menu-link">
      <NuxtLink :to="menu.url">{{ menu.name }}</NuxtLink>
    </span>
  </section>
</template>

<style scoped>
.menu-link {
  --at-apply: w-full text-center transition-all-200 hover:(text-orange underline);
}
</style>
