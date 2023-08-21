<script setup>
const { getItems } = useDirectusItems();

const searchTugasAkhir = searchTugasAkhirDirectus();
const previewItem = previewModalRepository();
const meili = searchMeili();
const initialRes = ref();

await meili.generalSearch(meili.meiliKeyword);
initialRes.value = meili.universalResults;

const previewData = (npm) => {
  const searchData = meili.universalResults.find((elem) => elem?.NPM === npm);
  return searchData;
};

let selectedPreview = previewData(previewItem.numberSelected);

const openModal = (npm) => {
  selectedPreview = previewData(npm);
  previewItem.viewModal();
};

function trimText(txt) {
  const trimmedText = txt.slice(0, 55);
  return trimmedText + "...";
}

definePageMeta({
  layout: "default",
});
</script>

<template>
  <section class="max-w-7xl ma">
    <LazyClientOnly>
      <Teleport to="#modal">
        <ModalBase
          v-show="previewItem.showModal"
          @close="previewItem.viewModal"
        >
          <div @click.stop="" class="preview-block">
            <div class="flex flex-col items-center">
              <h3>{{ selectedPreview?.NPM }}</h3>
              <p class="font-semibold">{{ selectedPreview?.Title }}</p>
              <p class="text-sm text-justify">
                {{ selectedPreview?.Abstract }}
              </p>
              <p>Tipe: {{ selectedPreview?.Jenis }}</p>
            </div>
            <div class="mt-2">
              <NuxtLink
                :to="'/koleksi/repository/item/' + selectedPreview?.NPM"
                class="btn bg-orange text-white px-2 py-1 text-xs"
              >
                Detail
              </NuxtLink>
            </div>
          </div>
        </ModalBase>
      </Teleport>
    </LazyClientOnly>
    <h1>Repository Universitas Padjadjaran</h1>
    <p class="text-center">
      Koleksi Karya Ilmiah dan Tugas Akhir dari Civitas Akademika Universitas
      Padjadjaran
    </p>
    <p>{{ meili.inputState }}</p>
    <CollectionRepositoryMainSearch />
    <div v-show="meili.meiliKeyword !== '' && meili.inputState">
      <p class="text-center">
        Hasil pencarian:
        <span class="font-semibold">"{{ meili.meiliKeyword }}"</span>
        terdapat
        <span class="font-semibold">{{ meili.universalResults.length }}</span>
        data.
      </p>
    </div>
    <div class="flex flex-col gap-4 lg:(flex-row)">
      <CollectionRepositoryFilterOption />
      <div class="repository-collection" v-if="meili.inputState">
        <CollectionRepositoryCard
          v-for="hasil in meili.universalResults"
          :title="trimText(hasil.Title)"
          :author="hasil.Author"
          :description="hasil.Abstract"
          :fakultas="'Fakultas ' + hasil.Fakultas"
          :npm="hasil.NPM"
          :tipe="hasil.Jenis"
          :link-access="'/koleksi/repository/item/' + hasil.NPM"
          @preview="openModal(hasil.NPM)"
        />
      </div>
      <div v-else-if="!meili.inputState">
        <div class="max-w-3xl ma text-center">
          <h3>Sedang mencari data...</h3>
        </div>
      </div>
      <div v-else-if="meili.universalResults === []">
        <div class="max-w-3xl ma text-center">
          <h3>Tidak ditemukan</h3>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <div class="pagination-block">
        <button
          class="pagination-btn"
          :disabled="
            !searchTugasAkhir.searchResults || searchTugasAkhir.offset === 0
          "
          :class="
            !searchTugasAkhir.searchResults || searchTugasAkhir.offset === 0
              ? 'bg-gray-5 cursor-not-allowed'
              : 'bg-orange-5'
          "
          @click="searchTugasAkhir.previousPage()"
        >
          <h6>&lt;&lt; Prev. Page</h6>
        </button>
        <div>
          <p>{{ searchTugasAkhir.page }}</p>
        </div>
        <button
          class="pagination-btn"
          :disabled="
            !searchTugasAkhir.searchResults ||
            searchTugasAkhir.searchResults === 'loading' ||
            searchTugasAkhir.searchResults.length < 30
          "
          :class="
            !searchTugasAkhir.searchResults ||
            searchTugasAkhir.searchResults === 'loading' ||
            searchTugasAkhir.searchResults.length < 30
              ? 'bg-gray-5 cursor-not-allowed'
              : 'bg-orange-5'
          "
          @click="searchTugasAkhir.nextPage()"
        >
          Next Page &gt;&gt;
        </button>
      </div>
    </div>

    <div class="flex flex-col items-center">
      <h4>Perlu Bantuan ?</h4>
      <p>Hubungi kami melalui Email, Whatsapp atau Media Sosial.</p>
    </div>

    <div class="my-10 flex flex-col items-center">
      <NuxtLink to="/koleksi" class="btn bg-orange text-white">
        Kembali ke Koleksi
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
h1 {
  --at-apply: text-center text-5xl;
}

.repository-collection {
  --at-apply: flex flex-col gap-3 md:(grid grid-cols-2) lg:(grid grid-cols-3);
}

.preview-block {
  --at-apply: max-w-3xl flex flex-col items-center bg-white w-full max-h-80 overflow-y-scroll py-5 px-10 rounded-lg;
}

.pagination-block {
  --at-apply: w-full rounded text-center py-2 flex items-center justify-center gap-5;
}

.pagination-btn {
  --at-apply: btn py-1 px-2 text-white;
}
</style>
