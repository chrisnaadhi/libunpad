<script setup>
const { getItems } = useDirectusItems();

const getAllArticle = await getItems({
  collection: "artikel",
  params: {
    limit: 3,
    sort: "-date_created",
    filter: {
      status: "published",
    },
  },
});

const getAllBeritaKunjungan = await getItems({
  collection: "berita_kunjungan",
  params: {
    limit: 3,
    sort: "-date_created",
    filter: {
      status: "published",
    },
  },
});

const gabunganBerita = [...getAllArticle, ...getAllBeritaKunjungan];
</script>

<template>
  <section>
    <div class="flex items-center justify-center mb-5 my-10">
      <h2 class="bg-unpad text-white py-2 px-10 rounded text-center">
        {{ $t("newsTitleHeader") }}
      </h2>
    </div>
    <div
      class="flex flex-col h-full mx-3 py-2 lg:(grid grid-cols-3 mx-5) justify-between gap-3"
    >
      <GenericArticleCard
        v-for="item in gabunganBerita"
        :featured-img="item.gambar_unggulan"
        :description="item.konten_berita ?? item.konten_artikel"
        :link-slug="beritaType(item)"
        :title="item.judul"
        :date-created="item.date_created"
      />
    </div>
    <div class="mt-5 flex flex-col items-center">
      <NuxtLink
        class="transition-all-500 px-2 py-1 rounded hover:(bg-unpad text-white no-underline)"
        to="/berita"
      >
        Lihat berita lainnya &rightarrow;
      </NuxtLink>
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
