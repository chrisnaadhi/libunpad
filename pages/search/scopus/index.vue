<script setup>
const { data: scopusData } = await useFetch(
  "http://api.elsevier.com/content/search/scopus",
  {
    query: {
      query: "Communication Studies",
      count: 10,
      apiKey: "bffdfae1414b050c3f0027d3c6253301",
    },
  }
);
</script>

<template>
  <section class="flex flex-col items-center justify-center">
    <h1>Pencarian Scopus</h1>
    <pre class="text-sm">
      {{ scopusData["search-results"].entry }}
    </pre>
    <div v-for="myData in scopusData['search-results'].entry">
      {{ myData["dc:title"] }}
    </div>
  </section>
</template>
