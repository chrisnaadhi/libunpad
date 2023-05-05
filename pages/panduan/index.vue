<script setup></script>

<template>
  <section class="layer">
    <h1>Panduan Untuk Civitas dan Pengguna Platform Kandaga</h1>
    <p class="max-w-xl text-justify">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur dicta
      maiores eum temporibus fugit exercitationem veniam modi architecto
      recusandae consequuntur adipisci blanditiis iste enim omnis iure dolore
      soluta, ut consectetur facilis. Eius unde, nemo rem adipisci incidunt,
      perferendis ipsa similique odit enim molestias quis dolore libero hic
      deserunt et inventore.
    </p>
    <div class="w-full">
      <GenericBaseCard class="bg-orange-1 px-4 py-2">
        <h1>Layanan dan Fasilitas</h1>
      </GenericBaseCard>
    </div>
    <div class="w-full flex gap-4">
      <GenericBaseCard v-for="item in 2" class="bg-orange-1 px-4 py-2">
        <h1>{{ item }}</h1>
      </GenericBaseCard>
    </div>
  </section>
</template>

<style scoped>
.layer {
  --at-apply: max-w-7xl ma flex flex-col items-center justify-center gap-4 py-5;
}
</style>
