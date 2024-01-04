<script setup>
const data = ref(" Vue Composition API");
</script>

<template>
  <section>
    <p>{{ data }}</p>
  </section>
</template>

<style scoped>
p {
  --at-apply: italic;
}
</style>
