<script setup>
const data = ref(" Vue Composition API");
const { getItems } = useDirectusItems();

const getAllArticle = await getItems({
  collection: "artikel",
  params: {
    sort: "-date_updated",
  },
});
</script>

<template>
  <main class="max-w-7xl ma px-4">
    <section>
      <CollectionHeader
        :title="$t('newsTitleHeader')"
        :image="image"
        :description="$t('newsDescriptionHeader')"
      />
    </section>
    <section class="article-list">
      <GenericArticleCard
        v-for="item in getAllArticle"
        :featured-img="item.gambar_unggulan"
        :description="item.konten_artikel"
        :link-slug="item.slug"
        :title="item.judul"
        :date-created="item.date_created"
      />
    </section>
  </main>
</template>

<style scoped>
p {
  --at-apply: italic;
}

.article-list {
  --at-apply: grid grid-cols-3 gap-5 my-10;
}
</style>
