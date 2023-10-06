<script setup>
const { getItems } = useDirectusItems();
const layananPerpustakaan = await getItems({
  collection: "layanan_kandaga",
});

const layananDanFasilitas = ref(true);

const toggleLayanan = () => {
  layananDanFasilitas.value = !layananDanFasilitas.value;
};
</script>

<template>
  <section class="layer">
    <h1>Panduan Untuk Civitas dan Pengguna Platform Kandaga</h1>
    <p class="max-w-6xl italic text-center">
      Panduan Penggunaan Platform Kandaga merupakan panduan bagi mahasiswa dan
      dosen dalam menjelajahi dan memanfaatkan sumber daya perpustakaan digital
      yang dikelola oleh Kandaga dengan efisien. Panduan ini dirancang untuk
      memberikan pemahaman yang mendalam tentang cara menggunakan platform
      perpustakaan dengan mudah dan efektif, sehingga pengguna dapat
      memaksimalkan pengalaman mereka dalam mengejar pengetahuan dan melakukan
      penelitian.
    </p>
    <div class="w-full">
      <GenericBaseCard
        class="bg-orange-2 px-4 py-2 cursor-pointer"
        @click="toggleLayanan"
      >
        <h3 class="text-center">Layanan dan Fasilitas</h3>
      </GenericBaseCard>
    </div>
    <div
      class="w-full flex flex-col md:(grid grid-cols-2) gap-4"
      v-show="layananDanFasilitas"
    >
      <GenericBaseCard
        v-for="item in layananPerpustakaan"
        class="bg-gray-1 p-6 flex items-center gap-2"
      >
        <div>
          <NuxtImg
            src="/images/no-image.jpg"
            format="webp"
            width="600px"
          ></NuxtImg>
        </div>
        <div class="flex flex-col justify-around">
          <h3 class="text-left">{{ item.nama_layanan }}</h3>
          <p class="text-sm italic" v-html="item.deskripsi_layanan"></p>
          <p>{{ item.slug_layanan }}</p>
          <div class="w-full my-3">
            <NuxtLink :to="`/panduan/${item.slug_layanan}`" class="action-btn">
              Lihat Layanan
            </NuxtLink>
          </div>
        </div>
      </GenericBaseCard>
    </div>
  </section>
</template>

<style scoped>
.layer {
  --at-apply: max-w-7xl ma flex flex-col items-center justify-center gap-4 py-5
    px-2;
}

.action-btn {
  --at-apply: btn bg-orange py-1 px-3 text-white;
}
</style>
