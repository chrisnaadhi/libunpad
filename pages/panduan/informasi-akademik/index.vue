<script setup>
  const val = ref('Informasi Akademik Universitas Padjadjaran')
</script>

<template>
  <section>
    <h2>{{ val }}</h2>
    <p>Deskripsi terkait Informasi Akademik di Universitas Padjadjaran</p>
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