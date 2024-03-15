export default defineNuxtRouteMiddleware(async () => {
  const dSpaceToken = useCookie("X-XSRF-TOKEN");
  const dSpaceAccess = useCookie("dsAccessToken");
  const config = useRuntimeConfig();
  const { data, status } = useAuth();

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

    if (status.value === "authenticated") {
      if (!dSpaceAccess.value) {
        await $fetch(config.public.dSpaceAuthPublic, {
          method: "POST",
          credentials: "include",
          headers: new Headers({
            Accept: "*/*",
            "X-XSRF-TOKEN": dSpaceToken.value ?? "",
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
              accessToken: response.headers
                .get("Authorization")
                ?.split(" ")
                .at(1),
              expires: date.getTime() + 30 * 60000,
            };
            dSpaceAccess.value = JSON.stringify(accessObject);
          },
          onResponseError({ error }) {
            console.error(error);
          },
        });
      }
    }

    if (dSpaceAccess.value && status.value === "authenticated") {
      setInterval(async () => {
        const date = new Date();
        const fiveMinutes = date.getTime() + 5 * 60000;
        const dspace = dSpaceAccess.value as any;
        const dSpaceToken = useCookie("X-XSRF-TOKEN");

        if (fiveMinutes > dspace.expires) {
          await $fetch(config.public.dSpaceAuthPublic, {
            method: "POST",
            credentials: "include",
            headers: new Headers({
              Accept: "*/*",
              Authorization: "Bearer " + dspace.accessToken,
              "X-XSRF-TOKEN": `${dSpaceToken.value}`,
            }),
            async onResponse({ response }) {
              if (response.headers.get("DSPACE-XSRF-TOKEN") !== null) {
                dSpaceToken.value = response.headers.get("DSPACE-XSRF-TOKEN");
              }
              const date = new Date();
              const accessObject = {
                accessToken: response.headers
                  .get("Authorization")
                  ?.split(" ")
                  .at(1),
                expires: date.getTime() + 30 * 60000,
              };
              dSpaceAccess.value = JSON.stringify(accessObject);
              await refreshNuxtData();
            },
          });
        } else {
          console.log(
            "DSpace Token will be expired in : " + new Date(dspace.expires)
          );
        }
      }, 60000);
    }
  }
});
