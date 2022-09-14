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
    <footer class="text-center bg-gray-8 text-white">
      <div v-show="showList" class="max-w-7xl flex flex-col ma sm:flex-row">
        <section class="w-full">
          <ul class="list-none text-left">
            <li>Menu 1</li>
            <li>Menu 2</li>
            <li>Menu 3</li>
          </ul>
        </section>
        <section class="w-full">
          <ul class="list-none text-center">
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
        </section>
        <section class="w-full">
          <ul class="list-none text-right">
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
        <p class="font-500 text-dark">
          &copy; {{ new Date().getFullYear() }} Pusat Pengelolaan Pengetahuan
          Universitas Padjadjaran
        </p>
      </div>
    </footer>
  </ClientOnly>
</template>
