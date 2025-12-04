export default defineNuxtRouteMiddleware(async (to, from) => {
  const { getItemById } = useDirectusItems();

  const item = await getItemById({
    collection: "koleksi_ebook",
    id: to.params.id as string,
  }) as any;

  if (item.access_type === "login") {
    const user = useDirectusUser();
    const { status } = useAuth();
    if (user.value === undefined && status.value === "unauthenticated") {
      return navigateTo({
        path: "/login",
        query: {
          redir: to.path,
        },
      });
    }
  } else if (item.access_type === "closed") {
    throw createError({
      statusCode: 403,
      statusMessage: "Akses e-book ini ditutup.",
    });
  }
  // For other access_type, continue normally
});