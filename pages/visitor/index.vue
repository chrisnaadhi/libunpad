<script setup>
const { data, refresh } = useFetch("/api/dor");

onBeforeMount(() => {
  refresh();
});
</script>

<template>
  <NuxtLayout>
    <main class="flex flex-col items-center justify-center my-5">
      <h1 class="text-4xl font-600">Visitor Counter</h1>
      <h3>{{ data.nama }}</h3>
      <p>{{ data.id }} - {{ data.path }}</p>
      <p class="text-red">{{ data.status }}</p>
      <button @click="refresh" class="btn bg-blue-500 text-white my-5">
        Refresh
      </button>
      <div>
        <form action="/"></form>
        {{ data.urlPath }} - {{ data.msg }}
      </div>
    </main>
  </NuxtLayout>
</template>
