<script setup>
const libraryObj = {
  title: "Library",
  definition: "(noun) /'laɪ.brer.i/",
  imageUrl: "undraw_Books.png",
  titleDesc:
    "A library is a collection of materials, books or media that are accessible for use and not just for display purposes. A library provides physical (hard copies) or digital access (soft copies) materials, and may be a physical location or a virtual space, or both.",
};
</script>

<template>
  <GenericBaseGlamLayout v-bind="libraryObj" />
</template>
