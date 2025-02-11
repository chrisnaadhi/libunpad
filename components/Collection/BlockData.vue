<script setup>
defineProps({
  left: Boolean,
  title: String,
  description: String,
  page: String,
  firstCollection: Object,
  secondCollection: Object,
});

const { getThumbnail: img } = useDirectusFiles();
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
          <h2 class="text-2xl font-600 text-white">{{ title }}</h2>
          <p class="text-xs text-white text-justify">
            {{ description }}
          </p>
          <div>
            <NuxtLink
              :to="page"
              class="btn my-3 bg-unpad py-0 text-white text-xs"
              >Akses &rightarrow;</NuxtLink
            >
          </div>
        </div>
      </div>
      <article
        class="sub-topic"
        :class="left === true ? 'order-last' : 'order-first'"
      >
        <div class="child-topic">
          <NuxtImg
            :src="
              firstCollection?.thumbnail
                ? img(firstCollection?.thumbnail)
                : '/images/no-image.jpg'
            "
            class="image-cover w-full"
          />
          <div class="vertical-backdrop">
            <h3 class="text-white text-xl font-600">
              {{ firstCollection?.judul ?? "Belum ada Koleksi" }}
            </h3>
            <p class="sub-description">
              <span
                v-html="
                  firstCollection?.keterangan_koleksi
                    ? trimTitle(firstCollection?.keterangan_koleksi, 50)
                    : 'Belum ada Koleksi'
                "
              ></span>
            </p>
            <NuxtLink
              v-show="firstCollection?.id"
              :to="page + '/' + firstCollection?.id"
              >Lihat ></NuxtLink
            >
          </div>
        </div>
        <div class="child-topic">
          <NuxtImg
            :src="
              secondCollection?.thumbnail
                ? img(secondCollection?.thumbnail)
                : '/images/no-image.jpg'
            "
            class="image-cover w-full"
          />
          <div class="vertical-backdrop">
            <h3 class="text-white text-xl font-600">
              {{ secondCollection?.judul ?? "Belum ada Koleksi" }}
            </h3>
            <p class="sub-description">
              <span
                v-html="
                  secondCollection?.keterangan_koleksi
                    ? trimTitle(secondCollection?.keterangan_koleksi, 50)
                    : 'Belum ada Koleksi'
                "
              ></span>
            </p>
            <NuxtLink
              v-show="secondCollection?.id"
              :to="page + '/' + secondCollection?.id ?? ''"
              >Lihat ></NuxtLink
            >
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
a {
  --at-apply: no-underline;
}

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
  --at-apply: hidden grid max-h-80 h-full gap-2 col-span-3 md:inline-grid;
}

.child-topic {
  --at-apply: relative h-40;
}

.vertical-backdrop {
  --at-apply: flex flex-col items-center justify-center rounded-lg h-full absolute bottom-0 w-full bg-dark/80;
}

.sub-description {
  --at-apply: transition-all-500 overflow-hidden h-0 text-xs text-center text-white;
}

.vertical-backdrop:hover .sub-description {
  --at-apply: h-10 block;
}
</style>
