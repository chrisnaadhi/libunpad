<script setup>
const { currentTime } = useCurrentTime();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
</script>

<template>
  <ClientOnly>
    <footer class="text-center bg-gray-5">
      <div class="max-w-7xl flex flex-col ma sm:flex-row">
        <section class="w-full">
          <ul class="list-none bg-orange-4">
            <li>Menu 1</li>
            <li>Menu 2</li>
            <li>Menu 3</li>
          </ul>
        </section>
        <section class="w-full">
          <ul class="list-none">
            <li>Medsos 1</li>
            <li>Medsos 2</li>
            <li>Medsos 3</li>
          </ul>
        </section>
      </div>
      <div class="py-3">
        <p>{{ currentTime.toLocaleTimeString("en-us", { hour12: false }) }}</p>
        <p>{{ currentTime.toLocaleDateString("id-ID", options) }}</p>
      </div>
      <div class="bg-orange-4 py-2">
        <p class="font-500">
          &copy; {{ new Date().getFullYear() }} Pusat Pengelolaan Pengetahuan
          Universitas Padjadjaran
        </p>
      </div>
    </footer>
  </ClientOnly>
</template>
