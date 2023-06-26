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
    mahasiswa.value = {
      code: "404",
      message: "Data Mahasiswa Tidak ditemukan",
    };
  }

  return mahasiswa.value;
};

const finalDataTA = await dataTugasAkhir();
const biodataMhs = await dataMhs();

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

useHead({
  title: finalDataTA.Judul + " | Repository Universitas Padjadjaran",
});
</script>

<template>
  <section>
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
            <span class="text-orange-6 font-semibold">Unpad</span>!
          </p>
        </div>
        <button @click="signIn('google')" class="btn-auth bg-orange">
          Klik untuk Login
        </button>
      </div>
    </div>
    <CollectionRepositoryItem v-bind="dataObjectTA" />
    <div class="flex flex-col items-center">
      <h4>Perlu Bantuan ?</h4>
      <p>Hubungi kami melalui Email, Whatsapp atau Media Sosial.</p>
    </div>
    <div class="text-center mb-5">
      <NuxtLink to="/koleksi/repository" class="btn-auth bg-orange text-lg"
        >Kembali ke Koleksi Repository</NuxtLink
      >
    </div>
  </section>
</template>

<style scoped>
.title {
  --at-apply: my-3 text-center bg-orange max-w-lg py-1 ma text-white rounded;
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

section {
  --at-apply: max-w-7xl ma;
}
</style>
