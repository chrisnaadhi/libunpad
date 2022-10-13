export default defineEventHandler((event) => {
  return {
    statusCode: event.res.statusCode,
    results: [
      {
        id: 100,
        cover:
          "https://chrisnaadhi.github.io/open-library-frontpage/assets/images/books/html.png",
        judul: "Introduction to HTML",
        path: "introduction-to-html",
        author: "Laurence Svekis",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptatum quod dolores perspiciatis voluptas nostrum non, assumenda nam tempora alias placeat, blanditiis pariatur nesciunt. Perferendis adipisci, ipsum hic in repudiandae dolorem neque repellendus, ipsa accusantium amet soluta ipsam architecto obcaecati nihil asperiores aperiam voluptate iusto. Fugit cupiditate iure voluptatibus praesentium deserunt suscipit eligendi a unde aut earum accusamus doloremque tenetur cum porro, ullam fuga obcaecati atque! Excepturi odit sint exercitationem, repellat eum sequi aliquid cumque eos maiores dolorum quidem libero placeat in repudiandae iure voluptate. Quasi sequi velit ullam consectetur non, praesentium unde numquam voluptatem laborum at quaerat quod modi?",
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
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam tempora laboriosam nihil ab accusamus cupiditate illo. Voluptas voluptate mollitia magnam officia maxime deserunt. Officia quae nam hic architecto ipsa. Distinctio quaerat animi, expedita quos exercitationem labore incidunt modi. Laudantium quo voluptatem ratione atque officiis reprehenderit doloremque, odio corrupti! Repellendus exercitationem obcaecati quod est reiciendis non culpa natus eaque accusantium eum, eius praesentium at ducimus dolorum doloribus eos maxime error! Quos alias debitis nihil reprehenderit in explicabo eaque ad dignissimos voluptatum modi, quasi itaque doloremque, rerum ea! Incidunt nemo, qui dolores, vero id, delectus quisquam iure possimus et minus hic adipisci.",
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
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto magni nihil accusamus dolorum quia sed illo ab tempore nesciunt. Dolores odit voluptatibus, enim sit doloremque aperiam sunt ipsam ut sapiente, corporis veniam tempora officiis ea suscipit quibusdam, quo dicta repellendus tempore nostrum cumque minus? In sapiente cupiditate atque velit nulla delectus, voluptatem inventore modi similique qui hic. Doloribus id, consequuntur quae soluta quia voluptatum possimus quod facilis modi placeat, et tenetur officia facere tempora impedit, excepturi fuga? Dolore aperiam facere officiis consectetur, at, porro magni cum voluptas ipsam tempore, autem optio. Totam, rerum similique perspiciatis dolorem impedit harum. Earum, similique.",
        tipe: "Terbaru",
      },
      {
        id: 400,
        cover: "https://learning.oreilly.com/library/cover/9781785888960/250w/",
        judul: "Mastering Node.js",
        path: "mastering-node-js",
        author: "Sandro Pasquali, Kevin Faaborg",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste consequatur facere maiores sapiente dignissimos quis quisquam sequi et nulla? Aliquam at accusamus pariatur commodi neque, quisquam dolores iusto, nisi provident magnam a corrupti, recusandae doloribus tempora cumque temporibus ullam sint optio reiciendis? Aut quasi porro vitae, beatae assumenda deleniti modi perspiciatis iure eius nulla aliquam veritatis sint incidunt ab animi suscipit adipisci nihil. Delectus animi architecto repellendus, nisi maiores unde magni, explicabo fuga eum perferendis asperiores aut quaerat porro at voluptas et similique voluptatem accusantium repudiandae deserunt. Earum sed, voluptatibus fuga eos quis est vitae atque aliquid aperiam quam laborum!",
        tipe: "Rating Tinggi",
      },
    ],
  };
});
