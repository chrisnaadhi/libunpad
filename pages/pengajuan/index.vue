<script setup>
const dataUser = ref();
const ruangan = ref();
const npm = ref();

const fetchUserData = async () => {
  const { data, pending, error, refresh } = await useFetch(
    `http://siat.unpad.ac.id/index.php/akademik/datamhs/mahasiswa/getbio/${npm.value}`,
    {
      mode: "no-cors",
    }
  );
  dataUser.value = data.value;
};
const isVerified = ref(false);
</script>

<template>
  <main>
    <section class="my-10 text-center">
      <h1 class="font-600 text-2xl">Administrasi dan Pengajuan</h1>
      {{
        fetchUserData === null ? "Tidak ada data untuk ditampilkan" : dataUser
      }}
      <div class="flex flex-col items-center">
        <input type="text" name="nama" autocomplete="off" v-model="npm" />
        <input
          type="text"
          name="ruangan"
          autocomplete="off"
          v-model="ruangan"
        />
        <input type="checkbox" name="verified" v-model="isVerified" />
        <button @click="fetchUserData()">Submit</button>
      </div>
    </section>
    <FooterSection />
  </main>
</template>

<style scoped>
input {
  --at-apply: border border-black rounded my-1;
}
button {
  --at-apply: bg-blue rounded py-2 px-4;
}
</style>
