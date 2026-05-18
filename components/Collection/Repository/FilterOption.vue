<script setup>
import { daftarNamaFakultasUnpad } from "~/composables/user";

const searchTugasAkhir = searchTugasAkhirDirectus();
const fakultas = daftarNamaFakultasUnpad();

const years = [
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
  "2009",
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
        <h5 class="font-700 text-gray-8 m-0 text-sm">Filter Pencarian</h5>
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
            <option value="" selected disabled>Pilih Tahun</option>
            <option :value="year" v-for="year in years" :key="year">
              {{ year }}
            </option>
          </select>
        </div>

        <!-- Faculty -->
        <div>
          <label class="filter-label">Fakultas</label>
          <select
            name="fakultas"
            id="fakultas"
            class="filter-input"
            v-model="searchTugasAkhir.facultyId"
          >
            <option value="" selected disabled>Semua Fakultas</option>
            <option
              v-for="fak in fakultas.objFakultas"
              :key="fak.id"
              :value="fak.id"
            >
              {{ fak.namaFakultas }}
            </option>
          </select>
        </div>

        <!-- Type -->
        <div>
          <label class="filter-label">Jenis Karya</label>
          <div class="flex flex-col gap-2 mt-1.5">
            <label class="filter-check-label">
              <input type="checkbox" name="ta" class="filter-checkbox" />
              <span>Tugas Akhir (Diploma)</span>
            </label>
            <label class="filter-check-label">
              <input type="checkbox" name="skripsi" class="filter-checkbox" />
              <span>Skripsi (S1)</span>
            </label>
            <label class="filter-check-label">
              <input type="checkbox" name="tesis" class="filter-checkbox" />
              <span>Tesis (S2)</span>
            </label>
            <label class="filter-check-label">
              <input type="checkbox" name="disertasi" class="filter-checkbox" />
              <span>Disertasi (S3)</span>
            </label>
          </div>
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
