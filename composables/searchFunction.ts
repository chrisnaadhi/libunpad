import { defineStore } from "pinia";

export const useSearchFunction = defineStore("searchfunction", () => {
  const keywords = ref("");
  const articleObj = ref();
  const isResult = ref(false);
  const initValue = ref(0);
  const baseURLSearch = ref(
    "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&list=search&utf8=1&formatversion=2&exsentences=1&exlimit=20&exintro=1&explaintext=1&exsectionformat=raw&srnamespace=0&srlimit=12&srprop=snippet&srsearch="
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
  const baseURLSearch = ref("http://api.elsevier.com/content/search/scopus");

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
    const searchResults = ref();

    const searchingTugasAkhir = async () => {
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
        searchingTugasAkhir();
      }
    };

    const previousPage = () => {
      if (offset.value >= 0) {
        offset.value -= 30;
        searchingTugasAkhir();
      }
    };

    return {
      keywords,
      offset,
      searchResults,
      searchingTugasAkhir,
      nextPage,
      previousPage,
    };
  }
);
