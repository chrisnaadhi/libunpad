<script setup>
  const val = ref('Struktur Fungsi Kandaga')
</script>

<template>
  <section>
    <h2>{{ val }}</h2>
    <p>Informasi mengenai Struktur Fungsi Kandaga</p>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma py-10 text-center;
}

p {
  --at-apply: italic;
}
</style>