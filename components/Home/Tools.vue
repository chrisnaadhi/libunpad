<template>
  <div class="wrapper">
    <div>
      <h1>Tuntaskan Penelitian secara Daring</h1>
    </div>
    <p>
      Manfaatkan layanan dan alat-alat yang telah kami langgan secara daring,
      untuk mempercepat proses pekerjaan dan penelitian anda.
    </p>
    <div class="container content-wrapper">
      <div class="content">1</div>
      <div class="content">2</div>
      <div class="content">3</div>
      <div class="content">4</div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply py-5 max-w-7xl ma text-center bg-gray-3 rounded-xl my-10;
}

.content-wrapper {
  @apply max-w-6xl flex flex-1 flex-wrap ma justify-center xl:(flex-nowrap);
}

.content {
  @apply bg-orange w-full grow h-48 m-5 rounded-md md:(w-1/5);
}
</style>
