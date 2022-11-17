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
      <div class="tanggal">
        <p>{{ currentTime.toLocaleDateString("id-ID", options) }}</p>
      </div>
      <h1 class="text-2xl font-700 sm:text-4xl">
        Memanfaatkan Platform Kandaga
      </h1>
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
  background-image: url("/images/background-platform.webp");
  background-position: center;
  background-size: cover;
  box-shadow: 0px 25px 15px rgb(255, 255, 255) inset, 0px -25px 15px rgb(255, 255, 255) inset;
  --at-apply: bg-white w-full flex justify-center relative;
}

.background-block {
  --at-apply: w-full text-dark bg-gray-50 absolute py-5 transition-all-500 xl:(w-6xl mt--16 rounded-xl) hover:(bg-orange-5 text-white transition-all-500);
}

.background-block:hover .tanggal {
  --at-apply: bg-gray-1 text-dark transition-all-500;
}

.tanggal {
  --at-apply: mb-4 py-2 px-4 mt--5 min-w-32 bg-orange-4 text-white font-700 transition-all-500 rounded-b-lg;
}

.content-wrapper {
  --at-apply: mt-48 mb-5 max-w-6xl flex flex-1 flex-wrap justify-center items-center md:mt-35 xl:(mt-20 flex-nowrap);
}

.content {
  --at-apply: bg-white w-full grow h-72 mx-10 my-6 rounded-md sm:(w-xs mx-5) xl:(w-1/5 mx-2);
}
</style>
