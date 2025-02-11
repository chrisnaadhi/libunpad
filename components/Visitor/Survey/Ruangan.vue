<script setup>
defineProps({
  namaRuangan: {
    type: String,
  },
  jumlahPenilaian5: {
    type: Number,
    default: 75,
  },
  jumlahPenilaian4: {
    type: Number,
    default: 74,
  },
  jumlahPenilaian3: {
    type: Number,
    default: 73,
  },
  jumlahPenilaian2: {
    type: Number,
    default: 72,
  },
  jumlahPenilaian1: {
    type: Number,
    default: 71,
  },
});
</script>

<template>
  <section class="bg-white rounded-xl p-4 w-full">
    <div>
      <h3 class="text-center mb-5 bg-unpad text-white max-w-lg ma rounded">
        {{ namaRuangan }}
      </h3>
    </div>
    <div class="grid grid-cols-5 gap-3">
      <div class="flex flex-col items-center">
        <div class="flex">
          <div class="i-mdi-star text-amber" v-for="star in 5" />
        </div>
        <p class="text-green-6">Sangat Baik</p>
        <h3>{{ jumlahPenilaian5 }}</h3>
      </div>
      <div class="flex flex-col items-center">
        <div class="flex">
          <div class="i-mdi-star text-amber" v-for="star in 4" />
        </div>
        <p class="text-green-5">Baik</p>
        <h3>{{ jumlahPenilaian4 }}</h3>
      </div>
      <div class="flex flex-col items-center">
        <div class="flex">
          <div class="i-mdi-star text-amber" v-for="star in 3" />
        </div>
        <p class="text-yellow">Cukup</p>
        <h3>{{ jumlahPenilaian3 }}</h3>
      </div>
      <div class="flex flex-col items-center">
        <div class="flex">
          <div class="i-mdi-star text-amber" v-for="star in 2" />
        </div>
        <p class="text-red">Kurang</p>
        <h3>{{ jumlahPenilaian2 }}</h3>
      </div>
      <div class="flex flex-col items-center">
        <div class="flex">
          <div class="i-mdi-star text-amber" v-for="star in 1" />
        </div>
        <p class="text-red-6">Sangat Kurang</p>
        <h3>{{ jumlahPenilaian1 }}</h3>
      </div>
    </div>
  </section>
</template>

<style scoped>
p {
  --at-apply: font-semibold;
}
</style>
