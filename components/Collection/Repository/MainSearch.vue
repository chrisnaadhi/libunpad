<script setup lang="ts">
defineProps({
  isFaculty: Boolean,
});
const searchTugasAkhir = searchTugasAkhirDirectus();
</script>

<template>
  <div class="flex items-center gap-2">
    <div class="relative flex-1">
      <div
        class="i-mdi-magnify absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-4 pointer-events-none"
      />
      <input
        type="search"
        v-model="searchTugasAkhir.keywords"
        class="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-2 hover:border-gray-3 focus:border-unpad outline-none text-sm bg-gray-50 focus:bg-white transition-all-200"
        placeholder="Cari judul, kata kunci, atau nama penulis..."
        @keyup.enter="searchTugasAkhir.searchingTugasAkhir(true, isFaculty)"
      />
    </div>
    <button
      type="button"
      @click="searchTugasAkhir.searchingTugasAkhir(true, isFaculty)"
      class="btn bg-unpad text-white px-6 py-3 shrink-0 font-semibold hover:opacity-90 transition-opacity"
    >
      Cari
    </button>
  </div>
</template>
