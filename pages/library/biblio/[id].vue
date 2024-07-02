<script setup>
const route = useRoute()
const { data: fetchBiblio } = await useFetch(`/api/v1/koleksi/biblio/${route.params.id}`)

const biblioData = fetchBiblio.value?.result[0]
</script>

<template>
  <section>
    <h3 class="mt-10 mb-3">Koleksi <span class="text-orange font-semibold">{{ biblioData?.title }}</span></h3>
    <div class="flex items-center justify-center mb-5">
      <h5 class="bg-orange text-white px-5 py-1 rounded-md">Metadata Koleksi</h5>
    </div>  
    <div class="flex justify-center gap-5 max-w-4xl ma">
      <div>
        <NuxtImg
          :src="biblioData?.image === undefined || biblioData?.image === null || biblioData?.image === '' ? '/images/default_cover.png' : `https://kandaga.unpad.ac.id:8010/lib/minigalnano/createthumb.php?filename=images/docs/${biblioData.image}&width=240`"
          format="webp" class="w-50 h-full rounded-md" />
      </div>
      <div class="flex gap-4">
        <div class="text-left font-semibold flex flex-col gap-3">
          <p class="font-semibold text-gray-5">Penulis</p>
          <p class="font-semibold text-gray-5">ISBN</p>
          <p class="font-semibold text-gray-5">Klasifikasi</p>
          <p class="font-semibold text-gray-5">Lokasi</p>
        </div>
        <div class="text-left flex flex-col gap-3">
          <p>: {{ biblioData?.author ?? "Belum ada data" }}</p>
          <p>: {{ biblioData?.isbnIssn ?? "Tidak diketahui" }}</p>
          <p>: {{ biblioData?.classification ?? "Belum ada data" }}</p>
          <p>: {{ biblioData?.node ?? "Belum ada data" }}</p>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center my-5">
      <h5 class="bg-orange text-white px-5 py-1 rounded-md">Keterangan Koleksi</h5>
    </div>
    <div class="mb-10">
      <NuxtLink to="/library" class="btn bg-orange text-white py-1">&leftarrow; Kembali</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma text-center;
}
</style>