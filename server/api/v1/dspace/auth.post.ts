const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const login = await fetch(config.dSpaceAuth, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json,",
    },
    body: JSON.stringify({
      email: config.dSpaceEmail,
      password: config.dSpacePassword,
    }),
  });

  return {};
});
