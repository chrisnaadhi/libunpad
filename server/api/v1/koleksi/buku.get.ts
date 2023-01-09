export default defineEventHandler(async (event) => {
  return {
    statusCode: event.node.res.statusCode,
    results: [
      {
        id: 100,
        cover:
          "https://d3mxt5v3yxgcsr.cloudfront.net/courses/5/course_5_image.jpg",
        judul: "HTML: Hypertext Markup Language",
        slugs: "html-tutorialspoint",
        author: "Laurence Svekis",
        description:
          "Html stands for hyper text markup language, which is the most widely used language on web to develop web pages. Html was created by berners-lee in late 1991 but 'html 2.0' was the first standard html specification which was published in 1995. Html 4.01 was a major version of html and it was published in late 1999. Though html 4.01 version is widely used but currently we are having html-5 version which is an extension to html 4.01, and this version was published in 2012",
        tipe: "Rekomendasi",
        fileAttachment: "https://www.africau.edu/images/default/sample.pdf",
      },
      {
        id: 200,
        cover:
          "https://d3mxt5v3yxgcsr.cloudfront.net/courses/7/course_7_image.jpg",
        judul: "CSS: Cascading Style Sheets",
        slugs: "css-tutorialspoint",
        author: "Rich Finelli",
        description:
          "CSS is used to control the style of a web document in a simple and easy way. CSS is the acronym for 'Cascading Style Sheet'. This tutorial covers both the versions CSS1,CSS2 and CSS3, and gives a complete understanding of CSS, starting from its basics to advanced concepts. Cascading Style Sheets, fondly referred to as CSS, is a simple design language intended to simplify the process of making web pages presentable. CSS is a MUST for students and working professionals to become a great Software Engineer specially when they are working in Web Development Domain",
        tipe: "Populer",
        fileAttachment: "https://www.africau.edu/images/default/sample.pdf",
      },
      {
        id: 300,
        cover:
          "https://d3mxt5v3yxgcsr.cloudfront.net/courses/4/course_4_image.jpg",
        judul: "Javascript Language Tutorial",
        slugs: "javascript-tutorialspoint",
        author: "Dani Akash S.",
        description:
          "JavaScript is a lightweight, interpreted programming language. It is designed for creating network-centric applications. It is complimentary to and integrated with Java. JavaScript is very easy to implement because it is integrated with HTML. It is open and cross-platform. Javascript is the most popular programming language in the world and that makes it a programmer’s great choice. Once you learnt Javascript, it helps you developing great front-end as well as back-end softwares using different Javascript based frameworks like jQuery, Node.JS etc",
        tipe: "Terbaru",
        fileAttachment: "https://www.africau.edu/images/default/sample.pdf",
      },
      {
        id: 400,
        cover:
          "https://d3mxt5v3yxgcsr.cloudfront.net/courses/444/course_444_image.jpg",
        judul: "Mastering Node.js Runtime",
        slugs: "mastering-node-js",
        author: "Sandro Pasquali, Kevin Faaborg",
        description:
          "Node.js is a very powerful JavaScript-based platform built on Google Chrome's JavaScript V8 Engine. It is used to develop I/O intensive web applications like video streaming sites, single-page applications, and other web applications. Node.js is open source, completely free, and used by thousands of developers around the world. Node.js is a platform built on Chrome's JavaScript runtime for easily building fast and scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.",
        tipe: "Rating Tinggi",
        fileAttachment: "https://www.africau.edu/images/default/sample.pdf",
      },
    ],
  };
});
