<script setup lang="ts">
defineProps({
  banner: String,
  cover: String,
  title: String,
  author: String,
  description: String,
  urlBook: String,
  bannerColor: String,
});

const limitChars = (chars: string) => {
  const limited = chars.slice(0, 85);
  return limited;
};
</script>

<template>
  <section class="md:bg-white p-5 sm:rounded-xl shadow-2xl">
    <div class="content-book">
      <div class="ma relative md:min-w-30 2xl:(min-w-40 m-0)">
        <div class="banner-mobile">
          <h4>{{ banner }}</h4>
        </div>
        <figure>
          <img :src="cover" alt="" class="" />
          <figcaption>
            <p class="text-center" style="font-size: 10px">{{ title }}</p>
          </figcaption>
        </figure>
      </div>
      <div class="display-none xl:display-block">
        <div class="banner-desktop" :class="bannerColor">
          <h4>{{ banner }}</h4>
        </div>
        <h2 class="title-desktop py-2">{{ title }}</h2>
        <p class="font-600">Penulis: {{ author }}</p>
        <p>{{ limitChars(description) }}....</p>
      </div>
      <div class="xl:display-none mt-2 text-center">
        <h2 class="title-mobile">{{ title }}</h2>
        <p>Author: {{ author }}</p>
      </div>
    </div>
    <div class="action">
      <NuxtLink :to="urlBook" class="action-btn bg-orange-3 xl:(my-0 mr-4)">
        Detail
      </NuxtLink>
      <NuxtLink :to="urlBook" class="action-btn bg-sky-3 xl:(my-0 ml-4)">
        Pinjam
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.content-book {
  --at-apply: flex flex-col xl:flex-row md:gap-4;
}

.banner-mobile {
  --at-apply: display-block xl:display-none absolute p-2 text-xs font-600 bg-emerald-2 rounded-0 right-0;
}

.banner-desktop {
  --at-apply: p-1 mb-2 rounded text-xs text-center font-600 bg-emerald-3;
}

.title-mobile {
  --at-apply: font-600 text-xl sm:text-base;
}

.title-desktop {
  --at-apply: font-600 text-xs xl:text-base;
}

p {
  --at-apply: text-sm italic;
}

.action {
  --at-apply: flex flex-col justify-between text-sm text-center font-600 mt-4 mx-10 sm:mx-0 xl:(mx-0 flex-row);
}

.action-btn {
  --at-apply: btn w-full mr-0 my-2;
}
</style>
