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
  const trimmedText = txt.slice(0, 55);
  return trimmedText + "...";
}
</script>

<template>
  <div class="card">
    <div class="cover-section">
      <NuxtImg src="/images/no-image.jpg" class="min-w-100% max-h-55" />
    </div>
    <div class="content-section">
      <h1>{{ title }}</h1>
      <h6 class="italic">{{ author }}</h6>
      <p class="text-xs">{{ prodi }} - {{ fakultas }}</p>
      <p class="text-sm font-600">{{ tipe }}</p>
      <p class="text-sm mb-2">
        {{ trimText(description) }}
      </p>
      <div class="flex gap-1 text-xs">
        <button class="btn bg-orange w-full py-1 px-4 text-white">
          Preview
        </button>
        <button class="btn bg-gray-6 w-full py-1 px-4 text-white">
          Detail
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.card {
  --at-apply: flex rounded shadow-md shadow-gray p-2 max-h-60;
}

.cover-section {
  --at-apply: m-2 flex items-center shadow shadow-gray rounded;
}

.content-section {
  --at-apply: m-2 flex flex-col justify-around;
}
</style>
