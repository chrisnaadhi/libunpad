<script setup lang="ts">
const { getItemById, createItems } = useDirectusItems();
const router: any = useRouter();
const route = useRoute();
console.log(route);

const ruangan = useCookie("namaRuanganVisitor");
const userData = useIdentitasForm();
const identitas = ref();
const institusi = ref("");
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
    case "r_referensi":
      return "Ruang Referensi Tesis Disertasi";
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
      displayModal();
      const audioError = new Audio("/sfx/error.wav");
      audioError.play();
      setTimeout(() => {
        identity.value = {};
        userData.value = "";
        showModal.value = false;
      }, 300);
    }

    let items: Item = {
      biodata_user: validated.value
        ? identity.value.nama_anggota
        : userData.value,
      institusi: validated.value
        ? identity.value.nama_institusi
        : isNumeric(userData.value)
        ? "Belum mendaftar Keanggotaan"
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
    }, 300);
  } catch (e) {
    console.log(e);
  }
};

const backToIndex = () => {
  ruangan.value = "";
  router.go(router.currentRoute);
};

const focusToIdentitas = () => {
  identitas.value.focus();
};

onMounted(() => {
  focusToIdentitas();
});
</script>

<template>
  <main class="min-w-full">
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
        <p class="text-sm italic text-gray-400">
          Apabila berasal dari luar Unpad, silahkan cantumkan nama dari
          institusinya juga. <br />
          Contoh : Chrisna Adhi Pranoto - Institut Pemerintahan Bandung
        </p>
      </div>

      <div class="input-block">
        <label for="lembaga">Institusi :</label>
        <select name="institusi" id="lembaga" v-model="institusi">
          <option value="" selected disabled>
            Pilih asal dari institusi anda
          </option>
          <option value="">Internal Universitas Padjadjaran</option>
          <option value="pt_lain">Perguruan Tinggi lain</option>
          <option value="badan">
            Institusi / Badan Pemerintahan / Kementerian
          </option>
          <option value="sekolah">Sekolah Umum (SD/SMP/SMA)</option>
          <option value="lainnya">
            Lainnya (Tulis Nama Institusi di sebelah nama lengkap)
          </option>
        </select>
      </div>

      <button
        class="btn text-white w-xl py-3"
        :disabled="!userData"
        :class="
          !userData ? 'cursor-not-allowed bg-gray' : 'cursor-pointer bg-orange'
        "
        @click.prevent="addVisitor"
      >
        Masuk
      </button>
    </form>
    <VisitorVirtualKeyboard
      v-on:choose="focusToIdentitas"
      v-on:writing="focusToIdentitas"
    />
    <div class="fixed right-0 bottom-0">
      <button class="btn bg-orange" @click="backToIndex">Reset Ruangan</button>
    </div>
  </main>
</template>

<style scoped>
label {
  --at-apply: font-600 pb-2 text-base md:text-md;
}

form {
  --at-apply: ma mt-25 max-w-2xl bg-white px-10 pt-2 pb-8 rounded-xl;
}

input, select {
  --at-apply: border border-orange rounded p-3 bg-white;
}

option {
  --at-apply: py-5;
}

.input-block {
  --at-apply: flex flex-col my-5 w-full sm:w-md md:w-xl;
}
</style>
