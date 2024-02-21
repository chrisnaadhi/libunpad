<script setup>
const { currentTime } = useCurrentTime();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

defineProps({
  showList: Boolean,
});
</script>

<template>
  <ClientOnly>
    <footer class="text-center bg-gray-8 text-white pt-5">
      <div v-show="showList" class="max-w-7xl flex flex-col ma sm:(grid grid-cols-2) lg:(grid-cols-4)">
        <section class="footer-section">
          <h4>{{ $t("footerQuickLink") }}</h4>
          <ul class="md:text-center">
            <li>
              <NuxtLink to="https://unpad.ac.id" target="_blank">Website Unpad</NuxtLink>
            </li>
            <li>
              <NuxtLink to="https://students.unpad.ac.id" target="_blank">
                Portal Mahasiswa
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="https://paus.unpad.ac.id" target="_blank">PAuS ID</NuxtLink>
            </li>
            <li>
              <NuxtLink to="https://sundadigi.com/" target="_blank">
                SundaDigi
              </NuxtLink>
            </li>
          </ul>
        </section>
        <section class="footer-section">
          <h4>{{ $t("footerInformationSource") }}</h4>
          <ul class="md:text-center">
            <li>
              <NuxtLink to="https://pintu.unpad.ac.id" target="_blank">E-Resources Unpad</NuxtLink>
            </li>
            <li>
              <NuxtLink to="https://jurnal.unpad.ac.id" target="_blank">Jurnal Unpad</NuxtLink>
            </li>
            <li>
              <NuxtLink to="https://e-resources.perpusnas.go.id/" target="_blank">E-Resources Perpusnas</NuxtLink>
            </li>
          </ul>
        </section>
        <section class="footer-section">
          <h4>{{ $t("footerKandagaServices") }}</h4>
          <ul class="md:text-center">
            <li>Pencarian terintegrasi</li>
            <li>Akses Sumber Daya Akademik</li>
            <li>Layanan Pemustaka</li>
          </ul>
        </section>
        <section class="footer-section">
          <ul class="md:text-center">
            <h4>{{ $t("footerSocialMedia") }}</h4>
            <li>
              <NuxtLink to="mailto:pusat.pengetahuan@unpad.ac.id">pusat.pengetahuan@unpad.ac.id</NuxtLink>
            </li>
            <li>
              <NuxtLink to="https://wa.me/6282315798979" target="_blank">
                +6282315798979
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="https://instagram.com/kandagaunpad" target="_blank">Instagram</NuxtLink>
            </li>
            <li>
              <NuxtLink to="https://twitter.com/kandagaunpad" target="_blank">Twitter</NuxtLink>
            </li>
          </ul>
        </section>
      </div>
      <div class="max-w-7xl ma py-10 flex flex-col md:flex-row gap-10 justify-between">
        <div class="flex flex-col md:flex-row items-center gap-2 max-w-md pl-19 pr-10 md:px-0">
          <NuxtImg src="/images/lambang-unpad.png" class="min-w-30" format="webp" />
          <div class="text-center md:text-left">
            <h3>Portal Kandaga Unpad</h3>
            <p class="text-justify text-sm italic">Kandaga merupakan portal yang menyediakan banyak sumber informasi yang
              sudah
              dilanggan
              oleh Universitas
              Padjadjaran agar dapat dimanfaatkan oleh seluruh masyarakat Universitas Padjadjaran. Kandaga dikelola oleh
              Pusat Pengelolaan Pengetahuan, Universitas Padjadjaran.</p>
          </div>
        </div>
        <div>
          <h4>Nomor Pokok Perpustakaan Nasional:</h4>
          <h1 class="text-5xl font-bold">3211152D1014773</h1>
        </div>
      </div>
      <div class="py-5">
        <p class="text-5xl">
          {{ currentTime.toLocaleTimeString("en-us", { hour12: false }) }}
        </p>
        <p>{{ currentTime.toLocaleDateString("id-ID", options) }}</p>
      </div>
      <div class="bg-orange-4 py-2">
        <p class="font-600 text-dark">
          &copy; 2020-{{ currentTime.getFullYear() }} Pusat Pengelolaan
          Pengetahuan Universitas Padjadjaran
        </p>
      </div>
    </footer>
  </ClientOnly>
</template>

<style scoped>
ul {
  --at-apply: list-none;
}

li,
a {
  --at-apply: text-white cursor-pointer no-underline ml-0 hover:(text-orange underline);
}

.footer-section {
  --at-apply: w-full p-3 text-center md:(p-0);
}
</style>
