<script setup>
const data = ref('Berita Kandaga')
const { getItems } = useDirectusItems();

const getAllArticle = await getItems({
  collection: "artikel",
  params: {
    limit: 3,
    sort: "-date_created",
    filter: {
      status: "published"
    }
  },
});
</script>

<template>
  <section>
    <div class="flex items-center justify-center mb-5">
      <h2 class="bg-orange text-white max-w-md w-full py-2 px-10 rounded text-center">{{ data }}</h2>
    </div>
    <div class="flex flex-col mx-3 lg:(grid grid-cols-3 mx-0) justify-between gap-3">
      <GenericArticleCard v-for="item in getAllArticle" :featured-img="item.gambar_unggulan"
        :description="item.konten_artikel" :link-slug="item.slug" :title="item.judul" :date-created="item.date_created" />
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma py-10;
}

p {
  --at-apply: italic;
}
</style>