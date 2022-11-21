export default defineEventHandler((event) => {
  const firstNumber: number = 50;

  return {
    status: "responded",
    id: Math.floor(Math.random() * firstNumber * 1000),
    nama: "Chrisna Adhi Pranoto",
    path: "The Path is: " + event.node.req.url,
    statusCode: event.node.res.statusCode,
    msg: "OK" || event.node.res.statusMessage,
  };
});
