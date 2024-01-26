<script setup>
defineProps(["menus"]);

const { locale } = useI18n();
</script>

<template>
  <section class="absolute left-0 bg-white shadow-lg w-full mt-5">
    <div class="flex flex-col max-w-7xl ma">
      <NuxtLink
        v-for="(menu, index) in menus"
        :key="index"
        :to="locale === 'id' ? menu.url : menu.urlEN"
        class="menu-link"
        rel="noopener noreferrer"
      >
        {{ locale === "en" ? menu.nameEN : menu.name }}
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.menu-link {
  --at-apply: w-full text-left transition-all-500 p-2 text-dark no-underline hover:(bg-orange text-white);
}
</style>
