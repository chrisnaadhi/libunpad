<script setup></script>

<template>
  <section>
    <h1>Data Peminjaman Ruangan</h1>
    <PengajuanListPeminjamanRuangan />
    <div class="my-5">
      <NuxtLink to="/pengajuan" class="btn bg-orange-1 text-orange-6">Kembali</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma text-center;
}
</style>
