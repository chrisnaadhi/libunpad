export default defineEventHandler((event) => {
  return {
    urlPath: event.req.url,
    msg: "Yay! you got it through the Visitor Pages.",
  };
});
