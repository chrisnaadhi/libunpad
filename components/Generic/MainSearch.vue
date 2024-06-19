<script setup>
const defaultFacet = ref("main")

const chooseFacet = (name) => {
  defaultFacet.value = name
}
</script>

<template>
  <section>
    <div class="flex items-center justify-around text-center text-xs md:text-base">
      <button class="tab-btn" :class="defaultFacet === 'main' ? 'active-btn' : 'inactive-btn'" @click="chooseFacet('main')">Pencarian</button>
      <button class="tab-btn" :class="defaultFacet === 'gallery' ? 'active-btn' : 'inactive-btn'" @click="chooseFacet('gallery')">Gallery</button>
      <button class="tab-btn" :class="defaultFacet === 'library' ? 'active-btn' : 'inactive-btn'" @click="chooseFacet('library')">Library</button> 
      <button class="tab-btn" :class="defaultFacet === 'archive' ? 'active-btn' : 'inactive-btn'" @click="chooseFacet('archive')">Archive</button>
      <button class="tab-btn" :class="defaultFacet === 'museum' ? 'active-btn' : 'inactive-btn'" @click="chooseFacet('museum')">Museum</button>
    </div>
    <div class="bg-orange-2 px-5 py-2">
      <div>
        <GenericSearch v-show="defaultFacet === 'main'" />
      </div>
      <div>
        <GenericLibrarySearch v-show="defaultFacet === 'library'" />
      </div>
      <div>
        <GenericGallerySearch v-show="defaultFacet === 'gallery'" />
      </div>
      <div>
        <GenericArchiveSearch type="search" v-show="defaultFacet === 'archive'" />
      </div>
      <div>
        <GenericMuseumSearch type="search" v-show="defaultFacet === 'museum'" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.tab-btn {
  --at-apply: px-4 py-2 w-full rounded-t-lg;
}

.active-btn {
  --at-apply: bg-orange-2;
}

.inactive-btn {
  --at-apply: bg-gray-3;
}

p {
  --at-apply: italic;
}
</style>