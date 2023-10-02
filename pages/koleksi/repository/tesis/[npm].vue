<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const { status, signIn, signOut, data } = useAuth();
const fakultas = daftarNamaFakultasUnpad();
const { getItemById } = useDirectusItems();
const { getFiles } = useDirectusFiles();

const accessText = ref("");

const getTesisData = await getItemById({
  collection: "koleksi_tugas_akhir",
  id: route.params.npm,
});

const fileTesis = await getFiles({
  params: {
    filter: {
      koleksi_tugas_akhir: {
        _between: [
          Math.min(...getTesisData.koleksi_berkas),
          Math.max(...getTesisData.koleksi_berkas),
        ],
      },
    },
    sort: "koleksi_tugas_akhir",
  },
});

const fileAbstrak = fileTesis.find((file) =>
  file.title.toLowerCase().includes("abstrak")
);
const fileCover = fileTesis.find((file) =>
  file.title.toLowerCase().includes("cover")
);
const fileDaftarIsi = fileTesis.find((file) =>
  file.title.toLowerCase().includes("isi")
);
const fileDaftarPustaka = fileTesis.find((file) => {
  file.title.toLowerCase().includes("pustaka");
});
const fileBab1 = fileTesis.find((file) =>
  file.title.toLowerCase().includes("bab1")
);
const fileBab2 = fileTesis.find((file) =>
  file.title.toLowerCase().includes("bab2")
);
const fileBab3 = fileTesis.find((file) =>
  file.title.toLowerCase().includes("bab3")
);
const fileBab4 = fileTesis.find((file) =>
  file.title.toLowerCase().includes("bab4")
);
const fileBab5 = fileTesis.find((file) =>
  file.title.toLowerCase().includes("bab5")
);
const fileBab6 = fileTesis.find((file) =>
  file.title.toLowerCase().includes("bab6")
);
const fileFull = fileTesis.find((file) =>
  file.title.toLowerCase().includes("fulltext")
);
const fileLampiran = fileTesis.find((file) =>
  file.title.toLowerCase().includes("lampiran")
);

const isUserAuthenticated = (linkData) => {
  if (linkData === null || linkData === undefined) {
    return null;
  } else if (status.value === "unauthenticated") {
    accessText.value = "Anda tidak dapat mengakses";
    return accessText.value;
  } else if (status.value === "authenticated") {
    accessText.value = "Dapat mengakses";
    return `${config.directusUrl}assets/${linkData}`;
  } else {
    console.log("something is missing!");
  }
};

const dataObjectTA = {
  npm: getTesisData.npm,
  fileCover: config.directusUrl + "assets/" + fileCover?.id,
  fileAbstrak: config.directusUrl + "assets/" + fileAbstrak?.id,
  fileDaftarIsi: config.directusUrl + "assets/" + fileDaftarIsi?.id,
  fileBab1: config.directusUrl + "assets/" + fileBab1?.id,
  fileBab2: isUserAuthenticated(fileBab2?.id),
  fileBab3: isUserAuthenticated(fileBab3?.id),
  fileBab4: isUserAuthenticated(fileBab4?.id),
  fileBab5: isUserAuthenticated(fileBab5?.id),
  fileBab6: isUserAuthenticated(fileBab6?.id),
  fileLampiran: isUserAuthenticated(fileLampiran?.id),
  filePustaka: config.directusUrl + "assets/" + fileDaftarPustaka?.id,
  fileFullText: isUserAuthenticated(fileFull?.id),
  judul: getTesisData.judul,
  author: getTesisData.nama,
  namaFakultas: fakultas.cariFakultas(getTesisData.npm),
  abstrak: getTesisData.abstrak_indonesia,
  bahasa: getTesisData.bahasa,
  keywords: getTesisData.kata_kunci,
  tglUpload: new Date(getTesisData.tanggal_upload),
};
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
            <span class="text-orange-6 font-semibold">Unpad</span>!
          </p>
        </div>
        <button @click="signIn('google')" class="btn-auth bg-orange">
          Klik untuk Login
        </button>
      </div>
    </div>
    <section>
      <CollectionRepositoryItem v-bind="dataObjectTA" />
    </section>
    <div>{{ fileLampiran }}</div>
  </section>
</template>

<style scoped>
.title {
  --at-apply: my-3 text-center bg-orange max-w-lg py-1 ma text-white rounded;
}

p {
  --at-apply: italic;
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
