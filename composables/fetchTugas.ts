const config = useRuntimeConfig();

export const displayAgendaKegiatan = (slug: string) => {
  switch (slug) {
    case "pengumpulan_karya_ilmiah":
      return "Pengumpulan Karya Cipta Karya Ilmiah Unpad";
    case "pengembangan_drm":
      return "Pengembangan Data Riset Management";
    case "limdm":
      return "Penguasaan literasi informasi, digital dan metaverse bagi mahasiswa dan dosen";
    case "pengembangan_glam":
      return "Pengembangan sistem management GLAM";
    case "pemenuhan_sumber_informasi":
      return "Pemenuhan Sumber Informasi Ilmiah";
    case "standar_digital_perpustakaan":
      return "Peningkatan standar digital perpustakaan";
    case "kapasitas_dosen":
      return "Pengembangan kapasitas Dosen";
    case "fasilitas_perpustakaan":
      return "Pemenuhan sumber dan fasilitas riset dan pendidikan serta diseminasi";
    case "standar_internasional_glam":
      return "Peningkatan standardisasi internasional institusi GLAM";
    case "sertifikasi_tendik":
      return "Peningkatan Sertifikasi Tendik";
    case "program_unggulan":
      return "Diseminasi Program unggulan PPP Unpad";
    case "pengembangan_museum":
      return "Pengembangan Museum Memorabilia unpad";
    case "bulan_literasi":
      return "Bulan Literasi";
    default:
      return "Not in one of the options, please check the function and try again.";
  }
};

export const displayStatusAgenda = (status: string) => {
  switch (status) {
    case "belum":
      return "Belum Dimulai";
    case "berlangsung":
      return "Sedang Berlangsung & Dikerjakan";
    case "pending":
      return "Pending / Menunggu Persetujuan";
    case "selesai":
      return "Kegiatan Selesai";
    case "batal":
      return "Kegiatan Dibatalkan";
    default:
      return "Not in one of the options, please check the function and try again.";
  }
};

export const colorStatusAgenda = (state: string) => {
  switch (state) {
    case "belum":
      return "bg-red";
    case "berlangsung":
      return "bg-orange";
    case "pending":
      return "bg-gray";
    case "selesai":
      return "bg-green";
    case "batal":
      return "bg-red";
    default:
      return "Not in one of the options, please check the function and try again.";
  }
};

export const fetchAgendaKegiatan = (slug: string) => {
  return {
    collection: "agenda_kegiatan",
    params: {
      filter: {
        program: {
          _eq: slug,
        },
      },
      meta: "filter_count",
    },
  };
};

export const fetchTugasPegawai = (id: string) => {
  return {
    collection: "pekerjaan_harian",
    params: {
      filter: {
        pegawai: {
          _eq: id,
        },
      },
    },
  };
};

export const fetchDataPetugasPiket = async () => {
  const { data: dataPetugas } = await useFetch(
    `${config.public.directus.url}items/piket_layanan`,
    {
      headers: {
        Authorization: `Bearer ${config.public.directus.token}`,
      },
    }
  );

  return dataPetugas.value;
};

export const fetchUrlKoordinator = (id: string) => {
  return `${config.public.directus.url}users/${id}`;
};

export const fetchUrlPegawai = (divisi: string) => {
  return `${config.public.directus.url}users?filter[divisi][_eq]=${divisi}&filter[koordinator][_eq]=false`;
};

export const fetchProfilPegawai = async (id: string) => {
  const { data: dataProfil } = await useFetch(
    `${config.public.directus.url}users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${config.public.directus.token}`,
      },
    }
  );
  return dataProfil;
};

export const useHeaderToken = () => {
  return {
    headers: {
      Authorization: `Bearer ${config.public.directus.token}`,
    },
  };
};
