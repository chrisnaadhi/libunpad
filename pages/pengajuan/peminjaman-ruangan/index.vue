<script setup>
definePageMeta({
  middleware: ["authentication-check"],
});

const { data } = useAuth();
const { $directus, $uploadFiles } = useNuxtApp();
const { createItems, getItems } = useDirectusItems();

const date = new Date();
const lastDay = getTotalDays(date.getMonth(), date.getFullYear());
const firstDate = `${date.getFullYear()}-${date.getMonth() + 1}-01`;
const lastDate = `${date.getFullYear()}-${date.getMonth() + 1}-${lastDay}`;

const npm = ref("");
const notification = ref("Silahkan isi seluruh form sesuai dengan data asli");
const isUploading = ref(false);
const textNotif = ref("text-dark");
const namaLengkap = ref("");
const email = ref(data.value.user.email);
const kontak = ref("");
const namaRuangan = ref("");
const judulKegiatan = ref("");
const unitPengajuan = ref("");
const tanggalPeminjaman = ref("");
const jamMulai = ref("");
const jamSelesai = ref("");
const tujuanPeminjaman = ref("");
const fileSurat = ref(null);
const uploadSurat = (event) => {
  fileSurat.value = event.target.files[0];
};
const emailPattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

const monthName = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
  date
);

// const dataPeminjaman = await getItems({
//   collection: "peminjaman_ruangan",
//   params: {
//     filter: {
//       tanggal_peminjaman: {
//         _between: [firstDate, lastDate],
//       },
//     },
//   },
// });

// const checkExistingPeminjaman = (tanggal, jamMulai) => {
//   let isExist = false;

//   dataPeminjaman.forEach((item) => {
//     const isTimeInRange = () => {
//       const [startHours, startMinutes, startSeconds] = item.jam_mulai_peminjaman
//         .split(":")
//         .map(Number);
//       const [endHours, endMinutes, endSeconds] = item.jam_selesai_peminjaman
//         .split(":")
//         .map(Number);
//       const [checkHours, checkMinutes, checkSeconds] = jamMulai
//         .split(":")
//         .map(Number);

//       const startTime = new Date();
//       startTime.setHours(startHours, startMinutes, startSeconds);

//       const endTime = new Date();
//       endTime.setHours(endHours, endMinutes, endSeconds);

//       const checkTime = new Date();
//       checkTime.setHours(checkHours, checkMinutes, checkSeconds);

//       return checkTime >= startTime && checkTime <= endTime;
//     };

//     if (item.tanggal_peminjaman === tanggal && isTimeInRange()) {
//       isExist = true;
//     }
//   });
//   return isExist;
// };

const isDatePast = (date) => {
  const today = new Date();
  // Set the time to the start of the day (midnight) for today
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const [year, month, day] = date.split("-").map(Number);
  const checkDate = new Date(year, month - 1, day);
  return checkDate < today;
};

const kirimPengajuan = async () => {
  const emailValidation = emailPattern.test(email.value);
  const formData = new FormData();
  formData.append("folder", "AD0865F0-F6A3-4F62-8551-FE52625C7308");
  // const roomExist = checkExistingPeminjaman(
  //   tanggalPeminjaman.value,
  //   jamMulai.value + ":00"
  // );

  isUploading.value = true;
  if (
    namaLengkap.value === "" ||
    unitPengajuan.value === "" ||
    npm.value === "" ||
    kontak.value === "" ||
    namaRuangan.value === "" ||
    judulKegiatan.value === "" ||
    tanggalPeminjaman.value === "" ||
    jamMulai.value === "" ||
    jamSelesai.value === ""
  ) {
    alert("Mohon diisi kolom yang bertanda bintang merah!");
  } else if (isDatePast(tanggalPeminjaman.value)) {
    isUploading.value = false;
    alert("Tanggal peminjaman tidak boleh tanggal sebelum hari ini!");
  } else if (fileSurat.value === null) {
    isUploading.value = false;
    alert("Mohon unggah surat pengajuan!");
  } else if (fileSurat.value !== null) {
    formData.append("file", fileSurat.value);
    notification.value = "Sedang mengunggah berkas... Mohon tunggu sebentar";
    await $directus.request($uploadFiles(formData)).then(async (res) => {
      let items = {
        nomor_induk: npm.value,
        nama_lengkap: namaLengkap.value,
        unit_pengajuan: unitPengajuan.value,
        email: email.value,
        kontak: kontak.value,
        nama_ruangan: namaRuangan.value,
        judul_kegiatan: judulKegiatan.value,
        tanggal_peminjaman: tanggalPeminjaman.value,
        jam_mulai_peminjaman: jamMulai.value,
        jam_selesai_peminjaman: jamSelesai.value,
        keterangan: tujuanPeminjaman.value,
        status_peminjaman: "pending",
        file_surat: res.id,
      };
      if (emailValidation) {
        try {
          await createItems({ collection: "peminjaman_ruangan", items });
          textNotif.value = "text-green";
          notification.value = "Berhasil diajukan";
          namaLengkap.value = ref("");
          unitPengajuan.value = "";
          email.value = data.value.user.email;
          kontak.value = "";
          namaRuangan.value = "";
          tanggalPeminjaman.value = "";
          jamMulai.value = "";
          jamSelesai.value = "";
          tujuanPeminjaman.value = "";
          fileSurat.value = null;
          alert("Berhasil diajukan");
          setTimeout(async () => {
            notification.value =
              "Silahkan isi seluruh form sesuai dengan data asli";
            textNotif.value = "text-dark";
            isUploading.value = false;
            await navigateTo({ path: "/pengajuan/peminjaman-ruangan/data" });
          }, 2000);
        } catch (error) {
          isUploading.value = false;
          console.log(error);
        }
      } else {
        textNotif.value = "text-red-7";
        notification.value = "Email tidak valid, silahkan coba lagi";
        setTimeout(async () => {
          notification.value =
            "Silahkan isi seluruh form sesuai dengan data asli";
          textNotif.value = "text-dark";
          isUploading.value = false;
        }, 5000);
      }
    });
  } else {
    alert("Error! Hubungi admin.");
    isUploading.value = false;
    console.log(fileSurat.value);
  }
};
</script>

<template>
  <main class="min-h-screen bg-gray-50">

    <!-- Header Banner -->
    <div class="bg-gradient-to-br from-unpad to-kandaga">
      <div class="max-w-3xl ma px-4 py-8">
        <div class="flex items-center gap-3 mb-1">
          <div class="i-mdi-office-building-outline w-7 h-7 text-white/80 shrink-0" />
          <h1 class="text-white text-xl sm:text-2xl font-700 m-0">
            Form Peminjaman Ruangan
          </h1>
        </div>
        <p class="text-white/70 text-sm mt-2">
          Isi formulir di bawah untuk mengajukan peminjaman ruangan Kandaga Unpad.
          Kolom bertanda <span class="text-white font-semibold">*</span> wajib diisi.
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

      <!-- Warning notice for Ruang Kelas Lt. 2 -->
      <div class="info-box bg-red-50 border-red-2">
        <div class="i-mdi-warning-decagram w-5 h-5 shrink-0 text-red-5 mt-0.5" />
        <div class="flex flex-col gap-1.5 text-sm text-red-8">
          <p class="font-semibold">Perhatian — Ruang Kelas Lantai 2</p>
          <p>
            Selama masa aktif perkuliahan, Ruang Kelas Lt. 2 digunakan sebagai ruang
            perkuliahan oleh beberapa Fakultas. Mohon konfirmasi terlebih dahulu
            kepada Administrasi Ruangan Kandaga sebelum mengisi form.
          </p>
          <p>
            Ana Sobana:
            <a href="tel:081220392155" class="font-semibold text-red-7 underline">+62 812-2039-2155</a>
          </p>
        </div>
      </div>

      <!-- Form card -->
      <div class="section-card">
        <div class="section-card-header">
          <div class="i-mdi-account-details-outline w-5 h-5 text-unpad shrink-0" />
          <h2>Data Pemohon</h2>
        </div>
        <form @submit.prevent="kirimPengajuan" class="p-5 sm:p-6 flex flex-col gap-4">

          <div class="input-group">
            <label for="email">Email <span class="text-red-6">*</span></label>
            <input type="email" id="email" v-model="email" disabled required />
          </div>

          <div class="input-group">
            <label for="npm">NPM / NIP <span class="text-red-6">*</span></label>
            <input type="text" id="npm" v-model="npm" required />
          </div>

          <div class="input-group">
            <label for="nama">Nama Lengkap <span class="text-red-6">*</span></label>
            <input type="text" id="nama" v-model="namaLengkap" required />
          </div>

          <div class="input-group">
            <label for="kontak">No. HP / Whatsapp / Kontak Lain <span class="text-red-6">*</span></label>
            <input type="text" id="kontak" v-model="kontak" required />
          </div>

          <div class="input-group">
            <label for="unitpengajuan">Unit Asal Pengajuan <span class="text-red-6">*</span></label>
            <input type="text" id="unitpengajuan" v-model="unitPengajuan" required />
          </div>

          <!-- Divider -->
          <div class="border-t border-gray-1 my-1" />

          <div class="input-group">
            <label for="namaruangan">Ruangan yang Ingin Dipinjam <span class="text-red-6">*</span></label>
            <select id="namaruangan" v-model="namaRuangan" required>
              <option value="" disabled>Pilih ruangan...</option>
              <option value="ruang_the_gade">Ruang Pegadaian Lt. 1</option>
              <option value="plaza_kandaga">Plaza Kandaga Lt. 1</option>
              <option value="ruang_kelas_2">Ruang Kelas Lt. 2</option>
              <option value="ruang_hybrid">Ruang Kelas Hybrid Lt. 4</option>
              <option value="ruang_alh">Ruang Assistive Learning Lt. 4</option>
              <option value="ruang_teater">Teater Pengetahuan Rektorat</option>
            </select>
          </div>

          <div class="input-group">
            <label for="judulkegiatan">Judul Kegiatan <span class="text-red-6">*</span></label>
            <input type="text" id="judulkegiatan" v-model="judulKegiatan" required />
          </div>

          <div class="input-group">
            <label for="tanggal">Tanggal Peminjaman <span class="text-red-6">*</span></label>
            <input type="date" id="tanggal" v-model="tanggalPeminjaman" required />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="input-group">
              <label for="jamMulai">Jam Mulai <span class="text-red-6">*</span></label>
              <input type="time" id="jamMulai" v-model="jamMulai" required />
            </div>
            <div class="input-group">
              <label for="jamSelesai">Jam Selesai <span class="text-red-6">*</span></label>
              <input type="time" id="jamSelesai" v-model="jamSelesai" required />
            </div>
          </div>

          <div class="input-group">
            <label for="tujuanpeminjaman">Tujuan Peminjaman</label>
            <textarea
              id="tujuanpeminjaman"
              rows="4"
              v-model="tujuanPeminjaman"
            />
          </div>

          <div class="input-group">
            <label for="fileSurat">Surat Pengajuan (PDF) <span class="text-red-6">*</span></label>
            <input
              type="file"
              id="fileSurat"
              @change="uploadSurat"
              accept="application/pdf"
              required
            />
            <p class="text-xs text-gray-4 mt-1">Format: PDF</p>
          </div>

          <!-- Notification -->
          <div
            class="info-box transition-all-200"
            :class="textNotif === 'text-red-7' ? 'bg-red-50 border-red-2' : textNotif === 'text-green' ? 'bg-green-50 border-green-2' : 'bg-gray-50 border-gray-2'"
          >
            <div
              class="w-4 h-4 shrink-0 mt-0.5"
              :class="textNotif === 'text-red-7' ? 'i-mdi-alert-outline text-red-5' : textNotif === 'text-green' ? 'i-mdi-check-circle-outline text-green-6' : 'i-mdi-information-outline text-gray-4'"
            />
            <p class="text-sm" :class="textNotif">{{ notification }}</p>
          </div>

          <button
            type="submit"
            class="btn bg-orange text-white w-full py-2.5 font-600 text-base transition-all-200"
            :disabled="isUploading"
            :class="{ 'opacity-60 cursor-not-allowed': isUploading }"
          >
            <span v-if="isUploading">⏳ Mengunggah & Menyimpan...</span>
            <span v-else>Ajukan Peminjaman</span>
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
select,
textarea {
  --at-apply: w-full bg-white border border-gray-2 rounded-xl p-2.5 text-sm text-gray-8 transition-colors-200;
}

input:focus,
select:focus,
textarea:focus {
  --at-apply: border-unpad outline-none;
}

input:disabled {
  --at-apply: bg-gray-1 text-gray-4 cursor-not-allowed;
}

input[type="file"] {
  --at-apply: py-2 cursor-pointer;
}
</style>
