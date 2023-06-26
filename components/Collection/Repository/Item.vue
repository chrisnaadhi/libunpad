<script setup>
const { status } = useAuth();

function isAccessible(linkData) {
  if (linkData === null) {
    return "file-not-found";
  } else if (status.value === "authenticated") {
    return "auth-true";
  } else if (status.value === "unauthenticated") {
    return "auth-false";
  } else {
    return "file-not-found";
  }
}

defineProps({
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
});

const limitText = (text) => {
  return text.substring(0, 100);
};
</script>

<template>
  <section>
    <section class="flex flex-col lg:flex-row gap-5">
      <div class="w-70 ma text-center">
        <div class="cover-section">
          <p class="text-xs italic px-2">{{ judul }}...</p>
          <p class="text-xs font-semibold">{{ author }}</p>
          <NuxtImg
            src="/images/lambang-unpad.png"
            format="webp"
            height="75px"
            width="75px"
          />
          <p class="text-xs">Perpustakaan Universitas Padjadjaran</p>
        </div>
        <div class="mt-5">
          <h5 class="bg-gray-5 text-white">Kata Kunci</h5>
          <div class="bg-orange-1">
            <p class="text-sm p-2 italic">
              {{ keywords }}
            </p>
          </div>
        </div>
      </div>
      <div class="w-full px-5">
        <div>
          <h3 class="italic text-gray-5">
            {{ judul }}
          </h3>
          <h5 class="font-semibold">
            {{ author ?? "Belum ada Data" }} - {{ npm }}
          </h5>
          <p class="italic text-gray-5">{{ namaFakultas }}</p>
          <h6>Abstrak:</h6>
          <p class="text-sm text-justify">
            {{ abstrak }}
          </p>
        </div>
      </div>
    </section>
    <section class="flex flex-col gap-10 lg:flex-row">
      <div class="mt-5 mx-5">
        <h2 class="my-5">Berkas</h2>
        <table class="w-full lg:w-100">
          <thead>
            <tr>
              <th>Nama Berkas</th>
              <th>Akses Berkas</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-left">
              <td class="font-semibold w-35">Cover</td>
              <td class="flex">
                <div class="auth-true"></div>
                <span v-if="fileCover">
                  <NuxtLink
                    :to="fileCover"
                    target="_blank"
                    no-rel
                    :external="true"
                    >Download</NuxtLink
                  >
                </span>
                <span v-else-if="fileCover === null">
                  <p>File tidak tersedia</p>
                </span>
                <span v-else-if="status === 'unauthenticated'">
                  <p>Anda tidak memiliki Akses</p>
                </span>
                {{ fileFullText }}
              </td>
            </tr>
            <tr class="text-left">
              <td class="font-semibold w-35">Abstrak</td>
              <td class="flex">
                <div class="auth-true"></div>
                <span v-if="fileAbstrak">
                  <NuxtLink
                    :to="fileAbstrak"
                    target="_blank"
                    no-rel
                    :external="true"
                    >Download</NuxtLink
                  >
                </span>
                <span v-else-if="fileAbstrak === null">
                  <p>File tidak tersedia</p>
                </span>
                <span v-else-if="status === 'unauthenticated'">
                  <p>Anda tidak memiliki Akses</p>
                </span>
                {{ fileFullText }}
              </td>
            </tr>
            <tr class="text-left">
              <td class="font-semibold w-35">Daftar Isi</td>
              <td class="flex">
                <div class="auth-true"></div>
                <span v-if="fileDaftarIsi">
                  <NuxtLink
                    :to="fileDaftarIsi"
                    target="_blank"
                    no-rel
                    :external="true"
                    >Download</NuxtLink
                  >
                </span>
                <span v-else-if="fileDaftarIsi === null">
                  <p>File tidak tersedia</p>
                </span>
                <span v-else-if="status === 'unauthenticated'">
                  <p>Anda tidak memiliki Akses</p>
                </span>
                {{ fileFullText }}
              </td>
            </tr>
            <tr class="text-left">
              <td class="font-semibold w-35">Bab 1</td>
              <td class="flex">
                <div class="auth-true"></div>
                <span v-if="fileBab1">
                  <NuxtLink
                    :to="fileBab1"
                    target="_blank"
                    no-rel
                    :external="true"
                    >Download</NuxtLink
                  >
                </span>
                <span v-else-if="fileBab1 === null">
                  <p>File tidak tersedia</p>
                </span>
                <span v-else-if="status === 'unauthenticated'">
                  <p>Anda tidak memiliki Akses</p>
                </span>
                {{ fileFullText }}
              </td>
            </tr>
            <tr class="text-left">
              <td class="font-semibold w-35">Bab 2</td>
              <td class="flex">
                <div :class="isAccessible(fileBab2)"></div>
                <span v-if="status === 'authenticated' && fileBab2">
                  <NuxtLink
                    :to="fileBab2"
                    target="_blank"
                    no-rel
                    :external="true"
                    >Download</NuxtLink
                  >
                </span>
                <span v-else-if="fileBab2 === null">
                  <p>File tidak tersedia</p>
                </span>
                <span v-else-if="status === 'unauthenticated'">
                  <p>Anda tidak memiliki Akses</p>
                </span>
                {{ fileFullText }}
              </td>
            </tr>
            <tr class="text-left">
              <td class="font-semibold w-35">Bab 3</td>
              <td class="flex">
                <div :class="isAccessible(fileBab3)"></div>
                <span v-if="status === 'authenticated' && fileBab3">
                  <NuxtLink
                    :to="fileBab3"
                    target="_blank"
                    no-rel
                    :external="true"
                    >Download</NuxtLink
                  >
                </span>
                <span v-else-if="fileBab3 === null">
                  <p>File tidak tersedia</p>
                </span>
                <span v-else-if="status === 'unauthenticated'">
                  <p>Anda tidak memiliki Akses</p>
                </span>
                {{ fileFullText }}
              </td>
            </tr>
            <tr class="text-left">
              <td class="font-semibold w-35">Bab 4</td>
              <td class="flex">
                <div :class="isAccessible(fileBab4)"></div>
                <span v-if="status === 'authenticated' && fileBab4">
                  <NuxtLink
                    :to="fileBab4"
                    target="_blank"
                    no-rel
                    :external="true"
                    >Download</NuxtLink
                  >
                </span>
                <span v-else-if="fileBab4 === null">
                  <p>File tidak tersedia</p>
                </span>
                <span v-else-if="status === 'unauthenticated'">
                  <p>Anda tidak memiliki Akses</p>
                </span>
                {{ fileFullText }}
              </td>
            </tr>
            <tr class="text-left">
              <td class="font-semibold w-35">Bab 5</td>
              <td class="flex">
                <div :class="isAccessible(fileBab5)"></div>
                <span v-if="status === 'authenticated' && fileBab5">
                  <NuxtLink
                    :to="fileBab5"
                    target="_blank"
                    no-rel
                    :external="true"
                    >Download</NuxtLink
                  >
                </span>
                <span v-else-if="fileBab5 === null">
                  <p>File tidak tersedia</p>
                </span>
                <span v-else-if="status === 'unauthenticated'">
                  <p>Anda tidak memiliki Akses</p>
                </span>
                {{ fileFullText }}
              </td>
            </tr>
            <tr class="text-left">
              <td class="font-semibold w-35">Bab 6</td>
              <td class="flex">
                <div :class="isAccessible(fileBab6)"></div>
                <span v-if="status === 'authenticated' && fileBab6">
                  <NuxtLink
                    :to="fileBab6"
                    target="_blank"
                    no-rel
                    :external="true"
                    >Download</NuxtLink
                  >
                </span>
                <span v-else-if="fileBab6 === null">
                  <p>File tidak tersedia</p>
                </span>
                <span v-else-if="status === 'unauthenticated'">
                  <p>Anda tidak memiliki Akses</p>
                </span>
                {{ fileFullText }}
              </td>
            </tr>
            <tr class="text-left">
              <td class="font-semibold w-35">Lampiran</td>
              <td class="flex">
                <div :class="isAccessible(fileLampiran)"></div>
                <span v-if="status === 'authenticated' && fileLampiran">
                  <NuxtLink
                    :to="fileLampiran"
                    target="_blank"
                    no-rel
                    :external="true"
                    >Download</NuxtLink
                  >
                </span>
                <span v-else-if="fileLampiran === null">
                  <p>File tidak tersedia</p>
                </span>
                <span v-else-if="status === 'unauthenticated'">
                  <p>Anda tidak memiliki Akses</p>
                </span>
                {{ fileFullText }}
              </td>
            </tr>
            <tr class="text-left">
              <td class="font-semibold w-35">Daftar Pustaka</td>
              <td class="flex">
                <div class="auth-true"></div>
                <span v-if="filePustaka">
                  <NuxtLink
                    :to="filePustaka"
                    target="_blank"
                    no-rel
                    :external="true"
                    >Download</NuxtLink
                  >
                </span>
                <span v-else-if="fileFullText === null">
                  <p>File tidak tersedia</p>
                </span>
                <span v-else-if="status === 'unauthenticated'">
                  <p>Anda tidak memiliki Akses</p>
                </span>
                {{ fileFullText }}
              </td>
            </tr>
            <tr class="text-left">
              <td class="font-semibold w-35">Full Text</td>
              <td class="flex">
                <div :class="isAccessible(fileFullText)"></div>
                <span v-if="status === 'authenticated' && fileFullText">
                  <NuxtLink
                    :to="fileFullText"
                    target="_blank"
                    no-rel
                    :external="true"
                    >Download</NuxtLink
                  >
                </span>
                <span v-else-if="fileFullText === null">
                  <p>File tidak tersedia</p>
                </span>
                <span v-else-if="status === 'unauthenticated'">
                  <p>Anda tidak memiliki Akses</p>
                </span>
                {{ fileFullText }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-5 mx-5">
        <h2 class="my-5">Metadata</h2>
        <div class="grid grid-cols-none lg:grid-cols-5 my-5 gap-4 text-xs">
          <div class="metadata-title">
            <h6>Judul</h6>
          </div>
          <div class="col-span-4">
            <p>{{ judul ?? "Belum Ada Data" }}</p>
          </div>

          <div class="metadata-title">
            <h6>Abstrak</h6>
          </div>
          <div class="col-span-4">
            <p>{{ abstrak ?? "Belum Ada Data" }}</p>
          </div>

          <div class="metadata-title">
            <h6>Bahasa</h6>
          </div>
          <div class="col-span-4">
            <p>{{ bahasa ?? "Belum Ada Data" }}</p>
          </div>

          <div class="metadata-title">
            <h6>Keywords</h6>
          </div>
          <div class="col-span-4">
            <p>{{ keywords ?? "Belum Ada Data" }}</p>
          </div>

          <div class="metadata-title">
            <h6>Tanggal Upload</h6>
          </div>
          <div class="col-span-4">
            <p>{{ tglUpload ?? "Belum Ada Data" }}</p>
          </div>

          <div class="metadata-title">
            <h6>Publikasi</h6>
          </div>
          <div class="col-span-4">
            <p>{{ stPublikasi ?? "Belum Ada Data" }}</p>
          </div>

          <div class="metadata-title">
            <h6>ID Pustaka</h6>
          </div>
          <div class="col-span-4">
            <p>{{ idPustaka ?? "Belum Ada Data" }}</p>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-6xl ma;
}

.cover-section {
  --at-apply: bg-white max-w-55 ma border-2 border-orange min-h-75 rounded
    text-center flex flex-col items-center justify-around;
}

table {
  --at-apply: text-center;
}

th {
  --at-apply: font-semibold bg-orange-3 border-1 border-orange px-5;
}

td {
  --at-apply: px-2 py-1 border-1 border-orange;
}

.auth-true {
  --at-apply: i-mdi-lock-open-check bg-green-6 w-5 h-5;
}

.auth-false {
  --at-apply: i-mdi-lock-alert bg-red-6 w-5 h-5;
}

.file-not-found {
  --at-apply: i-mdi-note-remove bg-gray w-5 h-5;
}

.metadata-title {
  --at-apply: w-full lg:w-25;
}
</style>
