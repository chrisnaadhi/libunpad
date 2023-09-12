<script setup>
const data = ref("Experiment of Meilisearch");

const meili = searchMeili();
const keyword = ref("Hey World!");
const dataResults = ref();

const searchIndex = async () => {
  dataResults.value = await meili.tesis.search(keyword.value);
};
</script>

<template>
  <section>
    <p>{{ keyword }}</p>
    <input type="text" v-model="keyword" @keyup="searchIndex" />
    <button @click="searchIndex">Search</button>
    <pre>{{ dataResults }}</pre>
  </section>
</template>

<style scoped>
p {
  --at-apply: italic;
}
</style>
