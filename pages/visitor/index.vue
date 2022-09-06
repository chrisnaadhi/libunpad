<script setup>
const { data, refresh } = useFetch("/api/post-test");

onBeforeMount(() => {
  refresh();
});
</script>

<template>
  <NuxtLayout>
    <main class="text-center my-5">
      <h1 class="text-center text-4xl font-600">Visitor Counter</h1>
      <h3>{{ data.nama }}</h3>
      <p>{{ data.id }} - {{ data.path }}</p>
      <p class="text-red">{{ data.status }}</p>
      <button @click="refresh" class="btn bg-blue-500 my-5">Refresh</button>
    </main>
  </NuxtLayout>
</template>
