<script setup>
const { getItemById, getItems } = useDirectusItems();

const data = ref(" Vue Composition API");
const route = useRoute();

const deskripsiKoleksi = await getItemById({
  collection: "tipe_koleksi",
  id: route.params.id,
});

const listKoleksi = await getItems({
  collection: "koleksi_teater",
  params: {
    filter: {
      kategori: route.params.id,
    },
  },
});
</script>

<template>
  <section>
    <div class="text-center my-15">
      <h1 class="font-semibold kandaga-gradient">
        {{ deskripsiKoleksi.nama_tipe_koleksi }}
      </h1>
      <p class="italic">{{ deskripsiKoleksi.deskripsi }}</p>
    </div>
    <div class="text-center">
      <h3 class="font-semibold mb-5">
        Daftar Koleksi {{ deskripsiKoleksi.nama_tipe_koleksi }}
      </h3>
      <div class="flex flex-col gap-4 lg:(grid grid-cols-3)">
        <CollectionTeaterCategoryCard
          v-for="koleksi in listKoleksi"
          :judul="koleksi.nama_koleksi"
          :tipe="deskripsiKoleksi.nama_tipe_koleksi"
          :deskripsi="koleksi.deskripsi"
          :pembuat="koleksi.author_koleksi"
          :parent="deskripsiKoleksi.id"
          :slug="koleksi.slug_koleksi"
          :yt-code="extractYoutubeLink(koleksi.link_youtube)"
        />
      </div>
    </div>
    <div class="my-5">
      <NuxtLink to="/e-teater" class="btn bg-orange text-white py-1">
        Kembali
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma;
}
</style>
