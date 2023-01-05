export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useDirectusUser();

  if (!user.value) {
    return navigateTo("/login");
  }
});
