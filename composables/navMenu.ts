import { defineStore } from "pinia";

export const menuContent = () => {
  const tentang = [
    {
      id: 1,
      name: "Kandaga",
      url: "/kandaga",
      nameEN: "Kandaga",
      urlEN: "/en/kandaga",
      deskripsi:
        "Kandaga merupakan branding dari Pusat Pengelolaan Pengetahuan untuk Perpustakaan Pusat di Universitas Padjadjaran. Kandaga menjadi portal dan layanan dari Perpustakaan Pusat untuk memenuhi kebutuhan kegiatan belajar dan mengajar mahasiswa serta dosen. Kandaga memberikan layanan dan fasilitas yang bisa dimanfaatkan oleh seluruh mahasiswa, dosen serta tenaga kependidikan.",
      deskripsiEN: "",
      imgUrl: "",
    },
    {
      id: 2,
      name: "Profil",
      url: "/profil",
      nameEN: "Profile",
      urlEN: "/en/profil",
      deskripsi:
        "Profil Pusat Pengelolaan Pengetahuan Universitas Padjadjaran mencakup gambaran menyeluruh tentang identitas, misi, koleksi, layanan, dan kegiatan yang ditawarkan oleh sebuah perpustakaan. Ini memberikan pemahaman tentang tujuan dan fokus perpustakaan serta bagaimana perpustakaan berfungsi untuk melayani kebutuhan pengguna dan masyarakat secara umum.",
      deskripsiEN: "",
      imgUrl: "",
    },
    {
      id: 3,
      name: "Fasilitas",
      url: "/kandaga/fasilitas",
      nameEN: "Facilities",
      urlEN: "/en/kandaga/fasilitas",
      deskripsi:
        "Daftar Fasilitas yang dimiliki oleh Kandaga Universitas Padjadjaran untuk digunakan oleh mahasiswa, dosen dan pengunjung perpustakaan lainnya. Fasilitas yang tersedia terdiri dari fasilitas umum dan fasilitas khusus untuk dimanfaatkan dalam kegiatan belajar mengajar. Fasilitas khusus memerlukan izin untuk menggunakannya.",
      deskripsiEN: "",
      imgUrl: "",
    },
    {
      id: 4,
      name: "Regulasi",
      url: "/kandaga/regulasi",
      nameEN: "Regulation",
      urlEN: "/en/kandaga/regulasi",
      deskripsi:
        "Peraturan dan Regulasi yang harus ditaati oleh seluruh pengunjung Kandaga. Peraturan ini diatur untuk memudahkan pengunjung untuk melakukan aktivitasnya agar dapat menjaga ketertiban di lingkungan Kandaga sehingga pengunjung lain juga merasa nyaman.",
      deskripsiEN: "",
      imgUrl: "",
    },
    {
      id: 5,
      name: "Struktur Fungsi",
      url: "/kandaga/struktur",
      nameEN: "Functional Structure",
      urlEN: "/en/kandaga/struktur",
      deskripsi:
        "Struktur Organisasi dari pengelolaan Kandaga sebagai institusi dan lembaga dibawah naungan Universitas Padjadjaran.",
      deskripsiEN: "",
      imgUrl: "",
    },
    {
      id: 6,
      name: "Berita & Kegiatan",
      url: "/berita",
      nameEN: "News & Event",
      urlEN: "/en/berita",
      deskripsi:
        "Daftar berita dan kegiatan yang dilaksanakan oleh Kandaga maupun instansi lain yang berkolaborasi dengan Kandaga. Kegiatan rutin yang dilaksanakan oleh Kandaga juga akan terlampir di halaman ini.",
      deskripsiEN: "",
      imgUrl: "",
    },
  ];

  const layanan = [
    {
      id: 7,
      name: "Layanan Daring",
      url: "/layanan/daring",
      nameEN: "Online Service",
      urlEN: "/en/layanan/daring",
      deskripsi:
        "Layanan daring Kandaga merupakan inovasi yang menghadirkan akses informasi dan sumber daya pendidikan secara elektronik, memungkinkan pengguna untuk menjelajahi dan memanfaatkan koleksi perpustakaan tanpa perlu berada di lokasi fisik. Dengan adanya layanan daring ini, perpustakaan dapat memberikan pengalaman pembelajaran yang lebih fleksibel dan mudah diakses bagi masyarakat.",
    },
    {
      id: 8,
      name: "Layanan Luring",
      url: "/layanan/luring",
      nameEN: "Offline Service",
      urlEN: "/en/layanan/luring",
      deskripsi:
        "Layanan luring di perpustakaan merujuk pada pelayanan yang disediakan di lingkungan fisik perpustakaan, di mana pengguna dapat mengakses koleksi, mengambil dan mengembalikan materi, serta berinteraksi langsung dengan sumber daya perpustakaan dan staf. Layanan ini memberikan dukungan langsung kepada pengunjung perpustakaan dengan menyediakan ruang baca, layanan peminjaman buku, dan bantuan langsung dari petugas perpustakaan",
      deskripsiEN: "",
      imgUrl: "",
    },
    {
      id: 9,
      name: "Layanan Administratif",
      url: "/pengajuan",
      nameEN: "Administrative Service",
      urlEN: "/en/pengajuan",
      deskripsi:
        "Layanan administratif di Kandaga mencakup serangkaian fungsi dan proses yang mendukung pengelolaan operasional dan administrasi harian perpustakaan. Ini meliputi pengelolaan anggota, pengelolaan koleksi, pemeliharaan inventaris, administrasi peminjaman dan pengembalian, serta pelaporan dan pengarsipan.",
      deskripsiEN: "",
      imgUrl: "",
    },
    {
      id: 10,
      name: "Layanan Riset",
      url: "/layanan/riset",
      nameEN: "Research Assist",
      urlEN: "/en/layanan/riset",
      deskripsi:
        "Layanan riset di Kandaga menyediakan bantuan dan sumber daya untuk membantu pengguna dalam menemukan informasi yang relevan dan akurat untuk keperluan penelitian mereka. Ini melibatkan bantuan staf perpustakaan dalam melakukan pencarian, menavigasi basis data, mengakses sumber daya elektronik, dan mengevaluasi keandalan sumber informasi.",
      deskripsiEN: "",
      imgUrl: "",
    },
    {
      id: 11,
      name: "Visitor",
      url: "/visitor",
      nameEN: "Visitor",
      urlEN: "/en/visitor",
      deskripsi:
        "Fitur Visitor untuk pengunjung Kandaga. Rekapan data kunjungan dan survey.",
      deskripsiEN: "",
      imgUrl: "",
    },
  ];

  const koleksi = [
    {
      id: 12,
      name: "Galeri",
      url: "/gallery",
      nameEN: "Gallery",
      urlEN: "/en/gallery",
      deskripsi:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eos earum debitis aspernatur repudiandae possimus eligendi? Quod culpa consectetur id enim facere quam nemo aliquam sit, qui dignissimos consequatur est alias illo rem voluptas ut voluptatem, placeat iusto. Perspiciatis nisi voluptatem laborum quos nostrum non soluta consequuntur, doloribus sed dolor numquam repellat, facere odit blanditiis atque praesentium dignissimos quas unde! Voluptate exercitationem vitae dolorem non neque reiciendis doloremque totam, incidunt hic nemo obcaecati cumque expedita sapiente quos quis nobis aperiam, est possimus? Dolorem ducimus mollitia possimus eos, adipisci reprehenderit exercitationem accusantium nobis autem, pariatur molestias alias nesciunt numquam! Provident, laborum?",
      deskripsiEN: "",
      imgUrl: "",
    },
    {
      id: 13,
      name: "Perpustakaan",
      url: "/library",
      nameEN: "Library",
      urlEN: "/en/library",
      deskripsi:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati molestiae voluptatum in impedit a consequatur earum dignissimos, voluptates illo dolorem perspiciatis debitis ullam praesentium facere, libero, repellendus totam amet! Necessitatibus dignissimos nostrum eum doloremque ad commodi architecto odio placeat, incidunt quae distinctio officia ea, quos, perspiciatis totam. Quas aliquam nemo omnis. Soluta laudantium harum illo fugit atque. Saepe harum velit repellendus aut ratione accusamus obcaecati, iure maxime, nostrum reprehenderit unde quae placeat quisquam facilis consequuntur quod earum! Error laboriosam veniam unde eaque sapiente vel voluptate temporibus dolores iusto nihil, corrupti harum sit veritatis nostrum! Quia distinctio numquam quos autem quam?",
      deskripsiEN: "",
      imgUrl: "",
    },
    {
      id: 14,
      name: "Arsip",
      url: "/records",
      nameEN: "Archive",
      urlEN: "/en/records",
      deskripsi:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil ab dolorum perspiciatis odio sequi, iusto iste ipsa in esse magnam, quaerat debitis repudiandae repellendus velit temporibus sapiente corrupti fugit adipisci cumque ipsum. Corporis quaerat inventore, quisquam iusto asperiores dolorem eligendi possimus sapiente vel eum necessitatibus odit adipisci iste molestiae saepe at quas voluptas, fuga veniam? Molestias magnam repellat quo et veritatis praesentium dolore natus illo possimus cupiditate fugit minima quae, quod deleniti hic, ducimus eum, a ipsa ab quia sequi tempore sed quaerat. Ex, optio. Enim quae, libero numquam ut rem nemo debitis inventore, earum, ab temporibus ratione ad asperiores.",
      deskripsiEN: "",
      imgUrl: "",
    },
    {
      id: 15,
      name: "Museum",
      url: "/museum",
      nameEN: "Museum",
      urlEN: "/en/museum",
      deskripsi:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime quo aliquid quisquam enim praesentium fugiat quia omnis officia, quibusdam accusantium beatae voluptate, quod facilis vitae perspiciatis est fugit odio consequatur. Id ad aliquid ut saepe nostrum ipsum dolorem, iusto quidem consectetur inventore molestias, exercitationem enim maiores repellat autem incidunt? Cum consequuntur dolor ut voluptatum quasi molestias doloremque incidunt vel culpa tenetur asperiores quidem odio voluptate facilis non, laborum tempora sequi nihil provident quisquam nisi distinctio maiores harum! Consectetur eius obcaecati inventore repellendus. Fugit, culpa soluta? Molestiae rerum, dicta ducimus hic fuga id natus reiciendis illum quis inventore ipsam, illo cumque?",
      deskripsiEN: "",
      imgUrl: "",
    },
    {
      id: 16,
      name: "Repositori",
      url: "/koleksi/repository",
      nameEN: "Repository",
      urlEN: "/en/koleksi/repository",
      deskripsi:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut excepturi iure cumque minima necessitatibus praesentium culpa explicabo soluta, error aperiam cum voluptates repellendus neque reprehenderit esse quidem accusantium beatae? Deserunt consequatur commodi vitae recusandae quas similique provident laudantium quis modi ad in odit tenetur natus, quidem soluta! Earum incidunt voluptate nostrum libero adipisci quisquam asperiores, facilis ab laudantium qui quas perspiciatis necessitatibus veritatis exercitationem ut aspernatur. Doloremque delectus eius earum, tempore recusandae consectetur tenetur deleniti dicta culpa minus adipisci debitis quae. Culpa nisi doloribus asperiores, iste est commodi saepe vel numquam maxime facilis perspiciatis eveniet cum repudiandae? Corporis, in nesciunt?",
      deskripsiEN: "",
      imgUrl: "",
    },
    {
      id: 17,
      name: "E-Teater",
      url: "/e-teater",
      nameEN: "E-Theater",
      urlEN: "/en/e-teater",
      deskripsi:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem repellendus error, molestias placeat neque eum in dolorem facere, odio earum similique culpa quasi praesentium, ut nostrum vero accusantium eos perspiciatis consequatur. Inventore temporibus labore delectus sit, culpa blanditiis quasi mollitia pariatur est, ratione minima officia, iure nemo eveniet commodi libero sequi dolore laudantium? Nihil, obcaecati cupiditate. Consequuntur placeat ab possimus quibusdam! Veritatis sed quisquam minima exercitationem aut rerum commodi hic impedit temporibus velit eaque odio animi, nam, est a? Esse, officiis! Nihil, ut? Quaerat rerum fuga molestiae velit, provident impedit molestias aliquam, omnis quisquam, dolorem accusamus unde repudiandae porro enim?",
      deskripsiEN: "",
      imgUrl: "",
    },
    {
      id: 18,
      name: "Koleksi Hayati",
      url: "/koleksi-hayati",
      nameEN: "Biological Collection",
      urlEN: "/en/koleksi-hayati",
      deskripsi:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nihil dolorum cupiditate magnam non nisi quae repellat officia officiis quis quia incidunt ipsum rerum, amet at totam commodi dolore voluptate obcaecati, provident consectetur harum illum! Voluptatum voluptatem soluta accusamus optio, enim accusantium animi officia eveniet itaque ullam? Nihil debitis optio aliquid architecto. Culpa alias quis facilis, commodi ducimus sed aliquid suscipit laborum quisquam sapiente at illo fugit quidem nam modi? Nihil deleniti corrupti odio veritatis, neque autem exercitationem nam dignissimos velit animi ipsa aspernatur cumque est quas reiciendis laudantium modi ut accusantium pariatur porro doloribus repudiandae optio libero? Ea, quas.",
      deskripsiEN: "",
      imgUrl: "",
    },
  ];

  const panduan = [
    {
      id: 19,
      name: "Layanan & Fasilitas",
      url: "/panduan",
      nameEN: "Services & Facilities",
      urlEN: "/en/panduan",
      deskripsi:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni officia similique molestiae quibusdam impedit iste laboriosam quis, laudantium ea consequatur dignissimos vero itaque dolor enim ut quod aliquid fugiat odit. Est exercitationem iste eius placeat pariatur sint sequi dolorum aliquid rerum natus, architecto fugit, explicabo ad modi necessitatibus voluptatibus sunt. Quod aspernatur odit fuga necessitatibus deleniti hic impedit vitae voluptatum! Velit temporibus quibusdam aliquid corrupti eaque laboriosam consectetur eligendi doloremque tempora, recusandae incidunt in dolor eius voluptatem voluptatum? Libero obcaecati veritatis ratione mollitia non harum asperiores, ab magnam deserunt dicta soluta nam repellat nisi labore adipisci in odit iusto vero!",
      deskripsiEN: "",
      imgUrl: "",
    },
    {
      id: 20,
      name: "Pustakawan Subjek",
      url: "/panduan/pustakawan-subjek",
      nameEN: "Subject Librarians",
      urlEN: "/en/panduan/pustakawan-subjek",
      deskripsi:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum dicta voluptatem porro quasi beatae, eos recusandae quaerat deleniti a, sed dignissimos, totam eligendi architecto. Repudiandae ea voluptatibus a sequi quae corporis quos delectus quis voluptates quo eveniet consectetur odio velit, placeat consequuntur repellendus distinctio rerum id. Aliquid, architecto fugiat! Blanditiis, deserunt aspernatur accusamus iste quo quam veniam perferendis optio, omnis odio voluptas fugiat rerum ipsa alias officiis? Corrupti, nam reiciendis. Ipsam, nisi. Minus repellendus quod iste soluta officiis eos ex blanditiis quaerat sapiente, a alias commodi omnis ducimus autem nobis quibusdam eligendi dolorum aut cumque ea obcaecati sed ullam doloribus.",
      deskripsiEN: "",
      imgUrl: "",
    },
    {
      id: 21,
      name: "Informasi Akademik",
      url: "/panduan/informasi-akademik",
      nameEN: "Academic Information",
      urlEN: "/en/panduan/informasi-akademik",
      deskripsi:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur voluptate corrupti quibusdam ex, illum nihil error odio non architecto ullam illo excepturi vitae, labore, possimus explicabo. Temporibus maiores id enim qui, architecto ipsa perferendis sunt. Esse possimus accusantium mollitia illo modi quis pariatur molestias cumque. Velit adipisci nobis, ipsum quos iste porro est incidunt? Veniam atque dolor aliquam nihil, rem, doloremque dolores quam sequi sunt saepe ipsam, eos sit non tempore. Temporibus nulla dolores natus ipsam tenetur ipsum aperiam tempora veniam reiciendis error quisquam cumque laboriosam esse eos, pariatur tempore illo voluptate non doloribus placeat ea aut repellat saepe cum.",
      deskripsiEN: "",
      imgUrl: "",
    },
    {
      id: 22,
      name: "Kegiatan Belajar Mengajar",
      url: "/panduan/kbm",
      nameEN: "Teaching & Learning Guide",
      urlEN: "/en/panduan/kbm",
      deskripsi:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati perferendis illum repellendus quibusdam omnis, alias iure dolor, doloribus necessitatibus corrupti possimus, excepturi optio illo rem nulla recusandae quasi. Reiciendis tempore et nemo. Aliquam adipisci dolorem molestiae nostrum unde possimus similique tempora id aspernatur earum odio natus a numquam, tempore et dolores temporibus, ut voluptates voluptatem doloribus eveniet excepturi commodi? Amet quod hic nobis tempore nesciunt nihil, possimus omnis temporibus eveniet quo, odio quisquam quasi autem officia distinctio maxime dolorum nemo placeat porro non dolor! Magnam vitae, temporibus voluptate quaerat illo similique iusto, exercitationem natus cumque dolor ipsum fugit dolorum recusandae.",
      deskripsiEN: "",
      imgUrl: "",
    },
    {
      id: 23,
      name: "FAQ",
      url: "/panduan/faq",
      nameEN: "FAQ",
      urlEN: "/en/panduan/faq",
      deskripsi:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo alias voluptatum, possimus eveniet placeat vitae temporibus, itaque corrupti molestiae maxime doloribus praesentium qui similique iste odio quos nobis. Nesciunt neque magni veritatis sit beatae asperiores aut eos distinctio quas. Nulla quidem a deleniti facilis dolore voluptatibus similique, illum velit ducimus optio rem nemo in consequatur fugiat tempore! Minima ad quibusdam saepe est delectus, excepturi debitis sequi voluptate provident! Consequatur totam dicta dolor iste! Porro blanditiis quaerat unde quos fugiat. Quos est aperiam voluptatum sapiente totam quibusdam, possimus nostrum hic? Eligendi veritatis distinctio inventore vero possimus quos illum illo nesciunt odio?",
      deskripsiEN: "",
      imgUrl: "",
    },
  ];

  const allMenu = [...tentang, ...layanan, ...koleksi, ...panduan];

  return {
    tentang,
    layanan,
    koleksi,
    panduan,
    allMenu,
  };
};

export const mobileMenu = defineStore("mobile", () => {
  const menuState = ref(false);
  const isTentangOpen = ref(false);
  const isLayananOpen = ref(false);
  const isKoleksiOpen = ref(false);
  const isPanduanOpen = ref(false);
  const isLocaleOpen = ref(false);
  function changeMenuState() {
    menuState.value = !menuState.value;
  }

  return {
    menuState,
    isTentangOpen,
    isLayananOpen,
    isKoleksiOpen,
    isPanduanOpen,
    changeMenuState,
    isLocaleOpen,
  };
});

export const navigationMenuBar = defineStore("navigationMenuBar", () => {
  const viewedMenuName = ref("");
  const viewState = ref(false);

  const clickDropdown = (menu: string) => {
    if (viewedMenuName.value !== "") {
      viewedMenuName.value = "";
      viewState.value = !viewState.value;
    } else {
      viewedMenuName.value = menu;
      viewState.value = !viewState.value;
    }
  };

  const viewDropdown = (menu: string) => {
    viewedMenuName.value = menu;
    viewState.value = true;
  };

  const leaveDropdown = () => {
    viewedMenuName.value = "";
    viewState.value = false;
  };

  return {
    viewedMenuName,
    viewState,
    clickDropdown,
    viewDropdown,
    leaveDropdown,
  };
});
