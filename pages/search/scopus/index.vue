<script setup>
const searchScopus = useSearchScopus();

const submitSearchScopus = async (terms) => {
  try {
    const { data: scopusResults } = await useFetch(
      "http://api.elsevier.com/content/search/scopus",
      {
        query: {
          query: terms,
          count: 5,
          apiKey: "bffdfae1414b050c3f0027d3c6253301",
        },
      }
    );
    searchScopus.scopusObjects = scopusResults.value;
  } catch (err) {
    console.log(err);
  }
};

const infToSubset = (text) => {
  return text.replaceAll("inf", "sub");
};
</script>

<template>
  <section class="flex flex-col items-center justify-center">
    <h1 class="text-5xl">Pencarian Scopus</h1>
    <div>
      <input
        type="search"
        name="pencarian"
        id="pencarian"
        v-model="searchScopus.keywords"
        @keyup.enter="submitSearchScopus(searchScopus.keywords)"
      />
    </div>
    <pre class="text-sm">
      {{ searchScopus.scopusObjects["search-results"] }}
    </pre>
    <!-- <div v-for="myData in searchScopus.scopusObjects">
      <h1 v-html="infToSubset(myData['dc:title'])"></h1>
      <p>{{ myData["dc:title"] }}</p>
    </div> -->
  </section>
</template>

<style scoped>
input[type="search"] {
  --at-apply: min-w-5xl border border-orange rounded p-2 my-5 focus:(shadow-md outline-none);
}
</style>
