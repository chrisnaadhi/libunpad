<script setup>
const emit = defineEmits(["preview"]);
defineProps({
  title: String,
  npm: String,
  author: String,
  fakultas: String,
  tipe: String,
  description: String,
  linkAccess: String,
  previewNpm: String,
});

function trimText(txt) {
  const trimmedText = txt.slice(0, 55);
  return trimmedText + "...";
}

function openPreview() {
  emit("preview");
}
</script>

<template>
  <div class="card">
    <div class="cover-section">
      <NuxtImg
        src="/images/lambang-unpad.png"
        class="w-25 max-w-50 max-h-80 px-3"
        format="webp"
      />
    </div>
    <div class="content-section">
      <h6>{{ title }}</h6>
      <h6 class="italic">{{ npm }}</h6>
      <p class="text-xs">{{ author }}</p>
      <p class="text-sm font-600">{{ tipe }}</p>
      <p class="text-sm mb-2">
        {{ trimText(description) }}
      </p>
      <div class="flex gap-1 text-center text-xs">
        <button
          class="btn bg-gray-5 w-full py-1 px-4 text-white"
          @click="openPreview"
        >
          Preview
        </button>
        <NuxtLink
          :to="linkAccess"
          class="btn bg-orange-5 w-full py-1 px-4 text-white"
        >
          Detail
        </NuxtLink>
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
