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

export const fetchWorkspaceItem = async (workspaceid: string) => {
  const config = useRuntimeConfig();
  const bearer = useCookie("dsAccessToken");
  const dSpaceToken = useCookie("X-XSRF-TOKEN");
  const results = await $fetch(
    `${config.public.dSpacePublic}/submission/workspaceitems/${workspaceid}/item`,
    {
      credentials: "include",
      headers: new Headers({
        //@ts-expect-error
        Authorization: "Bearer " + bearer.value.accessToken,
        "X-XSRF-TOKEN": `${dSpaceToken.value}`,
      }),
    }
  );
  return results;
};

export const fetchWorkspaceFiles = async (workspaceid: string) => {
  const config = useRuntimeConfig();
  const bearer = useCookie("dsAccessToken");
  const dSpaceToken = useCookie("X-XSRF-TOKEN");
  const results = await $fetch(
    `${config.public.dSpacePublic}/submission/workspaceitems/${workspaceid}`,
    {
      credentials: "include",
      headers: new Headers({
        //@ts-expect-error
        Authorization: "Bearer " + bearer.value.accessToken,
        "X-XSRF-TOKEN": `${dSpaceToken.value}`,
      }),
    }
  );

  return results;
};
