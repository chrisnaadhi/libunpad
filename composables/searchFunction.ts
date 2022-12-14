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
