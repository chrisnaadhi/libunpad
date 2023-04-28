<script setup>
const galleryObj = {
  title: "Gallery",
  definition: "(noun) /'gæl.ər.i/",
  imageUrl: "undraw_Picture.png",
  titleDesc:
    'Gallery is defined as a room or building where objects or works of art are exhibited and so on. Oxford Advanced Learner\'s Dictionary states Gallery as "A room or building for showing works of art".',
};
</script>

<template>
  <GenericBaseGlamLayout v-bind="galleryObj" />
</template>
