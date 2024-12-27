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
const fileSurat = ref(null);
const uploadSurat = (event) => {
  fileSurat.value = event.target.files[0];
};

const jadwalKelasLiterasi = await getItems({
  collection: "pemeriksaan_turnitin",
  params: {
    fields: "*",
  },
});

const kirimPengajuan = async () => {
  const emailValidation = emailPattern.test(email.value);
  const formData = new FormData();
  formData.append("file", fileSurat.value);
  formData.append(
    "title",
    `${npm.value}-${namaLengkap.value}-pengajuan-turnitin`
  );
  formData.append("folder", "92F6EB4F-EEDD-47ED-8947-1CC524608793");
  await $directus.request($uploadFiles(formData)).then(async (res) => {
    let items = {
      npm: npm.value,
      nama_lengkap: namaLengkap.value,
      email: email.value,
      kontak: kontak.value,
      nama_fakultas: fakultas.value,
      nama_prodi: prodi.value,
      status_pengajuan: "pengajuan",
      berkas_pengajuan: res.id,
    };
    if (emailValidation) {
      try {
        await createItems({ collection: "peminjaman_ruangan", items });
        colorNotif.value = "text-green";
        notification.value = "Berhasil diajukan";
        npm.value = "";
        namaLengkap.value = "";
        email.value = data.value.user.email;
        kontak.value = "";
        fakultas.value = "";
        prodi.value = "";
        fileSurat.value = null;
        setTimeout(async () => {
          notification.value =
            "Silahkan isi seluruh form sesuai dengan data asli";
          colorNotif.value = "text-dark";
          await navigateTo({ path: "/pengajuan/peminjaman-ruangan/data" });
        }, 2000);
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
};
</script>

<template>
  <section>
    <h1 class="text-center">Pengajuan Pemeriksaan Turnitin</h1>
    <form @submit.prevent="kirimPengajuan" class="p-7 max-w-3xl ma">
      <div class="input-form">
        <label for="npm">NIP / NPM :</label>
        <input type="text" id="npm" v-model="npm" required />
      </div>
      <div class="input-form">
        <label for="nama-lengkap">Nama Lengkap :</label>
        <input type="text" id="nama-lengkap" v-model="namaLengkap" equired />
      </div>
      <div class="input-form">
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="email" disabled required />
      </div>
      <div class="input-form">
        <label for="fakultas">Nama Fakultas :</label>
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
        <label for="prodi">Nama Program Studi :</label>
        <input type="prodi" name="prodi" id="prodi" v-model="prodi" required />
      </div>
      <div class="input-form">
        <label for="kontak">No. HP / Whatsapp :</label>
        <input type="text" id="kontak" v-model="kontak" />
      </div>
      <div class="input-form">
        <label for="fileSurat">Berkas yang ingin diperiksa :</label>
        <input
          type="file"
          name="fileSurat"
          id="fileSurat"
          @change="uploadSurat"
          accept=".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          required
        />
        <p class="text-sm italic text-gray-4 text-center">
          Mohon diperhatikan untuk maksimum ukuran berkas adalah xx MB dan
          format yang dikirimkan harus dalam bentuk atau format dari standar
          Aplikasi Word Processor (.doc, .docx, .odf, atau .odt)
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
