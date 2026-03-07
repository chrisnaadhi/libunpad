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
          <div class="i-mdi-certificate-outline w-7 h-7 text-white/80 shrink-0" />
          <div>
            <p class="text-white/70 text-xs font-medium uppercase tracking-widest">Layanan Perpustakaan</p>
            <h1 class="text-white text-2xl font-800 leading-tight">Daftar Pengajuan Surat Bebas Pustaka</h1>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-5xl ma px-4 py-8 flex flex-col gap-4">

      <!-- Info strip -->
      <div class="info-box bg-white">
        <div class="i-mdi-information-outline w-5 h-5 shrink-0 text-unpad mt-0.5" />
        <p class="text-sm text-gray-6">
          Cek status kelengkapan pengajuan Anda di
          <NuxtLink to="/keanggotaan" class="text-unpad font-semibold hover:underline">Halaman Keanggotaan</NuxtLink>.
        </p>
      </div>

      <!-- Table card -->
      <div class="section-card">
        <div class="section-card-header">
          <div class="i-mdi-table w-5 h-5 text-unpad shrink-0" />
          <h2>Daftar Pengajuan</h2>
        </div>
        <div class="p-1">
          <PengajuanListBebasPustaka />
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
