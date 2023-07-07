import { defineStore } from "pinia";

export const menuContent = () => {
  const tentang = [
    {
      name: "Kandaga",
      url: "#",
      nameEN: "Kandaga",
      urlEN: "/en#",
    },
    {
      name: "Profil",
      url: "#",
      nameEN: "Profile",
      urlEN: "/en#",
    },
    {
      name: "Fasilitas",
      url: "#",
      nameEN: "Facilities",
      urlEN: "/en#",
    },
    {
      name: "Regulasi",
      url: "#",
      nameEN: "Regulation",
      urlEN: "/en#",
    },
    {
      name: "Struktur Organisasi",
      url: "#",
      nameEN: "Organization Structure",
      urlEN: "/en#",
    },
    {
      name: "Keanggotaan",
      url: "#",
      nameEN: "Membership",
      urlEN: "/en#",
    },
  ];

  const layanan = [
    {
      name: "Layanan Daring",
      url: "#",
      nameEN: "Online Service",
      urlEN: "/en#",
    },
    {
      name: "Layanan Luring",
      url: "#",
      nameEN: "Offline Service",
      urlEN: "/en#",
    },
    {
      name: "Layanan Administratif",
      url: "/pengajuan",
      nameEN: "Administrative Service",
      urlEN: "/en/pengajuan",
    },
    {
      name: "Layanan Riset",
      url: "#",
      nameEN: "Research Assist",
      urlEN: "/en#",
    },
    {
      name: "Visitor",
      url: "/visitor",
      nameEN: "Visitor",
      urlEN: "/en/visitor",
    },
  ];

  const koleksi = [
    {
      name: "Galeri",
      url: "/gallery",
      nameEN: "Gallery",
      urlEN: "/en/gallery",
    },
    {
      name: "Perpustakaan",
      url: "/library",
      nameEN: "Library",
      urlEN: "/en/library",
    },
    {
      name: "Arsip",
      url: "/records",
      nameEN: "Archive",
      urlEN: "/en/records",
    },
    {
      name: "Museum",
      url: "/museum",
      nameEN: "Museum",
      urlEN: "/en/museum",
    },
    {
      name: "Repositori",
      url: "/koleksi/repository",
      nameEN: "Repository",
      urlEN: "/en/koleksi/repository",
    },
    {
      name: "Koleksi Hayati",
      url: "/koleksi-hayati",
      nameEN: "Biological Collection",
      urlEN: "/en/koleksi-hayati",
    },
  ];

  const panduan = [
    {
      name: "Layanan & Fasilitas",
      url: "/panduan",
      nameEN: "Services & Facilities",
      urlEN: "/en/panduan",
    },
    {
      name: "Pustakawan Subjek",
      url: "#",
      nameEN: "Subject Librarians",
      urlEN: "/en#",
    },
    {
      name: "Belajar di Kandaga",
      url: "#",
      nameEN: "Study in Kandaga",
      urlEN: "/en#",
    },
    {
      name: "E-Resources",
      url: "#",
      nameEN: "E-Resources",
      urlEN: "/en#",
    },
    {
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
