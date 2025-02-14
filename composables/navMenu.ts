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
        "Kandaga merupakan branding dari Perpustakaan Pusat di Universitas Padjadjaran yang dikelola oleh Kantor Pengelolaan Perpustakaan. Kandaga menjadi portal dan layanan dari Perpustakaan Pusat untuk memenuhi kebutuhan kegiatan belajar dan mengajar mahasiswa serta dosen. Kandaga memberikan layanan dan fasilitas yang bisa dimanfaatkan oleh seluruh mahasiswa, dosen serta tenaga kependidikan.",
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
        "Profil Perpustakaan Pusat Universitas Padjadjaran mencakup gambaran menyeluruh tentang identitas, misi, koleksi, layanan, dan kegiatan yang ditawarkan oleh sebuah perpustakaan. Ini memberikan pemahaman tentang tujuan dan fokus perpustakaan serta bagaimana perpustakaan berfungsi untuk melayani kebutuhan pengguna dan masyarakat secara umum.",
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
    // {
    //   id: 5,
    //   name: "Struktur Fungsi",
    //   url: "/kandaga/struktur",
    //   nameEN: "Functional Structure",
    //   urlEN: "/en/kandaga/struktur",
    //   deskripsi:
    //     "Struktur Organisasi dari pengelolaan Kandaga sebagai institusi dan lembaga dibawah naungan Universitas Padjadjaran.",
    //   deskripsiEN: "",
    //   imgUrl: "",
    // },
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
        "Galeri ini menampilkan berbagai koleksi visual yang dimiliki oleh Kandaga Universitas Padjadjaran. Pengunjung dapat melihat berbagai foto, video, dan media lainnya yang berkaitan dengan kegiatan dan fasilitas Kandaga.",
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
        "Perpustakaan ini menyediakan berbagai koleksi buku, jurnal, dan sumber daya lainnya yang dapat diakses oleh mahasiswa, dosen, dan pengunjung lainnya. Perpustakaan ini juga menawarkan ruang baca dan layanan peminjaman buku.",
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
        "Arsip ini menyimpan berbagai dokumen dan catatan penting yang berkaitan dengan sejarah dan kegiatan Kandaga. Pengunjung dapat mengakses arsip ini untuk keperluan penelitian dan referensi.",
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
        "Museum ini menampilkan berbagai artefak dan koleksi bersejarah yang dimiliki oleh Kandaga Universitas Padjadjaran. Pengunjung dapat belajar tentang sejarah dan budaya melalui pameran yang ada di museum ini.",
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
        "Repositori ini menyimpan berbagai karya ilmiah, tesis, dan disertasi yang dihasilkan oleh mahasiswa dan dosen Universitas Padjadjaran. Pengunjung dapat mengakses repositori ini untuk keperluan akademik dan penelitian.",
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
        "E-Teater ini menyediakan berbagai konten multimedia seperti film, dokumenter, dan video edukasi yang dapat diakses secara daring. Pengunjung dapat menikmati berbagai tayangan yang disediakan oleh Kandaga.",
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
        "Koleksi Hayati ini menampilkan berbagai spesimen dan sampel biologis yang dimiliki oleh Kandaga Universitas Padjadjaran. Pengunjung dapat mempelajari berbagai aspek biologi melalui koleksi ini.",
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
        "Panduan ini memberikan informasi lengkap mengenai layanan dan fasilitas yang tersedia di Kandaga Universitas Padjadjaran. Pengunjung dapat mengetahui berbagai layanan yang dapat diakses serta fasilitas yang dapat digunakan untuk mendukung kegiatan akademik dan non-akademik.",
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
        "Panduan ini memperkenalkan pustakawan subjek yang bertugas di Kandaga Universitas Padjadjaran. Pustakawan subjek adalah staf perpustakaan yang memiliki keahlian khusus dalam bidang tertentu dan siap membantu pengunjung dalam menemukan informasi yang relevan dengan bidang studi mereka.",
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
        "Panduan ini menyediakan informasi akademik yang penting bagi mahasiswa dan dosen di Universitas Padjadjaran. Informasi ini mencakup jadwal akademik, prosedur pendaftaran, kurikulum, dan berbagai informasi lain yang berkaitan dengan kegiatan akademik di universitas.",
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
        "Panduan ini memberikan informasi mengenai kegiatan belajar mengajar di Universitas Padjadjaran. Pengunjung dapat mengetahui metode pengajaran, fasilitas pendukung, serta berbagai program dan kegiatan yang dirancang untuk meningkatkan kualitas pembelajaran.",
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
        "Panduan ini berisi daftar pertanyaan yang sering diajukan (FAQ) oleh pengunjung Kandaga Universitas Padjadjaran. FAQ ini mencakup berbagai topik mulai dari layanan perpustakaan, prosedur peminjaman, hingga informasi umum tentang fasilitas yang tersedia.",
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
