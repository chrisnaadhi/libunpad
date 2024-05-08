<script setup>
const val = ref('Fasilitas Kandaga')
const facilities = ref([
  "Koleksi Langka",
  "Keanggotaan",
  "Ruang Baca Mahasiswa",
  "E-Learning",
  "Riset",
  "Public Relation",
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
</script>

<template>
  <section>
    <h2>{{ val }}</h2>
    <p>Informasi mengenai Fasilitas yang tersedia Kandaga</p>
    <div>
      <div v-for="facility in facilities">
        <p>{{ facility }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma pb-70;
}

p {
  --at-apply: italic;
}
</style>