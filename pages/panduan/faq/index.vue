<script setup>
  const val = ref('Frequently Asked Questions')
</script>

<template>
  <section>
    <h2>{{ val }}</h2>
    <p>Informasi terkait Pertanyaan yang sering diajukan atau {{ val }}</p>
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