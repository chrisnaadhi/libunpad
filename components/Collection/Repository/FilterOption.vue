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
  <section class="main-block">
    <h5 class="text-center">Filter Options</h5>
    <div class="flex flex-col">
      <div>
        <h6>Pencarian</h6>
        <input
          type="search"
          name="search"
          id="search"
          class="p-1 rounded"
          v-model="searchTugasAkhir.keywords"
          @keyup.enter="searchTugasAkhir.searchingTugasAkhir(true, false, true)"
        />
      </div>
      <h6>Tahun</h6>
      <div>
        <select
          class="min-w-full"
          name="first"
          id="first"
          v-model="searchTugasAkhir.tahun"
        >
          <option value="" selected disabled>Pilih Tahun</option>
          <option :value="year" v-for="year in years">{{ year }}</option>
        </select>
      </div>

      <div>
        <h6>Jenis Karya</h6>
        <div class="flex items-center">
          <input
            type="checkbox"
            name="ta"
            id="ta"
            class="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label for="ta" class="ms-2 text-gray-900 dark:text-gray-300">
            Tugas Akhir (Diploma)
          </label>
        </div>
        <div class="flex items-center">
          <input
            type="checkbox"
            name="ta"
            id="ta"
            class="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label for="skripsi" class="ms-2 text-gray-900 dark:text-gray-300">
            Skripsi (S1)
          </label>
        </div>
        <div class="flex items-center">
          <input
            type="checkbox"
            name="tesis"
            id="tesis"
            class="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label for="tesis" class="ms-2 text-gray-900 dark:text-gray-300">
            Tesis (S2)
          </label>
        </div>
        <div class="flex items-center">
          <input
            type="checkbox"
            name="disertasi"
            id="disertasi"
            class="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label for="disertasi" class="ms-2 text-gray-900 dark:text-gray-300">
            Disertasi (S3)
          </label>
        </div>
      </div>

      <div>
        <h6>Nama Fakultas</h6>
        <div>
          <select
            name="fakultas"
            id="fakultas"
            class="min-w-full"
            v-model="searchTugasAkhir.facultyId"
          >
            <option value="" selected disabled>Pilih Fakultas</option>
            <option v-for="fak in fakultas.objFakultas" :value="fak.id">
              {{ fak.namaFakultas }}
            </option>
          </select>
        </div>
      </div>
      <div class="my-2">
        <button
          class="btn text-sm text-white w-full bg-unpad"
          @click="searchTugasAkhir.searchingTugasAkhir(true, false, true)"
        >
          Cari
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.main-block {
  --at-apply: bg-unpad-50 border-1 border-unpad rounded min-w-50 p-3 mx-2 lg:mx-0;
}

select {
  --at-apply: w-20 rounded border-1 border-unpad;
}

input[type="checkbox"] {
  --at-apply: mr-0;
}
</style>
