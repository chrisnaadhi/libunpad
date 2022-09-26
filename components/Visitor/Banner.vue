<script setup>
defineProps({
  display: String,
});
</script>

<template>
  <div class="w-full">
    <h2 class="heading-display">{{ display }}</h2>
    <slot />
  </div>
</template>

<style scoped>
.heading-display {
  --at-apply: bg-gray-8 p-5 text-center text-orange font-600 text-2xl md:text-4xl;
}
</style>
