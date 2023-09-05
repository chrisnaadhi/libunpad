<script setup>
const data = ref(" Vue Composition API");
const route = useRoute();
</script>

<template>
  <section>
    <p>{{ data }}</p>
    <p>{{ route }}</p>
  </section>
</template>

<style scoped>
p {
  --at-apply: italic;
}
</style>
