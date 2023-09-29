<script setup>
const title = ref(" Vue Composition API");
const accessText = ref("");

const route = useRoute();
const { status, signIn, signOut, data } = useAuth();
const fakultas = daftarNamaFakultasUnpad();
const { getItemById } = useDirectusItems();

const getTesisData = await getItemById({
  collection: "koleksi_tugas_akhir",
  id: route.params.npm,
});

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
  npm: "210210160084",
  fileCover: "/images/no-image.jpg",
  fileAbstrak: "/images/no-image.jpg",
  fileDaftarIsi: "finalDataTA.LinkPath + finalDataTA.FileDaftarIsi",
  fileBab1: "finalDataTA.LinkPath + finalDataTA.FileBab1",
  fileBab2: isUserAuthenticated("finalDataTA.FileBab2"),
  fileBab3: isUserAuthenticated("finalDataTA.FileBab3"),
  fileBab4: isUserAuthenticated("finalDataTA.FileBab4"),
  fileBab5: isUserAuthenticated("finalDataTA.FileBab5"),
  fileBab6: isUserAuthenticated("finalDataTA.FileBab6"),
  fileLampiran: isUserAuthenticated("finalDataTA.FileLampiran"),
  filePustaka: "finalDataTA.LinkPath + finalDataTA.FilePustaka",
  fileFullText: isUserAuthenticated("finalDataTA.FileFullText"),
  judul: "finalDataTA.Judul",
  author: "biodataMhs.nama_anggota",
  namaFakultas: fakultas.cariFakultas("finalDataTA.MhsNPM"),
  abstrak: "finalDataTA.AbstrakBersih ?? finalDataTA.Abstrak",
  bahasa: "finalDataTA.Bahasa",
  keywords: "finalDataTA.Keywords",
  tglUpload: "new Date(finalDataTA.UploadTgl)",
  idPustaka: "finalDataTA.idpustaka",
  stPublikasi: "finalDataTA.stPublikasi",
  verifikasi: "finalDataTA.Verifikasi",
};
</script>

<template>
  <section class="content-layer">
    <h3 class="title">Koleksi Repository Universitas Padjadjaran</h3>
  </section>
  <div>
    <p>{{ getTesisData.koleksi_berkas }}</p>
  </div>
  <section>
    <CollectionRepositoryItem v-bind="dataObjectTA" />
  </section>
</template>

<style scoped>
.title {
  --at-apply: my-3 text-center bg-orange max-w-lg py-1 ma text-white rounded;
}

p {
  --at-apply: italic;
}
</style>
