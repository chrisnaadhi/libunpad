<script setup>
const { getItems } = useDirectusItems();
const title = ref("Berita terkait Museum");

const dataArtikelMuseum = await getItems({
  collection: "artikel",
  params: {
    filter: {
      kategori: "museum",
      status: "published"
    },
  },
});
</script>

<template>
  <section>
    <div class="text-center">
      <h1>{{ title }}</h1>
      <p class="italic">Berita yang berkaitan seputar Museum dan pengelolaannya.</p>
    </div>

    <div class="article-list">
      <GenericArticleCard v-for="item in dataArtikelMuseum" :featured-img="item.gambar_unggulan"
        :description="item.konten_artikel" :link-slug="item.slug" :title="item.judul" :date-created="item.date_created" />
    </div>

    <div class="my-10 text-center">
      <NuxtLink class="btn bg-orange text-white" to="/berita">
        Kembali ke Berita
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma;
}

.article-list {
  --at-apply: flex flex-col gap-5 my-5 px-3 sm:(grid grid-cols-2) lg:(grid grid-cols-3 px-0);
}
</style>
