import { ref } from "vue";
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const cookieVal = getCookie(event, "DSPACE-XSRF-COOKIE");
  const nowCookie = ref();

  if (cookieVal === undefined) {
    await fetch(config.dSpaceURL, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, '/'",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setCookie(
          event,
          "DSPACE-XSRF-COOKIE",
          res.headers.get("dspace-xsrf-token"),
          {
            // secure: true,
            // path: "/server",
          }
        );

        setCookie(event, "X-XSRF-TOKEN", res.headers.get("dspace-xsrf-token"), {
          // secure: true,
          // path: "/server",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    // await fetch(config.dSpaceAuth, {
    //   method: "POST",
    //   headers: {},
    // });
    // return {
    //   status: "OK",
    //   cookieVal,
    // };
  }
});
