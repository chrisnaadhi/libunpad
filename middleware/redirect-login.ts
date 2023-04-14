export default defineNuxtRouteMiddleware((to, from) => {
  const err = useError();
  const router = useRouter();

  router.beforeEach((to, from) => {
    console.log(to, from);
    console.log(err);
  });
});
