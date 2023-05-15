<script setup>
const search = useSearchFunction();

const removeSearchQuery = () => {
  search.keywords = "";
  search.isResult = false;
};

const submitSearch = async () => {
  try {
    const { data: searchRes } = await useFetch(
      search.baseURLSearch + search.keywords
    );
    search.isResult = true;
    search.articleObj = searchRes.value.query.search;
  } catch (error) {
    search.isResult = false;
  }
};

const limitChars = (str) => {
  return str.slice(0, 125);
};
</script>

<template>
  <form @submit.prevent="submitSearch" class="w-full relative" role="search">
    <div class="flex mb-5 mt-2 mx-2 xl:(ml-0 mr-25)">
      <div class="relative w-full">
        <div class="absolute top-4 left-3">
          <svg
            aria-hidden="true"
            class="w-6 h-6 text-orange dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          class="input-form"
          v-model="search.keywords"
          @keyup="submitSearch"
          role="searchbox"
          :placeholder="$t('searchOurCollection')"
        />
        <div class="absolute top-2 right-2">
          <button
            type="button"
            v-show="search.isResult"
            @click="removeSearchQuery"
          >
            <div class="i-mdi-window-close bg-orange mr-3 mb--1" />
          </button>
          <button
            type="submit"
            class="btn bg-orange text-white"
            @submit.prevent="submitSearch"
          >
            {{ $t("search") }}
          </button>
        </div>
        <div class="search-result" v-show="search.isResult">
          <section class="content-result">
            <div
              v-for="elem in search.articleObj"
              :key="elem"
              class="result-element"
              target="_blank"
            >
              <NuxtLink
                :to="`https://en.wikipedia.org?curid=${elem.pageid}`"
                target="_blank"
              >
                <h1 class="text-xl hover:text-orange">{{ elem.title }}</h1>
              </NuxtLink>
              <p class="text-sm text-gray">
                <span v-html="limitChars(elem.snippet)"></span>...
                <NuxtLink
                  :to="`https://en.wikipedia.org?curid=${elem.pageid}`"
                  target="_blank"
                >
                  <span class="text-xs text-blue-3 hover:text-blue-6">
                    (read more)
                  </span>
                </NuxtLink>
              </p>
            </div>
            <div
              class="bg-orange-1 text-center py-2 cursor-not-allowed"
              v-if="search.articleObj?.length === 0"
            >
              <p>{{ $t("noSearchResults") }}</p>
            </div>
            <div class="bg-orange-1 text-center py-2 cursor-pointer" v-else>
              <NuxtLink :to="'/search?keyword=' + search.keywords">
                {{ $t("moreSearchResults") }}
              </NuxtLink>
            </div>
          </section>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
.input-form {
  --at-apply: min-w-full h-14 pl-10 pr-20 md:pr-30 border-1 border-orange rounded-lg focus:(shadow-md outline-none);
}

.search-result {
  --at-apply: absolute w-full z-1;
}

.content-result {
  --at-apply: bg-white text-gray-6 text-left rounded-lg max-h-75 overflow-auto transition-all-500;
}

.result-element {
  --at-apply: px-4 py-2;
}
</style>
