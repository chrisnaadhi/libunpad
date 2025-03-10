<script setup lang="ts">
const { getItems, getItemById, createItems, updateItem } = useDirectusItems();

const ruangan = useCookie("namaRuanganVisitor");
const userData = useIdentitasForm();
const peminjamanLokerStore = prosesPeminjamanLoker();
const identitas = ref();
const institusi = ref("");
const validated = ref(false);
const umum = ref(false);
const identity: any = ref({});
const welcome = ref();
const showModal = ref(false);
const showPeminjamanLoker = ref(false);
const sudahMeminjamLoker = ref(false);
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
      return "Ruang Referensi Koleksi Berkala";
    case "r_alh":
      return "Ruang Assistive Learning Hub";
    case "r_langka":
      return "Ruang Koleksi Langka";
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
  focusToIdentitas();
};

const displayPeminjamanLoker = () => {
  showPeminjamanLoker.value = !showPeminjamanLoker.value;
  focusToIdentitas();
};

const tutupLokerModal = () => {
  peminjamanLokerStore.konfirmasiPeminjam = false;
  peminjamanLokerStore.nomorLoker = null;
  peminjamanLokerStore.namaPeminjam = "";
  peminjamanLokerStore.npmPeminjam = "";
  showPeminjamanLoker.value = false;
  identity.value = {};
  userData.value = "";
  institusi.value = "";
  showModal.value = false;
  umum.value = false;
  identitas.value.focus();
};

const getRequestLoker = async () => {
  const listLoker = await getItems({
    collection: "list_kesediaan_loker",
    params: {
      filter: {
        status_loker: {
          _eq: "dapat_dipinjam",
        },
      },
    },
  });

  if (listLoker.length > 0) {
    const getRandomLoker = () => {
      return listLoker[Math.floor(Math.random() * listLoker.length)];
    };
    const data = getRandomLoker();
    return data;
  } else {
    return false;
  }
};

const lokerData = async () => {
  const cekJikaSudahMeminjam = await getItems({
    collection: "list_kesediaan_loker",
    params: {
      filter: {
        _or: [
          {
            nama_peminjam: {
              _eq: userData.value,
            },
          },
          {
            npm_peminjam: {
              _eq: userData.value,
            },
          },
        ],
      },
    },
  });

  if (cekJikaSudahMeminjam.length === 0) {
    peminjamanLokerStore.konfirmasiPeminjam = true;
    const data: any = await getRequestLoker();
    if (data) {
      peminjamanLokerStore.nomorLoker = data.nomor_loker;
      peminjamanLokerStore.namaPeminjam =
        identity.value.nama_anggota ?? userData.value;
      peminjamanLokerStore.showLokerData = true;
      peminjamanLokerStore.npmPeminjam = identity.value.npm ?? userData.value;

      const directusLoker: Array<any> = await getItems({
        collection: "list_kesediaan_loker",
        params: {
          filter: {
            nomor_loker: {
              _eq: data.nomor_loker,
            },
          },
        },
      });

      await updateItem({
        collection: "list_kesediaan_loker",
        id: directusLoker[0].id,
        item: {
          status_loker: "sedang_dipinjam",
          npm_peminjam: peminjamanLokerStore.npmPeminjam,
          nama_peminjam: peminjamanLokerStore.namaPeminjam,
        },
      }).then(async () => {
        console.log("Berhasil update data loker");
        await createItems({
          collection: "list_peminjaman_loker",
          items: {
            nomor_loker: peminjamanLokerStore.nomorLoker,
            nama_peminjam: peminjamanLokerStore.namaPeminjam,
            nomor_induk: peminjamanLokerStore.npmPeminjam,
          },
        }).then(() => {
          const audioAjuanLoker = new Audio("/sfx/ajuan_loker_berhasil.mp3");
          audioAjuanLoker.play();

          identity.value = {};
          userData.value = "";
          institusi.value = "";
          showModal.value = false;
          umum.value = false;

          identitas.value.focus();
        });
      });

      setTimeout(() => {
        peminjamanLokerStore.konfirmasiPeminjam = false;
        peminjamanLokerStore.nomorLoker = null;
        peminjamanLokerStore.namaPeminjam = "";
        peminjamanLokerStore.npmPeminjam = "";
        showPeminjamanLoker.value = false;
        peminjamanLokerStore.showLokerData = false;
        identitas.value.focus();
      }, 20000);
    } else {
      identity.value = {};
      userData.value = "";
      institusi.value = "";
      showModal.value = false;
      umum.value = false;

      identitas.value.focus();
      peminjamanLokerStore.isFull = true;
      setTimeout(() => {
        peminjamanLokerStore.isFull = false;
        showPeminjamanLoker.value = false;
      }, 2000);
    }
  } else {
    const audioError = new Audio("/sfx/error.wav");
    audioError.play();
    identity.value = {};
    userData.value = "";
    institusi.value = "";
    showModal.value = false;
    umum.value = false;
    sudahMeminjamLoker.value = true;
    showPeminjamanLoker.value = false;
    setTimeout(() => {
      sudahMeminjamLoker.value = false;
    }, 1000);
  }
};

const addVisitor = async () => {
  try {
    peminjamanLokerStore.konfirmasiPeminjam = false;
    peminjamanLokerStore.nomorLoker = null;
    peminjamanLokerStore.namaPeminjam = userData.value;
    peminjamanLokerStore.showLokerData = false;
    peminjamanLokerStore.npmPeminjam = "";
    showPeminjamanLoker.value = false;
    try {
      if (isNumeric(userData.value)) {
        const id_anggota = await getItemById({
          collection: "data_keanggotaan",
          id: userData.value,
        });
        identity.value = await id_anggota;
        peminjamanLokerStore.namaPeminjam = identity.value.nama_anggota;
        validated.value = true;
      } else {
        umum.value = true;
      }
    } catch (error) {
      displayModal();
      const audioError = new Audio("/sfx/error.wav");
      audioError.play();
      // setTimeout(() => {
      //   identity.value = {};
      //   userData.value = "";
      //   showModal.value = false;
      // }, 300);
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

    await createItems<Item>({ collection: "data_kunjungan", items }).then(
      () => {
        if (ruangan.value === "lobby") {
          displayPeminjamanLoker();

          setTimeout(() => {
            identity.value = {};
            userData.value = "";
            institusi.value = "";
            showModal.value = false;
            umum.value = false;
            showPeminjamanLoker.value = false;
            sudahMeminjamLoker.value = false;
            identitas.value.focus();
          }, 20000);
        } else {
          setTimeout(() => {
            identity.value = {};
            userData.value = "";
            institusi.value = "";
            showModal.value = false;
            umum.value = false;
            sudahMeminjamLoker.value = false;
            identitas.value.focus();
          }, 300);
        }
        validated.value = false;
      }
    );
  } catch (e) {
    console.log(e);
  }
};

const backToIndex = async () => {
  ruangan.value = null;
  reloadNuxtApp();
};

const focusToIdentitas = () => {
  identitas.value.focus();
};

onMounted(async () => {
  focusToIdentitas();
});
</script>

<template>
  <main class="max-w-full ma">
    <VisitorModal @display="displayModal" v-if="showModal" />
    <VisitorLokerPeminjamanLoker
      :name="peminjamanLokerStore.namaPeminjam"
      @peminjaman="displayPeminjamanLoker"
      @tutupPeminjamanLoker="tutupLokerModal"
      @requestPeminjaman="lokerData"
      v-if="showPeminjamanLoker"
    />
    <VisitorLokerAlertSudahMeminjam v-if="sudahMeminjamLoker" />
    <div class="absolute w-full left-0 mt--25">
      <VisitorBanner :display="displayBanner" v-if="!umum" />
      <VisitorBanner :display="'Selamat Datang, ' + userData" v-else />
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
          !userData ? 'cursor-not-allowed bg-gray' : 'cursor-pointer bg-unpad'
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
      <button class="btn bg-unpad" @click="backToIndex">Reset Ruangan</button>
    </div>
  </main>
</template>

<style scoped>
form {
  --at-apply: ma max-w-2xl bg-white px-10 pt-2 pb-8 rounded-xl;
}

input,
select {
  --at-apply: border border-unpad rounded p-3 bg-white;
}

option {
  --at-apply: py-5;
}
</style>
