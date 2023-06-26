<script setup>
const { getItems } = useDirectusItems();

const searchTugasAkhir = searchTugasAkhirDirectus();
const previewItem = previewModalRepository();

const dataTADirectus = await getItems({
  collection: "tbtMhsUploadThesis",
  params: {
    limit: 30,
    sort: "-UploadTgl",
  },
});

const previewData = (npm) => {
  if (!searchTugasAkhir.searchResults) {
    const searchData = dataTADirectus.find((elem) => elem.MhsNPM === npm);
    return searchData;
  } else {
    const searchData = searchTugasAkhir.searchResults.find(
      (elem) => elem.MhsNPM === npm
    );
    return searchData;
  }
};

let selectedPreview = previewData(previewItem.numberSelected);

const openModal = (npm) => {
  selectedPreview = previewData(npm);
  previewItem.viewModal();
};

function trimText(txt, maxVal) {
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
              <h3>{{ selectedPreview.MhsNPM }}</h3>
              <p>{{ selectedPreview.Judul }}</p>
              <p class="text-xs">
                {{ selectedPreview.AbstrakBersih ?? selectedPreview.Abstrak }}
              </p>
              <p>Keywords: {{ selectedPreview.Keywords }}</p>
            </div>
            <div class="mt-2">
              <NuxtLink
                :to="'/koleksi/repository/item/' + selectedPreview.MhsNPM"
                class="btn bg-orange text-white px-2 py-1 text-xs"
              >
                Detail
              </NuxtLink>
            </div>
          </div>
        </ModalBase>
      </Teleport>
    </LazyClientOnly>
    <h1>Repository Unpad</h1>
    <p class="text-center">
      Koleksi Karya Ilmiah dan Tugas Akhir dari Civitas Akademika Universitas
      Padjadjaran
    </p>
    <CollectionRepositoryMainSearch />
    <div v-show="searchTugasAkhir.searchResults !== 'loading'">
      <p class="text-center">
        Hasil pencarian:
        <span class="font-semibold">"{{ searchTugasAkhir.keywords }}"</span>
        terdapat
        <span class="font-semibold">{{
          !searchTugasAkhir.searchResults
            ? dataTADirectus.length
            : searchTugasAkhir.searchResults.length
        }}</span>
        data.
      </p>
    </div>
    <div class="flex flex-col gap-4 lg:(flex-row)">
      <!-- <CollectionRepositoryFilterOption /> -->
      <div class="repository-collection" v-if="!searchTugasAkhir.searchResults">
        <CollectionRepositoryCard
          v-for="koleksi in dataTADirectus"
          :npm="koleksi.MhsNPM"
          :title="trimText(koleksi.Judul)"
          :tipe="koleksi.tipeKoleksi"
          :description="koleksi.Abstrak"
          :link-access="'/koleksi/repository/item/' + koleksi.MhsNPM"
          @preview="openModal(koleksi.MhsNPM)"
        />
      </div>
      <div v-else-if="searchTugasAkhir.searchResults === 'loading'">
        <div class="max-w-3xl ma text-center">
          <h3>Sedang mencari data...</h3>
        </div>
      </div>
      <div v-else-if="searchTugasAkhir.searchResults === '[]'">
        <div class="max-w-3xl ma text-center">
          <h3>Tidak ditemukan</h3>
        </div>
      </div>
      <div class="repository-collection" v-else>
        <CollectionRepositoryCard
          v-for="koleksi in searchTugasAkhir.searchResults"
          :npm="koleksi.MhsNPM"
          :title="trimText(koleksi.Judul)"
          :tipe="koleksi.tipeKoleksi"
          :description="koleksi.Abstrak"
          :link-access="'/koleksi/repository/item/' + koleksi.MhsNPM"
          @preview="openModal(koleksi.MhsNPM)"
        />
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
  --at-apply: text-center text-4xl;
}

.repository-collection {
  --at-apply: flex flex-col gap-3 md:(grid grid-cols-2) lg:(grid grid-cols-3);
}

.preview-block {
  --at-apply: max-w-3xl flex flex-col items-center bg-white w-full max-h-80 overflow-y-scroll p-5 rounded-lg;
}

.pagination-block {
  --at-apply: w-full rounded text-center py-2 flex items-center justify-center gap-5;
}

.pagination-btn {
  --at-apply: btn py-1 px-2 text-white;
}
</style>
