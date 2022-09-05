<script setup>
const { data } = useFetch("/api/post-test");
</script>

<template>
  <main class="text-center">
    <NuxtLayout>
      <h1 class="text-center">Visitor Counter</h1>
      <h3>{{ data.nama }}</h3>
      <p>{{ data.id }} - {{ data.path }}</p>
      <p class="text-red">{{ data.status }}</p>
    </NuxtLayout>
  </main>
</template>
