<script setup>
const date = new Date();
</script>

<template>
  <div class="dummy">
    <div
      class="background-block flex flex-col items-center justify-center px-5 cursor-default"
    >
      <div
        class="tanggal mb-4 px-3 py-1 mt--5 min-w-32 bg-orange-4 text-dark font-700"
      >
        <p>Jam | Hari</p>
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
  background-image: url("https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33");
  background-position: center;
  background-size: cover;
  /* box-shadow: 0px 25px 15px white inset, 0px -25px 15px white inset; */
  @apply bg-white w-full flex justify-center relative;
}

.background-block {
  @apply w-full text-dark bg-gray-50 absolute py-5 transition-all-500 xl:(w-6xl mt--16 rounded-xl) hover:(bg-orange-5 text-white transition-all-500);
}

.background-block:hover .tanggal {
  @apply bg-white text-dark transition-all-500;
}

.tanggal {
  @apply transition-all-500;
}

.content-wrapper {
  @apply mt-35 max-w-6xl flex flex-1 flex-wrap justify-center items-center xl:(mt-15 flex-nowrap);
}

.content {
  @apply bg-white w-full grow h-72 mx-10 my-5 rounded-md md:(w-1/5 mx-5) xl:(mx-2);
}
</style>
