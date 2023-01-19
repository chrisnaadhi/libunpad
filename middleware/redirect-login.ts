export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to.fullPath, to.path);
  console.log(from.fullPath, from.path);
});
