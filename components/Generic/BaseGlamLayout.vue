<script setup>
defineProps({
  title: {
    type: String,
  },
  definition: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  titleDesc: {
    type: Object,
  },
  branding: {
    type: String,
  },
  collectionObj: {
    type: Object,
  },
  linkCollection: {
    type: String,
  },
  displayBody: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <section>
    <div class="py-5">
      <div class="header-section">
        <div class="max-w-2xl w-full">
          <h1 class="text-4xl">
            {{ title }}<span class="text-base"> (EN)</span>
          </h1>
          <p>
            <span class="italic">
              {{ definition }}
            </span>
            <br />
            {{ titleDesc.value }}
          </p>
          <GenericSearch />
        </div>
        <div>
          <NuxtImg :src="'/illustration/' + imageUrl" height="250px" format="webp" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
h3 {
  --at-apply: text-center text-xl;
}

section {
  --at-apply: w-full px-8 pb-5 xl:px-0;
}

.header-section {
  --at-apply: max-w-5xl ma flex flex-col-reverse xl:flex-row items-center justify-between;
}
</style>
