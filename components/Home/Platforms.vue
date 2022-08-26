<template>
  <div class="dummy w-full flex justify-center relative">
    <div class="background-block flex flex-col items-center justify-center">
      <div
        class="tanggal mb-4 px-3 py-1 mt--5 min-w-32 bg-orange-4 text-dark font-700"
      >
        <p>Hari</p>
      </div>
      <h1 class="text-2xl sm:text-4xl">Memanfaatkan Platform Kandaga</h1>
      <p>Cara memanfaatkan platform untuk memenuhi kebutuhan akademik</p>
    </div>
    <div class="content-wrapper">
      <div class="content">1</div>
      <div class="content">2</div>
      <div class="content">3</div>
      <div class="content">4</div>
      <div class="content">5</div>
    </div>
  </div>
</template>

<style scoped>
.dummy {
  text-align: center;
  /* height: 250px; */
  @apply bg-white;
}

.background-block {
  @apply w-full text-dark bg-gray-1 absolute py-5 transition-all-500 xl:(w-6xl mt--16 rounded-xl) hover:(bg-gray-9 text-orange transition-all-500);
}

.background-block:hover .tanggal {
  @apply bg-white text-dark transition-all-500;
}

.tanggal {
  @apply transition-all-500;
}

.content-wrapper {
  @apply mt-45 max-w-6xl flex flex-1 flex-wrap justify-between xl:(mt-15 flex-nowrap);
}

.content {
  @apply bg-orange w-full grow h-48 m-5 rounded-md md:(w-1/5);
}
</style>
