<script setup>
const { currentTime } = useCurrentTime();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
</script>

<template>
  <div class="dummy">
    <div
      class="background-block flex flex-col items-center justify-center px-5 cursor-default"
    >
      <div
        class="tanggal mb-4 py-2 px-4 mt--5 min-w-32 bg-orange-4 text-dark font-700"
      >
        <p>{{ currentTime.toLocaleDateString("id-ID", options) }}</p>
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
  background-image: url("/images/9396112_3023.jpg");
  background-position: center;
  background-size: cover;
  /* box-shadow: 0px 25px 15px white inset, 0px -25px 15px white inset; */
  --at-apply: bg-white w-full flex justify-center relative;
}

.background-block {
  --at-apply: w-full text-dark bg-gray-50 absolute py-5 transition-all-500 xl:(w-6xl mt--16 rounded-xl) hover:(bg-orange-5 text-white transition-all-500);
}

.background-block:hover .tanggal {
  --at-apply: bg-white text-dark transition-all-500;
}

.tanggal {
  --at-apply: transition-all-500;
}

.content-wrapper {
  --at-apply: mt-35 max-w-6xl flex flex-1 flex-wrap justify-center items-center xl:(mt-15 flex-nowrap);
}

.content {
  --at-apply: bg-white w-full grow h-72 mx-10 my-8 rounded-md sm:(w-xs mx-5) xl:(w-1/5 mx-2);
}
</style>
