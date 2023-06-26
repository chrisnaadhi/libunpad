<script setup>
const searchTugasAkhir = searchTugasAkhirDirectus();
</script>

<template>
  <section>
    <div class="max-w-3xl ma p-3 flex gap-1">
      <div class="w-full h-full">
        <input
          type="search"
          v-model="searchTugasAkhir.keywords"
          name=""
          id=""
          class="relative rounded p-2"
          @keyup.enter="searchTugasAkhir.searchingTugasAkhir()"
        />
        <!-- <div class="search-wrapper" v-show="mainSearchBar !== ''">
          <div
            v-if="searchResults"
            v-for="item in searchResults"
            class="bg-orange-50 border border-1"
          >
            <h6>{{ textLimiter(item.Judul) }}</h6>
            <p>
              {{ textLimiter(item.AbstrakBersih) ?? textLimiter(item.Abstrak) }}
            </p>
          </div>
          <div v-else>
            <p>loading...</p>
          </div>
        </div> -->
      </div>
      <button
        type="submit"
        @click="searchTugasAkhir.searchingTugasAkhir()"
        class="btn bg-orange text-white"
      >
        Search
      </button>
    </div>
    <!-- <p class="text-center">Search Options:</p>
    <div class="max-w-3xl ma flex items-center justify-center gap-3">
      <div>
        <input
          type="checkbox"
          value="npm"
          name="npm"
          id="npm"
          v-model="searchFields"
        />
        <label for="npm">NPM</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="judul"
          name="judul"
          id="judul"
          v-model="searchFields"
        />
        <label for="npm">Judul</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="abstrak"
          name="abstrak"
          id="abstrak"
          v-model="searchFields"
        />
        <label for="npm">Abstrak</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="keywords"
          name="keywords"
          id="keywords"
          v-model="searchFields"
        />
        <label for="npm">Keywords</label>
      </div>

      <div>
        <button
          @click="clearAllFields"
          class="btn bg-orange text-white py-1 px-2 text-xs"
        >
          Clear filter
        </button>
      </div>
    </div> -->
  </section>
</template>

<style scoped>
.search-wrapper {
  --at-apply: bg-white border-1 border-orange px-3 absolute w-full max-w-172
    max-h-40 rounded overflow-auto;
}

label {
  --at-apply: px-1;
}
</style>
