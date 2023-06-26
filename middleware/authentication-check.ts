export default defineNuxtRouteMiddleware((to, from) => {
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
});
