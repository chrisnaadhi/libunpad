<script setup>
const route = useRoute()
const val = ref('Koleksi ' + route.params.id)

const { getItemById } = useDirectusItems()
const { getThumbnail } = useDirectusFiles()
const getGalleryCollection = await getItemById({
  collection: "koleksi_gallery",
  id: route.params.id
})
</script>

<template>
  <section>
    <h3 class="mt-10 mb-3">Koleksi <span class="text-orange font-semibold">{{ getGalleryCollection.judul }}</span></h3>
    <div class="flex items-center justify-center mb-5">
      <h5 class="bg-orange text-white px-5 py-1 rounded-md">Metadata Koleksi</h5>
    </div>
    <div class="flex justify-center gap-5 max-w-4xl ma">
      <div>
        <NuxtImg :src="getThumbnail(getGalleryCollection.thumbnail)" format="webp" class="w-50 h-full rounded-md" />
      </div>
      <div class="flex gap-4">
        <div class="text-left font-semibold flex flex-col gap-3">
          <p>Judul </p>
          <p>Tipe Koleksi</p>
          <p>Pembuat Koleksi</p>
          <p>Keywords</p>
          <p>Lembaga Penanggungjawab</p>
        </div>
        <div class="text-left flex flex-col gap-3">
          <p>: {{ getGalleryCollection.judul }}</p>
          <p>: {{ getGalleryCollection.tipe_koleksi ?? '-' }}</p>
          <p>: {{ getGalleryCollection.pembuat_koleksi }}</p>
          <p>: {{ getGalleryCollection.keywords.join(", ") }}</p>
          <p>: {{ getGalleryCollection.lembaga_penanggungjawab }}</p>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center mb-5">
      <h5 class="bg-orange text-white px-5 py-1 rounded-md">Keterangan Koleksi</h5>
    </div>
    <div class="mb-10">
      <p class="text-sm text-gray">Tanggal dibuat: {{ getGalleryCollection.tanggal_dibuat }}</p>
      <p class="text-sm text-gray mb-5">Tanggal publikasi: {{ getGalleryCollection.tanggal_publikasi }}</p>
      <span v-html="getGalleryCollection.keterangan_koleksi"></span>
    </div>
    <div class="mb-10">
      <NuxtLink to="/gallery" class="btn bg-orange text-white py-1">&leftarrow; Kembali</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma text-center;
}
</style>