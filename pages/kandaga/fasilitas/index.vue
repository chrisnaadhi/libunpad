<script setup>
const val = ref("Fasilitas Kandaga")
const facilities = ref([
  "Koleksi Langka",
  "Keanggotaan",
  "Ruang Baca Mahasiswa",
  "E-Learning",
  "Pojok Statistik",
  "Riset",
  "Layanan Informasi",
  "Museum",
  "Loker",
  "Arisp",
  "Ruang Diskusi",
  "Toilet",
  "Ruang Belajar",
  "Ruang Kelas",
  "Musholla",
  "Common Room"
])

const { getItems } = useDirectusItems()
const { getThumbnail } = useDirectusFiles();

const getFasilitasKandaga = await getItems({
  collection: "fasilitas_kandaga"
})
</script>

<template>
  <section>
    <h2>{{ val }}</h2>
    <p>Informasi mengenai Fasilitas yang tersedia Kandaga</p>
    <div class="flex flex-col gap-3 mt-10 md:(grid grid-cols-3)">
      <div v-for="facility in getFasilitasKandaga" class="flex flex-col items-center">
        <div class="card-block">
          <div class="description-block overflow-hidden">
            <div class="text-white py-6 px-8">
              <h4>{{ facility.nama_fasilitas }}</h4>
              <p class="text-sm">{{ facility.deskripsi }}</p>
            </div>
          </div>
          <NuxtImg :src="getThumbnail(facility.foto_fasilitas)" class="w-100 max-w-md h-60 object-cover z-0 rounded-lg" />
        </div>
        <h4>{{ facility.nama_fasilitas }}</h4>
        <p>Lantai {{ facility.lantai }} Gd. Kandaga</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma py-10 text-center;
}

p {
  --at-apply: italic;
}

.card-block {
  --at-apply: relative transition-all-500;
}

.description-block {
  --at-apply: absolute bg-dark opacity-70 w-full h-full rounded-lg transition-all-1000 opacity-0;
}

.card-block:hover .description-block {
  --at-apply: opacity-80;
}
</style>