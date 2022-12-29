export default defineEventHandler((event) => {
  return {
    statusCode: event.node.res.statusCode,
    msg: "You got that!",
  };
});
