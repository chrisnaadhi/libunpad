<template>
  <div class="dummy w-full flex justify-center relative">
    <div class="background-block flex flex-col items-center justify-center">
      <div class="mb-4 py-1 mt--5 w-52 bg-blue-4">
        <p>Jam disini</p>
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
  @apply container w-full text-blue-9 bg-gray-200 absolute py-5 xl:(w-6xl mt--16);
}

.content-wrapper {
  @apply mt-35 xl:(mt-20) max-w-6xl flex flex-1 flex-wrap justify-between xl:flex-nowrap;
}

.content {
  @apply bg-green w-48 rounded-md;
}
</style>
