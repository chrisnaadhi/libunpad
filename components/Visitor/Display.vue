<script setup>
const router = useRouter();
const ruang = useCookie("namaRuanganVisitor");
const pemilihanRuangan = async (nama) => {
  ruang.value = nama;
  router.go(router.currentRoute);
};
</script>

<template>
  <main class="text-center h-xl">
    <h1>Silahkan Pilih Ruangan</h1>
    <section class="flex w-full justify-center">
      <div @click="pemilihanRuangan('lobby')">Lobby Utama</div>
      <div @click="pemilihanRuangan('r_sirkulasi')">Ruang Sirkulasi</div>
      <div @click="pemilihanRuangan('r_belajar')">Ruang Belajar</div>
    </section>
  </main>
</template>

<style scoped>
div {
  --at-apply: bg-orange-500 px-15 py-5 mx-2 my-10 font-600 text-xl
    cursor-pointer;
}
</style>
