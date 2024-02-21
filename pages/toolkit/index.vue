<script setup>
const route = useRoute();
const tools = [
  {
    nama: "KandagaQR Generator",
    link: route.fullPath + "/kandagaqr",
    deskripsi:
      "Buat QR Code untuk tautan, teks ataupun koleksi anda dengan lebih mudah.",
  },
  {
    nama: "Kandaga Shortlink",
    link: route.fullPath + "/#",
    deskripsi:
      "Gunakan pemendek tautan untuk memudahkan akses dan promosi tautan anda kepada orang banyak.",
  },
  {
    nama: "DDC Classification",
    link: route.fullPath + "#",
    deskripsi:
      "Referensi Dewey Decimal Classification untuk keperluan katalogisasi dan klasifikasi buku.",
  },
];
</script>

<template>
  <main>
    <GenericBaseCard class="bg-orange min-h-45 p-5" v-for="tool in tools">
      <h1>{{ tool.nama }}</h1>
      <p>{{ tool.deskripsi }}</p>
      <NuxtLink :to="tool.link" class="btn bg-white text-orange">
        Pakai
      </NuxtLink>
    </GenericBaseCard>
  </main>
</template>

<style scoped>
main {
  --at-apply: max-w-7xl ma flex flex-col md:flex-row items-center justify-center gap-4 py-5;
}

h1 {
  --at-apply: text-2xl text-white;
}

p {
  --at-apply: text-white mb-5;
}
</style>
