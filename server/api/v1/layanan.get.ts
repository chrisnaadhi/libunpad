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
      namaLayanan: "Pengajuan Reservasi Online",
      deskripsiLayanan: "Belum Tersedia",
      slug: "/pengajuan/#",
      isActive: false,
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
