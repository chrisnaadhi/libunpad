<script setup></script>

<template>
  <main class="min-h-screen bg-gray-50">

    <!-- Page Header -->
    <div class="bg-gradient-to-br from-unpad to-kandaga">
      <div class="max-w-5xl ma px-4 py-8">
        <NuxtLink
          to="/pengajuan"
          class="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 transition-colors-200"
        >
          <div class="i-mdi-arrow-left w-4 h-4" />
          Kembali ke Pengajuan
        </NuxtLink>
        <div class="flex items-center gap-3">
          <div class="i-mdi-office-building-outline w-7 h-7 text-white/80 shrink-0" />
          <div>
            <p class="text-white/70 text-xs font-medium uppercase tracking-widest">Layanan Perpustakaan</p>
            <h1 class="text-white text-2xl font-800 leading-tight">Data Peminjaman Ruangan</h1>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-5xl ma px-4 py-8 flex flex-col gap-4">

      <!-- Contact strip -->
      <div class="info-box bg-white">
        <div class="i-mdi-phone-outline w-5 h-5 shrink-0 text-unpad mt-0.5" />
        <div class="text-sm flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
          <span class="font-semibold text-gray-7">Punya pertanyaan? Hubungi Administrasi Ruangan:</span>
          <a href="tel:081220392155" class="text-unpad hover:underline font-medium">Ana Sobana — +62 812-2039-2155</a>
        </div>
      </div>

      <!-- Table card -->
      <div class="section-card">
        <div class="section-card-header">
          <div class="i-mdi-table w-5 h-5 text-unpad shrink-0" />
          <h2>Daftar Peminjaman</h2>
        </div>
        <div class="p-1">
          <PengajuanListPeminjamanRuangan />
        </div>
      </div>

    </div>
  </main>
</template>

<style scoped>
.section-card {
  --at-apply: bg-white rounded-2xl border border-gray-2 shadow-sm overflow-hidden;
}

.section-card-header {
  --at-apply: flex items-center gap-3 px-5 py-4 border-b border-gray-1 bg-gray-50;
}

.section-card-header h2 {
  --at-apply: text-base font-700 text-gray-8 m-0;
}

.info-box {
  --at-apply: flex items-start gap-3 border border-gray-2 rounded-xl px-5 py-4;
}
</style>
