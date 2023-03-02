<script setup>
const searchDirtakel = useSearchDirtakel();
const heading = ref("Koleksi Dirtakel");

const { data: koleksi } = await useFetch("/api/v1/koleksi/dirtakel");
</script>

<template>
  <main>
    <h1>{{ heading }}</h1>
    <section class="flex items-center justify-center flex-wrap gap-3">
      <GenericBaseCard
        v-for="berkas in koleksi.results"
        class="max-w-sm bg-orange-2 min-h-xs"
      >
        <h4>{{ berkas.titles }}</h4>
      </GenericBaseCard>
    </section>
  </main>
</template>

<style scoped>
main {
  --at-apply: text-center py-2;
}

h1 {
  --at-apply: font-600 text-4xl py-5;
}
</style>
