<script setup>
defineProps(["menus"]);
</script>

<template>
  <section class="flex flex-col ml--8 pt-5 w-50 absolute bg-white">
    <NuxtLink
      v-for="(menu, index) in menus"
      :key="index"
      :to="menu.url"
      class="menu-link"
    >
      {{ menu.name }}
    </NuxtLink>
  </section>
</template>

<style scoped>
.menu-link {
  --at-apply: w-full text-left transition-all-500 border-t border-gray-2 p-2 hover:(bg-orange text-white);
}
</style>
