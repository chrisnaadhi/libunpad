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

  window.scrollTo(0, 0);

  try {
    const { data: searchResults } = await useFetch(
      search.baseURLSearch + keyword
    );

    const { data: getKeywordDefinition } = await useFetch(
      search.baseURLSearch + keyword
    );

    const { data: ulimsData } = await useFetch("/api/v1/koleksi/ulims", {
      query: {
        search: keyword === "Universitas Padjadjaran" ? "" : keyword,
      },
    });

    search.isResult = true;
    search.wikipediaDefinition = getKeywordDefinition?.value?.query?.search[0];

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
    galleryResult.value = await getItems({
      collection: "koleksi_gallery",
      params: {
        search: keyword,
        limit: 3,
      },
    });

    museumResult.value = await getItems({
      collection: "koleksi_museum",
      params: {
        search: keyword,
        limit: 3,
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
      <h4 v-show="search.keywords !== '' && search.wikipediaDefinition">
        Apa itu <span class="text-orange">{{ search.keywords }}</span> ?
      </h4>
      <h4 v-show="search.wikipediaDefinition === false">
        Kata Kunci
        <span class="underline text-red-5">{{ search.keywords }}</span> tidak
        dapat ditemukan!
      </h4>
      <section
        v-if="
          search.isResult &&
          search.keywords &&
          !loadingWiki &&
          search.wikipediaDefinition
        "
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
        v-if="loadingFederated === false && search.ulimsRes?.length > 0"
        class="flex flex-col gap-3 mt-3 lg:(grid grid-cols-3)"
      >
        <div v-for="item in search.ulimsRes">
          <GenericBaseCard>
            <div
              class="flex flex-col justify-between bg-white shadow shadow-orange p-5 rounded-lg w-full h-full"
            >
              <div class="flex gap-3">
                <div class="py-2 w-full max-w-40">
                  <p
                    class="bg-orange text-white text-sm rounded mb-2 text-center"
                  >
                    {{ item?.gmd }}
                  </p>
                  <NuxtImg
                    :src="
                      item?.image
                        ? `https://kandaga.unpad.ac.id:8011/lib/minigalnano/createthumb.php?filename=images/docs/${item?.image}`
                        : '/images/default_cover.png'
                    "
                    class="w-full h-60 border border-orange object-scale-down px-4"
                    format="webp"
                  >
                    <p v-show="item?.image === null" class="text-center">
                      No Image
                    </p>
                  </NuxtImg>
                </div>
                <div class="flex flex-col gap-2 mt-2 w-full">
                  <div class="box-content">
                    <p class="box-column">Judul :</p>
                    <p class="pl-2 pt-1">
                      {{
                        item?.title !== null
                          ? trimTitle(item?.title, 50)
                          : "Belum ada data"
                      }}
                    </p>
                  </div>
                  <div class="box-content">
                    <p class="box-column">Pengarang :</p>
                    <p class="pl-2 pt-1">
                      {{ trimTitle(item?.author, 50) ?? "Pengarang" }}
                    </p>
                  </div>
                  <div class="box-content">
                    <p class="box-column">Lokasi :</p>
                    <p class="pl-2 pt-1">
                      {{ item?.node ?? "-" }}
                    </p>
                  </div>
                  <div class="box-content">
                    <p class="box-column">Nomor Panggil :</p>
                    <p class="pl-2 pt-1">
                      {{ item?.callNumber ?? "No. Panggil" }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex mt-2 text-center">
                <NuxtLink
                  :href="`https://kandaga.unpad.ac.id:8011/index.php?p=show_detail&id=${item?.biblioId}`"
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
      <div v-else-if="search.ulimsRes?.length === 0">
        <h4 class="text-red text-center">Tidak ditemukan</h4>
      </div>
      <div v-else-if="loadingFederated === true">
        <p>Mencari data...</p>
      </div>
      <div v-else>
        <p class="text-red-6 font-semibold">Hasil pencarian tidak ditemukan</p>
      </div>
    </article>

    <article v-show="search.keywords !== ''">
      <h3>Hasil pencarian Galeri</h3>
      <div
        v-if="galleryResult?.length > 0"
        class="flex flex-col mt-10 md:(grid grid-cols-3 gap-10)"
      >
        <CollectionGLAMItems
          v-bind="galeri"
          v-for="galeri in galleryResult"
          :abbr="true"
          type_collection="gallery"
        />
      </div>
      <div v-else>
        <p class="text-red-6 font-semibold">Hasil pencarian tidak ditemukan</p>
      </div>
    </article>

    <article v-show="search.keywords !== ''">
      <h3>Hasil pencarian Museum</h3>
      <div
        v-if="museumResult?.length > 0"
        class="flex flex-col mt-10 md:(grid grid-cols-3 gap-10)"
      >
        <CollectionGLAMItems
          v-bind="museum"
          v-for="museum in museumResult"
          :abbr="true"
          type_collection="museum"
        />
      </div>
      <div v-else>
        <p class="text-red-6 font-semibold">Hasil pencarian tidak ditemukan</p>
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
        <p class="text-red-6 font-semibold">Hasil pencarian tidak ditemukan</p>
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
            <div class="pt-8">
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

.box-column {
  --at-apply: bg-orange-1 text-orange pl-3 py-0 font-semibold rounded-full;
}

.box-content {
  --at-apply: bg-gray-1 rounded-tr-xl rounded-tl-xl rounded-br-md rounded-bl-md text-left pb-2;
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
