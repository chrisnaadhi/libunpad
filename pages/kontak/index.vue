<script setup>
const { createItems } = useDirectusItems();
const token = ref();

const namaLengkap = ref("");
const email = ref("");
const pesan = ref("");

const sendMessage = async () => {
  if (token.value) {
    await createItems({
      collection: "pesan_kontak_kandaga",
      items: [
        {
          nama_lengkap: namaLengkap.value,
          email: email.value,
          pesan: pesan.value,
        },
      ],
    });
    alert("Pesan Terkirim! Token: " + token.value);
  } else {
    alert("Token Harus Diisi!");
    return;
  }
};
</script>

<template>
  <section>
    <h2 class="text-center">Kontak Kami</h2>
    <div class="flex justify-between mb-10">
      <div class="w-full">
        <h3 class="text-center">Hubungi Kami</h3>
        <form @submit.prevent="sendMessage">
          <div class="input-block">
            <label for="nama">Nama Lengkap :</label>
            <input type="text" name="nama" id="nama" v-model="namaLengkap" />
          </div>
          <div class="input-block">
            <label for="email">E-mail :</label>
            <input type="email" name="email" id="" v-model="email" />
          </div>
          <div class="input-block">
            <label for="pesan">Pesan :</label>
            <textarea
              name="pesan"
              id="pesan"
              rows="10"
              v-model="pesan"
            ></textarea>
          </div>
          <div class="input-block">
            <NuxtTurnstile v-model="token" />
          </div>
          <button
            type="submit"
            class="btn w-full text-white"
            :disabled="!token"
          >
            Kirim
          </button>
        </form>
      </div>
      <div class="w-full">
        <h3 class="text-center">Media Sosial</h3>
        <div>
          <div>
            <div class="i-mdi-instagram w-12 h-12 text-fuchsia" />
            <div>
              <NuxtLink href="https://instagram.com/kandagaunpad">
                @kandagaunpad
              </NuxtLink>
            </div>
          </div>
          <div>
            <div class="i-mdi-twitter w-12 h-12 text-blue-6" />
            <div>
              <NuxtLink href="https://twitter.com/kandagaunpad">
                @kandagaunpad
              </NuxtLink>
            </div>
          </div>
          <div>
            <div class="i-mdi-email w-12 h-12 text-red" />
            <div>
              <NuxtLink href="mailto:pusat.pengetahuan@unpad.ac.id">
                pusat.pengetahuan@unpad.ac.id
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma py-10;
}

input,
textarea {
  --at-apply: border-1 border-orange rounded py-2 px-1;
}

p {
  --at-apply: italic;
}
</style>
