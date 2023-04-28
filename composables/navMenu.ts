import { defineStore } from "pinia";

export const menuContent = () => {
  const tentang = [
    {
      name: "Kandaga",
      url: "#",
    },
    {
      name: "Profil",
      url: "#",
    },
    {
      name: "Fasilitas",
      url: "#",
    },
    {
      name: "Regulasi",
      url: "#",
    },
    {
      name: "Struktur Organisasi",
      url: "#",
    },
    {
      name: "Keanggotaan",
      url: "#",
    },
  ];

  const layanan = [
    {
      name: "Layanan Daring",
      url: "#",
    },
    {
      name: "Layanan Luring",
      url: "#",
    },
    {
      name: "Layanan Administratif",
      url: "/pengajuan",
    },
    {
      name: "Layanan Riset",
      url: "#",
    },
    {
      name: "Visitor",
      url: "/visitor",
    },
  ];

  const koleksi = [
    {
      name: "Gallery",
      url: "/gallery",
    },
    {
      name: "Library",
      url: "/library",
    },
    {
      name: "Archive",
      url: "/records",
    },
    {
      name: "Museum",
      url: "/museum",
    },
    {
      name: "Repository",
      url: "/koleksi/repository",
    },
  ];

  const panduan = [
    {
      name: "Layanan & Fasilitas",
      url: "#",
    },
    {
      name: "Mahasiswa",
      url: "#",
    },
    {
      name: "Peneliti",
      url: "#",
    },
    {
      name: "Dosen",
      url: "#",
    },
    {
      name: "Tenaga Pendidik",
      url: "#",
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
  };
});
