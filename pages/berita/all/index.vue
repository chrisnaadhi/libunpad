<script setup>
const { getItems } = useDirectusItems();

const imageBg = "https://www.svgrepo.com/show/9244/newspaper-report.svg";

const getAllArticle = await getItems({
  collection: "artikel",
  params: {
    sort: "-date_created",
    filter: {
      status: "published"
    }
  },
});

const getAllBeritaKunjungan = await getItems({
  collection: "berita_kunjungan",
  params: {
    sort: "-date_created",
    filter: {
      status: "published"
    }
  }
})

const allBerita = [...getAllArticle, ...getAllBeritaKunjungan].sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
</script>

<template>
  <main class="max-w-7xl ma px-4 py-10">
    <section>
      <CollectionHeader :title="$t('newsTitleHeader')" :image="imageBg" :description="$t('newsDescriptionHeader')" />
    </section>
    <section class="article-list">
      <GenericArticleCard v-for="item in allBerita" :featured-img="item.gambar_unggulan"
        :description="item.konten_artikel ?? item.konten_berita" :link-slug="beritaType(item)" :title="item.judul" :date-created="item.date_created" />
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
  --at-apply: flex flex-col gap-5 my-5 px-3 sm:(grid grid-cols-2) lg:(grid grid-cols-3 px-0);
}
</style>
