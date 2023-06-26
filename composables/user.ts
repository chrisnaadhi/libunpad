import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const displayRuangan = (ruangan: string) => {
  return computed(() => {
    switch (ruangan) {
      case "lobby":
        return "Lobby Utama";
      case "r_sirkulasi":
        return "Ruang Sirkulasi";
      case "r_belajar":
        return "Ruang Belajar";
      case "r_referensi":
        return "Ruang Referensi";
      case "r_bni":
        return "BNI Coworking Space";
      case "r_multimedia":
        return "Ruang Multimedia";
      case "r_populer":
        return "Ruang Populer";
      case "r_berkala":
        return "Ruang Berkala";
    }
  });
};

export const displayKeanggotaan = (identitas: string) => {
  return computed(() => {
    switch (identitas) {
      case "12345":
        return "Pengunjung Umum";
      case "54321":
        return "Belum terdaftar Anggota";
      default:
        return "Anggota Terdaftar";
    }
  });
};

export const displayKeperluanSurat = (keperluan: string) => {
  return computed(() => {
    switch (keperluan) {
      case "ijazah":
        return "Pengambilan Ijazah";
      case "wisuda":
        return "Pendaftaran Wisuda";
      case "sidang":
        return "Pengajuan Sidang";
      case "akademik":
        return "Keperluan Akademik";
      default:
        return "Keperluan Lainnya";
    }
  });
};

export const displayStatusPengajuanSurat = (status: string) => {
  return computed(() => {
    switch (status) {
      case "pengajuan":
        return "Sedang dalam tahap pengajuan";
      case "proses":
        return "Sedang diproses oleh petugas";
      case "selesai":
        return "Sudah selesai, silahkan cek email";
      default:
        return "Silahkan hubungi Admin";
    }
  });
};

export const displayStatusTugas = (status: string) => {
  return computed(() => {
    switch (status) {
      case "belum":
        return "Belum dikerjakan";
      case "proses":
        return "Sedang dikerjakan";
      case "selesai":
        return "Selesai dikerjakan";
      default:
        return "Pending";
    }
  });
};

export const displayRoleUser = (id: string) => {
  return computed(() => {
    switch (id) {
      case "BE2D46E4-CB00-4585-8E34-5B571A80A820":
        return "Administrator";
      case "19B573BB-B9DE-4CBC-89BB-596CFCA28448":
        return "Kandaga - Koordinator";
      case "9BB62337-8EAA-44AB-A47C-F8CACEF9B8A7":
        return "Kandaga - Pegawai";
      case "C8B3B5B9-F367-440B-BF8E-D93ADFE930F6":
        return "Akun Ruangan Layanan";
      default:
        return "Guest";
    }
  });
};

export const displayPersyaratan = (syarat: object) => {
  if (syarat === null) {
    return "Persyaratan belum lengkap";
  }
  const changeSyaratType = syarat.toString().split(",");
  if (
    changeSyaratType.includes("denda") &&
    changeSyaratType.includes("peminjaman")
  ) {
    return `Syarat sudah lengkap`;
  } else if (changeSyaratType.includes("denda")) {
    return `Masih ada peminjaman yang belum dikembalikan`;
  } else if (changeSyaratType.includes("peminjaman")) {
    return `Masih ada denda yang belum dibayar`;
  } else {
    return `Persyaratan belooommm`;
  }
};

export const useIdentitasForm = () => useState("nilai", () => "");

export const jamLayanan = defineStore("jam", () => {
  const display = ref(false);

  function toggleDisplay() {
    display.value = !display.value;
  }

  function disableDisplay() {
    display.value = false;
  }

  return {
    display,
    toggleDisplay,
    disableDisplay,
  };
});

export const daftarNamaFakultasUnpad = defineStore("namaFakultas", () => {
  const objFakultas = [
    {
      id: 110,
      namaFakultas: "Fakultas Hukum",
      singkatan: "fh",
    },
    {
      id: 120,
      namaFakultas: "Fakultas Ekonomi & Bisnis",
      singkatan: "feb",
    },
    {
      id: 130,
      namaFakultas: "Fakultas Kedokteran",
      singkatan: "fk",
    },
    {
      id: 140,
      namaFakultas: "Fakultas Matematika & IPA",
      singkatan: "fmipa",
    },
    {
      id: 150,
      namaFakultas: "Fakultas Pertanian",
      singkatan: "faperta",
    },
    {
      id: 160,
      namaFakultas: "Fakultas Kedokteran Gigi",
      singkatan: "fkg",
    },
    {
      id: 170,
      namaFakultas: "Fakultas Ilmu Sosial & Ilmu Politik",
      singkatan: "fisip",
    },
    {
      id: 180,
      namaFakultas: "Fakultas Ilmu Budaya",
      singkatan: "fib",
    },
    {
      id: 190,
      namaFakultas: "Fakultas Psikologi",
      singkatan: "fapsi",
    },
    {
      id: 200,
      namaFakultas: "Fakultas Peternakan",
      singkatan: "fapet",
    },
    {
      id: 210,
      namaFakultas: "Fakultas Ilmu Komunikasi",
      singkatan: "fikom",
    },
    {
      id: 220,
      namaFakultas: "Fakultas Keperawatan",
      singkatan: "fkep",
    },
    {
      id: 230,
      namaFakultas: "Fakultas Perikanan & Ilmu Kelautan",
      singkatan: "fpik",
    },
    {
      id: 240,
      namaFakultas: "Fakultas Teknologi Industri Pertanian",
      singkatan: "ftip",
    },
    {
      id: 250,
      namaFakultas: "Sekolah Pascasarjana",
      singkatan: "sps",
    },
    {
      id: 260,
      namaFakultas: "Fakultas Farmasi",
      singkatan: "farmasi",
    },
    {
      id: 270,
      namaFakultas: "Fakultas Teknik Geologi",
      singkatan: "ftg",
    },
  ];

  const singkatanUpper = (id: number) => {
    return objFakultas[id].singkatan.toUpperCase();
  };

  const cariFakultas = (npm: string) => {
    const hasil = objFakultas.find(
      (elem) => elem.id.toString() === npm.slice(0, 3)
    );
    return hasil?.namaFakultas;
  };

  return {
    objFakultas,
    singkatanUpper,
    cariFakultas,
  };
});
