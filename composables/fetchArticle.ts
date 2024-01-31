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

export const handleAssets = (id: string) => {
  const url = "https://repository.unpad.ac.id:8050/assets/" + id;
  return url;
};
