export const fetchArticleCategory = (category: string) => {
  return {
    collection: "artikel",
    params: {
      limit: 3,
      sort: "-date_updated",
      filter: {
        kategori: category,
        status: "published",
      },
    },
  };
};

export const handleAssets = (id: string) => {
  const url = "https://kandaga.unpad.ac.id/backoffice/assets/" + id;
  return url;
};
