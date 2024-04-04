<script setup>
  const val = ref('Kandaga')
</script>

<template>
  <section>
    <h2>{{ val }}</h2>
    <p>Deskripsi terkait kenapa namanya kandaga dan bagaimana kandaga dapat mendukung peningkatan akademik di Universitas Padjadjaran</p>
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