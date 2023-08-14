<script setup>
const data = ref(" Vue Composition API");
const route = useRoute();
</script>

<template>
  <section>
    <p>{{ data }}</p>
    <p>{{ route.params }}</p>
  </section>
</template>

<style scoped>
p {
  --at-apply: italic;
}
</style>
