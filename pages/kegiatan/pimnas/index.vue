<script setup>
const data = ref("Pekan Ilmiah Nasional");
</script>

<template>
  <section class="text-center">
    <div>
      <h1 class="text-5xl mt-10 font-semibold">{{ data }}</h1>
      <div class="flex items-center justify-center gap-5 my-5">
        <NuxtImg
          src="/images/lambang-unpad.png"
          class="w-24 h-24"
          format="webp"
        />
        <NuxtImg
          src="https://pimnas36.unpad.ac.id/wp-content/uploads/2023/09/Logo-PIMNAS-36-Unpad.png"
          class="h-24"
          format="webp"
        />
      </div>
      <div class="flex justify-center gap-2">
        <p>Situs Pekan Ilmiah Nasional :</p>
        <NuxtLink href="https://pimnas36.unpad.ac.id/" target="_blank">
          https://pimnas36.unpad.ac.id/
        </NuxtLink>
      </div>
    </div>
    <div class="border border-3 border-orange my-10 max-w-md ma" />
    <div class="bg-orange py-2 max-w-lg ma rounded-lg">
      <h2 class="text-white font-semibold">Profil Peserta PIMNAS 36 Unpad</h2>
    </div>
    <div>
      <GenericBaseCard>
        <div class="">
          <h5>Judul</h5>
        </div>
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
