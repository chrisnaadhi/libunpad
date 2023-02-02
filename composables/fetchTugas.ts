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
