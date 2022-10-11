<script setup>
const route = useRoute();
const book = booksData();
</script>

<template>
  <p>{{ book[100] }}</p>
</template>
