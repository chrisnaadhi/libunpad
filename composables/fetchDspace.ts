export const fetchDspaceItemLogs = async (email: string) => {
  const { getItems } = useDirectusItems();
  const items = await getItems({
    collection: "log_dspace_items",
    params: {
      filter: {
        email: email,
      },
      limit: 1,
    },
  });
  return items;
};
