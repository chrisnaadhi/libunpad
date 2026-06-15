import { defineStore } from "pinia";

export const useSearchFunction = defineStore("searchfunction", () => {
  const keywords = ref("");
  const articleObj = ref();
  const wikipediaDefinition = ref();
  const isResult = ref(false);
  const initValue = ref(0);
  const baseURLSearch = ref(
    "https://id.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&list=search&utf8=1&formatversion=2&exsentences=1&exlimit=20&exintro=1&explaintext=1&exsectionformat=raw&srnamespace=0&srlimit=8&srprop=snippet&srsearch=",
  );
  const baseURLKandaga = ref(process.env.URL_API_KANDAGA);
  const kandagaRes = ref();
  const pustakaRes = ref();

  return {
    keywords,
    isResult,
    articleObj,
    wikipediaDefinition,
    baseURLSearch,
    baseURLKandaga,
    kandagaRes,
    pustakaRes,
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
    const facultyId = ref("");
    const tahun = ref("");
    const bahasa = ref("");
    const isNewSearch = ref(false);
    const searchResults = ref();
    const totalData = ref();

    // Default (non-search) browse state
    const defaultResults = ref<any[] | null>(null);
    const defaultTotal = ref(0);
    const defaultPage = ref(1);
    const defaultOffset = ref(0);
    const isDefaultLoading = ref(false);

    /** Build a Directus filter object from all active filter state. */
    const buildFilter = (faculty: boolean) => {
      const and: any[] = [];

      if (keywords.value) {
        and.push({
          _or: [
            { Judul: { _contains: keywords.value } },
            { Abstrak: { _contains: keywords.value } },
            { Keywords: { _contains: keywords.value } },
          ],
        });
      }

      if (faculty && facultyName.value) {
        and.push({ MhsNPM: { _starts_with: String(facultyName.value.id) } });
      } else if (facultyId.value) {
        and.push({ MhsNPM: { _starts_with: String(facultyId.value) } });
      }

      if (tahun.value) {
        and.push({
          UploadTgl: {
            _between: [
              `${tahun.value}-01-01T00:00:00`,
              `${tahun.value}-12-31T23:59:59`,
            ],
          },
        });
      }

      if (bahasa.value) {
        and.push({ Bahasa: { _eq: bahasa.value } });
      }

      return and.length > 0 ? { _and: and } : undefined;
    };

    const searchingTugasAkhir = async (
      isNew: boolean,
      faculty: boolean = false,
      _filter: boolean = false,
    ) => {
      if (isNew) {
        isNewSearch.value = true;
        offset.value = 0;
        page.value = 1;
      } else {
        isNewSearch.value = false;
      }

      searchResults.value = "loading";
      totalData.value = null;

      const filter = buildFilter(faculty);

      searchResults.value = await getItems({
        collection: "tbtMhsUploadThesis",
        params: { limit: 30, offset: offset.value, sort: "-UploadTgl", filter },
      });

      const countData = await getItems({
        collection: "tbtMhsUploadThesis",
        params: { filter, meta: "filter_count" },
      });
      totalData.value = countData.meta?.filter_count;
    };

    const nextPage = async () => {
      offset.value += 30;
      page.value += 1;
      await searchingTugasAkhir(false, facultyName.value !== null);
    };

    const previousPage = async () => {
      offset.value -= 30;
      page.value -= 1;
      await searchingTugasAkhir(false, facultyName.value !== null);
    };

    /** Load a page of the default (non-search) browse listing. */
    const loadDefaultItems = async (facultyFilter?: string) => {
      isDefaultLoading.value = true;
      try {
        const filter = facultyFilter
          ? { MhsNPM: { _starts_with: String(facultyFilter) } }
          : undefined;

        defaultResults.value = await getItems({
          collection: "tbtMhsUploadThesis",
          params: {
            limit: 30,
            offset: defaultOffset.value,
            sort: "-UploadTgl",
            filter,
          },
        });

        const countData = await getItems({
          collection: "tbtMhsUploadThesis",
          params: { filter, meta: "filter_count" },
        });
        defaultTotal.value = countData.meta?.filter_count ?? 0;
      } finally {
        isDefaultLoading.value = false;
      }
    };

    const nextDefaultPage = async (facultyFilter?: string) => {
      defaultOffset.value += 30;
      defaultPage.value += 1;
      await loadDefaultItems(facultyFilter);
    };

    const previousDefaultPage = async (facultyFilter?: string) => {
      defaultOffset.value -= 30;
      defaultPage.value -= 1;
      await loadDefaultItems(facultyFilter);
    };

    const resetFilters = () => {
      keywords.value = "";
      tahun.value = "";
      facultyId.value = "";
      bahasa.value = "";
      offset.value = 0;
      page.value = 1;
      searchResults.value = undefined;
      totalData.value = undefined;
    };

    return {
      keywords,
      offset,
      page,
      tahun,
      bahasa,
      facultyName,
      facultyId,
      searchResults,
      totalData,
      defaultResults,
      defaultTotal,
      defaultPage,
      defaultOffset,
      isDefaultLoading,
      searchingTugasAkhir,
      nextPage,
      previousPage,
      loadDefaultItems,
      nextDefaultPage,
      previousDefaultPage,
      resetFilters,
    };
  },
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
