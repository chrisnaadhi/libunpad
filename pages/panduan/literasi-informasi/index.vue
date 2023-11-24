<script setup>
const data = ref("Vue Composition API");
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
