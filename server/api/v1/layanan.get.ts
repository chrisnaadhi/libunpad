export default defineEventHandler((event) => {
  return [
    {
      namaLayanan: "Pengajuan Bebas Pustaka",
      deskripsiLayanan: `Layanan Pengajuan Bebas Pustaka dari Perpustakaan Pusat secara daring melalui sistem kami. Pastikan anda sudah membaca <a href="/pengajuan/bebas-pustaka/petunjuk" target="_blank">petunjuk</a> dari kami <a href="https://www.instagram.com/p/C2dve3qPobF" target="_blank">disini</a> atau <a href="/pengajuan/bebas-pustaka/petunjuk" target="_blank">disini</a> sebelum anda mengajukan permohonan Bebas Pustaka.`,
      slug: "/pengajuan/bebas-pustaka",
      isActive: true,
    },
    {
      namaLayanan: "Unggah Mandiri ETD",
      deskripsiLayanan:
        "Layanan Unggah Mandiri untuk Karya ETD (Electronic Theses / Dissertation) Tugas Akhir dalam bentuk Elektronik untuk keperluan serah simpan karya ilmiah ke Institusi. Tugas Akhir dalam bentuk Karya Ilmiah standar Skripsi, Tesis, Disertasi maupun format karya ilmiah yang telah disetujui oleh program studi dan universitas.",
      slug: "/pengajuan/unggah-mandiri",
      isActive: true,
    },
    {
      namaLayanan: "Peminjaman Ruangan",
      deskripsiLayanan:
        "Dinonaktifkan sementara",
      slug: "/pengajuan/#",
      isActive: false,
    },
    {
      namaLayanan: "Pengajuan Kelas Literasi Informasi",
      deskripsiLayanan: "Belum Tersedia",
      slug: "/pengajuan/#",
      isActive: false,
    },
    {
      namaLayanan: "Pengajuan Lainnya",
      deskripsiLayanan: "Belum Tersedia",
      slug: "/pengajuan/#",
      isActive: false,
    },
    {
      namaLayanan: "Pengajuan Tambahan",
      deskripsiLayanan: "Belum Tersedia",
      slug: "/pengajuan/#",
      isActive: false,
    },
  ];
});
