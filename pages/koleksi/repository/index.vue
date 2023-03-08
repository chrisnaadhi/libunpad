<script setup>
definePageMeta({
  layout: "default",
});

const { data: koleksiRepo } = await useFetch("/api/v1/koleksi/repo");
</script>

<template>
  <section class="max-w-6xl ma">
    <h1>Repository Unpad</h1>
    <p class="text-center">
      Koleksi Karya Ilmiah dan Tugas Akhir dari Civitas Akademika Universitas
      Padjadjaran
    </p>
    <div class="grid grid-cols-2 gap-2">
      <CollectionRepositoryCard
        v-for="koleksi in koleksiRepo.results"
        :author="koleksi.author"
        :title="koleksi.title"
        :tipe="koleksi.tipeKoleksi"
        :prodi="koleksi.prodi"
        :fakultas="koleksi.fakultas"
        :description="koleksi.deskripsi"
      />
    </div>
    <div class="my-10 flex flex-col items-center">
      <NuxtLink to="/koleksi" class="btn bg-orange text-white">
        Kembali ke Koleksi
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
h1 {
  --at-apply: text-center text-4xl;
}
</style>
