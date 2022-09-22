import { computed } from "vue";

const date = new Date();

export const displayRuangan = (ruangan) => {
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

export const displayKeanggotaan = (identitas) => {
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

export const filterPengunjungRuanganDirectus = (
  ruangan: string,
  tanggal: string
) => {
  return {
    collection: "data_kunjungan",
    params: {
      filter: {
        nama_ruangan: {
          _eq: ruangan,
        },
        date_created: {
          _gt: tanggal,
        },
      },
      meta: "filter_count",
    },
  };
};

export const getActualMonth = () => {
  return computed(() => {
    return ("0" + (date.getMonth() + 1)).slice(-2);
  });
};

export const getMonthlyVisitor = (tanggal) => {
  return {
    collection: "data_kunjungan",
    params: {
      filter: {
        date_created: {
          _between: tanggal,
        },
      },
      meta: "filter_count",
    },
  };
};
