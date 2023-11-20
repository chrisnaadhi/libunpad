<script setup>
const { getItems } = useDirectusItems();
const layananPerpustakaan = await getItems({
  collection: "layanan_kandaga",
});

const panduanList = [
  "Layanan dan Fasilitas",
  "Informasi Akademik",
  "Literasi Informasi",
];
const layananDanFasilitas = ref("Layanan dan Fasilitas");

const toggleLayanan = (value) => {
  layananDanFasilitas.value = value;
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
    <div class="w-full grid grid-cols-4 gap-3">
      <div class="flex flex-col items-start gap-3">
        <button
          v-for="list in panduanList"
          class="btn text-left w-full border border-orange"
          :class="{ 'active-menu': layananDanFasilitas === list }"
          @click="toggleLayanan(list)"
        >
          &#11166;
          {{ list }}
        </button>
      </div>
      <div class="col-span-3 w-full">
        <Transition>
          <div
            class="w-full"
            v-show="layananDanFasilitas === 'Layanan dan Fasilitas'"
          >
            <GenericBaseCard class="bg-orange-2 px-4 py-2 mb-5 cursor-pointer">
              <h3 class="text-center col-span-17 text-center">
                Layanan dan Fasilitas
              </h3>
            </GenericBaseCard>
            <div class="w-full flex flex-col md:(grid grid-cols-2) gap-4">
              <GenericBaseCard
                v-for="item in layananPerpustakaan"
                class="bg-gray-1 p-6 flex items-center gap-2"
              >
                <div>
                  <NuxtImg
                    src="/images/no-image.jpg"
                    format="webp"
                    width="800px"
                  ></NuxtImg>
                </div>
                <div class="flex flex-col justify-around">
                  <h3 class="text-left">{{ item.nama_layanan }}</h3>
                  <p class="text-sm italic" v-html="item.deskripsi_layanan"></p>
                  <div class="w-full my-3">
                    <NuxtLink
                      :to="`/panduan/${item.slug_layanan}`"
                      class="action-btn"
                    >
                      Lihat Layanan
                    </NuxtLink>
                  </div>
                </div>
              </GenericBaseCard>
            </div>
          </div>
        </Transition>
        <Transition>
          <div
            class="w-full"
            v-show="layananDanFasilitas === 'Informasi Akademik'"
          >
            <GenericBaseCard class="bg-orange-2 px-4 py-2 mb-5 cursor-pointer">
              <h3 class="text-center col-span-17 text-center">
                Informasi Akademik
              </h3>
            </GenericBaseCard>
            <div>
              <p>Hello World!</p>
            </div>
          </div>
        </Transition>
        <Transition>
          <div
            class="w-full"
            v-show="layananDanFasilitas === 'Literasi Informasi'"
          >
            <GenericBaseCard class="bg-orange-2 px-4 py-2 mb-5 cursor-pointer">
              <h3 class="text-center col-span-17 text-center">
                Literasi Informasi
              </h3>
            </GenericBaseCard>
          </div>
        </Transition>
      </div>
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

.active-menu {
  --at-apply: btn bg-orange text-white;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
