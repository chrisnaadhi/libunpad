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
const namaLengkap = ref("");
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
  <main class="text-center my-5">
    <h1>Pengajuan Surat Bebas Pustaka</h1>
    <div v-if="isDup">
      <p class="text-red-5 font-semibold">
        Anda sudah mengajukan Surat Bebas Pustaka
      </p>
      <p>
        Untuk mengecek status persuratan anda, silahkan untuk mengakses di
        halaman keanggotaan yang dapat diakses melalui tautan berikut
      </p>
      <NuxtLink to="/keanggotaan"> Keanggotaan </NuxtLink>
    </div>
    <form v-else @submit.prevent="kirimPengajuan" class="container ma max-w-md px-5 text-left">
      <div class="input-form">
        <label for="npm">NPM :</label>
        <input type="text" name="npm" id="npm" v-model="npm" required />
      </div>
      <div class="input-form">
        <label for="nama">Nama Lengkap :</label>
        <input type="text" name="nama" id="nama" v-model="namaLengkap" required />
      </div>
      <div class="input-form">
        <label for="email">Email :</label>
        <input type="email" name="email" id="email" v-model="email" disabled required />
      </div>
      <div class="input-form">
        <label for="fakultas">Nama Fakultas</label>
        <select name="fakultas" id="fakultas" v-model="fakultas" required class="overflow-y-scroll">
          <option value="" selected disabled>
            Silahkan pilih Nama Fakultas
          </option>
          <option v-for="fakultas in dataFakultas.objFakultas" :value="fakultas.singkatan">
            {{ fakultas.namaFakultas }}
          </option>
        </select>
      </div>
      <div class="input-form">
        <label for="prodi">Nama Program Studi</label>
        <input type="prodi" name="prodi" id="prodi" v-model="prodi" required />
      </div>
      <div class="input-form">
        <label for="kontak">No. HP / Whatsapp :</label>
        <input type="text" name="kontak" id="kontak" v-model="kontak" required />
      </div>
      <div class="input-form">
        <label for="keperluan">Keperluan Pengajuan :</label>
        <select name="keperluan" v-model="keperluan" required>
          <option value="" selected disabled>
            Silahkan pilih keperluan pengajuan
          </option>
          <option value="sidang">Sidang</option>
          <option value="wisuda">Wisuda</option>
          <option value="ijazah">Pengambilan Ijazah</option>
          <option value="akademik">Keperluan Akademik lainnya</option>
        </select>
      </div>
      <div class="pb-4 text-center">
        <p class="text-sm" :class="textNotif">
          {{ notification }}
        </p>
      </div>

      <button type="submit" class="btn bg-orange text-white w-full">
        Kirim
      </button>
    </form>
    <div class="w-full my-10">
      <NuxtLink class="btn bg-orange text-white" to="/pengajuan">
        Kembali
      </NuxtLink>
    </div>
  </main>
</template>

<style scoped>
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
