import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const trimDescription = (description: string, limit: number) => {
  if (description?.length < limit) {
    return (
      description?.replace(/(<([^>]+)>)/gi, "").replaceAll("&nbsp;", "") + "..."
    );
  } else {
    return (
      description
        ?.replace(/(<([^>]+)>)/gi, "")
        .replaceAll("&nbsp;", "")
        .slice(0, limit) + "..."
    );
  }
};

export const trimTitle = (title: string, limit: number) => {
  if (title?.length < limit) {
    return title?.replace(/(<([^>]+)>)/gi, "");
  } else {
    return title?.replace(/(<([^>]+)>)/gi, "").slice(0, limit) + "...";
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

    case "plaza_kandaga":
      return "Plaza Kandaga Lt.1";

    case "ruang_kelas_2":
      return "Ruang Kelast Lt.2";

    case "ruang_hybrid":
      return "Ruang Kelas Hybrid Lt.4";

    case "ruang_teater":
      return "Ruang Teater Rektorat";

    case "ruang_alh":
      return "Ruang Assistive Learning Hub Lt.4";

    default:
      return "Belum dibuat";
  }
};

export const tugasPagination = defineStore("tugasPage", () => {
  const offsetVal = ref(0);
  const baseVal = ref(5);
  const maxedTask = computed((data: any) => {
    const maxVal =
      offsetVal.value / baseVal.value + 1 ===
      Math.ceil(data?.meta.filter_count / baseVal.value);
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
  if (link.includes("slims")) {
    const splitLink = link.split("-");
    const getID = splitLink.at(-1);
    const fullLink = `https://kandaga.unpad.ac.id:8010/index.php?p=show_detail&id=${getID}`;
    return fullLink;
  } else {
    return "https://kandaga.unpad.ac.id:3000";
  }
};

export const beritaType = (berita: any) => {
  if (berita?.hasOwnProperty('konten_berita')) {
    return '/berita/kunjungan/' + berita?.slug
  } else if (berita?.hasOwnProperty('konten_artikel')) {
    return '/berita/artikel/' + berita?.slug
  } else {
    return '/berita'
  }
}

export const directusImageUrl = (id: string) => {
  const config = useRuntimeConfig();
  return `${config.public.directusPublicUrl}assets/${id}`;
};

export const generateStrongPassword = (
  length: number,
  useLowercase: boolean,
  useUppercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean
) => {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  let charset = "";
  if (useLowercase) charset += lowercase;
  if (useUppercase) charset += uppercase;
  if (useNumbers) charset += numbers;
  if (useSymbols) charset += symbols;

  if (!charset) {
    throw new Error("At least one character type must be selected.");
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  console.log(password);

  return password;
};
