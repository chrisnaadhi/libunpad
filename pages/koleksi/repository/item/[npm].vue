<script setup>
const route = useRoute();
const { status, signIn, signOut, data } = useAuth();
const { getItemById } = useDirectusItems();
const fakultas = daftarNamaFakultasUnpad();

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
  if (link === null) {
    return null;
  } else {
    const safeLink = link.replace("http://", "https://");
    return safeLink;
  }
};

// Create function for access link with auth concerned here
const isUserAuthenticated = (linkData) => {
  if (linkData === null) {
    return null;
  } else if (status.value === "unauthenticated") {
    accessText.value = "Anda tidak dapat mengakses";
    return accessText.value;
  } else if (status.value === "authenticated") {
    accessText.value = "Dapat mengakses";
    return `${finalDataTA.LinkPath}/${linkData}`;
  } else {
    console.log("something is missing!");
  }
};

finalDataTA.LinkPath = createSecurePath(finalDataTA.LinkPath);

const dataObjectTA = {
  npm: finalDataTA.MhsNPM,
  fileCover: finalDataTA.LinkPath + finalDataTA.FileCover,
  fileAbstrak: finalDataTA.LinkPath + finalDataTA.FileAbstrak,
  fileDaftarIsi: finalDataTA.LinkPath + finalDataTA.FileDaftarIsi,
  fileBab1: finalDataTA.LinkPath + finalDataTA.FileBab1,
  fileBab2: isUserAuthenticated(finalDataTA.FileBab2),
  fileBab3: isUserAuthenticated(finalDataTA.FileBab3),
  fileBab4: isUserAuthenticated(finalDataTA.FileBab4),
  fileBab5: isUserAuthenticated(finalDataTA.FileBab5),
  fileBab6: isUserAuthenticated(finalDataTA.FileBab6),
  fileLampiran: isUserAuthenticated(finalDataTA.FileLampiran),
  filePustaka: finalDataTA.LinkPath + finalDataTA.FilePustaka,
  fileFullText: isUserAuthenticated(finalDataTA.FileFullText),
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
  <section class="content-layer">
    <h3 class="title">Koleksi Repository Universitas Padjadjaran</h3>
    <div class="text-center mb-3 flex items-center justify-center">
      <!-- Sudah Login -->
      <div class="info-auth" v-if="status === 'authenticated'">
        <div class="flex items-center gap-1">
          <div class="auth-true" />
          <p class="text-xs">Selamat Datang, {{ data.user.email }}</p>
        </div>

        <button @click="signOut" class="btn-auth bg-red">Logout</button>
      </div>
      <!-- Belum Login -->
      <div class="info-auth" v-else>
        <div class="flex flex-col items-center">
          <div class="flex gap-1">
            <div class="auth-false" />
            <p class="text-red-6 font-semibold">Belum Login</p>
          </div>
          <p class="text-xs italic">
            untuk dapat mengakses full silahkan login menggunakan Email
            <span class="text-unpad font-semibold">Unpad</span>!
          </p>
        </div>
        <button @click="signIn('google')" class="btn-auth bg-unpad">
          Klik untuk Login
        </button>
      </div>
    </div>
    <CollectionRepositoryItem v-bind="dataObjectTA" />
    <div class="max-w-6xl ma pt-5">
      <h3>Cite this paper</h3>
      <div class="tab-title">
        <button
          class="tab-item"
          :class="chosenCitation === 'apa' ? 'active-tab' : 'inactive-tab'"
          @click="chooseCitation('apa')"
        >
          APA
        </button>
        <button
          class="tab-item"
          :class="chosenCitation === 'chicago' ? 'active-tab' : 'inactive-tab'"
          @click="chooseCitation('chicago')"
        >
          Chicago
        </button>
      </div>
      <div v-show="chosenCitation === 'apa'" class="citation-block">
        <h6>APA Style</h6>
        <p
          v-html="formattedAPA"
          @click="copyCitation(formattedAPA)"
          class="citation"
        ></p>
      </div>
      <div v-show="chosenCitation === 'chicago'" class="citation-block">
        <h6>Chicago Style</h6>
        <p
          v-html="formattedChicago"
          @click="copyCitation(formattedChicago)"
          class="citation"
        ></p>
      </div>
    </div>
    <div class="flex flex-col items-center">
      <h4>Perlu Bantuan ?</h4>
      <p>Hubungi kami melalui Email, Whatsapp atau Media Sosial.</p>
    </div>
    <div class="text-center mb-5">
      <NuxtLink to="/koleksi/repository" class="btn-auth bg-unpad text-lg">
        Kembali ke Koleksi Repository
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.title {
  --at-apply: my-3 text-center bg-unpad max-w-lg py-1 ma text-white rounded;
}

.tab-title {
  --at-apply: flex;
}

.tab-item {
  --at-apply: py-1 px-3 min-w-30;
}

.active-tab {
  --at-apply: bg-yellow-1;
}

.inactive-tab {
  --at-apply: bg-gray-1;
}

.citation-block {
  --at-apply: bg-yellow-1 p-2 rounded-b-lg rounded-tr-lg;
}

.citation {
  --at-apply: hover:(text-unpad cursor-pointer);
}

.btn-auth {
  --at-apply: btn py-1 px-2 text-white text-xs;
}

.info-auth {
  --at-apply: flex flex-col items-center gap-1 text-sm;
}

.auth-true {
  --at-apply: i-mdi-lock-open-check bg-green-6 w-5 h-5;
}

.auth-false {
  --at-apply: i-mdi-lock-alert bg-red-6 w-5 h-5;
}
</style>
