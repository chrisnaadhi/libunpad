<script setup>
const data = ref("Pekan Ilmiah Nasional");
const { getItems } = useDirectusItems();

const getAllCampus = await getItems({
  collection: "pimnas",
  params: {
    filter: {
      status: "published",
    },
  },
});

const contohData = getAllCampus[0];
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
      <div class="flex justify-center gap-2 my-2">
        <p>Situs Pekan Ilmiah Nasional :</p>
        <NuxtLink href="https://pimnas36.unpad.ac.id/" target="_blank">
          https://pimnas36.unpad.ac.id/
        </NuxtLink>
      </div>
      <div>
        <iframe
          class="w-full h-2xl rounded-lg"
          src="https://www.youtube-nocookie.com/embed/WG0hV-BgZj4?si=vlw9rJMJ2wk8UF8x"
          title="Sukseskan Pimnas 36"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div class="mt-5">
        <h4>Lihat Video Sosialisasi Pimnas 36 :</h4>
        <div class="mt-5">
          <NuxtLink
            href="/kegiatan/pimnas/sosialisasi"
            class="btn bg-orange text-white py-1"
          >
            Video Sosialisasi&rightarrow;
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="border border-3 border-orange my-10 max-w-md ma" />
    <div class="bg-orange py-2 max-w-lg ma rounded-lg">
      <h2 class="text-white font-semibold">Profil Peserta PIMNAS 36 Unpad</h2>
    </div>
    <div class="grid grid-cols-3 gap-3 my-10 rounded-lg">
      <div v-for="campus in getAllCampus" class="bg-orange-2 rounded-xl">
        <GenericBaseCard>
          <div class="flex flex-col items-center text-center gap-2 my-5">
            <NuxtImg
              :src="campus.link_logo"
              class="w-full h-15 w-full object-contain"
            />
            <h6>{{ campus.nama_perguruan_tinggi }}</h6>
            <div>
              <NuxtLink
                class="btn bg-orange py-1 text-white"
                :href="'/kegiatan/pimnas/' + campus.id"
              >
                Lihat Profil
              </NuxtLink>
            </div>
          </div>
        </GenericBaseCard>
      </div>
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
