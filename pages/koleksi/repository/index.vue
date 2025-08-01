<script setup>
const { getItems } = useDirectusItems();

const searchTugasAkhir = searchTugasAkhirDirectus();
const previewItem = previewModalRepository();
const namaFakultas = daftarNamaFakultasUnpad();
searchTugasAkhir.facultyName = null;

const dataTADirectus = await getItems({
  collection: "tbtMhsUploadThesis",
  params: {
    limit: 30,
    sort: "-UploadTgl",
  },
});

const totalDataTA = await getItems({
  collection: "tbtMhsUploadThesis",
  params: {
    meta: "filter_count",
  },
});

console.log(totalDataTA.meta);

const previewData = (npm) => {
  if (!searchTugasAkhir.searchResults) {
    const searchData = dataTADirectus.find((elem) => elem?.MhsNPM === npm);
    return searchData;
  } else {
    const searchData = searchTugasAkhir.searchResults.find(
      (elem) => elem?.MhsNPM === npm
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
  <section class="max-w-7xl ma">
    <LazyClientOnly>
      <Teleport to="#modal">
        <ModalBase
          v-show="previewItem.showModal"
          @close="previewItem.viewModal"
        >
          <div @click.stop="" class="preview-block">
            <div class="flex flex-col items-center">
              <h3>{{ selectedPreview?.MhsNPM }}</h3>
              <p class="font-semibold">{{ selectedPreview?.Judul }}</p>
              <p class="text-sm text-justify">
                {{ selectedPreview?.AbstrakBersih ?? selectedPreview?.Abstrak }}
              </p>
              <p>Keywords: {{ selectedPreview?.Keywords }}</p>
            </div>
            <div class="flex gap-2 mt-2">
              <button @click="previewItem.viewModal" class="modal-btn">
                Kembali
              </button>
              <NuxtLink
                :to="'/koleksi/repository/item/' + selectedPreview?.MhsNPM"
                class="modal-btn"
              >
                Detail
              </NuxtLink>
            </div>
          </div>
        </ModalBase>
      </Teleport>
    </LazyClientOnly>
    <h1 class="mt-5">Repository Universitas Padjadjaran</h1>
    <p class="text-center my-2">
      Koleksi Karya Ilmiah dan Tugas Akhir dari Civitas Akademika Universitas
      Padjadjaran
    </p>
    <div
      class="flex flex-col sm:(grid grid-cols-2) lg:(grid grid-cols-3) gap-3 text-center"
    >
      <NuxtLink
        v-for="fakultas in namaFakultas.objFakultas"
        :to="'repository/' + fakultas.singkatan"
        class="text-white bg-unpad no-underline py-3 rounded-xl"
      >
        {{ fakultas.namaFakultas }}
      </NuxtLink>
    </div>
    <CollectionRepositoryMainSearch :is-faculty="false" />
    <div
      v-show="
        searchTugasAkhir.searchResults !== 'loading' &&
        searchTugasAkhir.keywords !== ''
      "
    >
      <p class="text-center" v-if="searchTugasAkhir.keywords !== ''">
        Hasil pencarian:
        <span class="font-semibold">"{{ searchTugasAkhir.keywords }}"</span>
        terdapat
        <span class="font-semibold">{{
          searchTugasAkhir.totalData ?? "-"
        }}</span>
        data.
      </p>
      <p v-else>
        Total data Tugas Akhir yang tersedia:
        <span class="font-semibold">
          {{ totalDataTA.meta.filter_count }}
        </span>
      </p>
    </div>
    <p v-if="searchTugasAkhir.keywords === ''" class="text-center">
      Total data Tugas Akhir yang tersedia:
      <span class="font-semibold">
        {{ totalDataTA.meta.filter_count }}
      </span>
    </p>
    <div class="flex flex-col gap-4 lg:(flex-row)">
      <CollectionRepositoryFilterOption />
      <div class="repository-collection" v-if="!searchTugasAkhir.searchResults">
        <CollectionRepositoryCard
          v-for="koleksi in dataTADirectus"
          :npm="koleksi.MhsNPM"
          :title="trimText(koleksi.Judul)"
          :tipe="koleksi.tipeKoleksi"
          :description="koleksi.AbstrakBersih ?? koleksi.Abstrak"
          :keywords="koleksi.Keywords"
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
          :description="koleksi.AbstrakBersih ?? koleksi.Abstrak"
          :keywords="koleksi.Keywords"
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
              : 'bg-unpad'
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
              : 'bg-unpad'
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
      <NuxtLink to="/koleksi" class="btn bg-unpad text-white">
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

.modal-btn {
  --at-apply: btn bg-unpad text-white px-2 py-1 text-xs;
}
</style>
