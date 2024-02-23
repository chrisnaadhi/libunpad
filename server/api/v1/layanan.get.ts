export default defineEventHandler((event) => {
  return [
    {
      namaLayanan: "Pengajuan Bebas Pustaka",
      deskripsiLayanan:
        "Layanan Pengajuan Bebas Pustaka dari Perpustakaan Pusat secara daring melalui sistem kami",
      slug: "/pengajuan/bebas-pustaka",
      isActive: true,
    },
    {
      namaLayanan: "Unggah Mandiri Tugas Akhir",
      deskripsiLayanan:
        "Layanan Unggah Mandiri untuk Tugas Akhir dalam bentuk Elektronik untuk keperluan serah simpan karya ilmiah ke Institusi. Tugas Akhir dalam bentuk Karya Ilmiah standar Skripsi, Tesis, Disertasi maupun format karya ilmiah yang telah disetujui oleh program studi dan universitas.",
      slug: "/pengajuan/unggah-mandiri",
      isActive: true,
    },
    {
      namaLayanan: "Peminjaman Ruangan",
      deskripsiLayanan:
        "Layanan Pengajuan Peminjaman Ruangan di Grha Kandaga secara daring",
      slug: "/pengajuan/peminjaman-ruangan",
      isActive: true,
    },
    {
      namaLayanan: "Pengajuan Kelas Literasi",
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
