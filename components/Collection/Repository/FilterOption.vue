<script setup>
import { daftarNamaFakultasUnpad } from "~/composables/user";

const firstSelectedYear = ref("-");
const secondSelectedYear = ref("-");
const fakultas = daftarNamaFakultasUnpad();

const years = [
  "-",
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
  <section class="bg-orange-2 rounded-lg min-w-50 py-5 px-3">
    <h5 class="text-center">Filter Options</h5>
    <div class="flex flex-col">
      <div>
        <h6>Pencarian</h6>
        <input type="search" name="" id="" class="p-1" />
      </div>
      <h6>Tahun</h6>
      <div class="flex gap-2">
        <select name="first" id="first" v-model="firstSelectedYear">
          <option :value="year" v-for="year in years">{{ year }}</option>
        </select>
        <p>-</p>
        <select name="second" id="second" v-model="secondSelectedYear">
          <option :value="year" v-for="year in years">{{ year }}</option>
        </select>
      </div>

      <div>
        <h6>Jenis Karya</h6>
        <div>
          <input type="checkbox" name="ta" id="ta" />
          <label for="ta">Tugas Akhir (Diploma)</label>
        </div>
        <div>
          <input type="checkbox" name="skripsi" id="skripsi" />
          <label for="skripsi">Skripsi (S1)</label>
        </div>
        <div>
          <input type="checkbox" name="tesis" id="tesis" />
          <label for="tesis">Tesis (S2)</label>
        </div>
        <div>
          <input type="checkbox" name="disertasi" id="disertasi" />
          <label for="disertasi">Disertasi (S3)</label>
        </div>
      </div>

      <div>
        <h6>Nama Fakultas</h6>
        <div>
          <select name="fakultas" id="fakultas" class="min-w-full">
            <option v-for="fak in fakultas.objFakultas" :value="fak.singkatan">
              {{ fak.namaFakultas }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
select {
  --at-apply: w-20;
}
</style>
