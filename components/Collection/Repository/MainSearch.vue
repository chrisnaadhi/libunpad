<script setup lang="ts">
defineProps({
  isFaculty: Boolean,
});
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
          placeholder="Masukkan kata yang ingin dicari"
          @keyup.enter="searchTugasAkhir.searchingTugasAkhir(true, isFaculty)"
        />
        <!-- <div class="search-wrapper" v-show="mainSearchBar !== ''">
          <div
            v-if="searchResults"
            v-for="item in searchResults"
            class="bg-yellow-50 border border-1"
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
        @click="searchTugasAkhir.searchingTugasAkhir(true, isFaculty)"
        class="btn bg-unpad text-white"
      >
        Search
      </button>
    </div>
  </section>
</template>

<style scoped>
.search-wrapper {
  --at-apply: bg-white border-1 border-unpad px-3 absolute w-full max-w-172
    max-h-40 rounded overflow-auto;
}

label {
  --at-apply: px-1;
}
</style>
