<script setup>
defineProps({
  layananPerpustakaan: {
    required: true,
    type: Array,
  },
});
</script>

<template>
  <div class="w-full flex flex-col md:(grid grid-cols-2) gap-4">
    <GenericBaseCard
      v-for="item in layananPerpustakaan"
      class="bg-gray-1 rounded"
    >
      <div>
        <NuxtImg
          :src="
            item.featured_image
              ? directusImageUrl(item.featured_image)
              : '/images/9396112_3023.jpg'
          "
          format="webp"
          class="w-full max-h-40 object-cover rounded-t"
        ></NuxtImg>
      </div>
      <div class="flex flex-col justify-center px-6 pb-2 pt-4">
        <NuxtLink :to="`/panduan/${item.slug_layanan}`">
          <h3 class="text-left">{{ item.nama_layanan }}</h3>
        </NuxtLink>
        <p
          class="text-sm italic"
          v-html="trimDescription(item.deskripsi_layanan, 250)"
        ></p>
        <div class="flex my-3 text-center">
          <NuxtLink :to="`/panduan/${item.slug_layanan}`" class="action-btn">
            Lihat Layanan
          </NuxtLink>
        </div>
      </div>
    </GenericBaseCard>
  </div>
</template>

<style scoped>
p {
  --at-apply: italic;
}
</style>
