import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useNuxtApp, useRuntimeConfig } from "#app";

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

export const displayMessage = (value: string) => {
  switch (value) {
    case "pengajuan":
      return "text-red";
    case "proses":
      return "text-amber";
    case "selesai":
      return "text-green";
  }
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
export const userLoginState = defineStore("loginState", () => {
  const state = ref(false);
  const userID = ref(Math.floor(Math.random() * 10));

  function login() {
    state.value = true;
    return navigateTo("/keanggotaan", { redirectCode: 301 });
  }

  function logout() {
    state.value = false;
    return navigateTo("/login", { redirectCode: 301 });
  }

  return {
    state,
    userID,
    login,
    logout,
  };
});

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
