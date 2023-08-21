<script setup>
const data = ref("Experiment of Meilisearch");

const meili = searchMeili();
const keyword = ref("Hey World!");
const dataResults = ref();

const getIndex = await meili.client.multiSearch({
  queries: [
    {
      indexUid: "Tesis",
      q: "210120150005",
      limit: 1,
    },
    {
      indexUid: "Disertasi",
      q: "210120150005",
      limit: 1,
    },
    {
      indexUid: "Tugas-Akhir",
      q: "210120150005",
      limit: 1,
    },
  ],
});

const getDocument = await meili.client.index("Tesis").getDocument(210120150005);
</script>

<template>
  <section>
    <input type="text" v-model="meili.meiliKeyword" />
    <button @click="meili.generalSearch(meili.meiliKeyword)">Search</button>
    <p>{{ getIndex }}</p>
  </section>
</template>

<style scoped>
p {
  --at-apply: italic;
}
</style>
