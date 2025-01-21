export const backgroundBanner = (bookType: string) => {
  switch (bookType) {
    case "Text":
      return "bg-violet-3";
    case "Print":
      return "bg-green-3";
    case "Buku":
      return "bg-red-3";
    default:
      return "bg-gray-3";
  }
};
