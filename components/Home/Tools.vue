<script setup lang="ts">
const { locale } = useI18n();
const { data: tools } = await useFetch("/api/v1/tools");
</script>

<template>
  <div class="wrapper">
    <div class="bg-unpad ma mt--17 max-w-200 my-1 py-3 sm:rounded-lg">
      <h1 class="text-xl text-white font-700 md:text-3xl mx-3">
        {{ $t("toolsHomeTitle") }}
      </h1>
    </div>
    <p class="text-sm mt-3 pb-3 md:text-base xl:text-lg">
      {{ $t("toolsHomeDescription") }}
    </p>
    <div class="container content-wrapper">
      <div class="content" v-for="tool in tools">
        <div class="left-content">
          <div :class="tool.icon + ' icon-holder'" class="icon-holder" />
        </div>
        <div class="right-content">
          <div v-if="locale === 'id'" class="contents-display">
            <h2 class="tools-heading">{{ tool.namaTools }}</h2>
            <p class="text-2 lg:text-xs text-white">
              {{ tool.deskripsi }}
            </p>
            <NuxtLink
              :to="tool.slug"
              class="btn mt-3 py-0 bg-white text-sm text-unpad"
            >
              Lihat
            </NuxtLink>
          </div>
          <div v-else-if="locale === 'en'" class="contents-display">
            <h2 class="tools-heading">{{ tool.namaToolsEN }}</h2>
            <p class="text-2 lg:text-xs text-white">
              {{ tool.deskripsiEN }}
            </p>
            <NuxtLink
              :to="tool.slug"
              class="btn mt-3 py-0 bg-white text-sm text-unpad"
            >
              View
            </NuxtLink>
          </div>
          <div v-else class="contents-display">
            <p>Format bahasa belum tersedia.</p>
          </div>
        </div>
      </div>
    </div>
    <NuxtLink
      to="/panduan"
      class="text-gray-6 text-sm hover:(text-unpad underline)"
    >
      Lihat selengkapnya layanan yang dapat membantu keperluan akademik anda →
    </NuxtLink>
    <div class="hidden">
      <div class="i-mdi-pencil"></div>
      <div class="i-mdi-spanner"></div>
      <div class="i-mdi-books"></div>
      <div class="i-mdi-settings"></div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  --at-apply: py-10 max-w-7xl ma text-center bg-yellow-50 rounded-xl mt-15;
}

.content-wrapper {
  --at-apply: max-w-6xl flex flex-1 flex-wrap ma justify-center 2xl:(flex-nowrap);
}

.content {
  --at-apply: relative w-full flex grow h-48 m-5 rounded-md top-0 hover:(top--4) md:(w-1/5);
  transition: top ease 0.5s;
}

.left-content {
  --at-apply: bg-yellow-3 h-full w-12 rounded-l-lg flex items-end justify-end;
}

.right-content {
  --at-apply: bg-unpad h-full w-full rounded-r-lg;
}

.icon-holder {
  --at-apply: bg-white w-12 h-12 absolute mr--4 mb-2;
}

.content:hover>.left-content {
  --at-apply: transition-all-500 bg-unpad;
}

.contents-display {
  --at-apply: h-full flex flex-col px-2 items-center justify-center;
}

.tools-heading {
  --at-apply: text-white font-600 text-xl;
}
</style>
