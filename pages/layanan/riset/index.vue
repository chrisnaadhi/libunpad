<script setup>
  const val = ref('Dukungan Riset Kandaga')
</script>

<template>
  <section>
    <h2>{{ val }}</h2>
    <p>Deskripsi terkait Layanan Dukungan Riset (Research Support) Kandaga</p>
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