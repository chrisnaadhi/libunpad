<script setup>
const word = ref("Search");
const suggestion = ref("");
const search = useSearchFunction();
const route = useRoute();

search.keywords = route.query.keyword;

const submitSearch = async () => {
  try {
    const { data: searchResults } = await useFetch(
      search.baseURLSearch + search.keywords
    );
    search.isResult = true;
    search.articleObj = searchResults.value.query.search;
    suggestion.value = searchResults.value.query.searchinfo?.suggestion;
  } catch (err) {
    search.isResult = false;
  }
};
const changeKeywords = () => {
  search.keywords = suggestion.value;
  submitSearch();
};
</script>

<template>
  <main class="text-center container ma my-5 px-4 md:px-0">
    <h1>Hello {{ word }} here!</h1>
    <section class="search-box">
      <input
        type="search"
        name="search"
        id="searchBox"
        placeholder="Hello There!"
        v-model="search.keywords"
        @keyup="submitSearch"
      />
      <button type="submit" class="btn bg-orange">Search</button>
    </section>
    <section class="py-2">
      <div v-show="suggestion">
        Mungkin maksud anda:
        <span class="suggestion" @click="changeKeywords">{{ suggestion }}</span>
      </div>
      <div v-show="!suggestion">
        Hasil Pencarian:
        <span class="font-600">{{ search.keywords }}</span>
      </div>
    </section>
    <section v-if="search.isResult" class="result-display">
      <div v-for="article in search.articleObj" class="result-cards">
        <NuxtLink
          :to="`https://en.wikipedia.org?curid=${article.pageid}`"
          target="_blank"
        >
          <h1 class="hover:text-orange-5">{{ article.title }}</h1>
        </NuxtLink>

        <p class="text-sm">
          <span v-html="article.snippet"></span>...
          <NuxtLink
            :to="`https://en.wikipedia.org?curid=${article.pageid}`"
            target="_blank"
          >
            <span class="lengkap">(baca selengkapnya)</span>
          </NuxtLink>
        </p>
        <div v-if="search.articleObj.length < 1">
          <p>Silahkan coba lagi...</p>
        </div>
      </div>
    </section>
    <section v-else>
      <h3 class="text-2xl">
        Tidak ada hasil yang bisa ditemukan. Silahkan tuliskan sesuatu pada
        kotak pencarian
      </h3>
    </section>
  </main>
</template>

<style scoped>
h1 {
  --at-apply: text-4xl;
}

.search-box {
  --at-apply: flex justify-center items-center gap-1 max-w-4xl ma;
}

input {
  --at-apply: border-1 border-orange rounded p-2 my-5 w-full;
}

.suggestion {
  --at-apply: text-blue-7 font-600 underline cursor-pointer;
}

.result-display {
  --at-apply: grid gap-5 md:grid-cols-2 lg:grid-cols-4;
}

.result-cards {
  --at-apply: bg-white my-2 p-5 rounded-xl shadow-lg shadow-orange/30;
}

.lengkap {
  --at-apply: text-orange-4 hover:underline;
}
</style>
