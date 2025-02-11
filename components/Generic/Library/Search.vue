<script setup>
const { getItems } = useDirectusItems();
const val = ref("Pencarian Koleksi Library");

const libraryItems = ref();
const searchValue = ref("");
const showSearchResults = ref(false);

const fetchLibraryItems = async () => {
  showSearchResults.value = true;
  if (searchValue.value.length > 1) {
    const getData = await $fetch("/api/v1/koleksi/ulims", {
      params: {
        search: searchValue.value,
      },
    });
    libraryItems.value = getData.results;
  } else {
    libraryItems.value = [];
  }

  console.log(libraryItems.value);
};

const doSearch = async () => {
  await navigateTo("/search?keyword=" + searchValue.value);
};

watch(searchValue, async (newValue, oldValue) => {
  if (newValue?.length > 0) {
    showSearchResults.value = true;
  } else if (newValue?.length === 0 || newValue === "") {
    showSearchResults.value = false;
  }
});
</script>

<template>
  <form class="w-full relative flex" @submit.prevent="doSearch" role="search">
    <div class="flex flex-col items-center justify-center mt-2 w-full">
      <div class="relative w-full flex items-center justify-center mb-3">
        <div class="absolute top-4 left-3 z-3">
          <svg
            aria-hidden="true"
            class="w-6 h-6 text-unpad dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5,12h9V0H4C2.9,0,2,0.9,2,2v12c0,1.1,0.9,2,2,2h10v-2H5c-0.6,0-1-0.4-1-1S4.4,12,5,12z M5,2h7v2H5V2z"
            />
          </svg>
        </div>
        <input
          type="search"
          class="input-form"
          name="library-search"
          id="library-search"
          :placeholder="val"
          v-model="searchValue"
          @keyup="fetchLibraryItems"
        />
        <div class="absolute top-2 right-2 z-3">
          <button type="submit" class="btn bg-unpad text-white w-20">
            {{ $t("search") }}
          </button>
        </div>
      </div>
      <div
        class="bg-white rounded-xl mt--3 w-full"
        v-show="libraryItems?.length !== 0 && showSearchResults"
      >
        <div class="max-h-75 overflow-auto">
          <div v-for="library in libraryItems" class="px-3 py-2">
            <NuxtLink
              class="no-underline"
              :to="`https://kandaga.unpad.ac.id:8010/index.php?p=show_detail&id=${library.biblioId}`"
              target="_blank"
            >
              <h1
                class="text-gray-5 text-xl transition-all-500 hover:text-unpad"
              >
                {{ library.title }}
              </h1>
            </NuxtLink>
            <p class="text-xs text-gray">
              {{ library.author }}
              <span>
                <NuxtLink
                  :to="`https://kandaga.unpad.ac.id:8010/index.php?p=show_detail&id=${library.biblioId}`"
                  target="_blank"
                  >Lihat Koleksi</NuxtLink
                >
              </span>
            </p>
          </div>
          <div
            class="bg-yellow-1 text-center py-2 cursor-not-allowed"
            v-if="libraryItems?.length === 0"
          >
            <p>{{ $t("noSearchResults") }}</p>
          </div>
          <div
            class="bg-yellow-1 text-center py-2 cursor-pointer rounded-b-xl"
            v-else
          >
            <NuxtLink :to="'/search?keyword=' + searchValue" target="_blank">
              {{ $t("moreSearchResults") }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
.input-form {
  --at-apply: min-w-full h-14 px-10 py-3 md:pr-23 border-3 border-unpad rounded-lg z-2 focus:(shadow-md outline-none);
}

.search-result {
  --at-apply: absolute w-full pt-90 z-1;
}

.content-result {
  --at-apply: bg-white text-gray-6 text-left rounded-lg max-h-75 overflow-auto transition-all-500;
}

.result-element {
  --at-apply: px-4 py-2;
}
</style>
