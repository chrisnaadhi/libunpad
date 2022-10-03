<script setup>
const route = useRoute();
const { data: mahasiswa } = await useFetch(
  `https://siat.unpad.ac.id/index.php/akademik/datamhs/mahasiswa/getbio/${route.params.npm}`,
  {
    pick: ["MhsNama", "MhsNPM"],
  }
);
</script>

<template>
  <section class="text-center">
    <h1 class="font-600 text-4xl">{{ mahasiswa.MhsNama }}</h1>
    <p class="text-xl">{{ mahasiswa.MhsNPM }}</p>
    <p>{{ mahasiswa }}</p>
  </section>
</template>
