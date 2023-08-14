<script setup>
const { getItems } = useDirectusItems();
const data = ref("E-Teater");

const listKategori = await getItems({
  collection: "tipe_koleksi",
});
</script>

<template>
  <section>
    <div class="max-w-3xl ma">
      <div class="flex flex-col items-center justify-center gap-3 mx-5">
        <h1 class="e-teater kandaga-gradient">{{ data }}</h1>
        <p class="italic">
          E-Teater merupakan portal digital dari Teater Pengetahuan yang ada di
          Universitas Padjadjaran. Pengelolaan E-Teater dilakukan oleh Pusat
          Pengelolaan Pengetahuan yang sekaligus menjadi portal diseminasi
          informasi terhadap konten-konten ilmiah populer yang ditayangkan di
          Teater Pengetahuan Universitas Padjadjaran.
        </p>
        <NuxtImg
          src="/images/teater3.png"
          class="rounded-xl object-cover w-full h-50"
        />
      </div>
    </div>
    <div class="my-15">
      <div>
        <h2 class="kandaga-gradient font-semibold py-2">Teater Pengetahuan</h2>
        <div class="flex flex-col lg:flex-row gap-5 mt-3">
          <div class="w-full">
            <iframe
              width="100%"
              src="https://www.youtube-nocookie.com/embed/jtcBwtuIH-E"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              class="min-h-sm shadow-md shadow-gray rounded-xl"
            ></iframe>
          </div>
          <div class="w-full">
            <div class="flex justify-center gap-3">
              <NuxtImg
                src="/images/teater2.png"
                class="w-48% rounded-lg shadow-md shadow-gray"
              />
              <NuxtImg
                src="/images/teater1.png"
                class="w-48% rounded-lg shadow-md shadow-gray"
              />
            </div>
            <p class="text-justify p-2 italic mt-3">
              Teater Pengetahuan adalah salah satu unit yang berada di bawah
              Pusat Pengelolaan Pengetahuan yang memiliki fungsi untuk
              <span class="font-semibold">mempublikasikan</span> karya-karya
              ilmiah dalam bentuk media
              <span class="font-semibold">audio-visual</span> (yang bersifat
              lebih populer) di lingkungan Universitas Padjadjaran.
            </p>
            <div class="flex justify-evenly">
              <div class="teater-info">
                <div class="i-mdi-calendar-clock w-10 h-10 text-orange"></div>
                <p class="font-semibold text-xl">Senin - Jum'at</p>
                <p>09.00 - 11.00 WIB</p>
              </div>
              <div class="teater-info">
                <div class="i-mdi-map-marker w-10 h-10 text-orange"></div>
                <p class="font-semibold text-xl">Ruang Teater Pengetahuan</p>
                <p class="text-sm">Rektorat Lt.1 Universitas Padjadjaran</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-10">
      <h2 class="kandaga-gradient font-semibold py-2">Koleksi E-Teater</h2>
      <div class="grid grid-cols-4 gap-3 mt-2">
        <NuxtLink
          class="literasi"
          v-for="data in listKategori"
          :to="'e-teater/' + data.id"
        >
          {{ data.nama_tipe_koleksi }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma text-center my-5;
}

.e-teater {
  --at-apply: font-semibold text-5xl;
}

.literasi {
  --at-apply: bg-orange-1 h-15 text-orange font-semibold flex items-center
    justify-center rounded transition-all-500 no-underline cursor-pointer hover:(bg-orange text-white);
}

.mid-content {
  --at-apply: flex items-center justify-center;
}

.teater-info {
  --at-apply: flex flex-col items-center justify-center;
}
</style>
