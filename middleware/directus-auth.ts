export default defineNuxtRouteMiddleware((to, from) => {
  const user = useDirectusUser();

  if (!user.value) {
    return navigateTo({
      path: "/login",
      query: {
        redir: to.path,
      },
    });
  } else if (to.path === "/login" && user.value) {
    return navigateTo({
      path: "/dashboard"
    })
  }
});
