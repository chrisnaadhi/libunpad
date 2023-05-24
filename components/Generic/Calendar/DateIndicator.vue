<script setup>
defineProps({
  selectedDate: {
    type: Object,
    required: true,
  },
});
const selectedMonth = computed(() => {
  return selectedDate.format("MMMM YYYY");
});
</script>

<template>
  <div class="calendar-date-indicator">{{ selectedMonth }}</div>
</template>
