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
    <h1 class="text-2xl font-700">Silahkan Pilih Ruangan</h1>
    <section
      class="flex flex-col flex-wrap max-w-7xl justify-center md:(flex-row)"
    >
      <div @click="pemilihanRuangan('lobby')">Lobby Utama</div>
      <div @click="pemilihanRuangan('r_sirkulasi')">Ruang Sirkulasi</div>
      <div @click="pemilihanRuangan('r_langka')">Ruang Koleksi Langka</div>
      <div @click="pemilihanRuangan('r_populer')">Ruang Populer</div>

      <div @click="pemilihanRuangan('r_bni')">BNI Coworking Space</div>
      <div @click="pemilihanRuangan('r_multimedia')">Ruang Multimedia</div>
      <div @click="pemilihanRuangan('r_referensi')">
        Ruang Referensi Tesis Disertasi
      </div>
      <div @click="pemilihanRuangan('r_berkala')">
        Ruang Referensi Koleksi Berkala
      </div>
      <div @click="pemilihanRuangan('r_alh')">Ruang Assistive Learning Hub</div>
    </section>
    <section class="my-15">
      <NuxtLink to="/visitor/data" target="_blank" rel="noopenner">
        <button class="btn data-kunjungan">Data Kunjungan</button>
      </NuxtLink>
      <NuxtLink to="/">
        <button class="btn data-kunjungan">Kembali ke Beranda</button>
      </NuxtLink>
    </section>
  </main>
</template>

<style scoped>
div {
  --at-apply: bg-unpad min-w-xs px-15 py-5 mx-2 my-4 font-600 text-xl cursor-pointer rounded-xl;
}

.data-kunjungan {
  --at-apply: mx-2 font-600 text-gray-700 bg-gray-100 hover:(bg-unpad text-white border-none)
}
</style>
