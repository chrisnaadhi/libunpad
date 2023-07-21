<script setup>
const suggestion = ref("");
const search = useSearchFunction();
const scopus = useSearchScopus();
const route = useRoute();
const { getItems } = useDirectusItems();

const repoSearch = ref();
const portPosition = ref(0);

const submitSearch = async (keyword) => {
  if (search.keywords === "") {
    search.initValue = 0;
  }
  try {
    const { data: searchResults } = await useFetch(
      search.baseURLSearch + keyword
    );
    const { data: scopusResults } = await useFetch(scopus.baseURLSearch, {
      query: {
        query: search.keywords,
        count: 6,
        apiKey: "bffdfae1414b050c3f0027d3c6253301",
      },
    });
    repoSearch.value = await getItems({
      collection: "tbtMhsUploadThesis",
      params: {
        limit: 6,
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
    search.articleObj = searchResults.value.query.search;
    suggestion.value = searchResults.value.query.searchinfo?.suggestion;
    scopus.scopusObjects = scopusResults.value;
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
    <h2 v-show="search.keywords !== ''">Wikipedia</h2>
    <section v-if="search.isResult && search.keywords" class="result-display">
      <div v-for="article in search.articleObj" class="result-cards">
        <NuxtLink
          :to="`https://id.wikipedia.org?curid=${article.pageid}`"
          target="_blank"
        >
          <h3 class="hover:text-orange-5">{{ article.title }}</h3>
        </NuxtLink>

        <p class="text-sm">
          <span v-html="article.snippet"></span>...
          <NuxtLink
            :to="`https://id.wikipedia.org?curid=${article.pageid}`"
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
    <section v-else-if="!search.keywords || search.keywords === ''">
      <h3 class="text-2xl">
        Tidak ada hasil yang bisa ditemukan. Silahkan tuliskan sesuatu pada
        kotak pencarian
      </h3>
    </section>
    <section class="flex justify-center gap-4 my-5" v-show="search.keywords">
      <button
        @click="prevPage"
        class="btn"
        :disabled="search.initValue < 1"
        :class="
          search.initValue < 1
            ? 'bg-gray-1 text-gray-5 cursor-not-allowed'
            : 'bg-green-2'
        "
      >
        Previous Page
      </button>
      <button @click="nextPage" class="btn bg-blue-2">Next Page</button>
    </section>
    <h2 v-show="search.keywords !== ''">Repository Unpad</h2>
    <section
      class="grid grid-cols-3 gap-4 text-left my-5"
      v-if="search.keywords !== ''"
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
      />
    </section>

    <h2 v-show="search.keywords !== ''">Scopus</h2>
    <section class="grid grid-cols-3 gap-15" v-show="search.keywords !== ''">
      <div
        v-if="scopus.scopusObjects"
        v-for="result in scopus.scopusObjects['search-results']['entry']"
        class="max-w-sm"
      >
        <GenericBaseCard class="bg-white shadow-gray shadow-lg rounded-lg p-5">
          <h6>{{ result["dc:title"] }}</h6>
          <p>{{ result["dc:creator"] }}</p>
          <p>Journal: {{ result["prism:publicationName"] }}</p>
          <p>ISSN: {{ result["prism:issn"] }}</p>
          <p>
            Vol: {{ result["prism:volume"] }}, Issue:
            {{ result["prism:issueIdentifier"] }}
          </p>
          <NuxtLink
            :to="`https://www.scopus.com/record/display.uri?eid=${result['eid']}&origin=resultslist`"
            target="_blank"
          >
            Akses
          </NuxtLink>
        </GenericBaseCard>
      </div>
      <div v-else>
        <p>Belum ada data.</p>
      </div>
    </section>

    <div
      class="sticky bottom-0 h-20 bg-orange-1 px-5 mt-10 rounded-lg"
      :class="portPosition <= 200 || portPosition >= 1500 ? 'hidden' : 'block'"
    >
      <section class="flex items-center gap-4">
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
  </main>
</template>

<style scoped>
h1 {
  --at-apply: text-5xl;
}

h3 {
  --at-apply: text-2xl xl:text-3xl;
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
  --at-apply: relative bg-white my-2 p-5 rounded-xl shadow-lg shadow-orange/20 top-0 hover:(top--2 shadow-orange/50);
  transition: top ease 0.5s;
}

.lengkap {
  --at-apply: text-orange-4 hover:underline;
}
</style>
