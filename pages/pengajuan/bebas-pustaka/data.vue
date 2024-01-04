<script setup>
const name = ref("Chrisna Adhi Pranoto");
</script>

<template>
  <section>
    <h1>Daftar Pengajuan Surat Bebas Pustaka</h1>
    <!-- <div class="flex max-w-lg ma mt-3">
      <input class="searchBox" type="search" name="cari-surat-bebas-pustaka" />
      <button type="submit" class="btn bg-orange-3 mx-1">Search</button>
    </div> -->
    <PengajuanListBebasPustaka />
    <div class="mb-3">
      <p>Cek status kelengkapan pengajuan anda di :</p>
      <NuxtLink to="/keanggotaan"> Halaman Keanggotaan </NuxtLink>
    </div>
    <NuxtLink to="/pengajuan">
      <button type="button" class="btn bg-orange-1 text-orange-6">
        Kembali
      </button>
    </NuxtLink>
  </section>
</template>

<style scoped>
section {
  --at-apply: text-center max-w-7xl ma my-4;
}

h1 {
  --at-apply: text-2xl;
}

.searchBox {
  --at-apply: bg-gray-2 w-full p-2 rounded mx-1 focus:bg-white;
}
</style>
