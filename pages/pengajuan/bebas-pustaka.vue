<script setup>
const { createItems } = useDirectusItems();

const npm = ref("210210160084");
const namaLengkap = ref("");
const email = ref("");
const kontak = ref("");
const keperluan = ref("");

const kirimPengajuan = async () => {
  let items = {
    npm: npm.value,
    nama_lengkap: namaLengkap.value,
    email: email.value,
    kontak: kontak.value,
    keperluan: keperluan.value,
    status_pengajuan: "pengajuan",
  };
  try {
    await createItems({ collection: "pengajuan_surat_bebas_pustaka", items });
    await navigateTo({ path: "/pengajuan" });
  } catch (error) {
    console.log(error);
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
        <input
          type="text"
          name="npm"
          id="npm"
          disabled
          :value="npm"
          class="cursor-not-allowed text-gray"
        />
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
      <!-- <div class="input-form">
        <label for="ktm">File KTM :</label>
        <input
          type="file"
          name="ktm"
          accept=".jpg, .jpeg, .png, .pdf"
          required
          ref="ktm"
        />
        <p class="text-xs">File KTM berupa JPG, PNG atau PDF.</p>
      </div> -->

      <button type="submit" class="btn bg-orange text-white w-full">
        Kirim
      </button>
    </form>
    <div class="w-full my-10">
      <NuxtLink class="btn bg-orange text-white">Kembali</NuxtLink>
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
