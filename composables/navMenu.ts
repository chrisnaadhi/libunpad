import { defineStore } from "pinia";

export const menuContent = () => {
  const tentang = [
    {
      name: "Kandaga",
      url: "/visitor",
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
      url: "/dashboard",
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
  ];

  return {
    tentang,
    layanan,
  };
};

export const mobileMenu = defineStore("mobile", () => {
  const menuState = ref(false);
  const isTentangOpen = ref(false);
  const isLayananOpen = ref(false);
  function changeMenuState() {
    menuState.value = !menuState.value;
  }

  return { menuState, isTentangOpen, isLayananOpen, changeMenuState };
});
