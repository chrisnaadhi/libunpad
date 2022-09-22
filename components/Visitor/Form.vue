<script setup lang="ts">
const { getItemById, createItems } = useDirectusItems();
const router: any = useRouter();

const ruangan = useCookie("namaRuanganVisitor");
const userData = ref();
const identitas = ref();
const institusi = ref();
const validated = ref(false);
const umum = ref(false);
const identity: any = ref({});
const welcome = ref();
const showModal = ref(false);
const isNumeric = (value: any) => {
  return /^-?\d+$/.test(value);
};

const displayRuangan = computed(() => {
  switch (ruangan.value) {
    case "lobby":
      return "Lobby Utama";
    case "r_sirkulasi":
      return "Ruang Sirkulasi";
    case "r_belajar":
      return "Ruang Belajar";
    case "r_bni":
      return "BNI Coworking Space";
    case "r_multimedia":
      return "Ruang Multimedia";
    case "r_populer":
      return "Ruang Populer";
    case "r_berkala":
      return "Ruang Berkala";
  }
});

const displayBanner = computed(() => {
  if (Object.keys(identity.value).length === 0) {
    return displayRuangan.value;
  } else if (institusi.value) {
    return `Selamat Datang, ${userData.value}`;
  } else if (identity.value.nama_anggota && !institusi.value) {
    welcome.value = `Selamat Datang, ${identity.value.nama_anggota}`;
    return welcome.value;
  } else {
    return `Anda belum mengaktifkan keanggotaan!`;
  }
});

const displayModal = () => {
  showModal.value = !showModal.value;
};

const addVisitor = async () => {
  try {
    try {
      if (isNumeric(userData.value)) {
        const id_anggota = await getItemById({
          collection: "data_keanggotaan",
          id: userData.value,
        });
        identity.value = id_anggota;
        validated.value = true;
      } else {
        umum.value = true;
      }
    } catch (error) {
      console.log(error);
      displayModal();
      setTimeout(() => {
        identity.value = {};
        userData.value = "";
        showModal.value = false;
      }, 1000);
    }

    let items: Item = {
      biodata_user: validated.value
        ? identity.value.nama_anggota
        : userData.value,
      institusi: validated.value
        ? identity.value.nama_institusi
        : institusi.value,
      nama_ruangan: ruangan.value,
      identitas_anggota: validated.value
        ? identity.value.npm
        : isNumeric(userData.value)
        ? 54321
        : 12345,
    };
    await createItems<Item>({ collection: "data_kunjungan", items });
    validated.value = false;
    setTimeout(() => {
      identity.value = {};
      userData.value = "";
      institusi.value = "";
      showModal.value = false;
      umum.value = false;
      identitas.value.focus();
    }, 1000);
  } catch (e) {
    console.log(e);
  }
};

const backToIndex = () => {
  ruangan.value = undefined;
  router.go(router.currentRoute);
};
</script>

<template>
  <main class="min-w-full h-screen md:h-xl">
    <VisitorModal @display="displayModal" v-if="showModal" />
    <div class="absolute w-full left-0 mt--25">
      <VisitorBanner :display="displayBanner" v-if="!umum" />
      <VisitorBanner :display="`Selamat Datang, ${userData}`" v-else />
    </div>
    <form @submit.prevent="addVisitor" autocomplete="off">
      <div class="input-block">
        <label for="nomor">NPM / NIP / Nama Lengkap :</label>
        <input
          type="text"
          id="nomor"
          v-model="userData"
          autofocus
          min="5"
          ref="identitas"
        />
      </div>

      <div class="input-block">
        <label for="lembaga">Nama Institusi :</label>
        <input type="text" id="lembaga" v-model="institusi" />
      </div>

      <button
        type="submit"
        class="btn text-white w-full py-3"
        :disabled="!userData"
        :class="
          !userData ? 'cursor-not-allowed bg-gray' : 'cursor-pointer bg-orange'
        "
      >
        Masuk
      </button>
    </form>
    <div class="absolute right-0 bottom-0">
      <button class="btn bg-orange" @click="backToIndex">Reset Ruangan</button>
    </div>
  </main>
</template>

<style scoped>
label {
  --at-apply: font-600 pb-2 text-base md:text-xl;
}

form {
  --at-apply: ma mt-25 mb-10 max-w-2xl bg-white px-10 pt-2 pb-10 rounded-xl;
}

input {
  --at-apply: border border-orange rounded px-2 py-3;
}

.input-block {
  --at-apply: flex flex-col my-5 w-full sm:w-md md:w-xl;
}
</style>
