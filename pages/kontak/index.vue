<script setup>
const { createItems } = useDirectusItems();
const token = ref();

const namaLengkap = ref(null);
const isLoad = ref(false);
const email = ref(null);
const pesan = ref(null);

const sendMessage = async () => {
  if (token.value) {
    if (namaLengkap && email && pesan) {
      isLoad.value = true;
      await createItems({
        collection: "pesan_kontak_kandaga",
        items: [
          {
            nama_lengkap: namaLengkap.value,
            email: email.value,
            pesan: pesan.value,
          },
        ],
      }).then(() => {
        alert("Pesan Terkirim!");
        namaLengkap.value = null;
        email.value = null;
        pesan.value = null;
        isLoad.value = false;
      });
    } else {
      alert("Form Harus Diisi!");
      return;
    }
  } else {
    alert("Token Harus Diisi!");
    return;
  }
};
</script>

<template>
  <section>
    <h2 class="text-center">Kontak Kami</h2>
    <div
      class="flex flex-col flex-col-reverse lg:flex-row gap-20 justify-between mb-10 px-5"
    >
      <div class="w-full">
        <h3 class="text-center">Hubungi Kami</h3>
        <form @submit.prevent="sendMessage">
          <div class="input-block">
            <label for="nama">Nama Lengkap :</label>
            <input
              type="text"
              name="nama"
              id="nama"
              v-model="namaLengkap"
              required
            />
          </div>
          <div class="input-block">
            <label for="email">E-mail :</label>
            <input type="email" name="email" id="" v-model="email" required />
          </div>
          <div class="input-block">
            <label for="pesan">Pesan :</label>
            <textarea
              name="pesan"
              id="pesan"
              rows="10"
              v-model="pesan"
              required
            ></textarea>
          </div>
          <div class="input-block">
            <ClientOnly>
              <NuxtTurnstile v-model="token" />
            </ClientOnly>
          </div>
          <button
            type="submit"
            class="btn w-full text-white"
            :disabled="!token"
          >
            <span v-if="isLoad"> Sedang mengirim... </span>
            <span v-else> Kirim Pesan </span>
          </button>
        </form>
      </div>
      <div class="w-full">
        <h3 class="text-center mb-5">Media Sosial</h3>
        <div class="flex flex-col items-center justify-center gap-5">
          <div class="flex flex-col items-center">
            <div class="i-mdi-instagram w-12 h-12 text-fuchsia" />
            <div>
              <NuxtLink
                href="https://instagram.com/kandagaunpad"
                target="_blank"
              >
                <span class="text-2xl"> @kandagaunpad </span>
              </NuxtLink>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <div class="i-mdi-twitter w-12 h-12 text-sky-6" />
            <div>
              <NuxtLink href="https://twitter.com/kandagaunpad" target="_blank">
                <span class="text-2xl"> @kandagaunpad </span>
              </NuxtLink>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <div class="i-mdi-email w-12 h-12 text-red" />
            <div>
              <NuxtLink href="mailto:perpustakaan@unpad.ac.id" target="_blank">
                <span class="text-2xl"> perpustakaan@unpad.ac.id </span>
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
</style>
