import { defineStore } from "pinia";

export const trimDescription = (description: string, limit: number) => {
  if (description.length < limit) {
    return description.replace(/(<([^>]+)>)/gi, "") + "...";
  } else {
    return description.replace(/(<([^>]+)>)/gi, "").slice(0, limit) + "...";
  }
};

export const extractYoutubeLink = (url: string) => {
  const splitLink = url.split("=");
  const youtubeCode = splitLink[1];

  return youtubeCode;
};

export const tugasPagination = defineStore("tugasPage", () => {
  const offsetVal = ref(0);
  const baseVal = ref(5);
  const maxedTask = computed((data) => {
    const maxVal =
      offsetVal.value / baseVal.value + 1 ===
      Math.ceil(data.meta.filter_count / baseVal.value);
    if (maxVal) {
      return true;
    } else {
      return false;
    }
  });
  const pageTask = computed(() => {
    if (offsetVal.value === 0) {
      return 1;
    } else if (offsetVal.value >= 1) {
      return offsetVal.value / baseVal.value + 1;
    } else {
      return "Something is breaking in offset value";
    }
  });

  return {
    offsetVal,
    baseVal,
    maxedTask,
    pageTask,
  };
});
