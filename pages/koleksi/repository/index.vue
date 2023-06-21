<script setup>
definePageMeta({
  layout: "default",
});

const { data: koleksiRepo } = await useFetch("/api/v1/koleksi/repo");
</script>

<template>
  <section class="max-w-7xl ma">
    <h1>Repository Unpad</h1>
    <p class="text-center">
      Koleksi Karya Ilmiah dan Tugas Akhir dari Civitas Akademika Universitas
      Padjadjaran
    </p>
    <div class="max-w-3xl ma py-5 flex gap-1">
      <input type="search" name="" id="" class="rounded px-2" />
      <button type="submit" class="btn bg-orange text-white">Search</button>
    </div>
    <div class="flex flex-col gap-4 lg:(flex-row)">
      <CollectionRepositoryFilterOption />
      <div class="repository-collection">
        <CollectionRepositoryCard
          v-for="koleksi in koleksiRepo.results"
          :author="koleksi.author"
          :title="koleksi.title"
          :tipe="koleksi.tipeKoleksi"
          :prodi="koleksi.prodi"
          :fakultas="koleksi.fakultas"
          :description="koleksi.deskripsi"
        />
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
    </div>
    <div class="mt-5">
      <div class="bg-orange-2 w-full rounded text-center py-2">
        <p>Pagination here</p>
      </div>
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

.repository-collection {
  --at-apply: flex flex-col gap-3 md:(grid grid-cols-2) lg:(grid grid-cols-3);
}
</style>
