import { defineStore } from "pinia";

export const menuContent = () => {
  const tentang = [
    {
      name: "Kandaga",
      url: "#",
      urlEN: "/en#",
    },
    {
      name: "Profil",
      url: "#",
      urlEN: "/en#",
    },
    {
      name: "Fasilitas",
      url: "#",
      urlEN: "/en#",
    },
    {
      name: "Regulasi",
      url: "#",
      urlEN: "/en#",
    },
    {
      name: "Struktur Organisasi",
      url: "#",
      urlEN: "/en#",
    },
    {
      name: "Keanggotaan",
      url: "#",
      urlEN: "/en#",
    },
  ];

  const layanan = [
    {
      name: "Layanan Daring",
      url: "#",
      urlEN: "/en#",
    },
    {
      name: "Layanan Luring",
      url: "#",
      urlEN: "/en#",
    },
    {
      name: "Layanan Administratif",
      url: "/pengajuan",
      urlEN: "/en/pengajuan",
    },
    {
      name: "Layanan Riset",
      url: "#",
      urlEN: "/en#",
    },
    {
      name: "Visitor",
      url: "/visitor",
      urlEN: "/en/visitor",
    },
  ];

  const koleksi = [
    {
      name: "Gallery",
      url: "/gallery",
      urlEN: "/en/gallery",
    },
    {
      name: "Library",
      url: "/library",
      urlEN: "/en/library",
    },
    {
      name: "Archive",
      url: "/records",
      urlEN: "/en/records",
    },
    {
      name: "Museum",
      url: "/museum",
      urlEN: "/en/museum",
    },
    {
      name: "Repository",
      url: "/koleksi/repository",
      urlEN: "/en/koleksi/repository",
    },
  ];

  const panduan = [
    {
      name: "Layanan & Fasilitas",
      url: "#",
      urlEN: "/en#",
    },
    {
      name: "Mahasiswa",
      url: "#",
      urlEN: "/en#",
    },
    {
      name: "Peneliti",
      url: "#",
      urlEN: "/en#",
    },
    {
      name: "Dosen",
      url: "#",
      urlEN: "/en#",
    },
    {
      name: "Tenaga Pendidik",
      url: "#",
      urlEN: "/en#",
    },
  ];

  return {
    tentang,
    layanan,
    koleksi,
    panduan,
  };
};

export const mobileMenu = defineStore("mobile", () => {
  const menuState = ref(false);
  const isTentangOpen = ref(false);
  const isLayananOpen = ref(false);
  const isKoleksiOpen = ref(false);
  const isPanduanOpen = ref(false);
  const isLocaleOpen = ref(false);
  function changeMenuState() {
    menuState.value = !menuState.value;
  }

  return {
    menuState,
    isTentangOpen,
    isLayananOpen,
    isKoleksiOpen,
    isPanduanOpen,
    changeMenuState,
    isLocaleOpen,
  };
});
