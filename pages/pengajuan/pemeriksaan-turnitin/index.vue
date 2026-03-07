<script setup>
definePageMeta({
  middleware: ["authentication-check"],
});

const { data } = useAuth();
const { $directus, $uploadFiles } = useNuxtApp();
const { createItems, getItems } = useDirectusItems();
const dataFakultas = daftarNamaFakultasUnpad();

const notification = ref("Silahkan isi seluruh form sesuai dengan data asli");
const colorNotif = ref("text-dark");
const isSubmitting = ref(false);
const npm = ref("");
const namaLengkap = ref(data.value.user.name);
const email = ref(data.value.user.email);
const fakultas = ref("");
const prodi = ref("");
const kontak = ref("");
const judul = ref("");
const fileSurat = ref(null);
const submitStep = ref("idle"); // idle | uploading | saving | success | error

const uploadSurat = (event) => {
  const file = event.target.files[0];
  if (!file) { fileSurat.value = null; return; }
  const maxSize = 100 * 1024 * 1024; // 100 MB
  if (file.size > maxSize) {
    colorNotif.value = "text-red-7";
    notification.value = "Ukuran file melebihi 100 MB. Silahkan pilih file yang lebih kecil!";
    event.target.value = "";
    fileSurat.value = null;
    setTimeout(() => {
      notification.value = "Silahkan isi seluruh form sesuai dengan data asli";
      colorNotif.value = "text-dark";
    }, 8000);
    return;
  }
  fileSurat.value = file;
};

const fileSize = computed(() => {
  if (!fileSurat.value) return "";
  const bytes = fileSurat.value.size;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
});

const emailPattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

const kirimPengajuan = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  const emailValidation = emailPattern.test(email.value);
  // Validate file type
  if (fileSurat.value) {
    const allowedTypes = [
      "application/msword", // .doc
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "application/vnd.oasis.opendocument.text", // .odt
      "application/vnd.oasis.opendocument.formula", // .odf
    ];

    if (!allowedTypes.includes(fileSurat.value.type)) {
      colorNotif.value = "text-red-7";
      notification.value =
        "Format file tidak sesuai. Hanya file DOC, DOCX, ODT, atau ODF yang diperbolehkan. Silahkan pilih file yang sesuai!";
      setTimeout(() => {
        notification.value =
          "Silahkan isi seluruh form sesuai dengan data asli";
        colorNotif.value = "text-dark";
      }, 10000);
      isSubmitting.value = false;
      return;
    }
  }
  let formData = new FormData();
  formData.append("folder", "33D4C963-CF03-4883-A724-B93E0C1183D0");
  if (
    emailValidation &&
    npm.value !== "" &&
    namaLengkap.value !== "" &&
    kontak.value !== "" &&
    fakultas.value !== "" &&
    prodi.value !== "" &&
    judul.value !== "" &&
    fileSurat.value !== null
  ) {
    try {
      submitStep.value = "uploading";
      formData.append("file", fileSurat.value);
      const res = await $directus.request($uploadFiles(formData));
      submitStep.value = "saving";
      const items = {
        nomor: npm.value,
        nama_lengkap: namaLengkap.value,
        email: email.value,
        kontak: kontak.value,
        nama_fakultas: fakultas.value,
        nama_prodi: prodi.value,
        status_pengajuan: "pengajuan",
        judul_karya_tulis: judul.value,
        berkas_pengajuan: res.id,
      };
      await createItems({
        collection: "pengajuan_pemeriksaan_turnitin",
        items,
      });
      submitStep.value = "success";
      colorNotif.value = "text-green";
      notification.value = "Berhasil diajukan! Mengalihkan halaman...";
      npm.value = "";
      namaLengkap.value = "";
      email.value = data.value.user.email;
      kontak.value = "";
      fakultas.value = "";
      prodi.value = "";
      judul.value = "";
      fileSurat.value = null;
      setTimeout(async () => {
        notification.value =
          "Silahkan isi seluruh form sesuai dengan data asli";
        colorNotif.value = "text-dark";
        submitStep.value = "idle";
        await navigateTo({ path: "/keanggotaan" });
      }, 1500);
    } catch (error) {
      console.error(error);
      submitStep.value = "error";
      colorNotif.value = "text-red-7";
      notification.value = "Terjadi kesalahan, silahkan coba lagi";
      setTimeout(() => {
        notification.value =
          "Silahkan isi seluruh form sesuai dengan data asli";
        colorNotif.value = "text-dark";
        submitStep.value = "idle";
      }, 5000);
    } finally {
      isSubmitting.value = false;
    }
  } else {
    alert("Kolom ( * ) wajib diisi");
    colorNotif.value = "text-red-7";
    notification.value = "Kolom ( * ) wajib diisi";
    isSubmitting.value = false;
    setTimeout(async () => {
      notification.value = "Silahkan isi seluruh form sesuai dengan data asli";
      colorNotif.value = "text-dark";
    }, 5000);
  }
};
</script>

<template>
  <main class="min-h-screen bg-gray-50">

    <!-- Header Banner -->
    <div class="bg-gradient-to-br from-unpad to-kandaga">
      <div class="max-w-3xl ma px-4 py-8">
        <div class="flex items-center gap-3 mb-1">
          <div class="i-mdi-file-document-edit-outline w-7 h-7 text-white/80 shrink-0" />
          <h1 class="text-white text-xl sm:text-2xl font-700 m-0">
            Pengajuan Pemeriksaan Turnitin
          </h1>
        </div>
        <p class="text-white/70 text-sm mt-2">
          Tersedia untuk Mahasiswa, Dosen, dan Tenaga Pendidik Universitas Padjadjaran.
        </p>
        <NuxtLink
          to="/pengajuan"
          class="inline-flex items-center gap-1.5 mt-4 text-white/80 hover:text-white text-sm transition-colors-200"
        >
          <div class="i-mdi-arrow-left w-4 h-4" />
          Kembali ke Pengajuan
        </NuxtLink>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-3xl ma px-4 py-6 flex flex-col gap-4">

      <!-- Info panels -->
      <div class="section-card">
        <div class="section-card-header">
          <div class="i-mdi-information-outline w-5 h-5 text-unpad shrink-0" />
          <h2>Panduan & Informasi</h2>
        </div>
        <div class="p-5 sm:p-6 flex flex-col gap-3">

          <div class="info-box bg-orange-50 border-orange-2">
            <div class="i-mdi-file-word-outline w-4 h-4 shrink-0 text-orange-5 mt-0.5" />
            <div class="text-sm text-gray-7 flex flex-col gap-1">
              <p>
                Unggah berkas dalam format word processor
                (<span class="font-semibold">DOCX, DOC, ODT, atau ODF</span>).
                <span class="text-red-6 font-semibold">Tidak boleh dalam bentuk PDF.</span>
              </p>
              <p>
                Untuk meminimalisir angka similiaritas, tidak perlu melampirkan kata pengantar,
                daftar isi, daftar gambar, daftar tabel, lembar pengesahan, dan pernyataan.
              </p>
            </div>
          </div>

          <div class="info-box bg-blue-50 border-blue-2">
            <div class="i-mdi-book-open-variant w-4 h-4 shrink-0 text-blue-5 mt-0.5" />
            <p class="text-xs text-gray-6">
              Panduan pengutipan tersedia di
              <a
                href="https://penerbitdeepublish.com/wp-content/uploads/2017/01/Pedoman-Menulis-Buku-Tanpa-Plagiarisme-oleh-Penerbit-Deepublish.pdf"
                target="_blank"
                class="text-blue-6 font-semibold underline"
              >E-Book Pedoman Menulis Tanpa Plagiarisme</a>.
              Pastikan similarity &lt; 20%.
            </p>
          </div>

          <div class="info-box bg-gray-50 border-gray-2 flex-col items-start gap-2">
            <div class="flex items-center gap-2">
              <div class="i-mdi-list-box-outline w-4 h-4 shrink-0 text-gray-5" />
              <p class="text-xs font-semibold text-gray-7">Panduan Pemeriksaan Turnitin:</p>
            </div>
            <ol class="text-xs text-gray-6 list-decimal pl-5 flex flex-col gap-1">
              <li>Wajib melampirkan Cover dari karya tersebut</li>
              <li>Kata-kata yang diwarnai bersumber pada website yang ada pada bagian akhir report (sesuai warna dan nomornya)</li>
              <li>Kalimat yang diwarnai sebaiknya diganti dengan parafrase yang memiliki arti sama</li>
              <li>Pengutipan langsung sebaiknya menggunakan tanda "..." (penulis, tahun)</li>
              <li>Persentase sebaiknya di bawah 20%; bila lebih, perbaiki dan periksakan kembali</li>
              <li>Surat pernyataan, kata pengantar, dan daftar isi sebaiknya tidak disertakan</li>
            </ol>
          </div>

          <div class="info-box bg-gray-50 border-gray-2">
            <div class="i-mdi-phone-outline w-4 h-4 shrink-0 text-unpad mt-0.5" />
            <div class="text-sm flex flex-col gap-0.5">
              <p class="font-semibold text-gray-7">Ada kendala? Hubungi kami:</p>
              <p class="text-gray-6">No. HP: <a href="https://wa.me/6282315798979" class="text-unpad font-medium">082315798979</a></p>
              <p class="text-gray-6">E-mail: <a href="mailto:perpustakaan@unpad.ac.id" class="text-unpad font-medium">perpustakaan@unpad.ac.id</a></p>
            </div>
          </div>
        </div>
      </div>

      <!-- Form card -->
      <div class="section-card">
        <div class="section-card-header">
          <div class="i-mdi-form-textbox w-5 h-5 text-unpad shrink-0" />
          <h2>Data Pemohon & Berkas</h2>
          <p class="ml-auto text-xs text-gray-4">Kolom (<span class="text-red-6">*</span>) wajib diisi</p>
        </div>
        <form @submit.prevent="kirimPengajuan" class="p-5 sm:p-6">
          <fieldset :disabled="isSubmitting" class="form-fieldset">
            <div class="flex flex-col gap-4">

              <div class="input-group">
                <label for="npm">NIP / NPM <span class="text-red-6">*</span></label>
                <input type="text" id="npm" v-model="npm" required />
              </div>

              <div class="input-group">
                <label for="nama-lengkap">Nama Lengkap <span class="text-red-6">*</span></label>
                <input type="text" id="nama-lengkap" v-model="namaLengkap" required />
              </div>

              <div class="input-group">
                <label for="email">Email <span class="text-red-6">*</span></label>
                <input type="email" id="email" v-model="email" disabled required />
              </div>

              <div class="input-group">
                <label for="fakultas">Nama Fakultas <span class="text-red-6">*</span></label>
                <select id="fakultas" v-model="fakultas" required>
                  <option value="" selected disabled>Silahkan pilih Nama Fakultas</option>
                  <option
                    v-for="fak in dataFakultas.daftarFakultas"
                    :key="fak.singkatan"
                    :value="fak.singkatan"
                  >
                    {{ fak.namaFakultas }}
                  </option>
                </select>
              </div>

              <div class="input-group">
                <label for="prodi">Nama Program Studi <span class="text-red-6">*</span></label>
                <input type="text" id="prodi" v-model="prodi" required />
              </div>

              <div class="input-group">
                <label for="kontak">No. HP / Whatsapp <span class="text-red-6">*</span></label>
                <input type="text" id="kontak" v-model="kontak" required />
              </div>

              <div class="input-group">
                <label for="judul">Judul Karya Tulis <span class="text-red-6">*</span></label>
                <input type="text" id="judul" v-model="judul" required />
              </div>

              <!-- Divider -->
              <div class="border-t border-gray-1" />

              <div class="input-group">
                <label for="fileSurat">
                  Berkas yang Ingin Diperiksa <span class="text-red-6">*</span>
                </label>
                <input
                  type="file"
                  id="fileSurat"
                  @change="uploadSurat"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.oasis.opendocument.text,application/vnd.oasis.opendocument.formula"
                  required
                />
                <!-- File preview -->
                <div
                  v-if="fileSurat"
                  class="mt-2 flex items-center gap-2 text-sm text-gray-6 bg-gray-50 border border-gray-2 rounded-xl px-3 py-2"
                >
                  <div class="i-mdi-file-word-outline w-4 h-4 text-blue-5 shrink-0" />
                  <span class="flex-1 truncate font-medium text-gray-7">{{ fileSurat.name }}</span>
                  <span class="text-gray-4 whitespace-nowrap text-xs">{{ fileSize }}</span>
                </div>
                <p class="text-xs text-gray-4 italic mt-1">
                  Format: .doc, .docx, .odf, atau .odt — Maks. 100 MB. Tidak boleh PDF.
                </p>
              </div>

            </div>
          </fieldset>

          <!-- Notification -->
          <div
            class="info-box mt-4 transition-all-200"
            :class="colorNotif === 'text-red-7' ? 'bg-red-50 border-red-2' : colorNotif === 'text-green' ? 'bg-green-50 border-green-2' : 'bg-gray-50 border-gray-2'"
          >
            <div
              class="w-4 h-4 shrink-0 mt-0.5"
              :class="colorNotif === 'text-red-7' ? 'i-mdi-alert-outline text-red-5' : colorNotif === 'text-green' ? 'i-mdi-check-circle-outline text-green-6' : 'i-mdi-information-outline text-gray-4'"
            />
            <p class="text-sm" :class="colorNotif">{{ notification }}</p>
          </div>

          <button
            class="btn bg-orange text-white w-full py-2.5 font-600 text-base mt-4 transition-all-200"
            type="submit"
            :disabled="isSubmitting"
            :class="{ 'opacity-60 cursor-not-allowed': isSubmitting }"
          >
            <span v-if="submitStep === 'uploading'">⏳ Mengunggah berkas...</span>
            <span v-else-if="submitStep === 'saving'">💾 Menyimpan pengajuan...</span>
            <span v-else-if="submitStep === 'success'">✅ Berhasil diajukan!</span>
            <span v-else>Ajukan Pemeriksaan</span>
          </button>
        </form>
      </div>

    </div>
  </main>
</template>

<style scoped>
h1 {
  --at-apply: leading-tight;
}

.section-card {
  --at-apply: bg-white rounded-2xl shadow-sm border border-gray-2 overflow-hidden;
}

.section-card-header {
  --at-apply: flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-gray-1 bg-gray-50;
}

.section-card-header h2 {
  --at-apply: text-base font-700 text-gray-8 m-0;
}

.info-box {
  --at-apply: flex items-start gap-2.5 rounded-xl px-4 py-3 border;
}

.input-group {
  --at-apply: flex flex-col gap-1;
}

label {
  --at-apply: text-sm font-600 text-gray-7;
}

input,
select {
  --at-apply: w-full bg-white border border-gray-2 rounded-xl p-2.5 text-sm text-gray-8 transition-colors-200;
}

input:focus,
select:focus {
  --at-apply: border-unpad outline-none;
}

input:disabled {
  --at-apply: bg-gray-1 text-gray-4 cursor-not-allowed;
}

input[type="file"] {
  --at-apply: py-2 cursor-pointer;
}

.form-fieldset {
  border: none;
  padding: 0;
  margin: 0;
  min-width: 0;
}

.form-fieldset:disabled {
  opacity: 0.55;
  pointer-events: none;
  user-select: none;
}
</style>
