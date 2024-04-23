<script setup>
const data = ref('Berita Kandaga')
const { getItems } = useDirectusItems();

const getAllArticle = await getItems({
  collection: "berita_kunjungan",
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
    <div class="flex items-center justify-center mb-5 my-10">
      <h2 class="bg-orange text-white max-w-md w-full py-2 px-10 rounded text-center">{{ data }}</h2>
    </div>
    <div class="flex flex-col h-full mx-3 py-2 lg:(grid grid-cols-3 mx-5) justify-between gap-3">
      <GenericArticleCard v-for="item in getAllArticle" :featured-img="item.gambar_unggulan"
        :description="item.konten_berita" :link-slug="beritaType(item)" :title="item.judul" :date-created="item.date_created" />
    </div>
    <div class="mt-5 flex flex-col items-center">
      <NuxtLink class="transition-all-500 px-2 py-1 rounded hover:(bg-orange text-white no-underline)" to="/berita">Lihat berita lainnya...</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma;
}

p {
  --at-apply: italic;
}
</style>