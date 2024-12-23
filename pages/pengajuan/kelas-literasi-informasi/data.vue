<script setup>
const val = ref("Vue Composition API");
</script>

<template>
  <section>
    <p>{{ val }}</p>
  </section>
</template>

<style scoped>
p {
  --at-apply: italic;
}
</style>
