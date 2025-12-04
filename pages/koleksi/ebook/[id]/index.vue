<script setup>
const route = useRoute();
const { getItemById } = useDirectusItems();
const { cariFakultasAbbrevation } = daftarNamaFakultasUnpad();

// Define middleware to check item type first
definePageMeta({
  middleware: "ebook-access",
});

// fetch item (keeps existing top-level await pattern)
const item = await getItemById({
  collection: "koleksi_ebook",
  id: route.params.id,
});

// helpers for drive urls
const extractDriveId = (url) => {
  if (!url) return null;
  try {
    return url.split("/").at(5);
  } catch (e) {
    return null;
  }
};

const driveId = extractDriveId(item.link_url);
const pdfPreviewUrl = driveId
  ? `https://drive.google.com/file/d/${driveId}/preview`
  : "/images/ebook-placeholder.png";
// const pdfDownloadUrl = driveId ? `https://drive.google.com/uc?export=download&id=${driveId}` : '#';

// UI state for reader
const containerRef = ref(null);
const iframeWrapperRef = ref(null);
const zoom = ref(1);
const fitToWidth = ref(true);

const pageTitle = computed(() => item.judul || "E-Book");
const pageFakultas = computed(
  () => cariFakultasAbbrevation(item.fakultas) || item.fakultas || "—"
);

const zoomIn = () => {
  zoom.value = Math.min(2.5, +(zoom.value + 0.1).toFixed(2));
};
const zoomOut = () => {
  zoom.value = Math.max(0.5, +(zoom.value - 0.1).toFixed(2));
};
const resetZoom = () => {
  zoom.value = 1;
  fitToWidth.value = true;
};

const toggleFit = () => {
  fitToWidth.value = !fitToWidth.value;
  if (fitToWidth.value) zoom.value = 1;
};

const toggleFullscreen = async () => {
  const el = containerRef.value;
  if (!el) return;
  if (!document.fullscreenElement) {
    try {
      await el.requestFullscreen();
    } catch (e) {
      // ignore
    }
  } else {
    await document.exitFullscreen();
  }
};
</script>

<template>
  <section class="max-w-7xl ma py-6">
    <Head>
      <Title>{{ pageTitle }} | Kandaga Universitas Padjadjaran</Title>
    </Head>

    <!-- Top toolbar -->
    <div
      class="sticky top-20 z-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-3 flex items-center justify-between gap-4"
    >
      <div class="flex items-center gap-3">
        <NuxtLink
          to="/koleksi/ebook"
          class="btn bg-transparent text-unpad px-2 py-1"
          >← Kembali</NuxtLink
        >
        <div>
          <h2 class="text-lg font-semibold truncate max-w-md">
            {{ pageTitle }}
          </h2>
          <p class="text-sm text-gray-500">{{ pageFakultas }}</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button
          class="btn bg-gray text-white"
          @click="zoomOut"
          aria-label="Zoom Out"
        >
          −
        </button>
        <button
          class="btn bg-gray text-white"
          @click="resetZoom"
          aria-label="Reset Zoom"
        >
          100%
        </button>
        <button
          class="btn bg-gray text-white"
          @click="zoomIn"
          aria-label="Zoom In"
        >
          +
        </button>
        <button
          class="btn bg-gray text-white"
          @click="toggleFit"
          :title="fitToWidth ? 'Fit to width' : 'Actual size'"
        >
          {{ fitToWidth ? "Fit" : "Actual" }}
        </button>
        <button class="btn bg-unpad text-white" @click="toggleFullscreen">
          Fullscreen
        </button>
      </div>
    </div>

    <!-- Reader container -->
    <div ref="containerRef" class="mt-4">
      <div
        class="reader-area bg-gray-50 rounded-lg shadow-lg overflow-hidden mx-auto"
        style="max-width: 1200px"
      >
        <!-- iframe wrapper allows scale transform for zooming -->
        <div
          ref="iframeWrapperRef"
          class="iframe-wrapper w-full h-[80vh] bg-black flex items-center justify-center"
          :style="{ transform: fitToWidth ? 'none' : `scale(${zoom})` }"
        >
          <iframe
            :src="pdfPreviewUrl"
            class="w-full h-full min-h-[60vh]"
            style="border: 0"
            referrerpolicy="no-referrer"
          />
        </div>
      </div>
    </div>
    <div
      v-if="item.url_source"
      class="mt-6 px-4 py-8 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg text-center"
    >
      <div class="my-4">
        <h5>
          Untuk bisa membaca e-book ini secara lengkap, Silahkan klik tautan
          berikut:
        </h5>
      </div>

      <NuxtLink :to="item.url_source" class="btn bg-blue-600 text-white">
        Baca E-Book
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.reader-area {
  --at-apply: rounded-lg;
}
.iframe-wrapper {
  --at-apply: overflow-hidden bg-black;
  transition: transform 240ms ease-in-out;
  transform-origin: top center;
}
.btn {
  --at-apply: rounded px-3 py-1 text-sm;
}

/* ensure sticky toolbar looks good on mobile */
@media (max-width: 640px) {
  .sticky {
    --at-apply: p-2;
  }
  .iframe-wrapper {
    height: 70vh;
  }
}
</style>
