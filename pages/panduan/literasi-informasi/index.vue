<script setup>
const { getItems } = useDirectusItems();
const getAllLiterasiInformasi = await getItems({
  collection: "konten_literasi_informasi",
});
</script>

<template>
  <section>
    <h2 class="my-7 font-semibold text-center">Literasi Informasi</h2>
    <div class="flex flex-col gap-3 md:(grid grid-cols-3)">
      <GenericBaseCard v-for="item in getAllLiterasiInformasi" class="bg-gray-1 rounded">
        <div>
          <NuxtImg src="/images/9396112_3023.jpg" format="webp" class="w-full max-h-40 object-cover rounded-t"></NuxtImg>
        </div>
        <div class="flex flex-col px-6 pb-2 pt-4">
          <h3 class="text-left">{{ item.judul }}</h3>
          
          <p class="text-sm italic">{{ trimDescription(item.konten, 150) }}</p>
          <div class="flex my-3 text-center">
            <NuxtLink :to="`/panduan/literasi-informasi/${item.slug}`" class="action-btn">
              Lihat Layanan
            </NuxtLink>
          </div>
        </div>
        {{ item }}
      </GenericBaseCard>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma;
}

p {
  --at-apply: italic;
}
</style>
