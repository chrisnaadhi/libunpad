<script setup>
defineProps({
  title: {
    type: Object,
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

const { locale } = useI18n()
</script>

<template>
  <section>
    <div class="py-5">
      <div class="header-section">
        <div class="max-w-2xl w-full">
          <h1 class="kandaga-gradient">
            {{ title.value }}<span class="text-base pl-2">({{ locale }})</span>
          </h1>
          <p class="text-lg">
            <span class="italic">
              {{ definition }}
            </span>
            <br />
            {{ titleDesc.value }}
          </p>
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
