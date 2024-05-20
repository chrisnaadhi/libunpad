<script setup>
defineProps({
  id: String,
  judul: String,
  thumbnail: String,
  tanggal_dibuat: String,
})

const { getThumbnail: img } = useDirectusFiles();
</script>

<template>
  <section>
    <NuxtLink :to="'/gallery/' + id" :title="judul">
      <NuxtImg :src="img(thumbnail)" format="webp" class="w-50 h-80 object-cover rounded-xl transition duration-300 ease-in-out hover:scale-105" />
    </NuxtLink>
    <div class="flex flex-col w-full">
      <NuxtLink :to="'/gallery/' + id"
        class="no-underline w-full bg-orange-50 font-semibold transition-all-500 rounded-md hover:(bg-orange text-white)"
        :title="judul">
        {{ trimTitle(judul, 20) }}
      </NuxtLink>
    </div>
    <p class="text-sm text-gray mt--2">{{ tanggal_dibuat ?? "Tanggal tidak diketahui" }}</p>
    <div>
      <NuxtLink class="bg-orange text-white px-4 py-0 text-sm rounded no-underline" :to="'/gallery/' + id">
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