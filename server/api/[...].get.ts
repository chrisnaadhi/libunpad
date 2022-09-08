export default defineEventHandler((event) => {
  const firstNumber: number = 50;

  return {
    status: "responded",
    id: Math.floor(Math.random() * firstNumber * 1000),
    nama: "Chrisna Adhi Pranoto",
    path: "The Path is: " + event.req.url,
    statusCode: event.res.statusCode,
    msg: "OK" || event.res.statusMessage,
  };
});
