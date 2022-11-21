export default defineEventHandler((event) => {
  if (event.node.res.statusCode === 200) {
    return useDirectus();
  } else {
    return event.node.res.statusMessage;
  }
});
