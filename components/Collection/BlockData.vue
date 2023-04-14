<script setup>
defineProps({
  left: Boolean,
  title: String,
  page: String,
});
</script>

<template>
  <main class="my-10 flex flex-col items-center">
    <NuxtLink :to="page">
      <span class="block-title">{{ title }}</span>
    </NuxtLink>
    <section class="frame-topic">
      <div class="main-topic">
        <img src="/images/9396112_3023.jpg" alt="" class="image-cover" />
        <div class="gradient-background">
          <h2 class="text-2xl font-600 text-white">Kotak Besar</h2>
          <p class="text-xs text-white text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores
            voluptatem aspernatur esse, explicabo molestias cumque sit
            architecto hic error possimus?
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
          <div class="vertical-backdrop">
            <h3 class="text-white text-xl font-600">Kotak Panjang</h3>
            <p class="sub-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              cum enim totam voluptates ad accusantium maxime odio consectetur
              necessitatibus! Quos!
            </p>
          </div>
        </div>
        <div
          class="child-topic"
          :style="{
            'background-image': 'url(' + '/images/museum.jpg' + ')',
          }"
        >
          <div class="vertical-backdrop">
            <h3 class="text-white text-xl font-600">Kotak Panjang</h3>
            <p class="sub-description">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Provident soluta quia sint quisquam molestiae autem cupiditate?
              Nemo quod optio at.
            </p>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.frame-topic {
  --at-apply: grid gap-2 my-5 mx-5 md:(grid-cols-4 mx-2) xl:mx-0;
}

.block-title {
  --at-apply: py-1 px-5 w-50 ma text-center text-2xl font-600 bg-gray-6 text-white rounded-lg;
}

.main-topic {
  --at-apply: relative rounded-lg h-80 col-start-1 col-end-4 md:col-span-1;
}

.image-cover {
  --at-apply: rounded-lg h-full object-cover;
}

.gradient-background {
  --at-apply: flex flex-col justify-center rounded-lg h-60% absolute bottom-0 w-full bg-gradient-to-t from-black to-black/10 transition-all-500 px-3 hover:(h-full);
}

.sub-topic {
  --at-apply: hidden grid gap-2 col-span-3 md:inline-grid;
}

.child-topic {
  --at-apply: rounded-lg bg-orange h-39;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.vertical-backdrop {
  --at-apply: h-full transition-all-500 flex flex-col items-center justify-center rounded-lg bg-black/40 px-5 hover:(bg-black/60);
}

.sub-description {
  --at-apply: transition-all-500 overflow-hidden h-0 text-xs text-center text-white;
}

.vertical-backdrop:hover .sub-description {
  --at-apply: h-10 block;
}
</style>
