<template>
  <div class="card">
    <div class="cover-section">
      <NuxtImg src="/images/no-image.jpg" width="100%" />
    </div>
    <div class="content-section">
      <h1>Judul Panjang disini</h1>
      <h4 class="text-sm italic">Author</h4>
      <h5 class="text-xs">Program Studi - Fakultas</h5>
      <p class="font-600">Tipe Karya</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non distinctio
        soluta amet aspernatur, maxime ad voluptas accusantium delectus rerum
        mollitia?
      </p>
      <div class="flex gap-2">
        <button class="btn bg-orange py-1 px-4 text-white">Lihat</button>
        <button class="btn bg-blue py-1 px-4 text-white">Pinjam</button>
      </div>
    </div>
  </div>
</template>

<style>
.card {
  --at-apply: flex rounded shadow-md shadow-gray p-2 m-2;
}

.cover-section {
  --at-apply: m-2 shadow-sm shadow-gray rounded;
}

.content-section {
  --at-apply: m-2;
}
</style>
