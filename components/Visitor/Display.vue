<script setup>
const router = useRouter();
const ruang = useCookie("namaRuanganVisitor");
const pemilihanRuangan = async (nama) => {
  ruang.value = nama;
  router.go(router.currentRoute);
};
</script>

<template>
  <main class="text-center md:h-xl">
    <h1>Silahkan Pilih Ruangan</h1>
    <section
      class="flex flex-col flex-wrap max-w-5xl justify-center md:(flex-row)"
    >
      <div @click="pemilihanRuangan('lobby')">Lobby Utama</div>
      <div @click="pemilihanRuangan('r_sirkulasi')">Ruang Sirkulasi</div>
      <div @click="pemilihanRuangan('r_belajar')">Ruang Belajar</div>
      <div @click="pemilihanRuangan('r_bni')">BNI Coworking Space</div>
      <div @click="pemilihanRuangan('r_multimedia')">Ruang Multimedia</div>
      <div @click="pemilihanRuangan('r_populer')">Ruang Populer</div>
      <div @click="pemilihanRuangan('r_berkala')">Ruang Berkala</div>
    </section>
  </main>
</template>

<style scoped>
div {
  --at-apply: bg-orange-500 min-w-xs px-15 py-5 mx-2 my-4 font-600 text-xl
    cursor-pointer;
}
</style>
