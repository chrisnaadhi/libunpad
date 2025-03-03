export default defineEventHandler((event) => {
  return [
    {
      namaLayanan: "Pengajuan Bebas Pustaka",
      ikonLayanan: "/icon/mdi--book-check.png",
      deskripsiLayanan: `Layanan Pengajuan Bebas Pustaka dari Perpustakaan Pusat secara daring melalui sistem kami. Pastikan anda sudah membaca <a href="/pengajuan/bebas-pustaka/petunjuk" target="_blank">petunjuk</a> dari kami <a href="https://www.instagram.com/p/C2dve3qPobF" target="_blank">disini</a> atau <a href="/pengajuan/bebas-pustaka/petunjuk" target="_blank">disini</a> sebelum anda mengajukan permohonan Bebas Pustaka.`,
      slug: "/pengajuan/bebas-pustaka",
      slugName: "Ajukan",
      secondSlug: "/pengajuan/bebas-pustaka/data",
      secondSlugName: "Data Pengajuan",
      isActive: true,
    },
    // {
    //   namaLayanan: "Unggah Mandiri ETD",
    //   deskripsiLayanan:
    //     "Layanan Unggah Mandiri untuk Karya ETD (Electronic Theses / Dissertation) Tugas Akhir dalam bentuk Elektronik untuk keperluan serah simpan karya ilmiah ke Institusi. Tugas Akhir dalam bentuk Karya Ilmiah standar Skripsi, Tesis, Disertasi maupun format karya ilmiah yang telah disetujui oleh program studi dan universitas.",
    //   slug: "/pengajuan/unggah-mandiri",
    //   isActive: true,
    // },
    {
      namaLayanan: "Peminjaman Ruangan",
      ikonLayanan: "/icon/mdi--door-open.png",
      deskripsiLayanan:
        "Layanan ini memungkinkan peminjaman ruangan di Perpustakaan Kandaga untuk keperluan kegiatan akademik maupun non-akademik. Pastikan untuk melakukan reservasi terlebih dahulu dan mengikuti aturan yang berlaku.",
      slug: "/pengajuan/peminjaman-ruangan",
      slugName: "Ajukan",
      secondSlug: "/pengajuan/peminjaman-ruangan/data",
      secondSlugName: "Data Peminjaman",
      isActive: true,
    },
    {
      namaLayanan: "Pengajuan Pemeriksaan Turnitin",
      ikonLayanan: "/icon/mdi--file-document-check.png",
      deskripsiLayanan: "Layanan ini menyediakan fasilitas pemeriksaan plagiarisme menggunakan Turnitin untuk mahasiswa dan dosen. Dengan layanan ini, sivitas dapat memastikan orisinalitas karya ilmiah mereka sebelum dipublikasikan atau diserahkan. Pengajuan pemeriksaan dapat dilakukan melalui sistem kami dengan mengikuti prosedur yang telah ditentukan.",
      slug: "/pengajuan/pemeriksaan-turnitin",
      slugName: "Ajukan",
      secondSlug: "/pengajuan/pemeriksaan-turnitin/informasi",
      secondSlugName: "Informasi Ajuan",
      isActive: false,
    },
    {
      namaLayanan: "Kelas Literasi Informasi",
      ikonLayanan: "/icon/mdi--book-information-variant.png",
      deskripsiLayanan:
        "Layanan ini menyediakan kelas literasi informasi untuk mahasiswa dan dosen guna meningkatkan keterampilan dalam mencari, mengevaluasi, dan menggunakan informasi secara efektif. Pendaftaran dapat dilakukan melalui sistem kami dengan mengikuti jadwal yang telah ditentukan.",
      slug: "/pengajuan/kelas-literasi-informasi",
      slugName: "Ajukan",
      secondSlug: "/pengajuan/kelas-literasi-informasi/data",
      secondSlugName: "Informasi Ajuan",
      isActive: false,
    },
    {
      namaLayanan: "Konsultasi Perpustakaan",
      ikonLayanan: "/icon/mdi--person-help.png",
      deskripsiLayanan: "Layanan ini menyediakan konsultasi dengan pustakawan untuk membantu sivitas akademika dalam mencari referensi, menggunakan basis data, dan memanfaatkan sumber informasi lainnya secara efektif. Pendaftaran konsultasi dapat dilakukan melalui sistem kami dengan memilih jadwal yang tersedia.",
      slug: "/pengajuan/konsultasi",
      slugName: "Ajukan",
      secondSlug: "/pengajuan/konsultasi/informasi",
      secondSlugName: "Informasi Ajuan",
      isActive: false,
    },
    {
      namaLayanan: "Kunjungan dan Tur Kandaga",
      ikonLayanan: "/icon/mdi--office-building-marker.png",
      deskripsiLayanan: "Layanan ini menyediakan fasilitas kunjungan dan tur ke Perpustakaan Kandaga untuk kelompok mahasiswa, dosen, dan masyarakat umum. Dengan layanan ini, pengunjung dapat mengenal lebih dekat dengan koleksi, layanan, dan fasilitas yang tersedia di Perpustakaan Kandaga. Pendaftaran kunjungan dan tur dapat dilakukan melalui sistem kami dengan memilih jadwal yang tersedia.",
      slug: "/pengajuan/kunjungan",
      slugName: "Ajukan",
      secondSlug: "/pengajuan/kunjungan/informasi",
      secondSlugName: "Informasi Ajuan",
      isActive: false,
    },
  ];
});
