<script setup>
const data = ref("Literasi Informasi");
const route = useRoute();
</script>

<template>
  <section>
    <h3 class="text-orange">{{ data }}</h3>
    <p>{{ route.params }}</p>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma text-center;
}

p {
  --at-apply: italic;
}
</style>
