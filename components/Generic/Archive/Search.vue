<script setup>
const { getItems } = useDirectusItems();
const val = ref("Pencarian Koleksi Archive");

const archiveItems = ref();
const searchValue = ref("");
const showSearchResults = ref(false);

const fetchArchiveItems = async () => {
  showSearchResults.value = true;
  if (searchValue.value.length > 1) {
    archiveItems.value = await getItems({
      collection: "koleksi_archive",
      params: {
        search: searchValue.value,
      },
    });
  } else {
    archiveItems.value = [];
  }
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
            enable-background="new 0 0 52 52"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 2H16V5H0V2Z" fill="none" />
            <path d="M5 7H1V15H15V7H11V9H5V7Z" fill="none" />
          </svg>
        </div>
        <input
          type="search"
          class="input-form"
          name="archive-search"
          id="archive-search"
          :placeholder="val"
          v-model="searchValue"
          @keyup="fetchArchiveItems"
        />
        <div class="absolute top-2 right-2 z-3">
          <button type="submit" class="btn bg-unpad text-white w-20">
            {{ $t("search") }}
          </button>
        </div>
      </div>
      <div
        class="bg-white rounded-xl mt--3 w-full"
        v-show="archiveItems?.length !== 0 && showSearchResults"
      >
        <div class="max-h-75 overflow-auto">
          <div v-for="archive in archiveItems" class="px-3 py-2">
            <NuxtLink class="no-underline" :to="`/records/${archive.id}`">
              <h1
                class="text-gray-5 text-xl transition-all-500 hover:text-unpad"
              >
                {{ archive.judul }}
              </h1>
            </NuxtLink>
            <p class="text-xs text-gray">
              {{ trimDescription(archive.keterangan_koleksi, 150) }}
              <span>
                <NuxtLink :to="`/records/${archive.id}`"
                  >Lihat Koleksi</NuxtLink
                >
              </span>
            </p>
          </div>
          <div
            class="bg-yellow-1 text-center py-2 cursor-not-allowed"
            v-if="galleryItems?.length === 0"
          >
            <p>{{ $t("noSearchResults") }}</p>
          </div>
          <div
            class="bg-yellow-1 text-center py-2 cursor-pointer rounded-b-xl"
            v-else
          >
            <NuxtLink :to="'/search?keyword=' + searchValue">
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
  --at-apply: bg-white text-gray-6 text-left border-1 border-yellow-3 rounded-lg max-h-75 overflow-auto transition-all-500;
}

.result-element {
  --at-apply: px-4 py-2;
}
</style>
