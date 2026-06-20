<script setup>
const suggestion = ref("");
const search = useSearchFunction();
const scopus = useSearchScopus();
const previewItem = previewModalRepository();
const route = useRoute();
const { getItems } = useDirectusItems();
const galleryResult = ref();
const museumResult = ref();

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

  if (import.meta.client) {
    window.scrollTo(0, 0);
  }

  try {
    const wikiResults = await $fetch(search.baseURLSearch + keyword);
    search.isResult = true;
    search.wikipediaDefinition = wikiResults?.query?.search[0];
    suggestion.value = wikiResults?.query?.searchinfo?.suggestion;
    loadingWiki.value = false;
  } catch (error) {
    search.isResult = false;
    loadingWiki.value = false;
    console.log(error);
  }

  try {
    const pustakaData = await $fetch("/api/v1/koleksi/pustaka", {
      query: {
        search: keyword === "Universitas Padjadjaran" ? "" : keyword,
        status: "published",
        access_level: "public",
      },
    });
    if (pustakaData) {
      search.pustakaRes = pustakaData?.data;
    }
    loadingFederated.value = false;
  } catch (error) {
    search.pustakaRes = [];
    loadingFederated.value = false;
    console.log(error);
  }

  try {
    galleryResult.value = await getItems({
      collection: "koleksi_gallery",
      params: {
        search: keyword,
        limit: 12,
      },
    });

    museumResult.value = await getItems({
      collection: "koleksi_museum",
      params: {
        search: keyword,
        limit: 12,
      },
    });
  } catch (error) {
    search.isResult = false;
    console.log(error);
  }

  try {
    repoSearch.value = await getItems({
      collection: "tbtMhsUploadThesis",
      params: {
        limit: 12,
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
    const scopusResults = await $fetch(scopus.baseURLSearch, {
      query: {
        query: search.keywords,
        count: 12,
        apiKey: "bffdfae1414b050c3f0027d3c6253301",
      },
    });
    search.isResult = true;
    scopus.scopusObjects = scopusResults;
    loadingScopus.value = false;
  } catch (err) {
    loadingScopus.value = false;
  }
};

const changeKeywords = () => {
  search.keywords = suggestion.value;
  search.initValue = 0;
  submitSearch(search.keywords);
  if (import.meta.client) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
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
  <main class="min-h-screen bg-gray-50">
    <Head>
      <Title>
        {{ $t("pencarianHeadTitle") }} "{{ search.keywords }}" | GLAM Kandaga
        Unpad
      </Title>
    </Head>

    <!-- Modal -->
    <LazyClientOnly>
      <Teleport to="#modal">
        <ModalBase
          v-show="previewItem.showModal"
          @close="previewItem.viewModal"
        >
          <div @click.stop="" class="preview-block">
            <div class="flex flex-col items-center gap-2 text-center w-full">
              <span
                class="text-xs text-gray-4 font-mono bg-gray-1 px-2 py-0.5 rounded-full"
              >
                {{ selectedPreview?.MhsNPM }}
              </span>
              <p class="font-700 text-gray-8 text-base leading-snug">
                {{ selectedPreview?.Judul }}
              </p>
              <p
                class="text-sm text-gray-6 text-justify leading-relaxed line-clamp-6"
              >
                {{ selectedPreview?.AbstrakBersih ?? selectedPreview?.Abstrak }}
              </p>
              <p class="text-xs text-gray-4">
                <span class="font-600 text-gray-5">Keywords: </span>
                {{ selectedPreview?.Keywords }}
              </p>
            </div>
            <div class="flex gap-2 mt-5 w-full justify-center">
              <button
                @click="previewItem.viewModal"
                class="btn bg-gray-1 text-gray-6 px-5 py-2 text-sm hover:bg-gray-2 transition-colors"
              >
                Tutup
              </button>
              <NuxtLink
                :to="'/koleksi/repository/item/' + selectedPreview?.MhsNPM"
                class="btn bg-unpad text-white px-5 py-2 text-sm hover:opacity-90"
              >
                Lihat Detail
              </NuxtLink>
            </div>
          </div>
        </ModalBase>
      </Teleport>
    </LazyClientOnly>

    <!-- Hero Banner -->
    <div class="bg-gradient-to-br from-unpad to-kandaga">
      <div class="max-w-5xl ma px-4 pt-14 pb-24 text-center">
        <div class="i-mdi-magnify w-16 h-16 text-white/80 ma mb-4" />
        <h1
          class="text-white text-4xl sm:text-5xl font-800 m-0 mb-3 leading-tight"
        >
          {{ $t("pencarianTerpaduTitle") }}
        </h1>
        <p class="text-white/85 text-base sm:text-lg max-w-2xl ma mt-2 mb-0">
          Cari koleksi dari Wikipedia, Pustaka, Galeri, Museum, Repository, dan
          Scopus sekaligus
        </p>
      </div>
    </div>

    <!-- Floating search card -->
    <div class="max-w-3xl ma px-4 -mt-8 relative z-10 mb-8">
      <div class="bg-white rounded-2xl shadow-lg p-5">
        <div class="flex gap-2">
          <div class="relative flex-1">
            <div
              class="absolute left-3.5 top-1/2 -translate-y-1/2 i-mdi-magnify w-5 h-5 text-gray-4 pointer-events-none"
            />
            <input
              type="search"
              name="search"
              id="searchBox"
              :placeholder="$t('pencarianTerpaduPlaceholder')"
              v-model="search.keywords"
              @keyup.enter="submitSearch(search.keywords)"
              autocomplete="off"
              class="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-2 hover:border-gray-3 focus:border-unpad outline-none text-sm bg-gray-50 focus:bg-white transition-all-200"
            />
          </div>
          <button
            type="submit"
            class="btn bg-unpad text-white px-6 py-3 text-sm font-600 hover:opacity-90 transition-opacity shrink-0"
            @click="submitSearch(search.keywords)"
          >
            Cari
          </button>
        </div>
        <p v-show="suggestion" class="text-sm text-gray-5 mt-3 mb-0">
          {{ $t("pencarianTerpaduResultRecommendation") }}
          <span
            class="text-blue-6 font-600 underline cursor-pointer"
            @click="changeKeywords"
            >{{ suggestion }}</span
          >
        </p>
        <p
          v-show="!suggestion && search.keywords"
          class="text-sm text-gray-5 mt-3 mb-0"
        >
          {{ $t("pencarianTerpaduSearchResults") }}
          <span class="font-600 text-gray-8">{{ search.keywords }}</span>
        </p>
      </div>
    </div>

    <!-- Result sections -->
    <div class="max-w-7xl ma px-4 pb-16 flex flex-col gap-6">
      <!-- Wikipedia -->
      <article class="section-card">
        <div class="section-card-header">
          <div class="i-mdi-wikipedia section-icon" />
          <h2>
            Apa itu
            <span class="text-unpad">{{ search.keywords }}</span
            >?
          </h2>
        </div>
        <div class="p-5 sm:p-6">
          <div v-if="loadingWiki" class="empty-state">
            <div class="i-mdi-loading w-8 h-8 text-unpad animate-spin" />
            <p class="text-gray-5 mt-3 text-sm">Mencari data...</p>
          </div>
          <div
            v-else-if="
              search.isResult && search.keywords && search.wikipediaDefinition
            "
            class="flex flex-col gap-3"
          >
            <NuxtLink
              :to="`https://id.wikipedia.org?curid=${search.wikipediaDefinition?.pageid}`"
              target="_blank"
              class="no-underline"
            >
              <h3
                class="text-lg font-700 text-gray-8 hover:text-unpad transition-colors m-0"
              >
                {{ search.wikipediaDefinition?.title }}
              </h3>
            </NuxtLink>
            <p class="text-sm text-gray-6 leading-relaxed m-0 text-left">
              <span v-html="search.wikipediaDefinition?.snippet"></span> ...
              <NuxtLink
                :to="`https://id.wikipedia.org?curid=${search.wikipediaDefinition?.pageid}`"
                target="_blank"
                class="text-unpad hover:underline font-500"
              >
                (baca selengkapnya)
              </NuxtLink>
            </p>
          </div>
          <div
            v-else-if="search.wikipediaDefinition === false"
            class="empty-state"
          >
            <div class="i-mdi-text-search w-12 h-12 text-gray-3" />
            <p class="text-gray-5 font-600 mt-3">
              Kata kunci "<span class="text-red-5">{{ search.keywords }}</span
              >" tidak ditemukan di Wikipedia
            </p>
          </div>
          <div v-else class="empty-state">
            <div class="i-mdi-keyboard-outline w-12 h-12 text-gray-3" />
            <p class="text-gray-5 mt-3">
              Tuliskan sesuatu pada kotak pencarian
            </p>
          </div>
        </div>
      </article>

      <!-- Kandaga Federated Search -->
      <article v-show="search.keywords !== ''" class="section-card">
        <div class="section-card-header">
          <div class="i-mdi-bookshelf section-icon" />
          <h2>Kandaga Federated Search</h2>
        </div>
        <div class="p-5 sm:p-6">
          <div v-if="loadingFederated" class="empty-state">
            <div class="i-mdi-loading w-8 h-8 text-unpad animate-spin" />
            <p class="text-gray-5 mt-3 text-sm">Mencari data...</p>
          </div>
          <div
            v-else-if="search.pustakaRes?.length > 0"
            class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            <div
              v-for="item in search.pustakaRes"
              :key="item.id"
              class="bg-white border border-gray-2 rounded-xl overflow-hidden shadow-sm flex flex-col"
            >
              <div class="flex gap-3 p-4 flex-1">
                <NuxtImg
                  :src="item?.thumbnail ?? '/images/default_cover.png'"
                  class="w-20 h-28 object-cover rounded-lg border border-gray-2 shrink-0"
                  format="webp"
                />
                <div class="flex flex-col gap-1.5 flex-1 min-w-0 text-left">
                  <p
                    class="font-700 text-gray-8 text-sm leading-snug line-clamp-3"
                  >
                    {{
                      item?.title ? trimTitle(item.title, 80) : "Belum ada data"
                    }}
                  </p>
                  <p
                    v-if="item?.creator?.creator_name"
                    class="text-xs text-gray-5"
                  >
                    <span class="font-600">Pengarang:</span>
                    {{ item.creator.creator_name }}
                  </p>
                  <p class="text-xs text-gray-5">
                    <span class="font-600">Kode:</span>
                    {{ item?.collection_code ?? "-" }}
                  </p>
                  <p v-if="item?.items?.length" class="text-xs text-gray-5">
                    <span class="font-600">Lokasi:</span>
                    {{
                      [
                        ...new Set(
                          item.items.map((i) => i.location).filter(Boolean),
                        ),
                      ].join(", ") || "-"
                    }}
                  </p>
                  <p class="text-xs text-gray-5">
                    <span class="font-600">Eksemplar:</span>
                    {{ item?.items?.length ?? 0 }} item
                  </p>
                </div>
              </div>
              <div class="px-4 pb-4">
                <NuxtLink
                  :to="`/koleksi/pustaka/${item?.id}`"
                  class="btn bg-unpad text-white text-sm w-full text-center block hover:opacity-90 transition-opacity"
                >
                  Lihat Koleksi
                </NuxtLink>
              </div>
            </div>
          </div>
          <div v-else class="empty-state">
            <div class="i-mdi-book-outline w-12 h-12 text-gray-3" />
            <p class="text-gray-5 font-600 mt-3">
              Hasil pencarian tidak ditemukan
            </p>
          </div>
        </div>
      </article>

      <!-- Gallery -->
      <article v-show="search.keywords !== ''" class="section-card">
        <div class="section-card-header">
          <div class="i-mdi-image-multiple-outline section-icon" />
          <h2>Hasil Pencarian Galeri</h2>
        </div>
        <div class="p-5 sm:p-6">
          <div
            v-if="galleryResult?.length > 0"
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
          >
            <CollectionGLAMItems
              v-bind="galeri"
              v-for="galeri in galleryResult"
              :key="galeri.id"
              :abbr="true"
              type_collection="gallery"
            />
          </div>
          <div v-else class="empty-state">
            <div class="i-mdi-image-outline w-12 h-12 text-gray-3" />
            <p class="text-gray-5 font-600 mt-3">
              Hasil pencarian tidak ditemukan
            </p>
          </div>
        </div>
      </article>

      <!-- Museum -->
      <article v-show="search.keywords !== ''" class="section-card">
        <div class="section-card-header">
          <div class="i-mdi-bank-outline section-icon" />
          <h2>Hasil Pencarian Museum</h2>
        </div>
        <div class="p-5 sm:p-6">
          <div
            v-if="museumResult?.length > 0"
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
          >
            <CollectionGLAMItems
              v-bind="museum"
              v-for="museum in museumResult"
              :key="museum.id"
              :abbr="true"
              type_collection="museum"
            />
          </div>
          <div v-else class="empty-state">
            <div class="i-mdi-bank-outline w-12 h-12 text-gray-3" />
            <p class="text-gray-5 font-600 mt-3">
              Hasil pencarian tidak ditemukan
            </p>
          </div>
        </div>
      </article>

      <!-- Repository -->
      <article v-show="search.keywords !== ''" class="section-card">
        <div class="section-card-header">
          <div class="i-mdi-book-open-page-variant section-icon" />
          <h2>Repository Unpad</h2>
        </div>
        <div class="p-5 sm:p-6">
          <div v-if="loadingRepo" class="empty-state">
            <div class="i-mdi-loading w-8 h-8 text-unpad animate-spin" />
            <p class="text-gray-5 mt-3 text-sm">Mencari data...</p>
          </div>
          <div
            v-else-if="repoSearch?.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <CollectionRepositoryCard
              v-for="koleksi in repoSearch"
              :key="koleksi.MhsNPM"
              :npm="koleksi.MhsNPM"
              :title="trimText(koleksi.Judul)"
              :tipe="koleksi.tipeKoleksi"
              :description="koleksi.AbstrakBersih ?? koleksi.Abstrak"
              :keywords="koleksi.Keywords"
              :link-access="'/koleksi/repository/item/' + koleksi.MhsNPM"
              @preview="openModal(koleksi.MhsNPM)"
            />
          </div>
          <div v-else class="empty-state">
            <div class="i-mdi-text-search w-12 h-12 text-gray-3" />
            <p class="text-gray-5 font-600 mt-3">
              Hasil pencarian tidak ditemukan
            </p>
          </div>
        </div>
      </article>

      <!-- Scopus -->
      <article v-show="search.keywords !== ''" class="section-card">
        <div class="section-card-header">
          <div class="i-mdi-database-search section-icon" />
          <h2>Scopus</h2>
        </div>
        <div class="p-5 sm:p-6">
          <div v-if="loadingScopus" class="empty-state">
            <div class="i-mdi-loading w-8 h-8 text-unpad animate-spin" />
            <p class="text-gray-5 mt-3 text-sm">Mencari data...</p>
          </div>
          <div
            v-else-if="scopus.scopusObjects"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div
              v-for="result in scopus.scopusObjects['search-results']['entry']"
              :key="result['eid']"
              class="bg-white border border-gray-2 rounded-xl p-5 flex flex-col gap-2 shadow-sm"
            >
              <p class="font-700 text-gray-8 text-sm leading-snug line-clamp-3">
                {{ result["dc:title"] }}
              </p>
              <div class="flex flex-col gap-1 text-xs text-gray-6 text-left">
                <p>
                  <span class="font-600 text-gray-7">Author:</span>
                  {{ result["dc:creator"] }}
                </p>
                <p>
                  <span class="font-600 text-gray-7">Journal:</span>
                  {{ result["prism:publicationName"] }}
                </p>
                <p>
                  <span class="font-600 text-gray-7">ISSN:</span>
                  {{ result["prism:issn"] }}
                </p>
                <p>
                  <span class="font-600 text-gray-7">Vol:</span>
                  {{ result["prism:volume"] }},
                  <span class="font-600 text-gray-7">Issue:</span>
                  {{ result["prism:issueIdentifier"] ?? "None" }}
                </p>
              </div>
              <div class="mt-auto pt-2">
                <NuxtLink
                  :to="`https://www.scopus.com/record/display.uri?eid=${result['eid']}&origin=resultslist`"
                  target="_blank"
                  class="btn bg-unpad text-white text-xs py-1.5 px-4 hover:opacity-90 transition-opacity"
                >
                  Akses
                </NuxtLink>
              </div>
            </div>
          </div>
          <div v-else class="empty-state">
            <div class="i-mdi-database-outline w-12 h-12 text-gray-3" />
            <p class="text-gray-5 font-600 mt-3">Belum ada data Scopus</p>
          </div>
        </div>
      </article>
    </div>

    <!-- Sticky bottom search bar -->
    <Transition name="fade">
      <div
        v-show="portPosition >= 200 && bottomPort === false"
        class="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-gray-2 shadow-lg py-3 px-4 z-20"
      >
        <div class="max-w-3xl ma flex items-center gap-2">
          <div class="relative flex-1">
            <div
              class="absolute left-3.5 top-1/2 -translate-y-1/2 i-mdi-magnify w-4 h-4 text-gray-4 pointer-events-none"
            />
            <input
              type="search"
              name="search"
              :placeholder="$t('pencarianTerpaduPlaceholder')"
              v-model="search.keywords"
              @keyup.enter="submitSearch(search.keywords)"
              autocomplete="off"
              class="w-full pl-10 pr-3 py-2.5 rounded-xl border-2 border-gray-2 focus:border-unpad outline-none text-sm bg-gray-50 focus:bg-white transition-all-200"
            />
          </div>
          <button
            type="submit"
            class="btn bg-unpad text-white px-5 py-2.5 text-sm font-600 hover:opacity-90 transition-opacity shrink-0"
            @click="submitSearch(search.keywords)"
          >
            Cari
          </button>
        </div>
      </div>
    </Transition>
  </main>
</template>

<style scoped>
.section-card {
  --at-apply: bg-white rounded-2xl shadow-sm border border-gray-2
    overflow-hidden;
}

/* prettier-ignore */
.section-card-header {
  --at-apply: flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-gray-1 bg-gray-50;
}

.section-card-header h2 {
  --at-apply: text-base font-700 text-gray-8 m-0;
}

.section-icon {
  --at-apply: w-5 h-5 text-unpad shrink-0;
}

.empty-state {
  --at-apply: flex flex-col items-center py-10 px-6 text-center;
}

.preview-block {
  --at-apply: max-w-2xl flex flex-col items-center bg-white w-full max-h-[85vh]
    overflow-y-auto py-6 px-6 rounded-2xl;
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
