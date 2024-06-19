<script setup>
  const val = ref("Pencarian Museum")
</script>

<template>
  <form class="w-full relative flex">
    <div class="flex items-center justify-center mt-2 w-full">
      <div class="relative w-full flex items-center justify-center mb-3">
        <div class="absolute top-4 left-3 z-3">
          <svg aria-hidden="true" class="w-6 h-6 text-orange dark:text-gray-400" fill="none" stroke="currentColor"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input type="search" class="input-form" name="library-search" id="library-search" :placeholder="val" />
        <div class="absolute top-2 right-2 z-3">
          <button type="submit" class="btn bg-orange text-white w-20">
            {{ $t("search") }}
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
.input-form {
  --at-apply: min-w-full h-14 px-10 py-3 md:pr-23 border-3 border-orange rounded-lg z-2 focus:(shadow-md outline-none);
}

.search-result {
  --at-apply: absolute w-full pt-90 z-1;
}

.content-result {
  --at-apply: bg-white text-gray-6 text-left rounded-lg max-h-75 overflow-auto transition-all-500;
}

.result-element {
  --at-apply: px-4 py-2;
}
</style>