<script setup>
const { getItems } = useDirectusItems();
const title = ref("Berita terkait Library");
const route = useRoute();

const dataArtikelLibrary = await getItems({
  collection: "artikel",
  params: {
    filter: {
      kategori: "library",
    },
  },
});
</script>

<template>
  <section>
    <div class="text-center">
      <h1>{{ title }}</h1>
      <pre>{{ route.fullPath }}</pre>
    </div>

    <div class="flex flex-col lg:(grid grid-cols-3) px-4 py-5">
      <GenericArticleCard
        v-for="item in dataArtikelLibrary"
        :featured-img="item.gambar_unggulan"
        :description="item.konten_artikel"
        :link-slug="item.slug"
        :title="item.judul"
        :date-created="item.date_created"
      />
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
</style>
