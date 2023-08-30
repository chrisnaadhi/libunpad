export const fetchArticleCategory = (category: string) => {
  return {
    collection: "artikel",
    params: {
      limit: 3,
      sort: "-date_updated",
      filter: {
        kategori: category,
      },
    },
  };
};
