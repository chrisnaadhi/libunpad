export const getCSRFToken = async () => {
  const dSpaceToken = useCookie("X-XSRF-TOKEN");
  const config = useRuntimeConfig();

  await $fetch("https://repository.unpad.ac.id/server/api", {
    method: "GET",
    credentials: "include",
    onResponse({ response }) {
      dSpaceToken.value = response.headers.get("dspace-xsrf-token");
    },
  });
};

export const loginToDspace = async () => {
  const dSpaceToken = useCookie("X-XSRF-TOKEN");
  const dSpaceBearer = useCookie("dsAccessToken");
  const config = useRuntimeConfig();

  await $fetch(config.dSpaceAuth, {
    method: "POST",
    credentials: "include",
    headers: {
      "Accept": "/",
      "X-XSRF-TOKEN": dSpaceToken.value ?? "",
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": "DSPACE-XSRF-COOKIE=" + dSpaceToken.value,
    },
    body: `user=${config.dSpaceEmail}&password=${config.dSpacePassword}`,
    onResponse({ response, options }) {
      const date = new Date();
      const JWTValue = `%22accessToken%22:${response.headers
        .get("Authorization")
        ?.split(" ")
        .at(1)}%22%2C%22expires%22:${new Date(
          date.getTime() + 30 * 60000
        ).getTime()}`;
      dSpaceBearer.value = `{${JWTValue}}`;
    },
  });
};
