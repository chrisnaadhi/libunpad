<script setup>
defineProps({
  title: String,
  author: String,
  prodi: String,
  fakultas: String,
  tipe: String,
  description: String,
});

function trimText(txt) {
  const trimmedText = txt.slice(0, 45);
  return trimmedText + "...";
}
</script>

<template>
  <div class="card">
    <div class="cover-section">
      <NuxtImg src="/images/no-image.jpg" width="85px" />
    </div>
    <div class="content-section">
      <h1>{{ title }}</h1>
      <h4 class="text-sm italic">{{ author }}</h4>
      <h5 class="text-xs">{{ prodi }} - {{ fakultas }}</h5>
      <p class="font-600">{{ tipe }}</p>
      <p>
        {{ trimText(description) }}
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
