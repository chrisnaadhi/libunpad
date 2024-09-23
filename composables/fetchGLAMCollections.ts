export const getGLAMCollectionsCount = (collection: string) => {
  return {
    collection: collection,
    params: {
      meta: "total_count",
    },
  };
}