export const booksData = () => {
  return [
    {
      id: 100,
      cover:
        "https://chrisnaadhi.github.io/open-library-frontpage/assets/images/books/html.png",
      judul: "Introduction to HTML",
      path: "introduction-to-html",
      author: "Laurence Svekis",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, id.",
      tipe: "Rekomendasi",
    },
    {
      id: 200,
      cover:
        "https://chrisnaadhi.github.io/open-library-frontpage/assets/images/books/css.png",
      judul: "Mastering CSS",
      path: "mastering-css",
      author: "Rich Finelli",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, molestias.",
      tipe: "Populer",
    },
    {
      id: 300,
      cover:
        "https://chrisnaadhi.github.io/open-library-frontpage/assets/images/books/js.png",
      judul: "Javascript by Example",
      path: "javascript-by-example",
      author: "Dani Akash S.",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, delectus.",
      tipe: "Terbaru",
    },
    {
      id: 400,
      cover: "https://learning.oreilly.com/library/cover/9781785888960/250w/",
      judul: "Mastering Node.js",
      path: "mastering-node-js",
      author: "Sandro Pasquali, Kevin Faaborg",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, unde?",
      tipe: "Rating Tinggi",
    },
  ];
};

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
