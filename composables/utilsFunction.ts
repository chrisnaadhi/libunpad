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

export const definePeminjamanRuangan = (ruangan: string) => {
  switch (ruangan) {
    case "ruang_the_gade":
      return "Ruang Pegadaian Lt.1";

    case "ruang_kelas_2":
      return "Ruang Kelast Lt.2";

    default:
      return "Belum dibuat";
  }
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

export const getLinkResult = (link: string) => {
  const id = "oai:kandaga.unpad.ac.id:8010:slims-154137";
  if (link.includes("slims")) {
    const splitLink = link.split("-");
    const getID = splitLink.at(-1);
    const fullLink = `https://kandaga.unpad.ac.id:8010/index.php?p=show_detail&id=${getID}`;
    return fullLink;
  } else {
    return "https://kandaga.unpad.ac.id:3000";
  }
};
