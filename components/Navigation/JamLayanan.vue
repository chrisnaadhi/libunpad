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
  <main class="bg-blue">
    <div class="text-center bg-yellow max-w-60 py-2 ma">
      <p class="text-xl font-600">
        {{ currentTime.toLocaleDateString("id-ID", options) }}
      </p>
    </div>

    <h1 class="text-center">Jam Layanan</h1>
  </main>
</template>
