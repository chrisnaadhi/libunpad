<script setup>
const defaultFacet = ref("main")

const chooseFacet = (name) => {
  defaultFacet.value = name
}
</script>

<template>
  <section>
    <div class="flex items-center justify-around text-center text-xs md:text-base z-10">
      <button class="tab-btn" :class="defaultFacet === 'main' ? 'active-btn' : 'inactive-btn'"
        @click="chooseFacet('main')">Pencarian</button>
      <button class="tab-btn" :class="defaultFacet === 'gallery' ? 'active-btn' : 'inactive-btn'"
        @click="chooseFacet('gallery')">Gallery</button>
      <button class="tab-btn" :class="defaultFacet === 'library' ? 'active-btn' : 'inactive-btn'"
        @click="chooseFacet('library')">Library</button>
      <button class="tab-btn" :class="defaultFacet === 'archive' ? 'active-btn' : 'inactive-btn'"
        @click="chooseFacet('archive')">Archive</button>
      <button class="tab-btn" :class="defaultFacet === 'museum' ? 'active-btn' : 'inactive-btn'"
        @click="chooseFacet('museum')">Museum</button>
    </div>
    <div class="bg-orange-2 px-5 py-2 h-full max-h-23 rounded-b-xl">
      <Transition name="slide-up">
        <div v-if="defaultFacet === 'main'">
          <GenericSearch />
        </div>
        <div v-else-if="defaultFacet === 'library'">
          <GenericLibrarySearch  />
        </div>
        <div v-else-if="defaultFacet === 'gallery'">
          <GenericGallerySearch  />
        </div>
        <div v-else-if="defaultFacet === 'archive'">
          <GenericArchiveSearch  />
        </div>
        <div v-else-if="defaultFacet === 'museum'">
          <GenericMuseumSearch />
        </div>
        <div v-else>
          <p class="text-red">Error! {{ defaultFacet }}</p>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.tab-btn {
  --at-apply: px-4 py-2 w-full rounded-t-lg;
}

.active-btn {
  --at-apply: bg-orange-2 text-orange-6;
}

.inactive-btn {
  --at-apply: bg-gray-3 text-gray-6 transition-all-500 hover:bg-gray-2;
}

.slide-up-enter-active {
  transition: all 0.25s ease-in;
  transition-delay: 0.25s
}

.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(5px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>