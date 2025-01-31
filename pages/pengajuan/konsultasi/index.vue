<script setup>
const val = ref("Form Pengajuan Konsultasi Akademik");

const npm = ref("");
const namaLengkap = ref("");
const email = ref("");

const sendPengajuanKonsultasi = () => {
  alert("Pengajuan Konsultasi Akademik Berhasil Diajukan");
};
</script>

<template>
  <section>
    <div>
      <form @submit.prevent="sendPengajuanKonsultasi">
        <div class="input-form">
          <label for="npm">NIP / NPM :</label>
          <input type="text" id="npm" v-model="npm" required />
        </div>
        <div class="input-form">
          <label for="nama-lengkap">Nama Lengkap :</label>
          <input type="text" id="nama-lengkap" v-model="namaLengkap" required />
        </div>
        <div class="input-form">
          <label for="email">Email :</label>
          <input type="email" id="email" v-model="email" disabled required />
        </div>
        <div>
          <button type="submit" class="btn bg-orange-5 text-white">
            Kirim Pengajuan
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
p {
  --at-apply: italic;
}
</style>
