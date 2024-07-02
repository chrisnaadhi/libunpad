<script setup>
  const val = ref('Layanan Luring Kandaga')
</script>

<template>
  <section>
    <h2>{{ val }}</h2>
    <p>Deskripsi terkait Layanan Luring (Offline) Kandaga</p>
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