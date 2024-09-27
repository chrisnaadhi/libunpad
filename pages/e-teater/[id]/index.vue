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
      status: "published",
    },
  },
});
</script>

<template>
  <section class="list-koleksi">
    <div class="text-center my-15">
      <h1 class="font-semibold kandaga-gradient">
        {{ deskripsiKoleksi.nama_tipe_koleksi }}
      </h1>
      <p class="italic">{{ deskripsiKoleksi.deskripsi }}</p>
    </div>
    <div class="text-center">
      <h3 class="font-semibold mb-5">
        Daftar {{ deskripsiKoleksi.nama_tipe_koleksi }}
      </h3>
      <div
        class="flex flex-col gap-4 lg:(grid grid-cols-3)"
        v-if="listKoleksi.length > 0"
      >
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
      <div v-else>
        <h4 class="italic text-red-6">
          Saat ini belum ada koleksi yang sudah diolah
        </h4>
      </div>
    </div>
    <div class="my-5 flex justify-center">
      <NuxtLink
        to="/e-teater"
        class="btn bg-orange text-white py-1 text-center"
      >
        Kembali ke Koleksi E-Teater
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.list-koleksi {
  --at-apply: max-w-7xl ma;
}
</style>
