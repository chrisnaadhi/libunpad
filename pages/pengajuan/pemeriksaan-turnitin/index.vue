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
const npm = ref("");
const namaLengkap = ref(data.value.user.name);
const email = ref(data.value.user.email);
const fakultas = ref("");
const prodi = ref("");
const kontak = ref("");
const judul = ref("");
const fileSurat = ref(null);
const uploadSurat = (event) => {
  fileSurat.value = event.target.files[0];
};
const emailPattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

const kirimPengajuan = async () => {
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
    formData.append("file", fileSurat.value);
    await $directus.request($uploadFiles(formData)).then(async (res) => {
      let items = {
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
      if (emailValidation) {
        try {
          await createItems({
            collection: "pengajuan_pemeriksaan_turnitin",
            items,
          });
          colorNotif.value = "text-green";
          notification.value = "Berhasil diajukan";
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
            await navigateTo({ path: "/keanggotaan" });
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      } else {
        colorNotif.value = "text-red-7";
        notification.value = "Email tidak valid, silahkan coba lagi";
        setTimeout(async () => {
          notification.value =
            "Silahkan isi seluruh form sesuai dengan data asli";
          colorNotif.value = "text-dark";
        }, 5000);
      }
    });
  } else {
    alert("Kolom ( * ) wajib diisi");
    colorNotif.value = "text-red-7";
    notification.value = "Kolom ( * ) wajib diisi";
    setTimeout(async () => {
      notification.value = "Silahkan isi seluruh form sesuai dengan data asli";
      colorNotif.value = "text-dark";
    }, 5000);
  }
};
</script>

<template>
  <section>
    <div class="max-w-3xl ma text-center">
      <h1 class="text-center">Pengajuan Pemeriksaan Turnitin</h1>
      <p class="text-sm">
        Form pengajuan pemeriksaan turnitin yang bisa digunakan oleh seluruh
        Mahasiswa, Dosen maupun Tenaga Pendidik Universitas Padjadjaran.
        Silahkan unggah berkas yang ingin diperiksa dalam format word processor
        (DOCX, DOC, ODT atau ODF), <br />
        <span class="font-semibold text-red-6">
          tidak boleh dalam bentuk PDF</span
        >.
      </p>
      <p class="text-sm">
        <span class="font-semibold"
          >Untuk meminimalisir angka similiaritas</span
        >
        maka tidak perlu melampirkan kata pengantar, daftar isi, daftar gambar,
        daftar tabel, lembar pengesahan, dan pernyataan. Silahkan lampirkan saja
        Bab Pendahuluan hingga Daftar Pustaka
      </p>
      <p class="my-3">
        Kolom ( <span class="text-red-6">*</span> ) wajib diisi
      </p>
      <p class="text-sm">
        Ada kendala ? Silahkan hubungi penanggungjawab Turnitin Kami :
      </p>
      <div>
        <p>No. HP : <a href="https://wa.me/6282315798979">082315798979</a></p>
        <p>
          E-mail :
          <a href="mailto:perpustakaan@unpad.ac.id">perpustakaan@unpad.ac.id</a>
        </p>
      </div>
      <div class="my-5">
        <NuxtLink to="/pengajuan">
          <button class="btn py-0 bg-unpad text-white">
            &leftarrow; Kembali
          </button>
        </NuxtLink>
      </div>
    </div>

    <form @submit.prevent="kirimPengajuan" class="p-7 max-w-3xl ma">
      <div class="input-form">
        <label for="npm">NIP / NPM <span class="text-red-6">*</span> :</label>
        <input type="text" id="npm" v-model="npm" required />
      </div>
      <div class="input-form">
        <label for="nama-lengkap"
          >Nama Lengkap <span class="text-red-6">*</span> :</label
        >
        <input type="text" id="nama-lengkap" v-model="namaLengkap" equired />
      </div>
      <div class="input-form">
        <label for="email">Email <span class="text-red-6">*</span> :</label>
        <input type="email" id="email" v-model="email" disabled required />
      </div>
      <div class="input-form">
        <label for="fakultas"
          >Nama Fakultas <span class="text-red-6">*</span> :</label
        >
        <select
          name="fakultas"
          id="fakultas"
          v-model="fakultas"
          required
          class="overflow-y-scroll"
        >
          <option value="" selected disabled>
            Silahkan pilih Nama Fakultas
          </option>
          <option
            v-for="fakultas in dataFakultas.objFakultas"
            :value="fakultas.singkatan"
          >
            {{ fakultas.namaFakultas }}
          </option>
        </select>
      </div>
      <div class="input-form">
        <label for="prodi"
          >Nama Program Studi <span class="text-red-6">*</span> :</label
        >
        <input type="prodi" name="prodi" id="prodi" v-model="prodi" required />
      </div>
      <div class="input-form">
        <label for="kontak"
          >No. HP / Whatsapp <span class="text-red-6">*</span> :</label
        >
        <input type="text" id="kontak" v-model="kontak" />
      </div>
      <div class="input-form">
        <label for="judul"
          >Judul Karya Tulis <span class="text-red-6">*</span> :</label
        >
        <input type="text" id="judul" v-model="judul" required />
      </div>
      <div class="input-form">
        <label for="fileSurat"
          >Berkas yang ingin diperiksa
          <span class="text-red-6">*</span> :</label
        >
        <input
          type="file"
          name="fileSurat"
          id="fileSurat"
          @change="uploadSurat"
          accept=".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.oasis.opendocument.text, application/vnd.oasis.opendocument.formula"
          required
        />
        <p class="text-sm italic text-gray-4 text-center">
          Mohon diperhatikan untuk maksimum ukuran berkas adalah 100 MB dan
          format yang dikirimkan harus dalam bentuk atau format dari standar
          Aplikasi Word Processor (.doc, .docx, .odf, atau .odt), tidak boleh
          mengupload berkas dalam bentuk PDF.
        </p>
      </div>
      <div class="input-form">
        <div class="pb-4 text-center">
          <p class="text-sm" :class="colorNotif">
            {{ notification }}
          </p>
        </div>
        <button
          class="btn bg-orange text-white py-2 w-full"
          type="submit"
          @click.prevent="kirimPengajuan"
        >
          Ajukan Pemeriksaan
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma;
}

h1 {
  --at-apply: text-4xl my-5;
}

label {
  --at-apply: font-600;
}

.input-form {
  --at-apply: my-2;
}

input,
select {
  --at-apply: w-full border border-orange rounded p-2;
}
</style>
