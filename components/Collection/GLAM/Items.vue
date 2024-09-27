<script setup>
defineProps({
  id: String,
  judul: String,
  thumbnail: String,
  tanggal_dibuat: String,
  type_collection: String,
  abbr: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <section>
    <NuxtLink :to="`/${type_collection}/` + id" :title="judul">
      <NuxtImg
        :src="!thumbnail ? '/images/no-image.jpg' : directusImageUrl(thumbnail)"
        format="webp"
        class="w-50 h-80 object-cover rounded-xl transition duration-300 ease-in-out border-1 hover:scale-105"
      />
    </NuxtLink>
    <div class="flex flex-col w-full">
      <NuxtLink
        :to="`/${type_collection}/` + id"
        class="no-underline w-full bg-orange-50 font-semibold transition-all-500 rounded-md hover:(bg-orange text-white)"
        :title="judul"
      >
        <span v-if="abbr">
          {{ trimTitle(judul, 20) }}
        </span>
        <span v-else>
          {{ judul }}
        </span>
      </NuxtLink>
    </div>
    <p class="text-sm text-gray mt--2">
      {{ tanggal_dibuat ?? "Tanggal tidak diketahui" }}
    </p>
    <div>
      <NuxtLink
        class="bg-orange text-white px-4 py-0 text-sm rounded no-underline"
        :to="`/${type_collection}/` + id"
      >
        Lihat
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: flex flex-col items-center gap-3 w-full;
}
</style>
