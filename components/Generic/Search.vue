<script setup>
const articleObj = ref();
const isResult = ref(false);
const searchQuery = ref("");

const removeSearchQuery = () => {
  searchQuery.value = "";
  isResult.value = false;
};

const submitSearch = async () => {
  try {
    const { data: searchRes } = await useFetch(
      `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrnamespace=0&exsentences=1&exintro&explaintext&exlimit=max&prop=extracts&gsrlimit=10&gsrsearch=${searchQuery.value}&format=json&origin=*&gsrsort=just_match`
    );
    isResult.value = true;
    articleObj.value = searchRes.value.query.pages;
  } catch (error) {
    isResult.value = false;
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
          v-model="searchQuery"
          @keyup="submitSearch"
          role="searchbox"
        />
        <div class="absolute top-2 right-2">
          <button type="button" v-show="isResult" @click="removeSearchQuery">
            <div class="i-mdi-window-close bg-orange mr-3 mb--1" />
          </button>
          <button
            type="submit"
            class="btn bg-orange text-white"
            @submit.prevent="submitSearch"
          >
            Search
          </button>
        </div>
        <div class="search-result" v-show="isResult">
          <section class="content-result">
            <div
              v-for="elem in articleObj"
              :key="elem"
              class="result-element"
              target="_blank"
            >
              <NuxtLink
                :to="`https://en.wikipedia.org?curid=${elem.pageid}`"
                target="_blank"
              >
                <h1 class="text-xl">{{ elem.title }}</h1>
              </NuxtLink>
              <p class="text-sm text-gray">
                {{ limitChars(elem.extract) }}...
                <NuxtLink
                  :to="`https://en.wikipedia.org?curid=${elem.pageid}`"
                  target="_blank"
                >
                  <span class="text-xs text-blue-3">(read more)</span>
                </NuxtLink>
              </p>
            </div>
            <div class="bg-orange-1 text-center py-2 cursor-pointer">
              <p>Lihat hasil lebih banyak</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
.input-form {
  --at-apply: min-w-full h-14 pl-10 pr-20 border-1 border-orange rounded-lg focus:(shadow-md outline-none);
}

.search-result {
  --at-apply: absolute w-full z-1;
}

.content-result {
  --at-apply: bg-white text-gray-6 text-left rounded-lg max-h-sm overflow-auto;
}

.result-element {
  --at-apply: px-4 py-2;
}
</style>
