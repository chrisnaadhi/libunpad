<script setup>
const { getItems } = useDirectusItems();
const val = ref("Pencarian Koleksi Gallery");

const galleryItems = ref();
const searchValue = ref("");
const showSearchResults = ref(false);

const fetchGalleryItems = async () => {
  showSearchResults.value = true;
  if (searchValue.value.length > 1) {
    galleryItems.value = await getItems({
      collection: "koleksi_gallery",
      params: {
        search: searchValue.value,
      },
    });
  } else {
    galleryItems.value = [];
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
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 22H2V2h6zm-5-1h4V3H3zm19-10H10V2h12zm-11-1h10V3H11zm4 12h-5v-9h5zm-4-1h3v-7h-3zm11 1h-5v-9h5zm-4-1h3v-7h-3z"
            />
          </svg>
        </div>
        <input
          type="search"
          class="input-form"
          name="gallery-search"
          id="gallery-search"
          :placeholder="val"
          v-model="searchValue"
          @keyup="fetchGalleryItems"
        />
        <div class="absolute top-2 right-2 z-3">
          <button
            type="submit"
            class="btn bg-unpad text-white w-20"
            @click.prevent="doSearch"
          >
            {{ $t("search") }}
          </button>
        </div>
      </div>
      <div
        class="bg-white rounded-xl mt--3 w-full"
        v-show="galleryItems?.length !== 0 && showSearchResults"
      >
        <div class="max-h-75 overflow-auto">
          <div v-for="galeri in galleryItems" class="px-3 py-2">
            <NuxtLink class="no-underline" :to="`/gallery/${galeri.id}`">
              <h1
                class="text-gray-5 text-xl transition-all-500 hover:text-unpad"
              >
                {{ galeri.judul }}
              </h1>
            </NuxtLink>
            <p class="text-xs text-gray">
              {{ trimDescription(galeri.keterangan_koleksi, 150) }}
              <span>
                <NuxtLink :to="`/gallery/${galeri.id}`">Lihat Koleksi</NuxtLink>
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
