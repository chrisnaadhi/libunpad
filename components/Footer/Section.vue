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
    <footer class="text-center">
      <div>
        <p>{{ currentTime.toLocaleDateString("id-ID", options) }}</p>
        <p>{{ currentTime.toLocaleTimeString("en-us", { hour12: false }) }}</p>
      </div>
      <div>
        <p>
          &copy; {{ new Date().getFullYear() }} Pusat Pengelolaan Pengetahuan
          Universitas Padjadjaran
        </p>
      </div>
    </footer>
  </ClientOnly>
</template>
