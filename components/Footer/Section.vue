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
      <div
        v-show="showList"
        class="max-w-7xl flex flex-col ma sm:(grid grid-cols-2) md:(grid-cols-4)"
      >
        <section class="w-full p-3 text-left md:(text-center p-0)">
          <h1>{{ $t("footerQuickLink") }}</h1>
          <ul class="md:text-center">
            <li>
              <NuxtLink to="https://unpad.ac.id" target="_blank"
                >Website Unpad</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="https://students.unpad.ac.id" target="_blank">
                Portal Mahasiswa
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="https://paus.unpad.ac.id" target="_blank"
                >PAuS ID</NuxtLink
              >
            </li>
          </ul>
        </section>
        <section class="w-full p-3 text-left md:(text-center p-0)">
          <h1>{{ $t("footerInformationSource") }}</h1>
          <ul class="md:text-center">
            <li>
              <NuxtLink to="https://pintu.unpad.ac.id" target="_blank"
                >E-Resources Unpad</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="https://jurnal.unpad.ac.id" target="_blank"
                >Jurnal Unpad</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="https://e-resources.perpusnas.go.id/"
                target="_blank"
                >E-Resources Perpusnas</NuxtLink
              >
            </li>
          </ul>
        </section>
        <section class="w-full p-3 text-left md:(text-center p-0)">
          <h1>{{ $t("footerKandagaServices") }}</h1>
          <ul class="md:text-center">
            <li>Pencarian terintegrasi</li>
            <li>Akses Sumber Daya Akademik</li>
            <li>Layanan Pemustaka</li>
          </ul>
        </section>
        <section class="w-full p-3 text-left md:(text-right p-0)">
          <ul class="md:text-center">
            <h1>{{ $t("footerSocialMedia") }}</h1>
            <li>
              <NuxtLink to="mailto:pusat.pengetahuan@unpad.ac.id"
                >pusat.pengetahuan@unpad.ac.id</NuxtLink
              >
            </li>
            <li>+6282315798979</li>
            <li>
              <NuxtLink to="https://instagram.com/libunpad" target="_blank"
                >Instagram</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="https://twitter.com/libunpad" target="_blank"
                >Twitter</NuxtLink
              >
            </li>
          </ul>
        </section>
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
h1 {
  --at-apply: text-xl;
}

ul {
  --at-apply: list-none;
}

li {
  --at-apply: text-white cursor-pointer hover:(text-orange underline);
}
</style>
