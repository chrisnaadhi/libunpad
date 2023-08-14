<script setup>
const searchScopus = useSearchScopus();

const submitSearchScopus = async (terms) => {
  try {
    const { data: scopusResults } = await useFetch(
      "https://api.elsevier.com/content/search/scopus",
      {
        query: {
          query: terms,
          count: 6,
          apiKey: "bffdfae1414b050c3f0027d3c6253301",
        },
      }
    );
    searchScopus.scopusObjects = scopusResults.value;
  } catch (err) {
    console.log(err);
  }
};

// const infToSubset = (text) => {
//   return text.replaceAll("inf", "sub");
// };
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
    <div class="grid grid-cols-3 gap-2">
      <div
        v-if="searchScopus.scopusObjects"
        v-for="result in searchScopus.scopusObjects['search-results']['entry']"
        class="text-xs max-w-sm"
      >
        <GenericBaseCard class="bg-gray-2 p-5">
          <h5>{{ result["dc:title"] }}</h5>
          <p>{{ result["dc:creator"] }}</p>
          <p>Journal: {{ result["prism:publicationName"] }}</p>
          <p>ISSN: {{ result["prism:issn"] }}</p>
          <p>
            Vol: {{ result["prism:volume"] }}, Issue:
            {{ result["prism:issueIdentifier"] }}
          </p>
          <NuxtLink
            :to="`https://www.scopus.com/record/display.uri?eid=${result['eid']}&origin=resultslist`"
            target="_blank"
          >
            Akses
          </NuxtLink>
        </GenericBaseCard>
      </div>
      <div v-else>
        <p>Belum ada data.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
input[type="search"] {
  --at-apply: min-w-5xl border border-orange rounded p-2 my-5 focus:(shadow-md outline-none);
}
</style>
