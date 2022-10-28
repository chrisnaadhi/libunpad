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

export const useIdentitasForm = () => useState("nilai", () => "");

export const layananDisplay = defineStore("jam", () => {
  const display = ref(false);

  function toggleDisplay() {
    display.value = !display.value;
  }

  return {
    display,
    toggleDisplay,
  };
});
