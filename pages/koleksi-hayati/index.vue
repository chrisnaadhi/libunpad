<script setup>
const i18n = useI18n();
const galleryDesc = computed(() => i18n.t("galleryDescription"));

const herbariumObj = {
  title: "Koleksi Hayati",
  definition: "(noun) /'herbarium/",
  imageUrl: "undraw_Online_art.png",
  titleDesc: {
    value:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime repellat minima quasi, fuga delectus ullam omnis dolorum vero aperiam dolore sequi, adipisci maiores beatae consequuntur praesentium ipsum accusantium, iure quaerat minus? Voluptas quisquam quidem minus cupiditate dolor, rem voluptatibus ad quo quam cumque provident, at mollitia in pariatur rerum architecto?",
  },
};
</script>

<template>
  <GenericBaseGlamLayout v-bind="herbariumObj" />
</template>
