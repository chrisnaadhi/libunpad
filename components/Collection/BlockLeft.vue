<script setup>
defineProps({
  left: Boolean,
  title: String,
});
</script>

<template>
  <main class="my-10">
    <h1 class="block-title">
      {{ title }}
    </h1>
    <section class="frame-topic">
      <div class="main-topic">
        <img src="/images/9396112_3023.jpg" alt="" class="image-cover" />
        <div class="gradient-background">
          <h3 class="text-3xl font-600 text-white">Kotak Besar</h3>
          <p class="text-xs text-white text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            suscipit vel itaque alias ab. Distinctio nemo adipisci ipsa
            repudiandae voluptas eligendi consequuntur minus minima aut.
          </p>
        </div>
      </div>
      <article
        class="sub-topic"
        :class="left === true ? 'order-last' : 'order-first'"
      >
        <div
          class="child-topic"
          :style="{
            'background-image': 'url(' + '/images/9396112_3023.jpg' + ')',
          }"
        >
          <div class="flex h-full items-center justify-center">
            <h3 class="text-white">Kotak Panjang</h3>
          </div>
        </div>
        <div class="child-topic">
          <div>
            <h3>Kotak Panjang</h3>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.frame-topic {
  --at-apply: grid gap-2 mx-5 md:(grid-cols-4 mx-0);
}

.block-title {
  --at-apply: my-2 py-1 w-50 ma text-center text-2xl font-600 bg-gray-6 text-white rounded-lg;
}

.main-topic {
  --at-apply: relative rounded-lg h-xs col-start-1 col-end-4 md:col-span-1;
}

.image-cover {
  --at-apply: rounded-lg h-full object-cover;
}

.gradient-background {
  --at-apply: flex flex-col justify-center rounded-lg h-50% absolute bottom-0 w-full bg-gradient-to-t from-black transition-all-500 px-3 hover:(h-full to-black/20);
}

.sub-topic {
  --at-apply: hidden grid gap-2 col-span-3 md:inline-grid;
}

.child-topic {
  --at-apply: rounded-lg bg-orange;
}
</style>
