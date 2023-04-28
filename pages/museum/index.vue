<script setup>
const museumObj = {
  title: "Museum",
  definition: "(noun) /mjuːˈziː.əm/",
  imageUrl: "undraw_search_app.png",
  titleDesc:
    "A museum is a building or institution that cares for and displays a collection of artifacts and other objects of artistic, cultural, historical, or scientific importance.",
};
</script>

<template>
  <GenericBaseGlamLayout v-bind="museumObj" />
</template>
