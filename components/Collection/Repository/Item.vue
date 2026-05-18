<script setup>
import { computed, toRefs } from "vue";
const props = defineProps({
  npm: String,
  fileCover: String,
  fileAbstrak: String,
  fileDaftarIsi: String,
  fileBab1: String,
  fileBab2: String,
  fileBab3: String,
  fileBab4: String,
  fileBab5: String,
  fileBab6: String,
  fileLampiran: String,
  filePustaka: String,
  fileSurat: String,
  fileSuratIsi: String,
  filePengesahan: String,
  filePresentasi: String,
  fileFullText: String,
  judul: String,
  author: String,
  namaFakultas: String,
  abstrak: String,
  bahasa: String,
  keywords: String,
  tglUpload: Date,
  idPustaka: Number,
  stPublikasi: Boolean,
  verifikasi: Boolean,
  isAuthenticated: {
    type: Boolean,
    default: false,
  },
  isAllowedPublicAccess: {
    type: Boolean,
    default: false,
  },
});

const {
  fileCover,
  fileAbstrak,
  fileDaftarIsi,
  fileBab1,
  fileBab2,
  fileBab3,
  fileBab4,
  fileBab5,
  fileBab6,
  fileLampiran,
  filePustaka,
  fileFullText,
  judul,
  author,
  namaFakultas,
  abstrak,
  bahasa,
  keywords,
  tglUpload,
  idPustaka,
  stPublikasi,
  verifikasi,
  isAuthenticated,
  isAllowedPublicAccess,
} = toRefs(props);

const fileAccessLevel = {
  fileCover: "public",
  fileAbstrak: "public",
  fileDaftarIsi: "public",
  fileBab1: "public",
  fileBab2: "protected",
  fileBab3: "protected",
  fileBab4: "protected",
  fileBab5: "protected",
  fileBab6: "protected",
  fileLampiran: "protected",
  filePustaka: "public",
  fileFullText: "protected",
};

const fileRows = computed(() => [
  { label: "Cover", key: "fileCover", url: fileCover.value },
  { label: "Abstrak", key: "fileAbstrak", url: fileAbstrak.value },
  { label: "Daftar Isi", key: "fileDaftarIsi", url: fileDaftarIsi.value },
  { label: "Bab 1", key: "fileBab1", url: fileBab1.value },
  { label: "Bab 2", key: "fileBab2", url: fileBab2.value },
  { label: "Bab 3", key: "fileBab3", url: fileBab3.value },
  { label: "Bab 4", key: "fileBab4", url: fileBab4.value },
  { label: "Bab 5", key: "fileBab5", url: fileBab5.value },
  { label: "Bab 6", key: "fileBab6", url: fileBab6.value },
  { label: "Lampiran", key: "fileLampiran", url: fileLampiran.value },
  { label: "Daftar Pustaka", key: "filePustaka", url: filePustaka.value },
  { label: "Full Text", key: "fileFullText", url: fileFullText.value },
]);

function getFileStatusClass(url, key) {
  if (!url || url === "undefined") return "file-not-found";
  return canDownload(url, key) ? "auth-true" : "auth-false";
}

function hasFile(url) {
  return Boolean(url && url !== "undefined");
}

function canDownload(url, key) {
  if (!hasFile(url)) return false;
  const access = fileAccessLevel[key] ?? "protected";
  return (
    access === "public" || isAuthenticated.value || isAllowedPublicAccess.value
  );
}

function isRestricted(url, key) {
  return (
    hasFile(url) &&
    fileAccessLevel[key] === "protected" &&
    !isAuthenticated.value &&
    !isAllowedPublicAccess.value
  );
}

const limitText = (text) => {
  if (text && text.length > 70) {
    return text.slice(0, 70) + "...";
  }
  return text ?? "";
};
</script>

<template>
  <section class="max-w-6xl ma px-4">
    <!-- Top: Cover card + Main info -->
    <div class="flex flex-col lg:flex-row gap-6 mb-6">
      <!-- Left: Cover -->
      <div class="w-full lg:w-60 shrink-0 flex flex-col gap-4">
        <div class="cover-card">
          <NuxtImg
            src="/images/lambang-unpad.png"
            format="webp"
            width="80"
            height="80"
            class="opacity-60"
          />
          <p
            class="text-xs italic text-gray-6 text-center px-3 line-clamp-3 leading-relaxed"
          >
            {{ limitText(judul) }}
          </p>
          <p class="text-xs font-600 text-center text-gray-7">{{ author }}</p>
          <p class="text-xs text-gray-4 text-center">
            Perpustakaan Universitas Padjadjaran
          </p>
        </div>

        <!-- Keywords card -->
        <div
          class="bg-white rounded-2xl border border-gray-2 overflow-hidden shadow-sm"
        >
          <div
            class="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-1"
          >
            <div class="i-mdi-tag-multiple-outline w-4 h-4 text-unpad" />
            <h6 class="font-700 text-gray-8 m-0 text-sm">Kata Kunci</h6>
          </div>
          <div class="px-4 py-3">
            <p class="text-xs text-gray-5 italic leading-relaxed">
              {{ keywords ?? "—" }}
            </p>
          </div>
        </div>
      </div>

      <!-- Right: Main info -->
      <div
        class="flex-1 bg-white rounded-2xl border border-gray-2 shadow-sm p-6 flex flex-col gap-4"
      >
        <div>
          <h3 class="text-gray-8 font-700 text-xl leading-snug mb-3">
            {{ judul }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <span class="info-chip">
              <div class="i-mdi-account-outline w-3.5 h-3.5 shrink-0" />
              {{ author ?? "—" }}
            </span>
            <span class="info-chip font-mono text-xs">
              <div class="i-mdi-identifier w-3.5 h-3.5 shrink-0" />
              {{ npm }}
            </span>
            <span v-if="namaFakultas" class="info-chip">
              <div class="i-mdi-school-outline w-3.5 h-3.5 shrink-0" />
              {{ namaFakultas }}
            </span>
            <span v-if="bahasa" class="info-chip">
              <div class="i-mdi-translate w-3.5 h-3.5 shrink-0" />
              {{ bahasa }}
            </span>
          </div>
        </div>

        <div class="border-t border-gray-1 pt-4">
          <h6 class="text-xs font-600 text-gray-4 uppercase tracking-wide mb-2">
            Abstrak
          </h6>
          <p class="text-sm text-gray-6 text-justify leading-relaxed">
            <span v-html="abstrak"></span>
          </p>
        </div>
      </div>
    </div>

    <!-- File Access Section -->
    <div
      class="bg-white rounded-2xl border border-gray-2 shadow-sm overflow-hidden mb-6"
    >
      <div
        class="flex items-center gap-2 px-5 py-4 bg-gray-50 border-b border-gray-1"
      >
        <div class="i-mdi-file-multiple-outline w-5 h-5 text-unpad" />
        <h2 class="font-700 text-gray-8 text-base m-0">Akses Berkas</h2>
      </div>
      <div class="p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        <template v-for="row in fileRows" :key="row.key">
          <!-- File exists and accessible -->
          <div
            v-if="hasFile(row.url) && canDownload(row.url, row.key)"
            class="file-card file-card-open"
          >
            <div class="i-mdi-lock-open-check w-5 h-5 text-green-6" />
            <span class="text-xs font-600 text-center">{{ row.label }}</span>
            <NuxtLink
              :to="row.url"
              target="_blank"
              :external="true"
              class="text-xs text-green-7 font-600 hover:underline mt-auto flex items-center gap-1"
            >
              <div class="i-mdi-download w-3.5 h-3.5" />
              Download
            </NuxtLink>
          </div>

          <!-- File exists but restricted -->
          <div
            v-else-if="hasFile(row.url) && isRestricted(row.url, row.key)"
            class="file-card file-card-locked"
          >
            <div class="i-mdi-lock-alert w-5 h-5 text-red-5" />
            <span class="text-xs font-600 text-center">{{ row.label }}</span>
            <span class="text-xs text-red-4 mt-auto">Login diperlukan</span>
          </div>

          <!-- File not available -->
          <div
            v-else-if="!hasFile(row.url)"
            class="file-card file-card-missing"
          >
            <div class="i-mdi-file-remove-outline w-5 h-5 text-gray-4" />
            <span class="text-xs font-600 text-center">{{ row.label }}</span>
            <span class="text-xs text-gray-4 mt-auto">Tidak tersedia</span>
          </div>
        </template>
      </div>
    </div>

    <!-- Metadata Section -->
    <div
      class="bg-white rounded-2xl border border-gray-2 shadow-sm overflow-hidden"
    >
      <div
        class="flex items-center gap-2 px-5 py-4 bg-gray-50 border-b border-gray-1"
      >
        <div class="i-mdi-information-outline w-5 h-5 text-unpad" />
        <h2 class="font-700 text-gray-8 text-base m-0">Metadata</h2>
      </div>
      <div class="p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
        <div class="meta-row">
          <dt>Bahasa</dt>
          <dd>{{ bahasa ?? "—" }}</dd>
        </div>
        <div class="meta-row">
          <dt>Tanggal Upload</dt>
          <dd>
            {{
              tglUpload?.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }) ?? "—"
            }}
          </dd>
        </div>
        <div class="meta-row">
          <dt>Status Publikasi</dt>
          <dd>
            <span
              :class="
                stPublikasi
                  ? 'bg-green-1 text-green-7 border-green-2'
                  : 'bg-gray-1 text-gray-5 border-gray-2'
              "
              class="text-xs font-600 px-2 py-0.5 rounded-full border"
            >
              {{ stPublikasi ? "Dipublikasi" : "Tidak Dipublikasi" }}
            </span>
          </dd>
        </div>
        <div class="meta-row">
          <dt>ID Pustaka</dt>
          <dd>{{ idPustaka ?? "—" }}</dd>
        </div>
        <div class="meta-row sm:col-span-2">
          <dt>Kata Kunci</dt>
          <dd>{{ keywords ?? "—" }}</dd>
        </div>
        <div class="meta-row sm:col-span-2">
          <dt>Abstrak</dt>
          <dd class="text-justify leading-relaxed">{{ abstrak ?? "—" }}</dd>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cover-card {
  --at-apply: bg-white rounded-2xl border-2 border-unpad/30 min-h-60 flex
    flex-col items-center justify-around p-5 shadow-sm;
}

.info-chip {
  --at-apply: inline-flex items-center gap-1.5 text-xs bg-gray-50 text-gray-6
    border border-gray-2 px-2.5 py-1 rounded-full;
}

.file-card {
  --at-apply: rounded-xl p-3 flex flex-col items-center gap-1.5 text-center
    min-h-24;
}

.file-card-open {
  --at-apply: bg-green-50 border border-green-2 text-green-8;
}

.file-card-locked {
  --at-apply: bg-red-50 border border-red-2 text-red-7;
}

.file-card-missing {
  --at-apply: bg-gray-50 border border-gray-2 text-gray-4;
}

.meta-row {
  --at-apply: flex flex-col gap-1;
}

.meta-row dt {
  --at-apply: text-xs font-600 text-gray-4 uppercase tracking-wide;
}

.meta-row dd {
  --at-apply: text-sm font-500 text-gray-8 m-0;
}
</style>
