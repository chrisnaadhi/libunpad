<script setup>
definePageMeta({
  middleware: ["authentication-check"],
});

const { data } = useAuth();

const { createItems } = useDirectusItems();

const npm = ref("");
const notification = ref("Silahkan isi seluruh form sesuai dengan data asli");
const textNotif = ref("text-dark");
const namaLengkap = ref("");
const email = ref(data.value.user.email);
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
    status_pengajuan: "pengajuan",
  };
  if (emailValidation) {
    try {
      await createItems({ collection: "peminjaman_ruangan", items });
      await navigateTo({ path: "/pengajuan" });
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
    <section>
      <h1>Form Peminjaman Ruangan</h1>
      <form
        @submit.prevent="kirimPengajuan"
        class="container ma max-w-md px-5 text-left"
      >
        <div class="input-form">
          <label for="email">Email :</label>
          <input
            type="email"
            name="email"
            id="email"
            v-model="email"
            required
            disabled
          />
        </div>
        <div class="input-form">
          <label for="npm">NPM / NIP :</label>
          <input type="text" name="npm" id="npm" :value="npm" required />
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
          <label for="tanggal">Tanggal Peminjaman</label>
          <input type="date" />
        </div>
        <div class="pb-4 text-center">
          <p class="text-sm" :class="textNotif">
            {{ notification }}
          </p>
        </div>

        <button type="submit" class="btn bg-orange text-white w-full">
          Ajukan
        </button>
      </form>
      <div class="w-full my-10">
        <NuxtLink class="btn bg-orange text-white" to="/pengajuan">
          Kembali
        </NuxtLink>
      </div>
    </section>
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

input:disabled {
  --at-apply: bg-gray-3;
}
</style>
