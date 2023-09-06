<script setup>
const { getItems } = useDirectusItems();

const imageBg = "https://www.svgrepo.com/show/9244/newspaper-report.svg";

const getAllArticle = await getItems({
  collection: "artikel",
  params: {
    sort: "-date_updated",
  },
});
</script>

<template>
  <main class="max-w-7xl ma px-4 py-10">
    <section>
      <CollectionHeader
        :title="$t('newsTitleHeader')"
        :image="imageBg"
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
    <section class="my-10 text-center">
      <NuxtLink to="/berita" class="btn bg-orange text-white">
        Kembali ke Berita
      </NuxtLink>
    </section>
  </main>
</template>

<style scoped>
p {
  --at-apply: italic;
}

.article-list {
  --at-apply: grid grid-cols-3 gap-5 my-5;
}
</style>
