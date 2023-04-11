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
          <h1>Tautan Cepat</h1>
          <ul class="md:text-center">
            <li class="text-orange">Menu 1</li>
            <li>Menu 2</li>
            <li>Menu 3</li>
          </ul>
        </section>
        <section class="w-full p-3 text-left md:(text-center p-0)">
          <h1>Sumber Informasi</h1>
          <ul class="md:text-center">
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
        </section>
        <section class="w-full p-3 text-left md:(text-center p-0)">
          <h1>Layanan Kandaga</h1>
          <ul class="md:text-center">
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
        </section>
        <section class="w-full p-3 text-left md:(text-right p-0)">
          <ul class="md:text-center">
            <h1>Media Sosial Kami</h1>
            <li>Medsos 1</li>
            <li>Medsos 2</li>
            <li>Medsos 3</li>
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
