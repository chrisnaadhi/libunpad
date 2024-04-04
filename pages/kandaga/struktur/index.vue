<script setup>
  const val = ref('Struktur Fungsi Kandaga')
</script>

<template>
  <section>
    <h2>{{ val }}</h2>
    <p>Informasi mengenai Struktur Fungsi Kandaga (secara singkat / dengan gambar)</p>
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