<script setup>
const data = ref(" Vue Composition API");
</script>

<template>
  <section class="max-w-7xl ma">
    <div class="my-3 text-center">
      <NuxtLink href="/kegiatan/pimnas" class="btn text-white bg-orange py-1">
        &leftarrow;Kembali
      </NuxtLink>
    </div>
    <div class="flex gap-4 flex-col items-center p-3 rounded-lg mt-5 mb-15">
      <NuxtImg src="/images/lambang-unpad.png" class="w-24 h-24 mt-5" />
      <h1 class="text-5xl font-semibold">
        Sosialisasi Pimnas 36 Universitas Padjadjaran
      </h1>
      <div class="min-w-full">
        <iframe class="w-full h-3xl rounded-lg" src="https://www.youtube-nocookie.com/embed/fh9JYDYzS4g"
          title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
      </div>
    </div>
  </section>
</template>

<style scoped>
p {
  --at-apply: italic;
}
</style>
