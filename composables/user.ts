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
        return "Ruang Referensi Tesis Disertasi";
      case "r_bni":
        return "BNI Coworking Space";
      case "r_multimedia":
        return "Ruang Multimedia";
      case "r_populer":
        return "Ruang Populer";
      case "r_berkala":
        return "Ruang Referensi Koleksi Berkala";
      case "r_alh":
        return "Ruang Assistive Learning Hub"
      case "r_langka":
        return "Ruang Koleksi Langka"
    }
  }).value?.replace('"', "");
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
  }).value.replace('"', "");
};

export const displayStatusPengajuanSurat = (status: string) => {
  return computed(() => {
    switch (status) {
      case "pengajuan":
        return "Sedang dalam tahap pengajuan";
      case "proses":
        return "Sedang diproses oleh petugas";
      case "selesai":
        return "Selesai diproses";
      case "ditolak":
        return "Ditolak oleh petugas";
      default:
        return "Silahkan hubungi Admin";
    }
  }).value.replace('"', "");
};

export const displayNamaRuangan = (namaRuangan: string) => {
  return computed(() => {
    switch (namaRuangan) {
      case "ruang_the_gade":
        return "Ruang The Gade - Pegadaian Lt.1";
      case "ruang_kelas_2":
        return "Ruang Kelas Bersama Lt.2";
      default:
        return "Ruangan belum terdata";
    }
  }).value.replace('"', "");
};

export const displayStatusPeminjamanRuangan = (namaRuangan: string) => {
  return computed(() => {
    switch (namaRuangan) {
      case "approved":
        return "bg-white text-green";
      case "pending":
        return "bg-white text-gray";
      case "cancel":
        return "bg-white text-red";
      default:
        return "bg-white text-orange";
    }
  }).value;
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
    return `Persyaratan belum lengkap`;
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

  const cariFakultasAbbrevation = (
    npm: string,
    bebasPustaka: boolean = false
  ) => {
    const hasil = objFakultas.find((elem) => elem.singkatan === npm);
    if (bebasPustaka) {
      if (hasil?.namaFakultas.includes("Fakultas")) {
        let bebasPustakaFakultas = hasil?.namaFakultas.split(" ");
        bebasPustakaFakultas.shift();
        return bebasPustakaFakultas.join(" ");
      } else {
        return hasil?.namaFakultas;
      }
    } else {
      return hasil?.namaFakultas;
    }
  };

  const cariFakultasByParameter = (singkatan: string) => {
    const hasil = objFakultas.find(
      (fakultas) => fakultas.singkatan === singkatan
    );
    return hasil;
  };

  return {
    objFakultas,
    singkatanUpper,
    cariFakultas,
    cariFakultasAbbrevation,
    cariFakultasByParameter,
  };
});

export const unggahMandiriTugasAkhir = defineStore("unggahMandiri", () => {
  const config = useRuntimeConfig();
  const programStudi = ref("");
  const programStudiMetadata = ref();

  const getProgramStudiMetadata = async () => {
    const getData = await $fetch(
      config.public.dSpacePublic + "core/communities/" + programStudi.value
    );
    return (programStudiMetadata.value = await getData);
  };

  return {
    programStudi,
    programStudiMetadata,
    getProgramStudiMetadata,
  };
});
