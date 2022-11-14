export default defineEventHandler((event) => {
  return {
    statusCode: event.res.statusCode,
    msg: "Waduh sepertinya kamu tersesat, silahkan kembali ke halaman utama",
  };
});
