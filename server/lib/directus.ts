export default defineEventHandler((event) => {
  if (event.res.statusCode === 200) {
    return useDirectus();
  } else {
    return event.res.statusMessage;
  }
});
