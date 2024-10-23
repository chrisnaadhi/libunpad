<script setup>
const val = ref("Perpustakaan Fakultas");
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
</script>

<template>
  <section>
    <p>{{ val }}</p>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma text-center;
}
</style>
