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
  ];

  return {
    tentang,
    layanan,
  };
};
