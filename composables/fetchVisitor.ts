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

export const getMonthlyVisitor = (ruangan: string, tanggal: string) => {
  return {
    collection: "data_kunjungan",
    params: {
      filter: {
        nama_ruangan: {
          _eq: ruangan,
        },
        date_created: {
          _between: tanggal,
        },
      },
      meta: "filter_count",
    },
  };
};
