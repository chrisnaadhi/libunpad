<script setup>
import { getLinkResult } from "~/composables/utilsFunction";

const suggestion = ref("");
const search = useSearchFunction();
const scopus = useSearchScopus();
const previewItem = previewModalRepository();
const route = useRoute();
const { getItems } = useDirectusItems();

const repoSearch = ref();
const portPosition = ref(0);
const bottomPort = ref(false);
const loadingWiki = ref(false);
const loadingRepo = ref(false);
const loadingScopus = ref(false);
const loadingFederated = ref(false);

const submitSearch = async (keyword) => {
  if (search.keywords === "") {
    search.initValue = 0;
  }

  loadingWiki.value = true;
  loadingRepo.value = true;
  loadingScopus.value = true;
  loadingFederated.value = true;

  try {
    const { data: searchResults } = await useFetch(
      search.baseURLSearch + keyword
    );

    const { data: getKeywordDefinition } = await useFetch(
      search.baseURLSearch + keyword
    );

    const { data: kandagaRes } = await useFetch(search.baseURLKandaga, {
      query: {
        allfields: keyword,
      },
    });

    const { data: ulimsData } = await useFetch("/api/v1/koleksi/ulims", {
      query: {
        search: keyword,
      },
    });

    search.isResult = true;
    search.wikipediaDefinition = getKeywordDefinition?.value?.query?.search[0];

    if (kandagaRes.value) {
      search.kandagaRes = JSON.parse(kandagaRes.value.data);
    }
    if (ulimsData.value) {
      search.ulimsRes = ulimsData.value.results;
    }
    suggestion.value = searchResults.value.query.searchinfo?.suggestion;
    loadingWiki.value = false;
    loadingFederated.value = false;
  } catch (error) {
    search.isResult = false;
    console.log(error);
  }

  try {
    repoSearch.value = await getItems({
      collection: "tbtMhsUploadThesis",
      params: {
        limit: 8,
        filter: {
          _or: [
            {
              Judul: {
                _contains: keyword,
              },
            },
            {
              Abstrak: {
                _contains: keyword,
              },
            },
            {
              Keywords: {
                _contains: keyword,
              },
            },
          ],
        },
      },
    });
    search.isResult = true;
    loadingRepo.value = false;
  } catch (error) {
    search.isResult = false;
  }

  try {
    const { data: scopusResults } = await useFetch(scopus.baseURLSearch, {
      query: {
        query: search.keywords,
        count: 6,
        apiKey: "bffdfae1414b050c3f0027d3c6253301",
      },
    });

    search.isResult = true;
    scopus.scopusObjects = scopusResults.value;
    loadingScopus.value = false;
  } catch (err) {
    search.isResult = false;
  }
};

const prevPage = () => {
  if (search.initValue > 0) {
    search.initValue -= 10;
    submitSearch(search.keywords + "&sroffset=" + search.initValue);
  } else {
    search.initValue = 0;
    submitSearch(search.keywords + "&sroffset=" + search.initValue);
  }
};

const nextPage = () => {
  search.initValue += 10;
  submitSearch(search.keywords + "&sroffset=" + search.initValue);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const changeKeywords = () => {
  search.keywords = suggestion.value;
  search.initValue = 0;
  submitSearch(search.keywords);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const previewData = (npm) => {
  if (repoSearch.value) {
    const searchData = repoSearch.value.find((elem) => elem?.MhsNPM === npm);
    return searchData;
  }
};

let selectedPreview = previewData(previewItem.numberSelected);

const openModal = (npm) => {
  selectedPreview = previewData(npm);
  previewItem.viewModal();
};

function trimText(txt) {
  const trimmedText = txt.slice(0, 55);
  return trimmedText + "...";
}

onMounted(() => {
  search.keywords = route.query.keyword;
  setTimeout(() => {
    if (search.keywords === undefined) {
      search.keywords = "Universitas Padjadjaran";
    }
    submitSearch(search.keywords);
  }, 500);

  window.addEventListener("scroll", () => {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY >= scrollableHeight) {
      bottomPort.value = true;
    } else {
      bottomPort.value = false;
    }
    portPosition.value = window.scrollY;
  });
});
</script>

<template>
  <main class="text-center container ma my-5 px-4 md:px-0">
    <Head>
      <Title>
        {{ $t("pencarianHeadTitle") }} "{{ search.keywords }}" | GLAM Kandaga
        Unpad
      </Title>
    </Head>
    <LazyClientOnly>
      <Teleport to="#modal">
        <ModalBase
          v-show="previewItem.showModal"
          @close="previewItem.viewModal"
        >
          <div @click.stop="" class="preview-block">
            <div class="flex flex-col items-center">
              <h3>{{ selectedPreview?.MhsNPM }}</h3>
              <p class="font-semibold">{{ selectedPreview?.Judul }}</p>
              <p class="text-sm text-justify">
                {{ selectedPreview?.AbstrakBersih ?? selectedPreview?.Abstrak }}
              </p>
              <p>Keywords: {{ selectedPreview?.Keywords }}</p>
            </div>
            <div class="mt-2">
              <NuxtLink
                :to="'/koleksi/repository/item/' + selectedPreview?.MhsNPM"
                class="btn bg-orange text-white px-2 py-1 text-xs"
              >
                Detail
              </NuxtLink>
            </div>
          </div>
        </ModalBase>
      </Teleport>
    </LazyClientOnly>
    <h1>{{ $t("pencarianTerpaduTitle") }}</h1>
    <section class="search-box">
      <input
        type="search"
        name="search"
        id="searchBox"
        :placeholder="$t('pencarianTerpaduPlaceholder')"
        v-model="search.keywords"
        @keyup.enter="submitSearch(search.keywords)"
        autocomplete="off"
      />
      <button
        type="submit"
        class="btn bg-orange"
        @click="submitSearch(search.keywords)"
      >
        Search
      </button>
    </section>
    <section class="py-2">
      <div v-show="suggestion">
        {{ $t("pencarianTerpaduResultRecommendation") }}
        <span class="suggestion" @click="changeKeywords">{{ suggestion }}</span>
      </div>
      <div v-show="!suggestion">
        {{ $t("pencarianTerpaduSearchResults") }}
        <span class="font-600">{{ search.keywords }}</span>
      </div>
    </section>

    <article>
      <h4 v-show="search.keywords !== ''">
        Apa itu <span class="text-orange">{{ search.keywords }}</span> ?
      </h4>
      <section
        v-if="search.isResult && search.keywords && !loadingWiki"
        class="result-display"
      >
        <NuxtLink
          :to="`https://id.wikipedia.org?curid=${search.wikipediaDefinition?.pageid}`"
          target="_blank"
        >
          <h3 class="hover:text-orange-5">
            {{ search.wikipediaDefinition?.title }}
          </h3>
        </NuxtLink>
        <div>
          <span v-html="search.wikipediaDefinition?.snippet"></span> ...
          <NuxtLink
            :to="`https://id.wikipedia.org?curid=${search.wikipediaDefinition?.pageid}`"
            target="_blank"
          >
            <span class="lengkap">(baca selengkapnya)</span>
          </NuxtLink>
        </div>
      </section>
      <section v-else-if="!search.keywords || search.keywords === ''">
        <h3 class="text-2xl">
          Tidak ada hasil yang bisa ditemukan. Silahkan tuliskan sesuatu pada
          kotak pencarian
        </h3>
      </section>
      <section v-show="loadingWiki === true">
        <p>Mencari data...</p>
      </section>
    </article>

    <article v-show="search.keywords !== ''">
      <h3>Kandaga Federated Search</h3>
      <div
        v-if="loadingFederated === false"
        class="flex flex-col gap-3 mt-3 lg:(grid grid-cols-2)"
      >
        <div v-for="item in search.ulimsRes">
          <GenericBaseCard>
            <div
              class="flex flex-col justify-between bg-white shadow shadow-orange p-5 rounded-lg w-full h-full"
            >
              <div class="grid grid-cols-5 gap-3">
                <div class="py-2 w-full">
                  <p
                    class="bg-orange text-white text-sm rounded mb-2 text-center"
                  >
                    {{ item?.gmd }}
                  </p>
                  <NuxtImg
                    src="/images/lambang-unpad.png"
                    class="w-25 w-full max-h-80 px-8 py-15 border border-orange"
                    format="webp"
                  />
                </div>
                <div class="flex flex-col gap-2 col-span-4 mt-7">
                  <div class="federated-result-column">
                    <p>Judul</p>
                    <p class="col-span-3">: {{ item?.title ?? "Judul" }}</p>
                  </div>
                  <div class="federated-result-column">
                    <p>Pengarang</p>
                    <p class="col-span-3">
                      : {{ item?.author ?? "Pengarang" }}
                    </p>
                  </div>
                  <div class="federated-result-column">
                    <p>Subjek</p>
                    <p class="col-span-3">
                      : {{ item?.topic ?? "Subjek" }}
                    </p>
                  </div>
                  <div class="federated-result-column">
                    <p>Lokasi</p>
                    <p class="col-span-3">
                      : {{ item?.node ?? "Lokasi" }}
                    </p>
                  </div>
                  <div class="federated-result-column">
                    <p>ISBN / ISSN</p>
                    <p class="col-span-3">
                      : {{ item?.isbnIssn ?? "Koleksi" }}
                    </p>
                  </div>
                  <div class="federated-result-column">
                    <p>Nomor Panggil</p>
                    <p class="col-span-3">
                      : {{ item?.callNumber ?? "No. Panggil" }}
                    </p>
                  </div>
                  <pre>{{ item?.id }}</pre>
                </div>
              </div>
              <div class="flex mt-2 text-center">
                <NuxtLink
                  :href="`https://kandaga.unpad.ac.id:8010/index.php?p=show_detail&id=${item?.id}`"
                  target="_blank"
                  class="btn bg-orange py-1 text-white w-full"
                >
                  Lihat Koleksi
                </NuxtLink>
              </div>
            </div>
          </GenericBaseCard>
        </div>
      </div>
      <div v-else>
        <p>Mencari data...</p>
      </div>
    </article>

    <article v-show="search.keywords !== ''">
      <h3>Repository Unpad</h3>
      <section
        class="flex flex-col gap-4 text-left my-5 md:(grid grid-cols-2) lg:(grid-cols-3)"
        v-if="loadingRepo === false"
      >
        <CollectionRepositoryCard
          v-for="koleksi in repoSearch"
          :npm="koleksi.MhsNPM"
          :title="trimText(koleksi.Judul)"
          :tipe="koleksi.tipeKoleksi"
          :description="koleksi.AbstrakBersih ?? koleksi.Abstrak"
          :keywords="koleksi.Keywords"
          :link-access="'/koleksi/repository/item/' + koleksi.MhsNPM"
          @preview="openModal(koleksi.MhsNPM)"
          class="bg-white"
        />
      </section>
      <section v-else-if="loadingRepo === true">
        <p>Mencari data...</p>
      </section>
      <section v-show="repoSearch == false">
        <p class="text-red-6 font-semibold">Tidak ditemukan.</p>
      </section>
    </article>

    <article v-show="search.keywords !== ''">
      <h3>Scopus</h3>
      <section class="grid grid-cols-3 gap-5" v-if="loadingScopus === false">
        <div
          v-if="scopus.scopusObjects"
          v-for="result in scopus.scopusObjects['search-results']['entry']"
          class="max-w-xl"
        >
          <GenericBaseCard
            class="bg-white shadow-orange-2 shadow-lg rounded-lg p-5"
          >
            <h6>{{ result["dc:title"] }}</h6>
            <p>
              <span class="font-semibold">Author:</span>
              {{ result["dc:creator"] }}
            </p>
            <p>
              <span class="font-semibold">Journal:</span>
              {{ result["prism:publicationName"] }}
            </p>
            <p>
              <span class="font-semibold">ISSN:</span>
              {{ result["prism:issn"] }}
            </p>
            <p>
              <span class="font-semibold">Vol:</span>
              {{ result["prism:volume"] }},
              <span class="font-semibold">Issue:</span>
              {{ result["prism:issueIdentifier"] ?? "None" }}
            </p>
            <div class="mt-5">
              <NuxtLink
                :to="`https://www.scopus.com/record/display.uri?eid=${result['eid']}&origin=resultslist`"
                target="_blank"
                class="btn bg-orange text-white py-1 px-4 no-underline"
              >
                Akses
              </NuxtLink>
            </div>
          </GenericBaseCard>
        </div>
        <div v-else>
          <p>Belum ada data.</p>
        </div>
      </section>
      <section v-show="loadingScopus === true">
        <p>Mencari data...</p>
      </section>
    </article>

    <Transition name="fade">
      <div
        class="sticky bottom-0 bg-orange-1 px-5 pb-15 rounded-lg h-full xl:h-20"
        v-show="portPosition >= 200 && bottomPort === false"
      >
        <section class="flex items-center gap-2">
          <input
            type="search"
            name="search"
            id="searchBox"
            :placeholder="$t('pencarianTerpaduPlaceholder')"
            v-model="search.keywords"
            @keyup.enter="submitSearch(search.keywords)"
            autocomplete="off"
          />
          <button
            type="submit"
            class="btn bg-orange"
            @click="submitSearch(search.keywords)"
          >
            Search
          </button>
        </section>
      </div>
    </Transition>
  </main>
</template>

<style scoped>
h1 {
  --at-apply: text-5xl;
}

h3 {
  --at-apply: text-2xl xl:text-4xl;
}

td {
  --at-apply: min-w-25 px-1;
}

article {
  --at-apply: bg-gray-50 pt-5 pb-15 px-10 my-20 rounded-lg shadow-gray-3 shadow-lg;
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

.preview-block {
  --at-apply: max-w-3xl flex flex-col items-center bg-white w-full max-h-80 overflow-y-scroll py-5 px-10 rounded-lg;
}

.result-display {
  --at-apply: flex flex-col;
}

.result-cards {
  --at-apply: relative bg-white my-2 p-5 rounded-xl shadow-lg shadow-orange/20 top-0 hover:(top--2 shadow-orange/50);
  transition: top ease 0.5s;
}

.federated-result-column {
  --at-apply: grid grid-cols-4;
}

.lengkap {
  --at-apply: text-orange-4 hover:underline;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
