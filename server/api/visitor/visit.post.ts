export default defineEventHandler((event) => {
  const body = useBody(event);
  return {
    body,
  };
});
