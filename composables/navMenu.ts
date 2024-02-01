import { defineStore } from "pinia";

export const menuContent = () => {
  const tentang = [
    {
      id: 1,
      name: "Kandaga",
      url: "#",
      nameEN: "Kandaga",
      urlEN: "/en#",
    },
    {
      id: 2,
      name: "Profil",
      url: "#",
      nameEN: "Profile",
      urlEN: "/en#",
    },
    {
      id: 3,
      name: "Fasilitas",
      url: "#",
      nameEN: "Facilities",
      urlEN: "/en#",
    },
    {
      id: 4,
      name: "Regulasi",
      url: "#",
      nameEN: "Regulation",
      urlEN: "/en#",
    },
    {
      id: 5,
      name: "Struktur Organisasi",
      url: "#",
      nameEN: "Organization Structure",
      urlEN: "/en#",
    },
    {
      id: 6,
      name: "Berita & Kegiatan",
      url: "/berita",
      nameEN: "News & Event",
      urlEN: "/en/berita",
    },
  ];

  const layanan = [
    {
      id: 7,
      name: "Layanan Daring",
      url: "#",
      nameEN: "Online Service",
      urlEN: "/en#",
    },
    {
      id: 8,
      name: "Layanan Luring",
      url: "#",
      nameEN: "Offline Service",
      urlEN: "/en#",
    },
    {
      id: 9,
      name: "Layanan Administratif",
      url: "/pengajuan",
      nameEN: "Administrative Service",
      urlEN: "/en/pengajuan",
    },
    {
      id: 10,
      name: "Layanan Riset",
      url: "#",
      nameEN: "Research Assist",
      urlEN: "/en#",
    },
    {
      id: 11,
      name: "Visitor",
      url: "/visitor",
      nameEN: "Visitor",
      urlEN: "/en/visitor",
    },
  ];

  const koleksi = [
    {
      id: 12,
      name: "Galeri",
      url: "/gallery",
      nameEN: "Gallery",
      urlEN: "/en/gallery",
    },
    {
      id: 13,
      name: "Perpustakaan",
      url: "/library",
      nameEN: "Library",
      urlEN: "/en/library",
    },
    {
      id: 14,
      name: "Arsip",
      url: "/records",
      nameEN: "Archive",
      urlEN: "/en/records",
    },
    {
      id: 15,
      name: "Museum",
      url: "/museum",
      nameEN: "Museum",
      urlEN: "/en/museum",
    },
    {
      id: 16,
      name: "Repositori",
      url: "/koleksi/repository",
      nameEN: "Repository",
      urlEN: "/en/koleksi/repository",
    },
    {
      id: 17,
      name: "E-Teater",
      url: "/e-teater",
      nameEN: "E-Theater",
      urlEN: "/en/e-teater",
    },
    {
      id: 18,
      name: "Koleksi Hayati",
      url: "/koleksi-hayati",
      nameEN: "Biological Collection",
      urlEN: "/en/koleksi-hayati",
    },
  ];

  const panduan = [
    {
      id: 19,
      name: "Layanan & Fasilitas",
      url: "/panduan",
      nameEN: "Services & Facilities",
      urlEN: "/en/panduan",
    },
    {
      id: 20,
      name: "Pustakawan Subjek",
      url: "#",
      nameEN: "Subject Librarians",
      urlEN: "/en#",
    },
    {
      id: 21,
      name: "Informasi Akademik",
      url: "#",
      nameEN: "Academic Information",
      urlEN: "/en#",
    },
    {
      id: 22,
      name: "Kegiatan Belajar Mengajar",
      url: "#",
      nameEN: "Teaching & Learning Guide",
      urlEN: "/en#",
    },
    {
      id: 23,
      name: "FAQ",
      url: "#",
      nameEN: "FAQ",
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

export const navigationMenuBar = defineStore("navigationMenuBar", () => {
  const viewedMenuName = ref("");
  const viewState = ref(false);

  const clickDropdown = (menu: string) => {
    if (viewedMenuName.value !== "") {
      viewedMenuName.value = "";
      viewState.value = !viewState.value;
    } else {
      viewedMenuName.value = menu;
      viewState.value = !viewState.value;
    }
  };

  const viewDropdown = (menu: string) => {
    viewedMenuName.value = menu;
    viewState.value = true;
  };

  const leaveDropdown = () => {
    viewedMenuName.value = "";
    viewState.value = false;
  };

  return {
    viewedMenuName,
    viewState,
    clickDropdown,
    viewDropdown,
    leaveDropdown,
  };
});
