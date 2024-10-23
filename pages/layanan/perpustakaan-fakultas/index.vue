<script setup>
const { getItems } = useDirectusItems();

const daftarLayananFakultas = [
  {
    id: 1,
    nama: "Perpustakaan Fakultas Hukum",
    deskripsi:
      "Perpustakaan Fakultas Hukum menyediakan koleksi buku hukum yang lengkap.",
    kontak: "081234567890",
    email: "perpustakaan@unpad.ac.id",
  },
  {
    id: 2,
    nama: "Perpustakaan Fakultas Ekonomi dan Bisnis",
    deskripsi:
      "Perpustakaan Fakultas Ekonomi dan Bisnis menyediakan koleksi buku ekonomi dan bisnis yang lengkap.",
    kontak: "081234567890",
    email: "",
  },
  {
    id: 3,
    nama: "Perpustakaan Fakultas Kedokteran",
    deskripsi:
      "Perpustakaan Fakultas Kedokteran menyediakan koleksi buku kedokteran yang lengkap.",
    kontak: "081234567890",
    email: "",
  },
];

const getJamLayananPerpustakaan = await getItems({
  collection: "jam_layanan_perpustakaan",
  params: {
    filter: {
      status: "published",
    },
  },
});
</script>

<template>
  <section>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
      vero!
    </p>
    <div>
      <h2>Layanan Perpustakaan Fakultas</h2>
      <p></p>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma text-center;
}
</style>
