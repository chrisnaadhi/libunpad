export default defineEventHandler((event) => {
  const firstNumber: number = 50;

  return {
    status: "API Responded",
    randomNumber: Math.floor(Math.random() * firstNumber * 1000),
    developerName: "Chrisna Adhi Pranoto",
    yourPath: "The Path is: " + event.node.req.url,
    statusCode: event.node.res.statusCode,
  };
});
