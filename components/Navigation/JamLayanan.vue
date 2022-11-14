<script setup>
const { currentTime } = useCurrentTime();
const { display, disableDisplay } = layananDisplay(); 
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const preventMainClick = () => {
  display = true
}

onMounted(() => {
  document.addEventListener('click', () => {
    disableDisplay()
    console.log(display)
  })
})
</script>

<template>
  <main @click.self="preventMainClick" class="bg-orange-1 text-center">
    <div class="bg-orange max-w-50 py-2 ma">
      <p class="text-md text-white font-600">
        {{ currentTime.toLocaleDateString("id-ID", options) }}
      </p>
    </div>
    <div class="container ma flex items-center justify-evenly py-5">
      <section class="px-5">
        <h1 class="font-600">Perpustakaan Pusat, Jatinangor</h1>
        <p>Hari ini</p>
        <p><span class="text-green-6 font-600">Buka</span>: 08.00 - 15.30</p>
      </section>
      <section class="px-5">
        <h1 class="font-600 text-xl">Perpustakaan Fakultas, Jatinangor</h1>
        <p class="">Hari ini ({{ currentTime.toLocaleDateString("id-ID", { weekday: 'long' }) }})</p>
        <p><span class="text-2xl text-red-6 font-800">Tutup</span></p>
      </section>
      <section class="px-5">
        <h1 class="font-600">Perpustakaan Fakultas, Dipatiukur</h1>
        <p>Hari ini</p>
        <p><span class="text-green-6 font-600">Buka</span>: 08.00 - 15.30</p>
      </section>
      <section class="px-5">
        <h1 class="font-600">Lihat Semua Lokasi</h1>
        <div class="flex items-center justify-center">
          <div class="i-mdi-calendar-clock bg-dark w-10 h-10" />
          <p class="max-w-40 text-sm text-orange-6 underline cursor-pointer">
            Jam Layanan seluruh Perpustakaan di Unpad
            <div class="i-mdi-arrow-collapse-right" />
          </p>
          
        </div>
      </section>
    </div>
  </main>
</template>