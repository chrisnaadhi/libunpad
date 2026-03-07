<script setup>
definePageMeta({
  middleware: ["authentication-check"],
});
const { createItems, getItems } = useDirectusItems();
const dataFakultas = daftarNamaFakultasUnpad();
const { data } = useAuth();

const npm = ref("");
const notification = ref("Silahkan isi seluruh form sesuai dengan data asli");
const textNotif = ref("text-dark");
const namaLengkap = ref(data.value.user.name);
const email = ref(data.value.user.email);
const fakultas = ref("");
const prodi = ref("");
const kontak = ref("");
const keperluan = ref("");
const emailPattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

const checkDuplicateSubmission = async () => {
  const isDuplicated = ref(false);
  const getData = await getItems({
    collection: "pengajuan_surat_bebas_pustaka",
    params: {
      filter: {
        email: data.value.user.email,
      },
    },
  });

  if (getData.length > 0) {
    isDuplicated.value = true;
  } else {
    isDuplicated.value = false;
  }

  return isDuplicated;
};

const kirimPengajuan = async () => {
  const emailValidation = emailPattern.test(email.value);
  let items = {
    npm: npm.value,
    nama_lengkap: namaLengkap.value,
    email: email.value,
    kontak: kontak.value,
    keperluan: keperluan.value,
    nama_fakultas: fakultas.value,
    nama_prodi: prodi.value,
    status_pengajuan: "pengajuan",
  };
  if (emailValidation) {
    try {
      await createItems({ collection: "pengajuan_surat_bebas_pustaka", items });
      await navigateTo({ path: "/pengajuan/bebas-pustaka/data" });
    } catch (error) {
      console.log(error);
    }
  } else {
    textNotif.value = "text-red-7";
    notification.value = "Email tidak valid, silahkan coba lagi";
    setTimeout(async () => {
      notification.value = "Silahkan isi seluruh form sesuai dengan data asli";
      textNotif.value = "text-dark";
    }, 5000);
  }
};

const isDup = await checkDuplicateSubmission();
</script>

<template>
  <main class="min-h-screen bg-gray-50">

    <!-- Header Banner -->
    <div class="bg-gradient-to-br from-unpad to-kandaga">
      <div class="max-w-3xl ma px-4 py-8">
        <div class="flex items-center gap-3 mb-1">
          <div class="i-mdi-certificate-outline w-7 h-7 text-white/80 shrink-0" />
          <h1 class="text-white text-xl sm:text-2xl font-700 m-0">
            Pengajuan Surat Bebas Pustaka
          </h1>
        </div>
        <p class="text-white/70 text-sm mt-2">
          Isi formulir di bawah untuk mengajukan surat bebas pustaka.
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

      <!-- Already submitted state -->
      <div v-if="isDup" class="section-card">
        <div class="section-card-header">
          <div class="i-mdi-alert-circle-outline w-5 h-5 text-red-5 shrink-0" />
          <h2>Pengajuan Sudah Ada</h2>
        </div>
        <div class="p-5 sm:p-6 flex flex-col gap-4">
          <div class="info-box bg-red-50 border-red-2">
            <div class="i-mdi-close-circle-outline w-4 h-4 shrink-0 text-red-5 mt-0.5" />
            <p class="text-sm text-red-7 font-medium">
              Anda sudah mengajukan Surat Bebas Pustaka.
            </p>
          </div>
          <p class="text-sm text-gray-6">
            Untuk mengecek status persuratan anda, silahkan akses halaman keanggotaan.
          </p>
          <NuxtLink
            to="/keanggotaan"
            class="btn bg-unpad text-white self-start py-2 px-5 inline-flex items-center gap-2 text-sm"
          >
            <div class="i-mdi-account-circle-outline w-4 h-4" />
            Lihat di Keanggotaan
          </NuxtLink>
        </div>
      </div>

      <!-- Form card -->
      <div v-else class="section-card">
        <div class="section-card-header">
          <div class="i-mdi-form-textbox w-5 h-5 text-unpad shrink-0" />
          <h2>Data Diri Pemohon</h2>
        </div>
        <form @submit.prevent="kirimPengajuan" class="p-5 sm:p-6 flex flex-col gap-4">

          <div class="input-group">
            <label for="npm">NPM <span class="text-red-6">*</span></label>
            <input type="text" id="npm" v-model="npm" required />
          </div>

          <div class="input-group">
            <label for="nama">Nama Lengkap <span class="text-red-6">*</span></label>
            <input type="text" id="nama" v-model="namaLengkap" required />
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
            <label for="keperluan">Keperluan Pengajuan <span class="text-red-6">*</span></label>
            <select id="keperluan" v-model="keperluan" required>
              <option value="" selected disabled>Silahkan pilih keperluan pengajuan</option>
              <option value="sidang">Sidang</option>
              <option value="wisuda">Wisuda</option>
              <option value="ijazah">Pengambilan Ijazah</option>
              <option value="akademik">Keperluan Akademik lainnya</option>
            </select>
          </div>

          <!-- Notification -->
          <div
            class="info-box transition-all-200"
            :class="textNotif === 'text-red-7' ? 'bg-red-50 border-red-2' : 'bg-gray-50 border-gray-2'"
          >
            <div
              class="w-4 h-4 shrink-0 mt-0.5"
              :class="textNotif === 'text-red-7' ? 'i-mdi-alert-outline text-red-5' : 'i-mdi-information-outline text-gray-4'"
            />
            <p class="text-sm" :class="textNotif">{{ notification }}</p>
          </div>

          <button type="submit" class="btn bg-orange text-white w-full py-2.5 font-600 text-base">
            Kirim Pengajuan
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
</style>
