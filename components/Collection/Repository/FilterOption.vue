<script setup>
import { daftarNamaFakultasUnpad } from "~/composables/user";

defineProps({
  hideFaculty: Boolean,
});

const searchTugasAkhir = searchTugasAkhirDirectus();
const fakultas = daftarNamaFakultasUnpad();

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 2004 }, (_, i) =>
  String(currentYear - i),
);

const bahasaOptions = [
  { value: "Indonesia", label: "Indonesia" },
  { value: "Inggris", label: "Inggris (English)" },
  { value: "Sunda", label: "Sunda" },
];
</script>

<template>
  <aside class="w-full lg:w-64 shrink-0">
    <div
      class="bg-white rounded-2xl border border-gray-2 shadow-sm overflow-hidden"
    >
      <!-- Header -->
      <div
        class="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-1"
      >
        <div class="i-mdi-filter-outline w-5 h-5 text-unpad" />
        <h5 class="font-700 text-gray-8 m-0 text-sm flex-1">
          Filter Pencarian
        </h5>
        <button
          v-if="
            searchTugasAkhir.keywords ||
            searchTugasAkhir.tahun ||
            searchTugasAkhir.facultyId ||
            searchTugasAkhir.bahasa
          "
          class="text-xs text-red-5 hover:text-red-7 font-600 transition-colors"
          @click="searchTugasAkhir.resetFilters()"
          title="Reset semua filter"
        >
          Reset
        </button>
      </div>

      <div class="p-4 flex flex-col gap-4">
        <!-- Keyword search -->
        <div>
          <label class="filter-label">Kata Kunci</label>
          <input
            type="search"
            name="search"
            id="filter-search"
            class="filter-input"
            v-model="searchTugasAkhir.keywords"
            placeholder="Judul, kata kunci..."
            @keyup.enter="
              searchTugasAkhir.searchingTugasAkhir(true, false, true)
            "
          />
        </div>

        <!-- Year -->
        <div>
          <label class="filter-label">Tahun</label>
          <select
            class="filter-input"
            name="first"
            id="first"
            v-model="searchTugasAkhir.tahun"
          >
            <option value="">Semua Tahun</option>
            <option :value="year" v-for="year in years" :key="year">
              {{ year }}
            </option>
          </select>
        </div>

        <!-- Faculty (hidden on faculty page) -->
        <div v-if="!hideFaculty">
          <label class="filter-label">Fakultas</label>
          <select
            name="fakultas"
            id="fakultas"
            class="filter-input"
            v-model="searchTugasAkhir.facultyId"
          >
            <option value="">Semua Fakultas</option>
            <option
              v-for="fak in fakultas.objFakultas"
              :key="fak.id"
              :value="fak.id"
            >
              {{ fak.namaFakultas }}
            </option>
          </select>
        </div>

        <div>
          <label class="filter-label">Bahasa</label>
          <select class="filter-input" v-model="searchTugasAkhir.bahasa">
            <option value="">Semua Bahasa</option>
            <option
              v-for="opt in bahasaOptions"
              :key="opt.value"
              :value="opt.value"
            >
              {{ opt.label }}
            </option>
          </select>
        </div>

        <!-- Apply -->
        <button
          class="btn bg-unpad text-white w-full py-2.5 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          @click="searchTugasAkhir.searchingTugasAkhir(true, false, true)"
        >
          <div class="i-mdi-magnify w-4 h-4" />
          Terapkan Filter
        </button>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.filter-label {
  --at-apply: block text-xs font-600 text-gray-5 uppercase tracking-wide mb-1.5;
}

.filter-input {
  --at-apply: w-full px-3 py-2 rounded-lg border border-gray-2 text-sm
    bg-gray-50 focus: bg-white focus: border-unpad outline-none transition-all;
}

.filter-check-label {
  --at-apply: flex items-center gap-2 text-sm text-gray-6 cursor-pointer;
}

.filter-checkbox {
  --at-apply: w-4 h-4 accent-unpad cursor-pointer;
}
</style>
