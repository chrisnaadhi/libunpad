<script setup></script>

<template>
  <section>
    <h1>Data Peminjaman Ruangan</h1>
    <div class="mt-5 px-5 lg:px-0">
      <p>Punya pertanyaan ? Hubungi Adminsitrasi Ruangan Kami :</p>
      <h5>
        Ana Sobana :
        <a href="tel:081220392155" class="font-semibold">+62 812-2039-2155</a>
      </h5>
    </div>
    <PengajuanListPeminjamanRuangan />
    <div class="my-5">
      <NuxtLink to="/pengajuan" class="btn bg-orange-1 text-orange-6"
        >Kembali</NuxtLink
      >
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma text-center;
}
</style>
