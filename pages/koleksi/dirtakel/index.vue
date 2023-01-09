<script setup>
const searchDirtakel = useSearchDirtakel();
const heading = ref("Koleksi Dirtakel");
</script>

<template>
  <main>
    <h1>{{ heading }}</h1>
  </main>
</template>

<style scoped>
h1 {
  --at-apply: font-600 text-2xl;
}
</style>
