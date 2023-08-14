<script setup>
const data = ref("Vue Composition API");
defineProps({
  tipe: String,
  gambar: String,
  judul: String,
  pembuat: String,
  deskripsi: String,
  parent: String,
  slug: String,
  ytCode: String,
});
</script>

<template>
  <div class="card">
    <div class="top-card">
      <div class="bg-orange-6 absolute z-1 m-3 px-3 py-1 rounded-full">
        <p class="text-white text-sm font-semibold">{{ tipe }}</p>
      </div>
      <NuxtImg
        :src="`https://img.youtube.com/vi/${ytCode}/sddefault.jpg`"
        class="relative w-full max-h-45 object-cover rounded-tr-lg rounded-tl-lg"
      />
    </div>

    <div class="bot-card">
      <h4 class="italic font-semibold text-orange">{{ judul }}</h4>
      <p class="italic text-sm">
        Pembuat: <span class="font-semibold">{{ pembuat }}</span>
      </p>
      <p class="text-sm">
        <span v-html="trimDescription(deskripsi, 85)"></span>
      </p>
      <div class="mt-3 flex text-center">
        <NuxtLink
          :to="`/e-teater/${parent}/${slug}`"
          class="btn w-full py-1 px-5 bg-orange text-white text-sm no-underline"
        >
          Lihat
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  --at-apply: w-full max-h-md shadow-lg shadow-gray bg-gray-1 flex flex-col rounded-bl-lg rounded-br-lg;
}

.top-card {
  --at-apply: relative;
}

.bot-card {
  --at-apply: py-4 px-2 text-left flex flex-col rounded-bl-lg rounded-br-lg lg:(justify-between h-55)
    text-left;
}
</style>
