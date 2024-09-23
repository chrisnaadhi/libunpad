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
      class="w-full max-h-55 object-cover object-b rounded-tl-lg rounded-tr-lg" />
    <div class="px-10 pt-5 pb-10 flex flex-col justify-between gap-2 h-full">
      <NuxtLink :to="linkSlug" class="text-dark no-underline transition-all-500 hover:text-orange">
        <h4>{{ title }}</h4>
      </NuxtLink>
      <p class="text-sm text-justify">
        <span v-html="trimDescription(description, 200)"></span>
      </p>
      <div class="flex items-center justify-between">
        <p class="text-xs text-gray italic">{{ displayTanggalIndonesia(dateCreated) }}</p>
        <NuxtLink :to="linkSlug"
          class="text-3 flex items-center py-1 px-2 rounded gap-1 text-orange no-underline transition-all-500 hover:(bg-orange text-white)">
          <span>
            Baca selengkapnya
          </span>
          <span>
            <div class="i-mdi-arrow-right" />
          </span>
        </NuxtLink>
      </div>
    </div>

  </section>
</template>

<style scoped>
.article-block {
  --at-apply: flex flex-col text-left w-full h-full bg-white rounded-lg shadow-md shadow-gray;
}
</style>
