<script setup>
const config = useRuntimeConfig();

defineProps({
  featuredImg: String,
  linkSlug: String,
  title: String,
  dateCreated: String,
  description: String,
});
</script>

<template>
  <section class="article-block">
    <NuxtImg :src="`${config.public.directus.url}assets/` + featuredImg"
      class="w-full max-h-45 object-cover rounded-lg" />
    <NuxtLink :to="linkSlug" class="text-dark no-underline transition-all-500 hover:text-orange">
      <h5>{{ title }}</h5>
    </NuxtLink>
    <p class="text-xs italic">{{ convertTimeZone(dateCreated) }}</p>
    <div></div>
    <p>
      <span v-html="trimDescription(description, 150)"></span>
      <NuxtLink :to="linkSlug" class="text-sm text-orange underline">
        Baca selengkapnya
      </NuxtLink>
    </p>
  </section>
</template>

<style scoped>
.article-block {
  --at-apply: flex flex-col gap-2 text-left w-full min-h-sm bg-gray-50 p-3 rounded-lg shadow-md shadow-gray;
}
</style>
