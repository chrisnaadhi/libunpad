import { getCSRFToken, loginToDspace } from "~/composables/dspaceKit";

export default defineNuxtRouteMiddleware(async () => {
  const config = useRuntimeConfig();
  const dSpaceToken = useCookie("X-XSRF-TOKEN");
  const { data, status } = useAuth();

  console.log("dSpace Token: " + dSpaceToken.value);
  console.log("Data: " + data.value?.user);
  console.log("Status: " + status.value);

  if (!dSpaceToken.value) {
    getCSRFToken();
  } else if (dSpaceToken.value && status.value === "authenticated") {
    // loginToDspace()
  }
});
