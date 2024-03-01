import { onMounted } from "vue";

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

export const getDSpaceAccessToken = async () => {
  const dSpaceToken = useCookie("X-XSRF-TOKEN");
  const dSpaceAccess = useCookie("dsAccessToken");
  const config = useRuntimeConfig();

  if (process.client) {
    await $fetch(config.public.dSpaceAuthPublic, {
      method: "POST",
      credentials: "include",
      headers: new Headers({
        Accept: "*/*",
        "X-XSRF-TOKEN": `${dSpaceToken.value}`,
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: "DSPACE-XSRF-COOKIE=" + dSpaceToken.value,
      }),
      body: config.public.dSpaceCredentials,
      onResponse({ response }) {
        if (response.headers.get("DSPACE-XSRF-TOKEN") !== null) {
          dSpaceToken.value = response.headers.get("DSPACE-XSRF-TOKEN");
        }
        const date = new Date();
        const accessObject = {
          accessToken: response.headers.get("Authorization")?.split(" ").at(1),
          expires: date.getTime() + 30 * 60000,
        };
        dSpaceAccess.value = JSON.stringify(accessObject);
      },
      onResponseError({ error }) {
        console.error(error);
      },
    });
  }
};

export const refreshAccessToken = async () => {
  const dSpaceToken = useCookie("X-XSRF-TOKEN");
  const dSpaceAccess = useCookie("dsAccessToken");
  const config = useRuntimeConfig();

  if (process.client) {
    await $fetch(config.public.dSpaceAuthPublic, {
      method: "POST",
      credentials: "include",
      headers: new Headers({
        Accept: "*/*",
      }),
    });
  }
};
