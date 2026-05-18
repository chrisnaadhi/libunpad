<script setup>
const { getItems } = useDirectusItems();

const searchTugasAkhir = searchTugasAkhirDirectus();
const previewItem = previewModalRepository();
const namaFakultas = daftarNamaFakultasUnpad();
const route = useRoute();
const dataFakultas = namaFakultas.cariFakultasByParameter(route.params.faculty);
searchTugasAkhir.facultyName = dataFakultas;

const dataTADirectus = await getItems({
  collection: "tbtMhsUploadThesis",
  params: {
    limit: 30,
    sort: "-UploadTgl",
    filter: {
      MhsNPM: {
        _starts_with: dataFakultas.id,
      },
    },
  },
});

const previewData = (npm) => {
  if (!searchTugasAkhir.searchResults) {
    const searchData = dataTADirectus.find((elem) => elem?.MhsNPM === npm);
    return searchData;
  } else {
    const searchData = searchTugasAkhir.searchResults.find(
      (elem) => elem?.MhsNPM === npm,
    );
    return searchData;
  }
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
  <div class="min-h-screen bg-gray-50">
    <!-- Modal -->
    <LazyClientOnly>
      <Teleport to="#modal">
        <ModalBase
          v-show="previewItem.showModal"
          @close="previewItem.viewModal"
        >
          <div @click.stop="" class="preview-block">
            <div class="flex flex-col items-center gap-2 text-center w-full">
              <span
                class="text-xs text-gray-4 font-mono bg-gray-1 px-2 py-0.5 rounded-full"
              >
                {{ selectedPreview?.MhsNPM }}
              </span>
              <p class="font-700 text-gray-8 text-base leading-snug">
                {{ selectedPreview?.Judul }}
              </p>
              <p
                class="text-sm text-gray-6 text-justify leading-relaxed line-clamp-6"
              >
                {{ selectedPreview?.AbstrakBersih ?? selectedPreview?.Abstrak }}
              </p>
              <p class="text-xs text-gray-4">
                <span class="font-600 text-gray-5">Keywords: </span>
                {{ selectedPreview?.Keywords }}
              </p>
            </div>
            <div class="flex gap-2 mt-5 justify-center">
              <button
                @click="previewItem.viewModal"
                class="btn bg-gray-1 text-gray-6 px-5 py-2 text-sm hover:bg-gray-2 transition-colors"
              >
                Tutup
              </button>
              <NuxtLink
                :to="'/koleksi/repository/item/' + selectedPreview?.MhsNPM"
                class="btn bg-unpad text-white px-5 py-2 text-sm hover:opacity-90"
              >
                Lihat Detail
              </NuxtLink>
            </div>
          </div>
        </ModalBase>
      </Teleport>
    </LazyClientOnly>

    <!-- Hero Banner -->
    <div class="bg-gradient-to-br from-unpad to-kandaga">
      <div class="max-w-7xl ma px-4 pt-14 pb-24 text-center">
        <div class="i-mdi-school w-14 h-14 text-white/80 ma mb-4" />
        <p
          class="text-white/75 text-sm font-600 uppercase tracking-widest mb-2"
        >
          Repository Universitas Padjadjaran
        </p>
        <h1
          class="text-white text-3xl sm:text-4xl font-800 m-0 mb-3 leading-tight"
        >
          {{ dataFakultas.namaFakultas }}
        </h1>
        <p class="text-white/80 text-base max-w-xl ma mt-2 mb-0">
          Koleksi Karya Ilmiah dan Tugas Akhir
        </p>
        <div class="mt-5">
          <NuxtLink
            to="/koleksi/repository"
            class="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-500 no-underline transition-colors"
          >
            <div class="i-mdi-arrow-left w-4 h-4" />
            Kembali ke Repositori Utama
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Search card -->
    <div class="max-w-3xl ma px-4 -mt-8 relative z-10 mb-8">
      <div class="bg-white rounded-2xl shadow-lg p-4">
        <CollectionRepositoryMainSearch :is-faculty="true" />
      </div>
    </div>

    <!-- Main content -->
    <div class="max-w-7xl ma px-4 pb-12">
      <!-- Search result info -->
      <div
        v-show="searchTugasAkhir.searchResults !== 'loading'"
        class="text-center mb-6"
      >
        <p class="text-gray-5 text-sm">
          Menampilkan
          <span class="font-700 text-gray-8">
            {{
              !searchTugasAkhir.searchResults
                ? dataTADirectus.length
                : searchTugasAkhir.searchResults.length
            }}
          </span>
          karya
          <template v-if="searchTugasAkhir.keywords">
            untuk
            <span class="font-700 text-gray-8"
              >"{{ searchTugasAkhir.keywords }}"</span
            >
          </template>
        </p>
      </div>

      <!-- Collection -->
      <div class="flex flex-col gap-6 lg:flex-row items-start">
        <!-- <CollectionRepositoryFilterOption /> -->

        <div class="flex-1 min-w-0">
          <!-- Default list -->
          <div v-if="!searchTugasAkhir.searchResults" class="collection-grid">
            <CollectionRepositoryCard
              v-for="koleksi in dataTADirectus"
              :key="koleksi.MhsNPM"
              :npm="koleksi.MhsNPM"
              :title="trimText(koleksi.Judul)"
              :title-hover="koleksi.Judul"
              :tipe="koleksi.tipeKoleksi"
              :description="koleksi.AbstrakBersih ?? koleksi.Abstrak"
              :keywords="koleksi.Keywords"
              :link-access="'/koleksi/repository/item/' + koleksi.MhsNPM"
              @preview="openModal(koleksi.MhsNPM)"
            />
          </div>

          <!-- Loading -->
          <div
            v-else-if="searchTugasAkhir.searchResults === 'loading'"
            class="state-block"
          >
            <div class="i-mdi-loading w-10 h-10 text-unpad animate-spin" />
            <p class="text-gray-5 mt-3 font-500">Sedang mencari data...</p>
          </div>

          <!-- No results -->
          <div
            v-else-if="searchTugasAkhir.searchResults === '[]'"
            class="state-block"
          >
            <div class="i-mdi-text-search w-14 h-14 text-gray-3" />
            <p class="text-gray-5 font-600 mt-3">Tidak ada hasil ditemukan</p>
            <p class="text-gray-4 text-sm">
              Coba gunakan kata kunci yang berbeda
            </p>
          </div>

          <!-- Search results -->
          <div v-else class="collection-grid">
            <CollectionRepositoryCard
              v-for="koleksi in searchTugasAkhir.searchResults"
              :key="koleksi.MhsNPM"
              :npm="koleksi.MhsNPM"
              :title="trimText(koleksi.Judul)"
              :tipe="koleksi.tipeKoleksi"
              :description="koleksi.AbstrakBersih ?? koleksi.Abstrak"
              :keywords="koleksi.Keywords"
              :link-access="'/koleksi/repository/item/' + koleksi.MhsNPM"
              @preview="openModal(koleksi.MhsNPM)"
            />
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="mt-8 flex items-center justify-center gap-4">
        <button
          class="page-btn"
          :disabled="
            !searchTugasAkhir.searchResults || searchTugasAkhir.offset === 0
          "
          :class="
            !searchTugasAkhir.searchResults || searchTugasAkhir.offset === 0
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-unpad/10'
          "
          @click="searchTugasAkhir.previousPage()"
        >
          <div class="i-mdi-chevron-left w-5 h-5" />
          Sebelumnya
        </button>

        <span
          class="px-4 py-1.5 bg-unpad text-white rounded-full text-sm font-700 min-w-10 text-center"
        >
          {{ searchTugasAkhir.page }}
        </span>

        <button
          class="page-btn"
          :disabled="
            !searchTugasAkhir.searchResults ||
            searchTugasAkhir.searchResults === 'loading' ||
            searchTugasAkhir.searchResults.length < 30
          "
          :class="
            !searchTugasAkhir.searchResults ||
            searchTugasAkhir.searchResults === 'loading' ||
            searchTugasAkhir.searchResults.length < 30
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-unpad/10'
          "
          @click="searchTugasAkhir.nextPage()"
        >
          Berikutnya
          <div class="i-mdi-chevron-right w-5 h-5" />
        </button>
      </div>

      <!-- Help + Back -->
      <div class="mt-12 flex flex-col items-center gap-1 text-center">
        <h4 class="font-700 text-gray-7">Perlu Bantuan?</h4>
        <p class="text-gray-5 text-sm">
          Hubungi kami melalui Email, Whatsapp atau Media Sosial.
        </p>
        <NuxtLink
          to="/koleksi"
          class="btn bg-unpad text-white mt-4 px-8 py-2.5 font-semibold hover:opacity-90 transition-opacity"
        >
          Kembali ke Koleksi
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  --at-apply: text-center;
}

.collection-grid {
  --at-apply: grid grid-cols-1 md: grid-cols-2 xl: grid-cols-3 gap-4;
}

.preview-block {
  --at-apply: max-w-2xl flex flex-col items-center bg-white w-full max-h-[85vh]
    overflow-y-auto py-6 px-6 sm: px-10 rounded-2xl;
}

.state-block {
  --at-apply: flex flex-col items-center justify-center py-20 text-center;
}

.page-btn {
  --at-apply: flex items-center gap-1.5 px-4 py-2 rounded-xl border
    border-gray-2 text-sm font-600 text-gray-6 bg-white transition-all-200;
}
</style>
