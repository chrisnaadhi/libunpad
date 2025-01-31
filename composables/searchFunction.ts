import { defineStore } from "pinia";

export const useSearchFunction = defineStore("searchfunction", () => {
  const keywords = ref("");
  const articleObj = ref();
  const wikipediaDefinition = ref();
  const isResult = ref(false);
  const initValue = ref(0);
  const baseURLSearch = ref(
    "https://id.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&list=search&utf8=1&formatversion=2&exsentences=1&exlimit=20&exintro=1&explaintext=1&exsectionformat=raw&srnamespace=0&srlimit=8&srprop=snippet&srsearch="
  );
  const baseURLKandaga = ref(process.env.URL_API_KANDAGA);
  const kandagaRes = ref();
  const ulimsRes = ref();

  return {
    keywords,
    isResult,
    articleObj,
    wikipediaDefinition,
    baseURLSearch,
    baseURLKandaga,
    kandagaRes,
    ulimsRes,
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
    const facultyName = ref<NamaFakultas | null>();
    const facultyId = ref(110);
    const tahun = ref("2023");
    const isNewSearch = ref(false);
    const searchResults = ref();

    const searchingTugasAkhir = async (
      isNew: boolean,
      faculty: boolean = false,
      filter: boolean = false
    ) => {
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
      if (
        keywords.value !== "" &&
        faculty === true &&
        facultyName.value !== null &&
        filter === false
      ) {
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
              MhsNPM: {
                _starts_with: facultyName.value?.id,
              },
            },
          },
        });

        searchResults.value = fetchSearchResults;
      } else if (
        keywords.value !== "" &&
        faculty === false &&
        facultyName.value === null &&
        filter === true
      ) {
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
              MhsNPM: {
                _starts_with: facultyId.value.toString(),
              },
              UploadTgl: {
                _between: [
                  `${tahun.value}-01-01T00:00:00`,
                  `${tahun.value}-12-30T23:59:59`,
                ],
              },
            },
          },
        });

        searchResults.value = fetchSearchResults;
      } else if (
        keywords.value !== "" &&
        faculty === false &&
        facultyName.value === null &&
        filter === false
      ) {
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

        searchResults.value = fetchSearchResults;
      } else {
        return "No Results";
      }
    };

    const nextPage = () => {
      if (offset.value >= 0 && facultyName === null) {
        offset.value += 30;
        searchingTugasAkhir(false);
      } else if (offset.value >= 0 && facultyName !== null) {
        offset.value += 30;
        searchingTugasAkhir(false, true);
      }
    };

    const previousPage = () => {
      if (offset.value >= 0 && facultyName === null) {
        offset.value -= 30;
        searchingTugasAkhir(false);
      } else if (offset.value >= 0 && facultyName !== null) {
        offset.value -= 30;
        searchingTugasAkhir(false, true);
      }
    };

    return {
      keywords,
      offset,
      page,
      tahun,
      facultyName,
      facultyId,
      searchResults,
      searchingTugasAkhir,
      nextPage,
      previousPage,
    };
  }
);

// export const searchMeili = defineStore("meilisearch", () => {
//   const client = new MeiliSearch({
//     host: useRuntimeConfig().public.meiliHost,
//     apiKey: useRuntimeConfig().public.meiliApiKey,
//   });

//   const meiliKeyword = ref();

//   const disertasi = client.index("Disertasi");
//   const tesis = client.index("Tesis");
//   const tugasAkhir = client.index("Tugas-Akhir");

//   const universalResults = ref();

//   const generalSearch = async (keyword: string) => {
//     const disertasiResult = await disertasi.search(keyword, { limit: 10 });
//     const tesisResult = await tesis.search(keyword, { limit: 10 });
//     const tugasAkhirResult = await tugasAkhir.search(keyword, { limit: 10 });

//     await universalResults.value.push(disertasiResult);
//     await universalResults.value.push(tesisResult);
//     await universalResults.value.push(tugasAkhirResult);
//   };

//   return {
//     client,
//     disertasi,
//     tesis,
//     tugasAkhir,
//     meiliKeyword,
//     universalResults,
//     generalSearch,
//   };
// });

export const federatedSearch = defineStore("federatedSearch", async () => {
  const baseURL = ref(process.env.URL_API_KANDAGA);
  const keyword = ref("");
  const fetchRes = ref();

  return {
    baseURL,
    keyword,
    fetchRes,
  };
});
