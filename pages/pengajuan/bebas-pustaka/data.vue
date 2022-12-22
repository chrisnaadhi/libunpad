<script setup>
const name = ref("Chrisna Adhi Pranoto");
</script>

<template>
  <section>
    <h1>Daftar Pengajuan Surat Bebas Pustaka</h1>
    <div>
      <input class="searchBox" type="search" name="cari-surat-bebas-pustaka" />
      <button type="submit" class="btn bg-orange-3 mx-1">Search</button>
    </div>
    <PengajuanListBebasPustaka />
    <NuxtLink to="/pengajuan">
      <button type="button" class="btn bg-orange-3">Kembali</button>
    </NuxtLink>
  </section>
</template>

<style scoped>
section {
  --at-apply: text-center mx-2 my-5;
}

h1 {
  --at-apply: text-2xl;
}

.searchBox {
  --at-apply: bg-gray-2 mt-3 min-w-lg p-2 rounded mx-1 focus:bg-white;
}
</style>
