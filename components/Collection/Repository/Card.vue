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
  keywords: String,
});

function trimText(txt) {
  if (txt.length > 65) {
    const trimmedText = txt.slice(0, 65);
    return trimmedText + "...";
  } else {
    return txt;
  }
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
      <NuxtLink :to="linkAccess">
        <h6 class="transition-all-500 hover:(text-orange)">
          {{ title }}
        </h6>
      </NuxtLink>
      <h6 class="text-sm italic">{{ npm }}</h6>
      <p class="text-xs">{{ author }}</p>
      <p class="text-sm font-600">{{ tipe }}</p>
      <p class="text-sm mb-2">
        {{ trimText(description) }}
      </p>
      <p class="text-xs">
        <span class="font-semibold">Keywords:</span>
        {{ keywords }}
      </p>
      <div class="flex gap-1 text-center text-xs mt-3">
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
  --at-apply: flex rounded shadow-md shadow-gray p-2 max-h-full;
}

.cover-section {
  --at-apply: m-2 flex items-center shadow shadow-gray rounded;
}

.content-section {
  --at-apply: m-2 flex flex-col justify-around;
}
</style>
