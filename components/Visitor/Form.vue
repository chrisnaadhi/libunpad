<script setup lang="ts">
const { getItemById, createItems } = useDirectusItems();

const userData = ref();
const institusi = ref();
const ruangan = ref("lobby");
const identity = ref();
const namaRuangan = computed(() => {
  if (!identity.value) {
    switch (ruangan.value) {
      case "lobby":
        return "Lobby Utama";
      case "r_sirkulasi":
        return "Ruang Sirkulasi";
      case "r_belajar":
        return "Ruang Belajar";
    }
  } else if (identity.value.nama_anggota) {
    return `Hello, ${identity.value.nama_anggota}`;
  } else {
    return `Hello, ${userData.value}`;
  }
});

const isNumeric = (value) => {
  return /^-?\d+$/.test(value);
};

const addVisitor = async () => {
  if (isNumeric(userData.value)) {
    const id_anggota = await getItemById({
      collection: "data_keanggotaan",
      id: userData.value,
    });
    identity.value = id_anggota;
  } else if (!isNumeric(userData.value)) {
    identity.value = null;
  } else {
    console.log("HMM ERROR!");
  }

  try {
    let items: Item = {
      biodata_user: identity.value
        ? identity.value.nama_anggota
        : userData.value,
      institusi: identity.value ? identity.value.nama_institusi : "Umum",
      nama_ruangan: ruangan.value,
      identitas_anggota: identity.value ? identity.value.npm : "Umum",
    };
    await createItems<Item>({ collection: "data_kunjungan", items });
    userData.value = "";
    institusi.value = "";
    ruangan.value = "lobby";
    setTimeout(() => {
      identity.value = null;
    }, 1000);
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <main class="background-block">
    <div class="heading-block">
      <img src="/images/lambang-unpad.png" alt="" class="w-16" />
      <h1 class="text-orange-6 font-700 text-xl md:text-5xl">
        Daftar Kunjungan
      </h1>
      <h3 class="text-dark font-700 py-2 text-sm sm:text-xl">
        Pusat Pengelolaan Pengetahuan Universitas Padjadjaran
      </h3>
    </div>
    <VisitorBanner :display="namaRuangan" />
    <form @submit.prevent="addVisitor" autocomplete="off">
      <div class="input-block">
        <label for="nomor">NPM / Nama Lengkap :</label>
        <input type="text" id="nomor" v-model="userData" autofocus min="5" />
      </div>

      <div class="input-block">
        <label for="lembaga">Nama Institusi :</label>
        <input type="text" id="lembaga" v-model="institusi" />
      </div>

      <div class="input-block">
        <label for="ruangan">Nama Ruangan :</label>
        <select name="ruangan" id="ruangan" v-model="ruangan">
          <option value="lobby" selected>Lobby Utama</option>
          <option value="r_belajar">Ruang Belajar</option>
          <option value="r_sirkulasi">Ruang Sirkulasi</option>
        </select>
        {{ ruangan }}
      </div>

      <button
        type="submit"
        class="btn text-white bg-orange w-full py-3"
        :disabled="!userData"
        :class="!userData ? 'cursor-not-allowed' : 'cursor-pointer'"
      >
        Masuk
      </button>
    </form>
  </main>
</template>

<style scoped>
.background-block {
  background-image: url("/images/background-image-visitor.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  --at-apply: h-3xl flex pt-5 flex-col items-center min w-full;
}

label {
  --at-apply: font-600 pb-2 text-base md:text-xl;
}

.heading-block {
  --at-apply: flex flex-col items-center;
}

form {
  --at-apply: bg-white px-10 pb-10 mt-10 rounded-xl;
}

input {
  --at-apply: border border-orange rounded px-2 py-3;
}

.input-block {
  --at-apply: flex flex-col my-5 w-full sm:w-md md:w-xl;
}
</style>
