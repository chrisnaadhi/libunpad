<script setup>
defineProps({
  left: Boolean,
  title: String,
});
</script>

<template>
  <main class="my-10">
    <h1
      class="my-2 py-1 w-50 ma text-center text-2xl font-600 bg-gray-6 text-white rounded-lg"
    >
      {{ title }}
    </h1>
    <section class="frame-topic">
      <div class="main-topic">KOTAK BESAR</div>
      <article
        class="sub-topic"
        :class="left === true ? 'order-last' : 'order-first'"
      >
        <div class="child-topic">KOTAK PANJANG</div>
        <div class="child-topic">KOTAK PANJANG</div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.frame-topic {
  --at-apply: grid gap-2 mx-5 md:(grid-cols-4 mx-0);
}

.main-topic {
  --at-apply: rounded-lg h-xs bg-blue col-start-1 col-end-4 md:col-span-1;
}

.sub-topic {
  --at-apply: hidden grid gap-2 col-span-3 md:inline-grid;
}

.child-topic {
  --at-apply: rounded-lg bg-orange;
}
</style>
