<script setup>
import { computed } from "vue";
const route = useRoute();
const { status, signIn, signOut, data } = useAuth();
const { getItemById } = useDirectusItems();
const fakultas = daftarNamaFakultasUnpad();
const isAuthenticated = computed(() => status.value === "authenticated");

const allowedPublicNPM = [
  // Add NPM values here that should bypass protected-file login restrictions
  // Example: "1901234567"
];
const isAllowedPublicAccess = computed(() =>
  allowedPublicNPM.includes(String(route.params.npm)),
);

const accessText = ref("");

const dataTugasAkhir = async () => {
  const dataSkripsi = ref();
  try {
    const checkAvailability = await getItemById({
      collection: "tbtMhsUploadThesis",
      id: route.params.npm,
    });

    dataSkripsi.value = checkAvailability;
  } catch (error) {
    dataSkripsi.value = {
      code: "404",
      message: "Data Tugas Akhir Tidak ditemukan",
    };
  }
  return dataSkripsi.value;
};
const dataMhs = async () => {
  const mahasiswa = ref();
  try {
    const fetchMhs = await getItemById({
      collection: "data_keanggotaan",
      id: route.params.npm,
    });

    mahasiswa.value = fetchMhs;
  } catch (error) {
    mahasiswa.value = "Tidak ada data";
  }

  return mahasiswa.value;
};

const finalDataTA = await dataTugasAkhir();
const biodataMhs = await dataMhs();

const createSecurePath = (link) => {
  if (!link) {
    return null;
  }

  return link
    .replace(/^http:\/\//i, "https://")
    .replace("media.unpad.ac.id", "repository.unpad.ac.id");
};

const makeFileUrl = (filePath) => {
  if (!filePath || filePath === "undefined") {
    return null;
  }

  const url =
    filePath.startsWith("http://") || filePath.startsWith("https://")
      ? filePath
      : `${finalDataTA.LinkPath}${filePath}`;

  return url
    .replace(/^http:\/\//i, "https://")
    .replace("media.unpad.ac.id", "repository.unpad.ac.id");
};

finalDataTA.LinkPath = createSecurePath(finalDataTA.LinkPath);

const dataObjectTA = {
  npm: finalDataTA.MhsNPM,
  fileCover: makeFileUrl(finalDataTA.FileCover),
  fileAbstrak: makeFileUrl(finalDataTA.FileAbstrak),
  fileDaftarIsi: makeFileUrl(finalDataTA.FileDaftarIsi),
  fileBab1: makeFileUrl(finalDataTA.FileBab1),
  fileBab2: makeFileUrl(finalDataTA.FileBab2),
  fileBab3: makeFileUrl(finalDataTA.FileBab3),
  fileBab4: makeFileUrl(finalDataTA.FileBab4),
  fileBab5: makeFileUrl(finalDataTA.FileBab5),
  fileBab6: makeFileUrl(finalDataTA.FileBab6),
  fileLampiran: makeFileUrl(finalDataTA.FileLampiran),
  filePustaka: makeFileUrl(finalDataTA.FilePustaka),
  fileFullText: makeFileUrl(finalDataTA.FileFullText),
  judul: finalDataTA.Judul,
  author: biodataMhs.nama_anggota,
  namaFakultas: fakultas.cariFakultas(finalDataTA.MhsNPM),
  abstrak: finalDataTA.AbstrakBersih ?? finalDataTA.Abstrak,
  bahasa: finalDataTA.Bahasa,
  keywords: finalDataTA.Keywords,
  tglUpload: new Date(finalDataTA.UploadTgl),
  idPustaka: finalDataTA.idpustaka,
  stPublikasi: finalDataTA.stPublikasi,
  verifikasi: finalDataTA.Verifikasi,
};

// Citation Data
const formattedAPA = ref("");
const formattedChicago = ref("");
const chosenCitation = ref("apa");
const tanggal = new Date(finalDataTA.UploadTgl);
const tahun = tanggal.getFullYear();
const nama = biodataMhs
  ? biodataMhs?.nama_anggota?.toLowerCase().split(" ")
  : "Belum ada data";
const judul = finalDataTA.Judul;
const penerbit =
  fakultas.cariFakultas(finalDataTA.MhsNPM) + " Universitas Padjadjaran";

const APAFormat = () => {
  if (nama) {
    const firstName =
      nama.length > 1 ? ", " + nama[0].split("")[0]?.toUpperCase() + ". " : "";
    const secondName =
      nama.length < 3 ? "" : nama[1]?.split("")[0]?.toUpperCase() + ". ";
    const thirdName =
      nama.length < 4 ? "" : nama[2]?.split("")[0]?.toUpperCase() + ". ";
    const fourthName =
      nama.length < 5 ? "" : nama[3]?.split("")[0]?.toUpperCase() + ". ";
    const fifthName =
      nama.length < 6 ? "" : nama[4]?.split("")[0]?.toUpperCase() + ". ";
    const sixthName =
      nama.length < 7 ? "" : nama[5]?.split("")[0]?.toUpperCase() + ". ";
    const lastName =
      nama.at(-1)?.charAt(0)?.toUpperCase() + nama.at(-1).slice(1) + " ";

    formattedAPA.value = `${lastName}${firstName}${secondName}${thirdName}${fourthName}${fifthName}${sixthName}(${tahun}). <span class="italic">${judul}</span>. ${penerbit}`;
  } else {
    formattedAPA.value = "Tidak dapat membuat sitasi";
  }
};
const ChicagoFormat = () => {
  if (nama) {
    const firstName =
      nama.length > 1
        ? ", " + nama.at(0).charAt(0).toUpperCase() + nama.at(0).slice(1)
        : "";
    const secondName =
      nama.length < 3
        ? ""
        : " " + nama.at(1)?.charAt(0).toUpperCase() + nama.at(1)?.slice(1);
    const thirdName =
      nama.length < 4
        ? ""
        : " " + nama.at(2)?.charAt(0).toUpperCase() + nama.at(2)?.slice(1);
    const fourthName =
      nama.length < 5
        ? ""
        : " " + nama.at(3)?.charAt(0).toUpperCase() + nama.at(3)?.slice(1);
    const fifthName =
      nama.length < 6
        ? ""
        : " " + nama.at(4)?.charAt(0).toUpperCase() + nama.at(4)?.slice(1);

    const sixthName =
      nama.length < 7
        ? ""
        : " " + nama.at(5)?.charAt(0).toUpperCase() + nama.at(5)?.slice(1);

    const lastName = nama.at(-1).charAt(0).toUpperCase() + nama.at(-1).slice(1);

    formattedChicago.value = `${lastName}${firstName}${secondName}${thirdName}${fourthName}${fifthName}${sixthName}. ${tahun}. "${judul}". ${penerbit}`;
  } else {
    formattedChicago.value = "Tidak dapat membuat sitasi";
  }
};

// Copy Citation Format
const copyCitation = (val) => {
  let strippedTag = val.replace(/(<([^>]+)>)/gi, "");
  navigator.clipboard.writeText(strippedTag);
  alert("Sitasi berhasil disalin: " + strippedTag);
};

// Choose Citation Tab
const chooseCitation = (val) => {
  chosenCitation.value = val;
};

// Call Citation function
APAFormat();
ChicagoFormat();

useHead({
  title: finalDataTA.Judul + " | Repository Universitas Padjadjaran",
  meta: [
    { name: "citation_title", content: dataObjectTA.judul },
    { name: "citation_authors", content: biodataMhs?.nama_anggota ?? "" },
    { name: "citation_date", content: dataObjectTA.tglUpload.getFullYear() },
    {
      name: "citation_publisher",
      content: dataObjectTA.namaFakultas + " Universitas Padjadjaran",
    },
    { name: "citation_abstract", content: dataObjectTA.abstrak },
    { name: "citation_language", content: dataObjectTA.bahasa },
    { name: "citation_keywords", content: dataObjectTA.keywords },
    {
      name: "citation_public_url",
      content: "https://kandaga.unpad.ac.id" + route.fullPath,
    },
    {
      name: "citation_pdf_url",
      content: dataObjectTA.fileAbstrak,
    },
    {
      name: "citation_publication_title",
      content: "ETD Universitas Padjadjaran",
    },
    { content: "text/html; charset=UTF-8", "http-equiv": "content-type" },
  ],
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Banner -->
    <div class="bg-gradient-to-br from-unpad to-kandaga">
      <div class="max-w-6xl ma px-4 pt-10 pb-20">
        <div class="flex items-center gap-2 mb-6">
          <NuxtLink
            to="/koleksi/repository"
            class="inline-flex items-center gap-1.5 text-white/75 hover:text-white text-sm font-500 no-underline transition-colors"
          >
            <div class="i-mdi-arrow-left w-4 h-4" />
            Kembali ke Repository
          </NuxtLink>
        </div>
        <p
          class="text-white/70 text-xs font-600 uppercase tracking-widest mb-2"
        >
          Repository Universitas Padjadjaran
        </p>
        <h1 class="text-white text-xl sm:text-2xl font-800 leading-snug mb-4">
          {{ dataObjectTA.judul }}
        </h1>
        <div class="flex flex-wrap gap-2">
          <span v-if="dataObjectTA.author" class="hero-chip">
            <div class="i-mdi-account-outline w-3.5 h-3.5" />
            {{ dataObjectTA.author }}
          </span>
          <span class="hero-chip font-mono">
            <div class="i-mdi-identifier w-3.5 h-3.5" />
            {{ dataObjectTA.npm }}
          </span>
          <span v-if="dataObjectTA.namaFakultas" class="hero-chip">
            <div class="i-mdi-school-outline w-3.5 h-3.5" />
            {{ dataObjectTA.namaFakultas }}
          </span>
        </div>
      </div>
    </div>

    <!-- Auth status floating card -->
    <div class="max-w-6xl ma px-4 -mt-8 relative z-10 mb-6">
      <div
        :class="
          status === 'authenticated'
            ? 'bg-green-50 border-green-2'
            : 'bg-white border-gray-2'
        "
        class="rounded-2xl shadow-lg border p-4 flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <!-- Authenticated -->
        <div v-if="status === 'authenticated'" class="flex items-center gap-3">
          <div class="i-mdi-lock-open-check w-6 h-6 text-green-6 shrink-0" />
          <div>
            <p class="font-600 text-green-8 text-sm">Akses Penuh Tersedia</p>
            <p class="text-green-6 text-xs">{{ data.user.email }}</p>
          </div>
        </div>
        <!-- Not authenticated -->
        <div v-else class="flex items-center gap-3">
          <div class="i-mdi-lock-alert w-6 h-6 text-amber-5 shrink-0" />
          <div>
            <p class="font-600 text-gray-8 text-sm">Belum Login</p>
            <p class="text-gray-5 text-xs">
              Login dengan Email
              <span class="text-unpad font-600">Unpad</span> untuk mengakses
              berkas lengkap
            </p>
          </div>
        </div>

        <!-- Action button -->
        <div v-if="status === 'authenticated'">
          <button
            @click="signOut"
            class="btn bg-red-5 text-white text-xs py-1.5 px-4 hover:bg-red-6 transition-colors"
          >
            Logout
          </button>
        </div>
        <div v-else>
          <NuxtLink
            to="/login"
            class="btn bg-unpad text-white text-sm py-2 px-5 font-semibold hover:opacity-90 transition-opacity"
          >
            Login &rightarrow;
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Document detail component -->
    <div class="max-w-6xl ma px-4 pb-6">
      <CollectionRepositoryItem
        v-bind="dataObjectTA"
        :isAuthenticated="isAuthenticated"
        :isAllowedPublicAccess="isAllowedPublicAccess"
      />
    </div>

    <!-- Citation Section -->
    <div class="max-w-6xl ma px-4 pb-8">
      <div
        class="bg-white rounded-2xl border border-gray-2 shadow-sm overflow-hidden"
      >
        <div
          class="flex items-center gap-2 px-5 py-4 bg-gray-50 border-b border-gray-1"
        >
          <div class="i-mdi-format-quote-open w-5 h-5 text-unpad" />
          <h3 class="font-700 text-gray-8 text-base m-0">Cite This Paper</h3>
        </div>

        <!-- Citation tabs -->
        <div class="flex border-b border-gray-1">
          <button
            class="citation-tab"
            :class="
              chosenCitation === 'apa'
                ? 'citation-tab-active'
                : 'citation-tab-inactive'
            "
            @click="chooseCitation('apa')"
          >
            APA
          </button>
          <button
            class="citation-tab"
            :class="
              chosenCitation === 'chicago'
                ? 'citation-tab-active'
                : 'citation-tab-inactive'
            "
            @click="chooseCitation('chicago')"
          >
            Chicago
          </button>
        </div>

        <!-- APA -->
        <div v-show="chosenCitation === 'apa'" class="p-5">
          <p class="text-xs font-600 text-gray-4 uppercase tracking-wide mb-2">
            APA Style
          </p>
          <div
            class="citation-box group"
            @click="copyCitation(formattedAPA)"
            title="Klik untuk menyalin"
          >
            <p
              class="text-sm text-gray-7 leading-relaxed"
              v-html="formattedAPA"
            />
            <div
              class="i-mdi-content-copy w-4 h-4 text-gray-4 group-hover:text-unpad shrink-0 transition-colors mt-0.5"
            />
          </div>
        </div>

        <!-- Chicago -->
        <div v-show="chosenCitation === 'chicago'" class="p-5">
          <p class="text-xs font-600 text-gray-4 uppercase tracking-wide mb-2">
            Chicago Style
          </p>
          <div
            class="citation-box group"
            @click="copyCitation(formattedChicago)"
            title="Klik untuk menyalin"
          >
            <p
              class="text-sm text-gray-7 leading-relaxed"
              v-html="formattedChicago"
            />
            <div
              class="i-mdi-content-copy w-4 h-4 text-gray-4 group-hover:text-unpad shrink-0 transition-colors mt-0.5"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Help + Back -->
    <div
      class="max-w-6xl ma px-4 pb-12 flex flex-col items-center gap-1 text-center"
    >
      <h4 class="font-700 text-gray-7">Perlu Bantuan?</h4>
      <p class="text-gray-5 text-sm">
        Hubungi kami melalui Email, Whatsapp atau Media Sosial.
      </p>
      <NuxtLink
        to="/koleksi/repository"
        class="btn bg-unpad text-white mt-4 px-8 py-2.5 font-semibold hover:opacity-90 transition-opacity"
      >
        Kembali ke Repository
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
h1 {
  --at-apply: m-0;
}

.hero-chip {
  --at-apply: inline-flex items-center gap-1.5 text-xs bg-white/20 text-white
    border border-white/25 px-2.5 py-1 rounded-full font-500;
}

.citation-tab {
  --at-apply: px-6 py-3 text-sm font-600 min-w-28 transition-all-200;
}

.citation-tab-active {
  --at-apply: bg-white text-unpad border-b-2 border-unpad;
}

.citation-tab-inactive {
  --at-apply: text-gray-5 hover: bg-gray-50;
}

.citation-box {
  --at-apply: flex items-start gap-3 bg-amber-50 border border-amber-2
    rounded-xl px-4 py-3 cursor-pointer hover: bg-amber-100 transition-colors;
}
</style>
