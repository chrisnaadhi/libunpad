<script setup>
const { getItems } = useDirectusItems();
const val = ref("Pencarian Koleksi Museum");

const museumItems = ref();
const searchValue = ref("");
const showSearchResults = ref(false);

const fetchMuseumItems = async () => {
  showSearchResults.value = true;
  if (searchValue.value.length > 1) {
    museumItems.value = await getItems({
      collection: "koleksi_museum",
      params: {
        search: searchValue.value,
      },
    });
  } else {
    museumItems.value = [];
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
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M25 1.9980469C24.8425 1.9980469 24.684062 2.034375 24.539062 2.109375L3.5390625 13.109375C3.2090625 13.289375 3 13.63 3 14L3 16L47 16L47 14C47 13.63 46.790937 13.289375 46.460938 13.109375L25.460938 2.109375C25.315938 2.034375 25.1575 1.9980469 25 1.9980469 z M 5 18L5 19.400391C5 20.650391 5.84 21.669687 7 21.929688L7 38L15 38L15 21.929688C16.16 21.669688 17 20.650391 17 19.400391L17 18L5 18 z M 19 18L19 19.400391C19 20.650391 19.84 21.669687 21 21.929688L21 38L29 38L29 21.929688C30.16 21.669688 31 20.650391 31 19.400391L31 18L19 18 z M 33 18L33 19.400391C33 20.650391 33.84 21.669687 35 21.929688L35 38L43 38L43 21.929688C44.16 21.669688 45 20.650391 45 19.400391L45 18L33 18 z M 4 40C3.56 40 3.0707031 40.159219 2.7207031 40.449219C2.2607031 40.839219 2 41.419297 2 42.029297L2 44.779297C2 46.019297 2.9196094 47 4.0996094 47L45.800781 47C46.960781 47 47.900391 46.050859 47.900391 44.880859L47.900391 42.130859C47.900391 40.960859 46.960781 40.009766 45.800781 40.009766C45.800781 40.009766 4.08 40 4 40 z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          class="input-form"
          name="museum-search"
          id="museum-search"
          :placeholder="val"
          v-model="searchValue"
          @keyup="fetchMuseumItems"
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
        v-show="museumItems?.length !== 0 && showSearchResults"
      >
        <div class="max-h-75 overflow-auto">
          <div v-for="museum in museumItems" class="px-3 py-2">
            <NuxtLink class="no-underline" :to="`/museum/${museum.id}`">
              <h1
                class="text-gray-5 text-xl transition-all-500 hover:text-unpad"
              >
                {{ museum.judul }}
              </h1>
            </NuxtLink>
            <p class="text-xs text-gray">
              {{ trimDescription(museum.keterangan_koleksi, 150) }}
              <span>
                <NuxtLink :to="`/museum/${museum.id}`">Lihat Koleksi</NuxtLink>
              </span>
            </p>
          </div>
          <div
            class="bg-yellow-1 text-center py-2 cursor-not-allowed"
            v-if="museumItems?.length === 0"
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
