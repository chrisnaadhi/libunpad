<script setup>
definePageMeta({
  middleware: ["authentication-check"],
});
const { createItems } = useDirectusItems();

const npm = ref("");
const notification = ref("Silahkan isi seluruh form sesuai dengan data asli");
const textNotif = ref("text-dark");
const namaLengkap = ref("");
const email = ref("");
const kontak = ref("");
const namaRuangan = ref("");
const tanggalPeminjaman = ref("");
const jamMulai = ref("");
const jamSelesai = ref("");
const tujuanPeminjaman = ref("");
const emailPattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

const kirimPengajuan = async () => {
  const emailValidation = emailPattern.test(email.value);
  let items = {
    npm: npm.value,
    nama_lengkap: namaLengkap.value,
    email: email.value,
    kontak: kontak.value,
    nama_ruangan: namaRuangan.value,
    tanggal_peminjaman: tanggalPeminjaman.value,
    jam_mulai_peminjaman: jamMulai.value,
    jam_selesai_peminjaman: jamSelesai.value,
    tujuan_peminjaman: tujuanPeminjaman.value,
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
</script>

<template>
  <main class="text-center my-5">
    <h1>Pengajuan Surat Bebas Pustaka</h1>
    <form
      @submit.prevent="kirimPengajuan"
      class="container ma max-w-md px-5 text-left"
    >
      <div class="input-form">
        <label for="npm">NPM :</label>
        <input type="text" name="npm" id="npm" :value="npm" />
      </div>
      <div class="input-form">
        <label for="nama">Nama Lengkap :</label>
        <input
          type="text"
          name="nama"
          id="nama"
          v-model="namaLengkap"
          required
        />
      </div>
      <div class="input-form">
        <label for="email">Email :</label>
        <input type="email" name="email" id="email" v-model="email" required />
      </div>
      <div class="input-form">
        <label for="kontak">No. HP / Whatsapp / Kontak Lain :</label>
        <input
          type="text"
          name="kontak"
          id="kontak"
          v-model="kontak"
          required
        />
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
  --at-apply: w-full bg-white border border-orange rounded p-2;
}
</style>
