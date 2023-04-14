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
      <h1 class="text-2xl font-600 sm:text-4xl">
        Memanfaatkan Platform Kandaga
      </h1>
      <p>Cara memanfaatkan platform untuk memenuhi kebutuhan akademik</p>
    </div>
    <div class="content-wrapper">
      <div class="content">
        <p class="use-banner">Platform</p>
        <div class="i-mdi-theater w-24 h-24" />
        <h1>Gallery</h1>
      </div>
      <div class="content">
        <p class="use-banner">Platform</p>
        <div class="i-mdi-bookshelf w-24 h-24" />
        <h1>Library</h1>
      </div>
      <div class="content">
        <p class="use-banner">Platform</p>
        <div class="i-mdi-archive-sync w-24 h-24" />
        <h1>Records</h1>
      </div>
      <div class="content">
        <p class="use-banner">Platform</p>
        <div class="i-mdi-bank w-24 h-24" />
        <h1>Museum</h1>
      </div>
      <div class="content">
        <p class="use-banner">Platform</p>
        <div class="i-mdi-book-education w-24 h-24" />
        <h1>Repository</h1>
      </div>
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
  --at-apply: w-full text-dark bg-white absolute py-5 transition-all-500 xl:(w-6xl mt--16 rounded-xl) hover:(bg-orange-5 text-white transition-all-500);
}

.background-block:hover .tanggal {
  --at-apply: bg-gray-1 text-dark transition-all-500;
}

.tanggal {
  --at-apply: mb-4 py-2 px-4 mt--5 min-w-32 font-600 bg-orange text-white transition-all-500 rounded-b-lg;
}

.content-wrapper {
  --at-apply: mt-48 mb-10 max-w-6xl flex flex-1 flex-wrap justify-evenly items-center md:mt-35 xl:(mt-20 flex-nowrap);
}

.content {
  --at-apply: bg-white w-full grow min-h-65 mx-10 my-6 rounded-md flex flex-col items-center justify-center transition-all-500 cursor-pointer sm:(w-xs mx-5) xl:(w-1/5 mx-2);
}

.content:hover {
  --at-apply: bg-orange text-white;
}
.use-banner {
  --at-apply: text-xs bg-orange text-white px-4 rounded;
}

.content:hover > .use-banner {
  --at-apply: transition-all-500 bg-white text-orange;
}


h1 {
  --at-apply: text-2xl;
}
</style>
