<script setup>
const { getItems } = useDirectusItems();
const myData = await getItems({
  collection: "artikel",
});
</script>

<template>
  <pre>{{ myData }}</pre>
</template>
