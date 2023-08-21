import { defineStore } from "pinia";
import { MeiliSearch } from "meilisearch";

export const useSearchFunction = defineStore("searchfunction", () => {
  const keywords = ref("");
  const articleObj = ref();
  const isResult = ref(false);
  const initValue = ref(0);
  const baseURLSearch = ref(
    "https://id.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&list=search&utf8=1&formatversion=2&exsentences=1&exlimit=20&exintro=1&explaintext=1&exsectionformat=raw&srnamespace=0&srlimit=8&srprop=snippet&srsearch="
  );

  return {
    keywords,
    isResult,
    articleObj,
    baseURLSearch,
    initValue,
  };
});

export const useSearchDirtakel = defineStore("searchDirtakel", () => {
  const keywords = ref("");
  const groupCategory = ref("");
  const baseURLSearch = ref("/api/v1/koleksi/dirtakel");

  return {
    keywords,
    groupCategory,
    baseURLSearch,
  };
});

export const useSearchScopus = defineStore("scopusSearch", () => {
  const keywords = ref("");
  const scopusObjects = ref();
  const baseURLSearch = ref("https://api.elsevier.com/content/search/scopus");

  return {
    keywords,
    scopusObjects,
    baseURLSearch,
  };
});

export const searchTugasAkhirDirectus = defineStore(
  "tugasAkhirDirectus",
  () => {
    const { getItems } = useDirectusItems();
    const keywords = ref("");
    const offset = ref(0);
    const page = ref(1);
    const isNewSearch = ref(false);
    const searchResults = ref();

    const searchingTugasAkhir = async (isNew: boolean) => {
      switch (isNew) {
        case false:
          isNewSearch.value = false;
          page.value += 1;
          break;
        case true:
          isNewSearch.value = true;
          offset.value = 0;
          page.value = 1;
          break;
        default:
          console.log("Something is wrong");
          break;
      }
      searchResults.value = "loading";
      if (keywords.value !== "") {
        const fetchSearchResults = await getItems({
          collection: "tbtMhsUploadThesis",
          params: {
            limit: 30,
            offset: offset.value,
            filter: {
              _or: [
                {
                  Judul: {
                    _contains: keywords.value,
                  },
                },
                {
                  Abstrak: {
                    _contains: keywords.value,
                  },
                },
                {
                  Keywords: {
                    _contains: keywords.value,
                  },
                },
              ],
            },
          },
        });

        searchResults.value = await fetchSearchResults;
      } else {
        return "No Results";
      }
    };

    const nextPage = () => {
      if (offset.value >= 0) {
        offset.value += 30;
        searchingTugasAkhir(false);
      }
    };

    const previousPage = () => {
      if (offset.value >= 0) {
        offset.value -= 30;
        searchingTugasAkhir(false);
      }
    };

    return {
      keywords,
      offset,
      page,
      searchResults,
      searchingTugasAkhir,
      nextPage,
      previousPage,
    };
  }
);

export const searchMeili = defineStore("meilisearch", () => {
  const client = new MeiliSearch({
    host: useRuntimeConfig().public.meiliHost,
    apiKey: useRuntimeConfig().public.meiliApiKey,
  });

  const meiliKeyword = ref("");
  const inputState = ref(true);

  const disertasi = client.index("Disertasi");
  const tesis = client.index("Tesis");
  // const skripsi = client.index("Skripsi");
  const tugasAkhir = client.index("Tugas-Akhir");

  const universalResults = ref<Array<any>>([]);
  const disertasiResult = ref();
  const tesisResult = ref();
  const skripsiResult = ref();
  const tugasAkhirResult = ref();

  const generalSearch = async (keyword: string) => {
    disertasiResult.value = await disertasi.search(keyword, { limit: 5 });
    tesisResult.value = await tesis.search(keyword, { limit: 5 });
    // skripsiResult.value = await skripsi.search(keyword, { limit: 5 });
    tugasAkhirResult.value = await tugasAkhir.search(keyword, { limit: 5 });

    universalResults.value = [
      // ...skripsiResult.value.hits,
      ...disertasiResult.value.hits,
      ...tesisResult.value.hits,
      ...tugasAkhirResult.value.hits,
    ];
  };

  return {
    client,
    disertasi,
    tesis,
    tugasAkhir,
    meiliKeyword,
    inputState,
    universalResults,
    disertasiResult,
    tesisResult,
    tugasAkhirResult,
    generalSearch,
  };
});
