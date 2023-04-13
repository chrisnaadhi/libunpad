export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to.redirectedFrom, to.path);
  console.log(from.fullPath, from.meta);
});
