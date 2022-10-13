export const backgroundBanner = (bookType: string) => {
  switch (bookType) {
    case "Terbaru":
      return "bg-violet-3";
    case "Rekomendasi":
      return "bg-green-3";
    case "Populer":
      return "bg-red-3";
    default:
      return "bg-gray-3";
  }
};
