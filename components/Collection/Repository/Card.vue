<script setup>
const emit = defineEmits(["preview"]);
defineProps({
  title: String,
  titleHover: String,
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
  if (!txt) return "";
  if (txt.length > 150) {
    return txt.slice(0, 150) + "...";
  }
  return txt;
}

function tipeClass(tipe) {
  const t = tipe?.toLowerCase() ?? "";
  if (t.includes("disertasi"))
    return "bg-purple-1 text-purple-7 border-purple-2";
  if (t.includes("tesis")) return "bg-blue-1 text-blue-7 border-blue-2";
  if (t.includes("skripsi")) return "bg-green-1 text-green-7 border-green-2";
  if (t.includes("tugas akhir"))
    return "bg-orange-1 text-orange-7 border-orange-2";
  return "bg-yellow-1 text-yellow-7 border-yellow-2";
}

function openPreview() {
  emit("preview");
}
</script>

<template>
  <div
    class="group bg-white rounded-2xl border border-gray-1 shadow-sm hover:(shadow-md -translate-y-0.5 border-unpad/40) transition-all-300 flex flex-col h-full overflow-hidden"
  >
    <!-- Type badge + NPM -->
    <div class="flex items-center justify-between px-4 pt-4 pb-2">
      <span
        :class="tipeClass(tipe)"
        class="text-xs font-600 px-2.5 py-0.5 rounded-full border"
      >
        {{ tipe ?? "Karya Ilmiah" }}
      </span>
      <span class="text-xs text-gray-4 font-mono">{{ npm }}</span>
    </div>

    <!-- Title + Description -->
    <div class="px-4 pb-2 flex-1 flex flex-col">
      <NuxtLink :to="linkAccess" :title="titleHover?.toUpperCase()">
        <h6
          class="font-700 text-gray-8 text-sm leading-snug mb-2 group-hover:text-unpad transition-colors-300 line-clamp-3"
        >
          {{ title }}
        </h6>
      </NuxtLink>
      <p class="text-xs text-gray-5 leading-relaxed line-clamp-4 flex-1">
        {{ trimText(description) }}
      </p>
    </div>

    <!-- Keywords -->
    <div class="px-4 py-2 border-t border-gray-1">
      <p class="text-xs text-gray-4 line-clamp-2">
        <span class="font-600 text-gray-5">Keywords: </span
        >{{ keywords ?? "—" }}
      </p>
    </div>

    <!-- Action buttons -->
    <div class="flex border-t border-gray-1">
      <button
        @click="openPreview"
        class="flex-1 py-2.5 text-xs font-600 text-gray-5 hover:bg-gray-50 transition-colors-200 flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <div class="i-mdi-eye-outline w-4 h-4" />
        Preview
      </button>
      <div class="w-px bg-gray-1" />
      <NuxtLink
        :to="linkAccess"
        class="flex-1 py-2.5 text-xs font-600 text-white bg-unpad hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 no-underline"
      >
        <div class="i-mdi-arrow-right w-4 h-4" />
        Detail
      </NuxtLink>
    </div>
  </div>
</template>
