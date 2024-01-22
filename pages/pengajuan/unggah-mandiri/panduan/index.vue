<script setup>
const data = ref("Panduan Unggah Mandiri");
</script>

<template>
  <section>
    <p>{{ data }}</p>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma;
}

p {
  --at-apply: italic;
}
</style>
