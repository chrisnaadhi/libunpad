<script setup>
const route = useRoute()

const { getItemById } = useDirectusItems()
const { getThumbnail } = useDirectusFiles()
const getArchiveCollection = await getItemById({
  collection: "koleksi_archive",
  id: route.params.id
})
</script>

<template>
  <section>
    <h3 class="mt-10 mb-3 text-center">Koleksi <br> <span class="text-orange font-semibold">{{
      getArchiveCollection.judul
        }}</span></h3>
    <div class="flex items-center justify-center mb-5">
      <h5 class="bg-orange text-white px-5 py-1 rounded-md">Metadata Koleksi</h5>
    </div>
    <div class="flex justify-center gap-5 max-w-4xl ma">
      <div>
        <NuxtImg :src="getThumbnail(getArchiveCollection.thumbnail)" format="webp" class="w-50 h-full rounded-md" />
      </div>
      <table>
        <tr>
          <td class="font-semibold pr-5">Judul</td>
          <td>: {{ getArchiveCollection.judul ?? "-" }}</td>
        </tr>
        <tr>
          <td class="font-semibold pr-5">Tipe Koleksi</td>
          <td>: {{ getArchiveCollection.tipe_koleksi ?? '-' }}</td>
        </tr>
        <tr>
          <td class="font-semibold pr-5">Pembuat Koleksi</td>
          <td>: {{ getArchiveCollection.pembuat_koleksi ?? "-" }}</td>
        </tr>
        <tr>
          <td class="font-semibold pr-5">Keywords</td>
          <td>: {{ getArchiveCollection.keywords.join(", ") ?? "-" }}</td>
        </tr>
        <tr>
          <td class="font-semibold pr-5">Lembaga Penanggungjawab</td>
          <td>: {{ getArchiveCollection.lembaga_penanggungjawab ?? "-" }}</td>
        </tr>
      </table>
    </div>
    <div class="flex items-center justify-center my-5">
      <h5 class="bg-orange text-white px-5 py-1 rounded-md">Keterangan Koleksi</h5>
    </div>
    <div class="max-w-3xl ma">
      <table class="my-5 italic">
        <tr class="text-sm text-gray">
          <td class="pr-5">Tanggal Dibuat</td>
          <td>: {{ getArchiveCollection.tanggal_dibuat ?? "-" }}</td>
        </tr>
        <tr class="text-sm text-gray">
          <td class="pr-5">Tanggal publikasi</td>
          <td>: {{ getArchiveCollection.tanggal_publikasi ?? "-" }}</td>
        </tr>
      </table>
      <div class="content-data" v-html="getArchiveCollection.keterangan_koleksi"></div>
    </div>
    <div class="my-10 text-center">
      <NuxtLink to="/records" class="btn bg-orange text-white py-1">&leftarrow; Kembali</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma;
}
</style>