export default defineNuxtRouteMiddleware((to, from) => {
  const err = useError();
  const router = useRouter();

  console.log(err.value);
  console.log("To: ", to);
  console.log("From: ", from);
});
