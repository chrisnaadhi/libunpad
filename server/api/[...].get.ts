export default defineEventHandler((event) => {
  const firstNumber: number = 50;

  return {
    status: "Responded",
    id: Math.floor(Math.random() * firstNumber * 1000),
    nama: "Chrisna Adhi Pranoto",
    path: "The Path is: " + event.node.req.url,
    statusCode: event.node.res.statusCode,
    statusMessage: "Ok",
  };
});
