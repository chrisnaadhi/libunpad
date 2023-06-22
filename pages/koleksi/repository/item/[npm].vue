<script setup>
const route = useRoute();
const { getItemById } = useDirectusItems();

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

const dataObjectTA = {
  npm: finalDataTA.MhsNPM,
  fileCover: finalDataTA.FileCover,
  fileAbstrak: finalDataTA.FileAbstrak,
  fileDaftarIsi: finalDataTA.FileDaftarIsi,
  fileBab1: finalDataTA.FileBab1,
  fileBab2: finalDataTA.FileBab2,
  fileBab3: finalDataTA.FileBab3,
  fileBab4: finalDataTA.FileBab4,
  fileBab5: finalDataTA.FileBab5,
  fileBab6: finalDataTA.FileBab6,
  fileLampiran: finalDataTA.FileLampiran,
  filePustaka: finalDataTA.FilePustaka,
  fileFullText: finalDataTA.FileFullText,
  judul: finalDataTA.Judul,
  author: biodataMhs.nama_anggota,
  abstrak: finalDataTA.Abstrak,
  bahasa: finalDataTA.Bahasa,
  keywords: finalDataTA.Keywords,
  tglUpload: new Date(finalDataTA.UploadTgl),
  idPustaka: finalDataTA.idpustaka,
  stPublikasi: finalDataTA.stPublikasi,
  verifikasi: finalDataTA.Verifikasi,
};
</script>

<template>
  <section>
    <h1 class="text-center mt-5 mb-15">Repository Universitas Padjadjaran</h1>
    <CollectionRepositoryItem v-bind="dataObjectTA" />
  </section>
</template>

<style scoped></style>
