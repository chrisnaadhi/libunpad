import { defineStore } from "pinia";

export const getCSRFToken = async () => {
  const dSpaceToken = useCookie("X-XSRF-TOKEN");
  const config = useRuntimeConfig();

  if (process.client) {
    await $fetch(config.public.dSpacePublic, {
      method: "GET",
      credentials: "include",
      onResponse({ response }) {
        if (!dSpaceToken.value && response.headers.get("dspace-xsrf-token")) {
          dSpaceToken.value = response.headers.get("dspace-xsrf-token");
        }
      },
    });
  }
};

export const getSubmissionWorkspace = async () => {
  const dSpaceToken = useCookie("X-XSRF-TOKEN");
  const dSpaceAccess = useCookie("dsAccessToken");
  const config = useRuntimeConfig();
};

export const getSubmitterData = defineStore("submitterData", () => {
  const namaLengkap = ref("");
  const npm = ref("");
  const email = ref("");
  const fakultas = ref("");
  const programStudi = ref("");
  const jenjang = ref("");

  return {
    namaLengkap,
    npm,
    email,
    fakultas,
    programStudi,
    jenjang,
  };
});
