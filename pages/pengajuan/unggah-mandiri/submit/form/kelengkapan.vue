<script setup>
import { VuePDF, usePDF } from "@tato30/vue-pdf";
import '@tato30/vue-pdf/style.css';

definePageMeta({
  middleware: "authentication-check",
});

const router = useRouter();
const config = useRuntimeConfig();
const submitter = getSubmitterData();

const bearer = useCookie("dsAccessToken");
const dSpaceToken = useCookie("X-XSRF-TOKEN");

const { data } = useAuth();
const { updateItem } = useDirectusItems();
const val = ref("Kelengkapan Berkas Tugas Akhir");
const metadataNotes = ref("Mohon diperhatikan kembali data diatas! setelah anda mengklik tombol 'SIMPAN' maka anda tidak akan bisa mengubahnya kembali. Silahkan untuk diisi secara teliti dan perlahan agar mempermudah proses administrasi.")
const pickedFile = ref("");

const previewModal = ref(false);
const errorMetadata = ref(false);
const metadataButtonState = ref(false);
const confirmationModal = ref(false);
const confirmDeleteFile = ref(false);

const back = () => {
  router.go(-1);
};

const fetchData = (id) => {
  return config.public.dSpacePublic + "/core/communities/" + id;
};

const universalHeader = {
  credentials: "include",
  headers: new Headers({
    Authorization: "Bearer " + bearer.value.accessToken,
    "X-XSRF-TOKEN": `${dSpaceToken.value}`,
  }),
}

const getKelengkapanData = await fetchDspaceItemLogs(data.value.user.email);

const getFakultas = await $fetch(
  fetchData(getKelengkapanData[0]?.id_fakultas ?? submitter.fakultas)
);
const getJenjang = await $fetch(
  fetchData(getKelengkapanData[0]?.id_jenjang ?? submitter.jenjang)
);
const getProdi = await $fetch(
  `${config.public.dSpacePublic}/core/collections/${getKelengkapanData[0]?.id_prodi ?? submitter.programStudi
  }`
);

const getWorkSpaceItem = await fetchWorkspaceItem(getKelengkapanData[0]?.id_workspaceitems);

const getWorkSpaceFiles = await fetchWorkspaceFiles(getKelengkapanData[0]?.id_workspaceitems);

// Form Metadata
const judul = ref(getWorkSpaceItem.metadata["dc.title"]?.[0]?.value ?? null);
const abstrak = ref(
  getWorkSpaceItem.metadata["dc.description.abstract"]?.[0]?.value ?? null
);
const kataKunci = ref(
  getWorkSpaceItem.metadata["dc.subject"]?.[0]?.value ?? null
);
const bahasa = ref(
  getWorkSpaceItem.metadata["dc.language.iso"]?.[0]?.value ?? null
);
const kelulusan = ref(
  getWorkSpaceItem.metadata["dc.date.issued"]?.[0]?.value ?? null
);
const pembimbing1 = ref(
  getWorkSpaceItem.metadata["dc.contributor.advisor"]?.[0]?.value ?? null
);
const pembimbing2 = ref(
  getWorkSpaceItem.metadata["dc.contributor.advisor"]?.[1]?.value ?? null
);
const pembimbing3 = ref(
  getWorkSpaceItem.metadata["dc.contributor.advisor"]?.[2]?.value ?? null
);
const dataWorkspace = ref(
  getWorkSpaceItem.metadata["dc.title"]?.length === 0 ? false : true
);

const splitKeyword = ref([]);
const warn = ref("Tekan 'Enter' untuk memasukkan setiap Kata Kunci. Klik keyword untuk menghapus.")
const onEnterKeywords = () => {
  if (kataKunci.value && splitKeyword.value.length < 3) {
    splitKeyword.value.push({
      value: kataKunci.value,
      language: "id_ID",
      authority: null,
      confidence: -1
    })
    kataKunci.value = "";
  } else if (kataKunci.value && splitKeyword.value.length === 3) {
    warn.value = "Maksimum 3 Kata Kunci!"
    setTimeout(() => {
      warn.value = "Tekan 'Enter' untuk memasukkan setiap Kata Kunci. Klik keyword untuk menghapus."
    }, 3000)
  }
}

const deleteKeyword = (index) => {
  return splitKeyword.value.splice(index, 1)
}

const saveMetadata = async () => {
  
  const itemsList = {
    "dc.contributor.author": [
      {
        value: getKelengkapanData[0].nama_lengkap ?? submitter.namaLengkap,
        language: "id_ID",
        authority: null,
        confidence: -1,
      },
    ],
    "dc.title": [
      {
        value: judul.value,
        language: "id_ID",
        authority: null,
        confidence: -1,
      },
    ],
    "dc.description.abstract": [
      {
        value: abstrak.value,
        language: "id_ID",
        authority: null,
        confidence: -1,
      },
    ],
    "dc.keywords": splitKeyword.value,
    "dc.date.issued": [
      {
        value: kelulusan.value,
        language: "id_ID",
        authority: null,
        confidence: -1,
      },
    ],
    "dc.contributor.advisor": [
      {
        value: pembimbing1.value,
        language: "id_ID",
        authority: null,
        confidence: -1,
      },
      {
        value: pembimbing2.value,
        language: "id_ID",
        authority: null,
        confidence: -1,
      },
      {
        value: pembimbing3.value,
        language: "id_ID",
        authority: null,
        confidence: -1,
      },
    ],
    "dc.language.iso": [
      {
        value: bahasa.value,
        language: "id_ID",
        authority: null,
        confidence: -1,
      },
    ],
  };

  const headerItems = {
    Accept: "*/*",
    Authorization: "Bearer " + bearer.value.accessToken,
    "X-XSRF-TOKEN": dSpaceToken.value ?? "",
    Cookie: "DSPACE-XSRF-COOKIE=" + dSpaceToken.value,
    "Content-Type": "application/json",
  };

  try {
    if (judul.value && abstrak.value && splitKeyword.value.length >= 3 && bahasa.value && kelulusan.value && pembimbing1.value && pembimbing2.value) {
      metadataButtonState.value = true;
      await $fetch(
        config.public.dSpacePublic +
        `/submission/workspaceitems/${getKelengkapanData[0].id_workspaceitems}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: new Headers(headerItems),
          body: `[{"op": "add", "path": "/sections/traditionalpageone/dc.contributor.author", "value":${JSON.stringify(
            itemsList["dc.contributor.author"]
          )}}]`,
        }
      );
      await $fetch(
        config.public.dSpacePublic +
        `/submission/workspaceitems/${getKelengkapanData[0].id_workspaceitems}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: new Headers(headerItems),
          body: `[{"op": "add", "path": "/sections/traditionalpageone/dc.title", "value":${JSON.stringify(
            itemsList["dc.title"]
          )}}]`,
        }
      );
      await $fetch(
        config.public.dSpacePublic +
        `/submission/workspaceitems/${getKelengkapanData[0].id_workspaceitems}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: new Headers(headerItems),
          body: `[{"op": "add", "path": "/sections/traditionalpagetwo/dc.description.abstract", "value":${JSON.stringify(
            itemsList["dc.description.abstract"]
          )}}]`,
        }
      );
      await $fetch(
        config.public.dSpacePublic +
        `/submission/workspaceitems/${getKelengkapanData[0].id_workspaceitems}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: new Headers(headerItems),
          body: `[{"op": "add", "path": "/sections/traditionalpagetwo/dc.subject", "value":${JSON.stringify(
            itemsList["dc.keywords"]
          )}}]`,
        }
      );
      await $fetch(
        config.public.dSpacePublic +
        `/submission/workspaceitems/${getKelengkapanData[0].id_workspaceitems}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: new Headers(headerItems),
          body: `[{"op": "add", "path": "/sections/traditionalpageone/dc.date.issued", "value":${JSON.stringify(
            itemsList["dc.date.issued"]
          )}}]`,
        }
      );
      await $fetch(
        config.public.dSpacePublic +
        `/submission/workspaceitems/${getKelengkapanData[0].id_workspaceitems}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: new Headers(headerItems),
          body: `[{"op": "add", "path": "/sections/traditionalpageone/dc.contributor.advisor", "value":${JSON.stringify(
            itemsList["dc.contributor.advisor"]
          )}}]`,
        }
      );
      await $fetch(
        config.public.dSpacePublic +
        `/submission/workspaceitems/${getKelengkapanData[0].id_workspaceitems}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: new Headers(headerItems),
          body: `[{"op": "add", "path": "/sections/traditionalpageone/dc.language.iso", "value":${JSON.stringify(
            itemsList["dc.language.iso"]
          )}}]`,
          async onResponse() {
            await $fetch(`${config.public.dSpacePublic}/submission/workspaceitems/${getKelengkapanData[0].id_workspaceitems}`, {
              method: "PATCH",
              credentials: "include",
              headers: new Headers(headerItems),
              body: `[{ "op": "add", "path": "/sections/license/granted", "value": true}]`,
              onResponse() {
                metadataNotes.value = "Data berhasil disimpan!"
                metadataButtonState.value = false;
                setTimeout(() => {
                  reloadNuxtApp()
                }, 1000)
              }
            })
          }
        }
      );
    } else {
      errorMetadata.value = true
      setTimeout(() => {
        errorMetadata.value = false
      }, 3000)
    }

    console.log("DONE!");
  } catch (error) {
    console.log(error);
  }
};

// Form Files
const files = ref(await getWorkSpaceFiles.sections.upload.files)
const searchFile = async (nama) => {
  let findVal = await files.value.find((file) => {
    return file.metadata['dc.title'][0].value.includes(nama)
  })
  return findVal;
}

const fileCover = ref(await searchFile("Cover") ?? null);
const fileAbstrak = ref(await searchFile("Abstrak") ?? null);
const fileLembarPernyataan = ref(await searchFile("LembarPernyataan") ?? null);
const fileLembarPengesahan = ref(await searchFile("LembarPengesahan") ?? null);
const fileKataPengantar = ref(await searchFile("KataPengantar") ?? null);
const fileDaftarIsi = ref(await searchFile("DaftarIsi") ?? null);
const fileDaftarTabel = ref(await searchFile("DaftarTabel") ?? null);
const fileDaftarGambar = ref(await searchFile("DaftarGambar") ?? null);
const fileDaftarLampiran = ref(await searchFile("DaftarLampiran") ?? null);
const fileSuratPernyataanPublikasiKarya = ref(await searchFile("PernyataanPublikasi") ?? null);
const fileSuratPernyataanKesamaanIsi = ref(await searchFile("PernyataanKesamaan") ?? null);

const fileBab1 = ref(await searchFile("Bab1") ?? null);
const fileBab2 = ref(await searchFile("Bab2") ?? null);
const fileBab3 = ref(await searchFile("Bab3") ?? null);
const fileBab4 = ref(await searchFile("Bab4") ?? null);
const fileBab5 = ref(await searchFile("Bab5") ?? null);
const fileBab6 = ref(await searchFile("Bab6") ?? null);
const fileLampiran = ref(await searchFile("BerkasLampiran") ?? null);
const fileDaftarPustaka = ref(await searchFile("DaftarPustaka") ?? null);
const fileFullTeks = ref(await searchFile("FullTeks") ?? null);

const checkBoxPersetujuan = ref(false);
const inputFormState = reactive({
  Cover: false,
  Abstrak: false,
  LembarPernyataan: false,
  LembarPengesahan: false,
  KataPengantar: false,
  DaftarIsi: false,
  DaftarTabel: false,
  DaftarGambar: false,
  DaftarLampiran: false,
  SuratPernyataanPublikasiKarya: false,
  SuratPernyataanKesamaanIsi: false,
  Bab1: false,
  Bab2: false,
  Bab3: false,
  Bab4: false,
  Bab5: false,
  Bab6: false,
  BerkasLampiran: false,
  DaftarPustaka: false,
  FullTeks: false,
})

const onChangeThenUpload = async ($event, formName) => {
  const target = $event.target;
  const formData = new FormData();
  const headerItems = {
    Authorization: "Bearer " + bearer.value.accessToken,
    Cookie: "DSPACE-XSRF-COOKIE=" + dSpaceToken.value,
    "X-XSRF-TOKEN": dSpaceToken.value ?? "",
  };

  const bodyRequest = ref();
  const fileAccess = () => {
    switch (formName) {
      case "Cover":
        
        break;
    
      default:
        break;
    }
  }
  
  if (target && target.files) {
    inputFormState[formName] = true;
    const targetFile = target.files[0];
    const getBlob = targetFile.slice(0, targetFile.size);
    const newFileName = `${getJenjang.name.split('-').at(0).trim()}-${kelulusan.value.split('-').at(0)}-${getKelengkapanData[0].npm}-${formName}.pdf`
    const changeFileName = new File([getBlob], newFileName, { type: `${targetFile.type}` })
    formData.append("file", changeFileName);

    await $fetch(
      config.public.dSpacePublic +
      `/submission/workspaceitems/${getKelengkapanData[0].id_workspaceitems}`,
      {
        method: "POST",
        credentials: "include",
        headers: new Headers(headerItems),
        body: formData,
        async onResponse() {
          inputFormState[formName] = true;
          await $fetch(config.public.dSpacePublic + `/submission/workspaceitems/${getKelengkapanData[0].id_workspaceitems}`, {
            method: "PATCH",
            credentials: "include",
            headers: new Headers(headerItems),
            body: `[{ "op": "add", "path": "/sections/upload/files/${files.value.length}/accessConditions/-", "value": {"name": "administrator"}}]`,
            async onResponse() {
              const getFilesData = await $fetch(
                `${config.public.dSpacePublic}/submission/workspaceitems/${getKelengkapanData[0]?.id_workspaceitems}` ?? "",
                universalHeader
              );
              files.value = await getFilesData.sections.upload.files;
              switch (formName) {
                case "Cover":
                  console.log(files.value)
                  const findCover = await searchFile("Cover");
                  console.log(findCover)
                  console.log(fileCover.value)
                  fileCover.value = await findCover
                  console.log(fileCover.value)
                  break;
                case "Abstrak":
                  const findAbstrak = await searchFile("Abstrak");
                  fileAbstrak.value = findAbstrak
                  break;
                case "LembarPernyataan":
                  const findLembarPernyataan = await searchFile("LembarPernyataan");
                  fileLembarPernyataan.value = findLembarPernyataan
                  break;
                case "LembarPengesahan":
                  const findLembarPengesahan = await searchFile("LembarPengesahan");
                  fileLembarPengesahan.value = findLembarPengesahan
                  break;
                case "KataPengantar":
                  const findKataPengantar = await searchFile("KataPengantar")
                  fileKataPengantar.value = findKataPengantar
                  break;
                case "DaftarIsi":
                  const findDaftarIsi = await searchFile("DaftarIsi")
                  fileDaftarIsi.value = findDaftarIsi
                  break;
                case "DaftarTabel":
                  const findDaftarTabel = await searchFile("DaftarTabel")
                  fileDaftarTabel.value = findDaftarTabel
                  break;
                case "DaftarGambar":
                  const findDaftarGambar = await searchFile("DaftarGambar")
                  fileDaftarGambar.value = findDaftarGambar
                  break;
                case "DaftarLampiran":
                  const findDaftarLampiran = await searchFile("DaftarLampiran")
                  fileDaftarLampiran.value = findDaftarLampiran
                  break;
                case "PernyataanPublikasi":
                  const findPernyataanPublikasi = await searchFile("PernyataanPublikasi")
                  fileSuratPernyataanPublikasiKarya.value = findPernyataanPublikasi
                  break;
                case "PernyataanKesamaan":
                  const findPernyataanKesamaan = await searchFile("PernyataanKesamaan")
                  fileSuratPernyataanKesamaanIsi.value = findPernyataanKesamaan
                  break;
                case "Bab1":
                  const findBab1 = await searchFile("Bab1")
                  fileBab1.value = findBab1
                  break;
                case "Bab2":
                  const findBab2 = await searchFile("Bab2")
                  fileBab2.value = findBab2
                  break;
                case "Bab3":
                  const findBab3 = await searchFile("Bab3")
                  fileBab3.value = findBab3
                  break;
                case "Bab4":
                  const findBab4 = await searchFile("Bab4") 
                  fileBab4.value = findBab4
                  break;
                case "Bab5":
                  const findBab5 = await searchFile("Bab5")
                  fileBab5.value = findBab5
                  break;
                case "Bab6":
                  const findBab6 = await searchFile("Bab6")
                  fileBab6.value = findBab6
                  break;
                case "BerkasLampiran":
                  const findLampiran = await searchFile("BerkasLampiran")
                  fileLampiran.value = findLampiran
                  break;
                case "DaftarPustaka":
                  const findDaftarPustaka = await searchFile("DaftarPustaka")
                  fileDaftarPustaka.value = findDaftarPustaka
                  break;
                case "FullTeks":
                  const findFullTeks = await searchFile("FullTeks")
                  fileFullTeks.value = findFullTeks
                  break;
                default:
                  console.log(formName);
                  break;
              }
              inputFormState[formName] = false;
            }
          })
        }
      }
    );
  }
};

const deleteButtonClick = async (fileName) => {
  pickedFile.value = fileName;
  confirmDeleteFile.value = true;
}

const deleteFileSubmission = async (fileName) => {
  pickedFile.value = fileName;
  const headerItems = {
    Authorization: "Bearer " + bearer.value.accessToken,
    Cookie: "DSPACE-XSRF-COOKIE=" + dSpaceToken.value,
    "X-XSRF-TOKEN": dSpaceToken.value ?? "",
  };
  const chosenFile = (file) => file.metadata['dc.title'][0].value.includes(pickedFile.value)
  const getIndexFile = files.value.findIndex(chosenFile);
  if (getIndexFile !== undefined) {
    await $fetch(config.public.dSpacePublic + `/submission/workspaceitems/${getKelengkapanData[0].id_workspaceitems}`, {
      method: "PATCH",
      credentials: "include",
      headers: new Headers(headerItems),
      body: `[{ "op": "remove", "path": "/sections/upload/files/${getIndexFile}" }]`,
      async onResponse() {
        confirmDeleteFile.value = false;
        switch (fileName) {
          case "Cover":
            fileCover.value = null
            break;
          case "Abstrak":
            fileAbstrak.value = null
            break;
          case "LembarPernyataan":
            fileLembarPernyataan.value = null
            break;
          case "LembarPengesahan":
            fileLembarPengesahan.value = null
            break;
          case "KataPengantar":
            fileKataPengantar.value = null
            break;
          case "DaftarIsi":
            fileDaftarIsi.value = null
            break;
          case "DaftarTabel":
            fileDaftarTabel.value = null
            break;
          case "DaftarGambar":
            fileDaftarGambar.value = null
            break;
          case "DaftarLampiran":
            fileDaftarLampiran.value = null
            break;
          case "PernyataanPublikasi":
            fileSuratPernyataanPublikasiKarya.value = null
            break;
          case "PernyataanKesamaan":
            fileSuratPernyataanKesamaanIsi.value = null
            break;
          case "Bab1":
            fileBab1.value = null
            break;
          case "Bab2":
            fileBab2.value = null
            break;
          case "Bab3":
            fileBab3.value = null
            break;
          case "Bab4":
            fileBab4.value = null
            break;
          case "Bab5":
            fileBab5.value = await null
            break;
          case "Bab6":
            fileBab6.value = null
            break;
          case "BerkasLampiran":
            fileLampiran.value = null
            break;
          case "DaftarPustaka":
            fileDaftarPustaka.value = null
            break;
          case "FullTeks":
            fileFullTeks.value = null
            break;
          default:
            console.log(fileName)
            break;
        }
        pickedFile.value = "";
      }
    })
  }
}

const filePreview = ref(null);
const filePreviewStateLoad = ref(false);
const pdfPage = ref(1);
const waterMarkText = ref("Universitas Padjadjaran")
const waterMarkOption = ref({
  columns: 1,
  rows: 1,
  rotation: 45,
  fontSize: 65,
  color: 'rgba(211, 210, 211, 0.4)'
})

const prevPage = () => {
  return pdfPage.value = pdfPage.value > 1 ? pdfPage.value - 1 : pdfPage.value;
}
const nextPage = () => {
  return pdfPage.value = pdfPage.value < filePreview.value?.pages ? pdfPage.value + 1 : pdfPage.value;
}

const submitFileToDspace = async () => {
  if (checkBoxPersetujuan) {
    await $fetch(`${config.public.dSpacePublic}/submission/workspaceitems/${getKelengkapanData[0].id_workspaceitems}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: new Headers({
          Authorization: "Bearer " + bearer.value.accessToken,
          "X-XSRF-TOKEN": `${dSpaceToken.value}`,
        }),
        body: `[{ "op": "add", "path": "/sections/license/granted", "value": true}]`,
        async onResponse({ response }) {
          if (response.status === 200) {
            await $fetch(
              `${config.public.dSpacePublic}/workflow/workflowitems`,
              {
                method: "POST",
                credentials: "include",
                headers: new Headers({
                  Authorization: "Bearer " + bearer.value.accessToken,
                  "X-XSRF-TOKEN": `${dSpaceToken.value}`,
                  "Content-Type": "text/uri-list"
                }),
                body: `${config.public.dSpacePublic}/submission/workspaceitems/${getKelengkapanData[0].id_workspaceitems}`,
                async onResponse() {
                  await updateItem({
                    collection: "log_dspace_items",
                    id: getKelengkapanData[0].id,
                    item: {
                      submitted: "true"
                    }
                  })
                  await navigateTo('/pengajuan/unggah-mandiri/submit/form/uploaded');
                }
              }
            );
          }
        }
      })
  }
}

const showPreview = async (uid) => {
  previewModal.value = !previewModal.value;
  filePreviewStateLoad.value = true;
  pdfPage.value = 1;
  if (previewModal.value) {
    await $fetch(`${config.public.dSpacePublic}/core/bitstreams/${uid}/content`, {
      method: "GET",
      headers: new Headers({
        "Authorization": "Bearer " + bearer.value.accessToken,
        "X-XSRF-TOKEN": `${dSpaceToken.value}`,
      }),
      onResponse({ response }) {
        if (response._data !== null) {
          filePreview.value = usePDF(URL.createObjectURL(response._data))
        }
        filePreviewStateLoad.value = false;
      }
    })
  }
}
</script>

<template>
  <section>
    <ClientOnly>
      <Teleport to="#modal">
        <ModalBase v-show="previewModal" @close="previewModal = false">
          <div class="flex flex-col items-center bg-white mx-3 rounded-lg">
            <div v-if="!filePreviewStateLoad && filePreview?.pdf">
              <VuePDF :pdf="filePreview?.pdf" :page="pdfPage" :height="450" :watermark-text="waterMarkText"
                :watermark-options="waterMarkOption" :text-layer="true" />
              <div class="flex items-center justify-center gap-2" v-show="filePreview?.pdf">
                <button v-show="filePreview?.pages > 1" class="nav-btn" @click="prevPage"
                  :disabled="pdfPage === 1">Prev.</button>
                <p>{{ pdfPage }} / {{ filePreview?.pages }}</p>
                <button v-show="filePreview?.pages > 1" class="nav-btn" @click="nextPage"
                  :disabled="pdfPage === filePreview?.pages">Next</button>
              </div>
            </div>
            <div class="w-full bg-white rounded-lg p-10" v-else>
              <p>Memuat PDF...</p>
            </div>
          </div>
        </ModalBase>
        <ModalBase v-show="errorMetadata" @close="errorMetadata = false">
          <div class="flex flex-col items-center bg-white p-5 gap-2 mx-3 rounded-lg">
            <h6>Data yang dimasukkan belum lengkap!</h6>
            <p>Silahkan isi kembali dan lengkapi tanda bintang merah karena kolom tersebut wajib diisi!</p>
            <button @click="errorMetadata = false" class="btn bg-orange text-white py-1 px-5">Ok</button>
          </div>
        </ModalBase>
        <ModalBase v-show="confirmationModal" @close="confirmationModal = false">
          <div class="max-w-md flex flex-col items-center bg-white p-5 mx-3 gap-2 rounded-lg">
            <div>
              <div class="i-mdi-alert-octagram text-yellow w-20 h-20" />
            </div>
            <h3>Konfirmasi Unggah</h3>
            <p class="text-justify">Apakah Anda sudah memeriksa setiap komponen berkas dan metadata yang telah anda
              input ? jika yakin silahkan klik tombol unggah, jika belum yakin silahkan klik tombol kembali. Hal ini
              berkaitan dengan sistem unggah yang dimana setiap koleksi yang sudah dipublikasi tidak dapat diperbaiki
              kembali oleh Mahasiswa. Silahkan periksa kembali, dan apabila sudah yakin silahkan klik tombol Unggah</p>
            <div class="flex gap-3 w-full">
              <button @click="confirmationModal = false"
                class="btn bg-red text-white py-1 px-5 w-full flex items-center justify-center gap-2">
                <span>
                  <div class="i-mdi-arrow-left-circle text-white h-8 h-8" />
                </span>
                <span>
                  Kembali
                </span>
              </button>
              <button @click="submitFileToDspace"
                class="btn bg-green text-white py-1 px-5 w-full flex items-center justify-center gap-2">
                <span>
                  <div class="i-mdi-cloud-upload text-white h-8 h-8" />
                </span>
                <span>
                  Unggah
                </span>
              </button>
            </div>
          </div>
        </ModalBase>
        <ModalBase v-show="confirmDeleteFile" @close="confirmDeleteFile = false">
          <div class="w-full max-w-120 flex flex-col items-center bg-white p-5 mx-3 gap-2 rounded-lg">
            <div>
              <div class="i-mdi-trash-can text-red w-20 h-20" />
            </div>
            <h3>Hapus Berkas ?</h3>
            <p class="text-justify">Apakah Anda yakin ingin menghapus berkas <span class="font-semibold text-orange">{{
          pickedFile }}</span> ?</p>
            <div class="flex gap-3 w-full">
              <button @click="confirmDeleteFile = false"
                class="btn bg-orange text-white py-1 px-5 w-full flex items-center justify-center gap-2">
                <span>
                  <div class="i-mdi-arrow-left-circle text-white h-8 h-8" />
                </span>
                <span>
                  Kembali
                </span>
              </button>
              <button @click="deleteFileSubmission(pickedFile)"
                class="btn bg-red text-white py-1 px-5 w-full flex items-center justify-center gap-2">
                <span>
                  <div class="i-mdi-trash-can text-white h-8 h-8" />
                </span>
                <span>
                  Hapus
                </span>
              </button>
            </div>
          </div>
        </ModalBase>
      </Teleport>
    </ClientOnly>
    <div class="flex flex-col items-center justify-center mt-4 relative" v-if="getKelengkapanData.length > 0">
      <h3 class="text-center pt-5">{{ val }}</h3>
      <article class="w-full flex flex-col items-center justify-center relative">
        <div class="heading-section">
          <h3>Biodata Pengunggah</h3>
        </div>
        <div class="flex gap-4 mt-4">
          <div>
            <p>Nama Lengkap</p>
            <p>NPM</p>
            <p>Email</p>
            <p>Jenjang</p>
            <p>Program Studi</p>
            <p>Fakultas</p>
          </div>
          <div>
            <p class="font-semibold">
              :
              {{ getKelengkapanData[0].nama_lengkap ?? submitter.namaLengkap }}
            </p>
            <p class="font-semibold">
              : {{ getKelengkapanData[0].npm ?? submitter.npm }}
            </p>
            <p class="font-semibold">
              : {{ getKelengkapanData[0].email ?? submitter.email }}
            </p>
            <p class="font-semibold">: {{ getJenjang.name ?? getJenjang }}</p>
            <p class="font-semibold">: {{ getProdi.name ?? getProdi }}</p>
            <p class="font-semibold">: {{ getFakultas.name ?? getFakultas }}</p>
          </div>
        </div>
      </article>
      <article class="w-full my-10 px-5">
        <div>
          <div class="heading-section">
            <h3>Informasi Detil Tugas Akhir</h3>
          </div>
          <form @submit.prevent="saveMetadata">
            <div class="input-block">
              <label for="judul">Judul Tugas Akhir <span class="text-red">*</span> :
              </label>
              <input class="input-area" type="text" name="judul" id="judul" placeholder="Masukkan Judul Tugas Akhir"
                v-model="judul" :disabled="getWorkSpaceItem.metadata['dc.title']?.[0]?.value" required />
            </div>
            <div class="input-block">
              <label for="abstrak">Abstrak (Indonesia / Inggris)
                <span class="text-red">*</span> :</label>
              <textarea class="input-area" type="text" name="abstrak" id="abstrak" rows="15"
                placeholder="Masukkan Abstrak Berbahasa Indonesia (gunakan Bahasa Inggris jika tidak ada Abstrak Indonesia)"
                v-model="abstrak" :disabled="getWorkSpaceItem.metadata['dc.description.abstract']?.[0]?.value"
                required />
            </div>
            <div class="flex gap-3">
              <div class="input-block">
                <label for="keyword">Kata Kunci <span class="text-red">*</span> :</label>
                <input class="input-area" type="text" name="keyword" id="keyword" placeholder="Maksimum 3 Kata Kunci"
                  v-model="kataKunci" :disabled="getWorkSpaceItem.metadata['dc.subject']?.[0]?.value" @keyup.enter.stop.prevent="onEnterKeywords" />
                <p class="description-helper" :class="splitKeyword.length < 3 ? 'text-gray' : 'text-red'">
                  {{ warn }}
                </p>
                <div class="flex flex-wrap gap-1">
                  <span class="bg-orange text-white text-xs rounded px-2 py-0 transition-all-500 cursor-pointer" v-for="(key, index) in splitKeyword" @click="deleteKeyword(index)">{{ key.value }}</span>
                </div>
              </div>
              <div class="input-block">
                <label for="bahasa">Bahasa <span class="text-red">*</span> :</label>
                <select class="input-area" type="text" name="bahasa" id="bahasa"
                  placeholder="Bahasa yang digunakan dalam Tugas Akhir" v-model="bahasa"
                  :disabled="getWorkSpaceItem.metadata['dc.language.iso']?.[0]?.value">
                  <option :value="null" selected disabled>
                    Pilih Bahasa yang digunakan dalam Tugas Akhir
                  </option>
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">Bahasa Inggris</option>
                </select>
              </div>
              <div class="input-block">
                <label for="kelulusan">Tanggal Sidang / Kelulusan <span class="text-red">*</span> :</label>
                <input class="input-area" type="date" name="kelulusan" id="kelulusan" v-model="kelulusan"
                  :disabled="getWorkSpaceItem.metadata['dc.date.issued']?.[0]?.value" />
              </div>
            </div>
            <div class="flex gap-3">
              <div class="input-block">
                <label for="pembimbing1">Pembimbing 1 <span class="text-red">*</span> :</label>
                <input class="input-area" type="text" name="pembimbing1" id="pembimbing1"
                  placeholder="Nama Lengkap Pembimbing Pertama" v-model="pembimbing1"
                  :disabled="getWorkSpaceItem.metadata['dc.contributor.advisor']?.[0]?.value" />
              </div>
              <div class="input-block">
                <label for="pembimbing2">Pembimbing 2 <span class="text-red">*</span> :</label>
                <input class="input-area" type="text" name="pembimbing2" id="pembimbing2"
                  placeholder="Nama Lengkap Pembimbing Kedua" v-model="pembimbing2"
                  :disabled="getWorkSpaceItem.metadata['dc.contributor.advisor']?.[1]?.value" />
              </div>
              <div class="input-block">
                <label for="pembimbing3">Pembimbing 3 :</label>
                <input class="input-area" type="text" name="pembimbing3" id="pembimbing3"
                  placeholder="Nama Lengkap Pembimbing Ketiga" v-model="pembimbing3"
                  :disabled="getWorkSpaceItem.metadata['dc.contributor.advisor']?.[2]?.value" />
              </div>
            </div>
            <p class="description-helper text-center">
              **Kosongkan jika tidak ada
            </p>
            <div class="max-w-3xl ma text-center">
              <p class="text-red font-semibold">
                {{ metadataNotes }}
              </p>
            </div>
            <button class="btn bg-green-5 text-white w-full mt-5 font-semibold" type="submit"
              @click.prevent="saveMetadata"
              :disabled="!judul && !abstrak && !kataKunci && !bahasa && !kelulusan && !pembimbing1 && !pembimbing2">
              <span v-if="metadataButtonState" class="flex gap-3 items-center justify-center">
                <div class="loader"></div>
                Mengirim...
              </span>
              <span v-else>
                Simpan
              </span>
            </button>
          </form>
        </div>
      </article>
      <article class="w-full my-10 px-5"
        v-show="getWorkSpaceItem.metadata['dc.title']?.[0]?.value && getWorkSpaceItem.metadata['dc.description.abstract']?.[0]?.value && getWorkSpaceItem.metadata['dc.subject']?.[0]?.value && getWorkSpaceItem.metadata['dc.language.iso']?.[0]?.value && getWorkSpaceItem.metadata['dc.date.issued']?.[0]?.value && getWorkSpaceItem.metadata['dc.contributor.advisor']?.[0]?.value && getWorkSpaceItem.metadata['dc.contributor.advisor']?.[1]?.value">
        <div class="heading-section">
          <h3>Data Berkas</h3>
        </div>
        <div class="flex flex-col w-full mt-5 lg:(flex-row gap-15)">
          <section class="w-full">
            <h4>Berkas Awal</h4>
            <div class="input-block">
              <label for="cover">Cover :</label>
              <div class="flex gap-2" v-if="fileCover">
                <p>Berkas :</p>
                <button @click="showPreview(fileCover?.uuid)" class="hover-preview">
                  {{ fileCover?.metadata["dc.title"][0].value }}
                </button>
                <button @click="deleteButtonClick('Cover')">
                  <span>
                    <div class="trash-icon" />
                  </span>
                </button>
              </div>
              <div v-else-if="inputFormState.Cover">
                <p class="text-sm flex items-center gap-1">
                  <span>
                    <div class="i-mdi-hourglass text-orange w-5 h-5"/>
                  </span>
                  Sedang mengunggah...
                </p>
              </div>
              <input type="file" name="cover" id="cover" class="file-input"
                @change="onChangeThenUpload($event, 'Cover')" v-else-if="!fileCover" accept="application/pdf" />
            </div>

            <div class="input-block">
              <label for="abstrak">Abstrak (Indonesia & Inggris) :</label>
              <div class="flex gap-2" v-if="fileAbstrak">
                <p>Berkas :</p>
                <button @click="showPreview(fileAbstrak?.uuid)" class="hover-preview">
                  {{ fileAbstrak?.metadata["dc.title"][0].value }}
                </button>
                <button @click="deleteButtonClick('Abstrak')">
                  <span>
                    <div class="trash-icon" />
                  </span>
                </button>
              </div>
              <div v-else-if="inputFormState.Abstrak">
                <p class="text-sm flex items-center gap-1">
                  <span>
                    <div class="i-mdi-hourglass text-orange w-5 h-5"/>
                  </span>
                  Sedang mengunggah...
                </p>
              </div>
              <input type="file" name="abstrakfile" id="abstrakfile" class="file-input"
                @change="onChangeThenUpload($event, 'Abstrak')" v-else-if="!fileAbstrak" accept="application/pdf" />
            </div>

            <div class="input-block">
              <label for="pernyataan">Lembar Pernyataan (yang sudah ditandatangani) :</label>
              <div class="flex gap-2" v-if="fileLembarPernyataan">
                <p>Berkas :</p>
                <button @click="showPreview(fileLembarPernyataan?.uuid)" class="hover-preview">
                  {{ fileLembarPernyataan?.metadata["dc.title"][0].value }}
                </button>
                <button @click="deleteButtonClick('LembarPernyataan')">
                  <span>
                    <div class="trash-icon" />
                  </span>
                </button>
              </div>
              <div v-else-if="inputFormState.LembarPernyataan">
                <p class="text-sm flex items-center gap-1">
                  <span>
                    <div class="i-mdi-hourglass text-orange w-5 h-5"/>
                  </span>
                  Sedang mengunggah...
                </p>
              </div>
              <input type="file" name="pernyataan" id="pernyataan" class="file-input"
                @change="onChangeThenUpload($event, 'LembarPernyataan')" v-else-if="!fileLembarPernyataan" accept="application/pdf" />
            </div>

            <div class="input-block">
              <label for="pengesahan">Lembar Pengesahan (yang sudah ditandatangani) :</label>
              <div class="flex gap-2" v-if="fileLembarPengesahan">
                <p>Berkas :</p>
                <button @click="showPreview(fileLembarPengesahan?.uuid)" class="hover-preview">
                  {{ fileLembarPengesahan?.metadata["dc.title"][0].value }}
                </button>
                <button @click="deleteButtonClick('LembarPengesahan')">
                  <span>
                    <div class="trash-icon" />
                  </span>
                </button>
              </div>
              <div v-else-if="inputFormState.LembarPengesahan">
                <p class="text-sm flex items-center gap-1">
                  <span>
                    <div class="i-mdi-hourglass text-orange w-5 h-5"/>
                  </span>
                  Sedang mengunggah...
                </p>
              </div>
              <input type="file" name="pengesahan" id="pengesahan" class="file-input"
                @change="onChangeThenUpload($event, 'LembarPengesahan')" v-else-if="!fileLembarPengesahan" accept="application/pdf" />
            </div>

            <div class="input-block">
              <label for="katapengantar">Kata Pengantar :</label>
              <div class="flex gap-2" v-if="fileKataPengantar">
                <p>Berkas :</p>
                <button @click="showPreview(fileKataPengantar?.uuid)" class="hover-preview">
                  {{ fileKataPengantar?.metadata["dc.title"][0].value }}
                </button>
                <button @click="deleteButtonClick('KataPengantar')">
                  <span>
                    <div class="trash-icon" />
                  </span>
                </button>
              </div>
              <div v-else-if="inputFormState.KataPengantar">
                <p class="text-sm flex items-center gap-1">
                  <span>
                    <div class="i-mdi-hourglass text-orange w-5 h-5"/>
                  </span>
                  Sedang mengunggah...
                </p>
              </div>
              <input type="file" name="katapengantar" id="katapengantar" class="file-input"
                @change="onChangeThenUpload($event, 'KataPengantar')" v-else-if="!fileKataPengantar" accept="application/pdf" />
            </div>

            <div class="input-block">
              <label for="daftarisi">Daftar Isi :</label>
              <div class="flex gap-2" v-if="fileDaftarIsi">
                <p>Berkas :</p>
                <button @click="showPreview(fileDaftarIsi?.uuid)" class="hover-preview">
                  {{ fileDaftarIsi?.metadata["dc.title"][0].value }}
                </button>
                <button @click="deleteButtonClick('DaftarIsi')">
                  <span>
                    <div class="trash-icon" />
                  </span>
                </button>
              </div>
              <div v-else-if="inputFormState.DaftarIsi">
                <p class="text-sm flex items-center gap-1">
                  <span>
                    <div class="i-mdi-hourglass text-orange w-5 h-5"/>
                  </span>
                  Sedang mengunggah...
                </p>
              </div>
              <input type="file" name="daftarisi" id="daftarisi" class="file-input"
                @change="onChangeThenUpload($event, 'DaftarIsi')" v-else-if="!fileDaftarIsi" accept="application/pdf" />
            </div>

            <div class="input-block">
              <label for="daftartabel">Daftar Tabel :</label>
              <div class="flex gap-2" v-if="fileDaftarTabel">
                <p>Berkas :</p>
                <button @click="showPreview(fileDaftarTabel?.uuid)" class="hover-preview">
                  {{ fileDaftarTabel?.metadata["dc.title"][0].value }}
                </button>
                <button @click="deleteButtonClick('DaftarTabel')">
                  <span>
                    <div class="trash-icon" />
                  </span>
                </button>
              </div>
              <div v-else-if="inputFormState.DaftarTabel">
                <p class="text-sm flex items-center gap-1">
                  <span>
                    <div class="i-mdi-hourglass text-orange w-5 h-5"/>
                  </span>
                  Sedang mengunggah...
                </p>
              </div>
              <input type="file" name="daftartabel" id="daftartabel" class="file-input"
                @change="onChangeThenUpload($event, 'DaftarTabel')" v-else="!fileDaftarTabel" accept="application/pdf" />
            </div>

            <div class="input-block">
              <label for="daftargambar">Daftar Gambar :</label>
              <div class="flex gap-2" v-if="fileDaftarGambar">
                <p>Berkas :</p>
                <button @click="showPreview(fileDaftarGambar?.uuid)" class="hover-preview">
                  {{ fileDaftarGambar?.metadata["dc.title"][0].value }}
                </button>
                <button @click="deleteButtonClick('DaftarGambar')">
                  <span>
                    <div class="trash-icon" />
                  </span>
                </button>
              </div>
              <div v-else-if="inputFormState.DaftarGambar">
                <p class="text-sm flex items-center gap-1">
                  <span>
                    <div class="i-mdi-hourglass text-orange w-5 h-5"/>
                  </span>
                  Sedang mengunggah...
                </p>
              </div>
              <input type="file" name="daftargambar" id="daftargambar" class="file-input"
                @change="onChangeThenUpload($event, 'DaftarGambar')" v-else-if="!fileDaftarGambar" accept="application/pdf" />
            </div>

            <div class="input-block">
              <label for="daftarlampiran">Daftar Lampiran :</label>
              <div class="flex gap-2" v-if="fileDaftarLampiran">
                <p>Berkas :</p>
                <button @click="showPreview(fileDaftarLampiran?.uuid)" class="hover-preview">
                  {{ fileDaftarLampiran?.metadata["dc.title"][0].value }}
                </button>
                <button @click="deleteButtonClick('DaftarLampiran')">
                  <span>
                    <div class="trash-icon" />
                  </span>
                </button>
              </div>
              <div v-else-if="inputFormState.DaftarLampiran">
                <p class="text-sm flex items-center gap-1">
                  <span>
                    <div class="i-mdi-hourglass text-orange w-5 h-5"/>
                  </span>
                  Sedang mengunggah...
                </p>
              </div>
              <input type="file" name="daftarlampiran" id="daftarlampiran" class="file-input"
                @change="onChangeThenUpload($event, 'DaftarLampiran')" v-else-if="!fileDaftarLampiran" accept="application/pdf" />
            </div>

            <div class="input-block">
              <label for="pernyataanpublikasi">Surat Pernyataan Publikasi Karya Ilmiah:</label>
              <div class="flex gap-2"
                v-if="fileSuratPernyataanPublikasiKarya">
                <p>Berkas :</p>
                <button @click="showPreview(fileSuratPernyataanPublikasiKarya?.uuid)" class="hover-preview">
                  {{ fileSuratPernyataanPublikasiKarya?.metadata["dc.title"][0].value }}
                </button>
                <button @click="deleteButtonClick('PernyataanPublikasi')">
                  <span>
                    <div class="trash-icon" />
                  </span>
                </button>
              </div>
              <div v-else-if="inputFormState.SuratPernyataanPublikasiKarya">
                <p class="text-sm flex items-center gap-1">
                  <span>
                    <div class="i-mdi-hourglass text-orange w-5 h-5"/>
                  </span>
                  Sedang mengunggah...
                </p>
              </div>
              <input type="file" name="pernyataanpublikasi" id="pernyataanpublikasi" class="file-input"
                @change="onChangeThenUpload($event, 'PernyataanPublikasi')" v-else-if="!fileSuratPernyataanPublikasiKarya" accept="application/pdf" />
            </div>

            <div class="input-block">
              <label for="pernyataankesamaan">Surat Pernyataan Kesamaan Isi Dokumen :</label>
              <div class="flex gap-2"
                v-if="fileSuratPernyataanKesamaanIsi">
                <p>Berkas :</p>
                <button @click="showPreview(fileSuratPernyataanKesamaanIsi?.uuid)" class="hover-preview">
                  {{ fileSuratPernyataanKesamaanIsi?.metadata["dc.title"][0].value }}
                </button>
                <button @click="deleteButtonClick('PernyataanKesamaan')">
                  <span>
                    <div class="trash-icon" />
                  </span>
                </button>
              </div>
              <div v-else-if="inputFormState.SuratPernyataanKesamaanIsi">
                <p class="text-sm flex items-center gap-1">
                  <span>
                    <div class="i-mdi-hourglass text-orange w-5 h-5"/>
                  </span>
                  Sedang mengunggah...
                </p>
              </div>
              <input type="file" name="pernyataankesamaan" id="pernyataankesamaan" class="file-input"
                @change="onChangeThenUpload($event, 'PernyataanKesamaan')" v-else-if="!fileSuratPernyataanKesamaanIsi" accept="application/pdf" />
            </div>
          </section>
          <div class="w-full">
            <h4>Berkas Konten</h4>
            <div class="input-block">
              <label for="bab1">Bab 1 :</label>
              <div class="flex gap-2" v-if="fileBab1">
                <p>Berkas :</p>
                <button @click="showPreview(fileBab1?.uuid)" class="hover-preview">
                  {{ fileBab1?.metadata["dc.title"][0].value }}
                </button>
                <button @click="deleteButtonClick('Bab1')">
                  <span>
                    <div class="trash-icon" />
                  </span>
                </button>
              </div>
              <div v-else-if="inputFormState.Bab1">
                <p class="text-sm flex items-center gap-1">
                  <span>
                    <div class="i-mdi-hourglass text-orange w-5 h-5"/>
                  </span>
                  Sedang mengunggah...
                </p>
              </div>
              <input type="file" name="bab1" id="bab1" class="file-input" @change="onChangeThenUpload($event, 'Bab1')"
                v-else-if="!fileBab1" accept="application/pdf" />
            </div>

            <div class="input-block">
              <label for="bab2">Bab 2 :</label>
              <div class="flex gap-2" v-if="fileBab2">
                <p>Berkas :</p>
                <button @click="showPreview(fileBab2?.uuid)" class="hover-preview">
                  {{ fileBab2?.metadata["dc.title"][0].value }}
                </button>
                <button @click="deleteButtonClick('Bab2')">
                  <span>
                    <div class="trash-icon" />
                  </span>
                </button>
              </div>
              <div v-else-if="inputFormState.Bab2">
                <p class="text-sm flex items-center gap-1">
                  <span>
                    <div class="i-mdi-hourglass text-orange w-5 h-5"/>
                  </span>
                  Sedang mengunggah...
                </p>
              </div>
              <input type="file" name="bab2" id="bab2" class="file-input" @change="onChangeThenUpload($event, 'Bab2')"
              v-else-if="!fileBab2" accept="application/pdf" />
            </div>

            <div class="input-block">
              <label for="bab3">Bab 3 :</label>
              <div class="flex gap-2" v-if="fileBab3">
                <p>Berkas :</p>
                <button @click="showPreview(fileBab3?.uuid)" class="hover-preview">
                  {{ fileBab3?.metadata["dc.title"][0].value }}
                </button>
                <button @click="deleteButtonClick('Bab3')">
                  <span>
                    <div class="trash-icon" />
                  </span>
                </button>
              </div>
              <div v-else-if="inputFormState.Bab3">
                <p class="text-sm flex items-center gap-1">
                  <span>
                    <div class="i-mdi-hourglass text-orange w-5 h-5"/>
                  </span>
                  Sedang mengunggah...
                </p>
              </div>
              <input type="file" name="bab3" id="bab3" class="file-input" @change="onChangeThenUpload($event, 'Bab3')"
              v-else-if="!fileBab3" accept="application/pdf" />
            </div>

            <div class="input-block">
              <label for="bab4">Bab 4 :</label>
              <div class="flex gap-2" v-if="fileBab4">
                <p>Berkas :</p>
                <button @click="showPreview(fileBab4?.uuid)" class="hover-preview">
                  {{ fileBab4?.metadata["dc.title"][0].value }}
                </button>
                <button @click="deleteButtonClick('Bab4')">
                  <span>
                    <div class="trash-icon" />
                  </span>
                </button>
              </div>
              <div v-else-if="inputFormState.Bab4">
                <p class="text-sm flex items-center gap-1">
                  <span>
                    <div class="i-mdi-hourglass text-orange w-5 h-5"/>
                  </span>
                  Sedang mengunggah...
                </p>
              </div>
              <input type="file" name="bab4" id="bab4" class="file-input" @change="onChangeThenUpload($event, 'Bab4')"
              v-else-if="!fileBab4" accept="application/pdf" />
            </div>

            <div class="input-block">
              <label for="bab5">Bab 5 :</label>
              <div class="flex gap-2" v-if="fileBab5">
                <p>Berkas :</p>
                <button @click="showPreview(fileBab5?.uuid)" class="hover-preview">
                  {{ fileBab5?.metadata["dc.title"][0].value }}
                </button>
                <button @click="deleteButtonClick('Bab5')">
                  <span>
                    <div class="trash-icon" />
                  </span>
                </button>
              </div>
              <div v-else-if="inputFormState.Bab5">
                <p class="text-sm flex items-center gap-1">
                  <span>
                    <div class="i-mdi-hourglass text-orange w-5 h-5"/>
                  </span>
                  Sedang mengunggah...
                </p>
              </div>
              <input type="file" name="bab5" id="bab5" class="file-input" @change="onChangeThenUpload($event, 'Bab5')"
              v-else-if="!fileBab5" accept="application/pdf" />
            </div>

            <div class="input-block">
              <label for="bab6">Bab 6 :</label>
              <div class="flex gap-2" v-if="fileBab6">
                <p>Berkas :</p>
                <button @click="showPreview(fileBab6?.uuid)" class="hover-preview">
                  {{ fileBab6?.metadata["dc.title"][0].value }}
                </button>
                <button @click="deleteButtonClick('Bab6')">
                  <span>
                    <div class="trash-icon" />
                  </span>
                </button>
              </div>
              <div v-else-if="inputFormState.Bab6">
                <p class="text-sm flex items-center gap-1">
                  <span>
                    <div class="i-mdi-hourglass text-orange w-5 h-5"/>
                  </span>
                  Sedang mengunggah...
                </p>
              </div>
              <input type="file" name="bab6" id="bab6" class="file-input" @change="onChangeThenUpload($event, 'Bab6')"
              v-else-if="!fileBab6" accept="application/pdf" />
            </div>

            <div class="input-block">
              <label for="lampiran">Lampiran :</label>
              <div class="flex gap-2" v-if="fileLampiran">
                <p>Berkas :</p>
                <button @click="showPreview(fileLampiran?.uuid)" class="hover-preview">
                  {{ fileLampiran?.metadata["dc.title"][0].value }}
                </button>
                <button @click="deleteButtonClick('BerkasLampiran')">
                  <span>
                    <div class="trash-icon" />
                  </span>
                </button>
              </div>
              <div v-else-if="inputFormState.BerkasLampiran">
                <p class="text-sm flex items-center gap-1">
                  <span>
                    <div class="i-mdi-hourglass text-orange w-5 h-5"/>
                  </span>
                  Sedang mengunggah...
                </p>
              </div>
              <input type="file" name="lampiran" id="lampiran" class="file-input"
                @change="onChangeThenUpload($event, 'BerkasLampiran')" v-else-if="!fileLampiran" accept="application/pdf" />
            </div>

            <div class="input-block">
              <label for="daftarpustaka">Daftar Pustaka :</label>
              <div class="flex gap-2" v-if="fileDaftarPustaka">
                <p>Berkas :</p>
                <button @click="showPreview(fileDaftarPustaka?.uuid)" class="hover-preview">
                  {{ fileDaftarPustaka?.metadata["dc.title"][0].value }}
                </button>
                <button @click="deleteButtonClick('DaftarPustaka')">
                  <span>
                    <div class="trash-icon" />
                  </span>
                </button>
              </div>
              <div v-else-if="inputFormState.DaftarPustaka">
                <p class="text-sm flex items-center gap-1">
                  <span>
                    <div class="i-mdi-hourglass text-orange w-5 h-5"/>
                  </span>
                  Sedang mengunggah...
                </p>
              </div>
              <input type="file" name="daftarpustaka" id="daftarpustaka" class="file-input"
                @change="onChangeThenUpload($event, 'DaftarPustaka')" v-else-if="!fileDaftarPustaka" accept="application/pdf" />
            </div>

            <div class="input-block">
              <label for="fullteks">Full Teks :</label>
              <div class="flex gap-2" v-if="fileFullTeks">
                <p>Berkas :</p>
                <button @click="showPreview(fileFullTeks?.uuid)" class="hover-preview">
                  {{ fileFullTeks?.metadata["dc.title"][0].value }}
                </button>
                <button @click="deleteButtonClick('FullTeks')">
                  <span>
                    <div class="trash-icon" />
                  </span>
                </button>
              </div>
              <div v-else-if="inputFormState.FullTeks">
                <p class="text-sm flex items-center gap-1">
                  <span>
                    <div class="i-mdi-hourglass text-orange w-5 h-5"/>
                  </span>
                  Sedang mengunggah...
                </p>
              </div>
              <input type="file" name="fullteks" id="fullteks" class="file-input"
                @change="onChangeThenUpload($event, 'FullTeks')" v-else-if="!fileFullTeks" accept="application/pdf" />
            </div>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <input type="checkbox" name="persetujuan" id="persetujuan" v-model="checkBoxPersetujuan" />
          <label for="persetujuan" class="pb-0">Setuju dengan
            <NuxtLink href="/pengajuan/unggah-mandiri/persetujuan" target="_blank">peraturan</NuxtLink>
            dan persyaratan untuk publikasi karya ilmiah di Universitas
            Padjadjaran
          </label>
        </div>
        <button class="btn transition-all-500 bg-orange text-white w-full mt-5" :disabled="!checkBoxPersetujuan"
          @click="confirmationModal = true">
          Publikasi
        </button>
        <p class="text-dark">
          Dengan mengklik tombol "Publikasi" anda setuju dengan kebijakan yang
          telah ditetapkan oleh Universitas Padjadjaran untuk Karya Ilmiah Tugas
          Akhir anda dengan mempertimbangkan Daftar Publikasi yang ada di Surat
          Penyataan Publikasi Karya Ilmiah.
        </p>
      </article>

    </div>
    <div v-else>
      <h5 class="text-red">Anda belum mengisi form!</h5>
      <p>Silahkan kembali untuk mengisi form melalui tombol berikut</p>
      <div class="flex items-center justify-center my-10" v-if="getKelengkapanData.length === 0">
        <button @click="back" class="btn bg-orange text-white py-1">
          Kembali
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma relative;
}

p {
  --at-apply: italic;
}

.description-helper {
  --at-apply: text-sm italic;
}

.heading-section {
  --at-apply: bg-orange text-white px-5 py-1 rounded w-full max-w-md ma text-center;
}

.nav-btn {
  --at-apply: btn bg-orange text-white py-0 text-sm;
}

.hover-preview {
  --at-apply: transition-all-500 px-3 py-0 rounded bg-orange text-white hover:(bg-orange-5);
}

.trash-icon {
  --at-apply: i-mdi-trash-can w-7 h-7 text-red transition-all-500 hover:text-red-600;
}

.file-input {
  --at-apply: w-full bg-orange-50 text-gray-5 border border-orange-300 cursor-pointer rounded-bl rounded-tl file:(bg-orange text-white px-3 py-2 mr-3 border-none cursor-pointer);
}

button:disabled {
  --at-apply: bg-gray text-white;
}
</style>
