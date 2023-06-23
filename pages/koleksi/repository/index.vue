<script setup>
const { getItems } = useDirectusItems();

const { data: koleksiRepo } = await useFetch("/api/v1/koleksi/repo");

const dataTADirectus = await getItems({
  collection: "tbtMhsUploadThesis",
  params: {
    limit: 30,
    sort: "-UploadTgl",
  },
});

function trimText(txt) {
  const trimmedText = txt.slice(0, 45);
  return trimmedText + "...";
}

definePageMeta({
  layout: "default",
});
</script>

<template>
  <section class="max-w-7xl ma">
    <h1>Repository Unpad</h1>
    <p class="text-center">
      Koleksi Karya Ilmiah dan Tugas Akhir dari Civitas Akademika Universitas
      Padjadjaran
    </p>
    <div class="max-w-3xl ma py-5 flex gap-1">
      <div class="w-full h-full">
        <input type="search" name="" id="" class="relative rounded p-2" />
        <div
          class="bg-white border-1 border-orange absolute w-full max-w-172 rounded"
        >
          <p class="py-3" v-for="o in 5">Search Results here</p>
        </div>
      </div>
      <button type="submit" class="btn bg-orange text-white">Search</button>
    </div>
    <div class="flex flex-col gap-4 lg:(flex-row)">
      <CollectionRepositoryFilterOption />
      <div class="repository-collection">
        <CollectionRepositoryCard
          v-for="koleksi in dataTADirectus"
          :npm="koleksi.MhsNPM"
          :title="trimText(koleksi.Judul)"
          :tipe="koleksi.tipeKoleksi"
          :description="koleksi.Abstrak"
          :link-access="'/koleksi/repository/item/' + koleksi.MhsNPM"
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
