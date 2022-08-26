<template>
  <div class="wrapper">
    <h1>Manfaatkan secara daring, dan selesaikan penelitianmu.</h1>
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
  @apply py-5 max-w-7xl ma text-center bg-white h-screen my-10;
}

.content-wrapper {
  @apply max-w-6xl flex flex-1 flex-wrap ma justify-center xl:(flex-nowrap);
}

.content {
  @apply bg-orange w-full grow h-48 m-5 rounded-md md:(w-1/5);
}
</style>
