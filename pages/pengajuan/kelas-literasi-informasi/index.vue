<script setup>
definePageMeta({
  middleware: ["authentication-check"],
});

const { createItems, getItems } = useDirectusItems();
const { data } = useAuth();
const dataFakultas = daftarNamaFakultasUnpad();

const notification = ref("Silahkan isi seluruh form sesuai dengan data asli");
const colorNotif = ref("text-dark");
const npm = ref("");
const namaLengkap = ref(data.value.user.name);
const email = ref(data.value.user.email);
const fakultas = ref("");
const prodi = ref("");
const kontak = ref("");
const jenisKelas = ref("");

console.log(!npm.value);

const jadwalKelasLiterasi = await getItems({
  collection: "jadwal_kelas_literasi",
  params: {
    filter: {},
    fields: "*, pengajar.*",
  },
});

const chooseKelas = (jadwal) => {
  jenisKelas.value = jadwal;
};

const kirimPengajuan = async () => {
  if (
    npm.value === "" ||
    namaLengkap.value === "" ||
    email.value === "" ||
    fakultas.value === "" ||
    prodi.value === "" ||
    jenisKelas.value === ""
  ) {
    alert("Silahkan isi form terlebih dahulu");
  } else {
    let items = {
      npm: npm.value,
      nama_lengkap: namaLengkap.value,
      email: email.value,
      kontak: kontak.value,
      jenis_kelas: jenisKelas.value,
      nama_fakultas: fakultas.value,
      nama_prodi: prodi.value,
      status_pengajuan: "pengajuan",
    };

    try {
      await createItems({
        collection: "pengajuan_kelas_literasi_informasi",
        items,
      });
      colorNotif.value = "text-green";
      notification.value = "Berhasil diajukan";
      namaLengkap.value = ref("");
      email.value = data.value.user.email;
      kontak.value = "";
      jenisKelas.value = "";
      fakultas.value = "";
      prodi.value = "";

      status_pengajuan.value = "";
      setTimeout(async () => {
        notification.value =
          "Silahkan isi seluruh form sesuai dengan data asli";
        colorNotif.value = "text-dark";
        await navigateTo({ path: "/keanggotaan" });
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<template>
  <section>
    <h1 class="text-center">Pengajuan Kelas Literasi Informasi</h1>
    <form @submit.prevent="kirimPengajuan" class="p-7">
      <div class="input-form py-3">
        <h4 class="text-center mb-3">Silahkan pilih jadwal kelas</h4>
        <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div
            class="border border-orange rounded p-5 flex flex-col justify-between gap-6"
            :class="{
              'bg-orange-2': jenisKelas === jadwal.id,
              'bg-gray-1': jenisKelas !== jadwal.id,
            }"
            v-for="jadwal in jadwalKelasLiterasi"
          >
            <div>
              <h4>{{ jadwal.nama_kelas }}</h4>
              <p>{{ jadwal.deskripsi_kelas }}</p>
            </div>
            <div class="flex gap-2">
              <p>{{ jadwal.tanggal_kelas }}</p>
              <p>{{ jadwal.jam_mulai }} - {{ jadwal.jam_selesai }}</p>
            </div>
            <div class="flex justify-between">
              <p>
                {{ jadwal.pengajar.first_name }} {{ jadwal.pengajar.last_name }}
              </p>
              <button
                @click.prevent="chooseKelas(jadwal.id)"
                class="btn bg-orange text-white py-1"
              >
                {{ jenisKelas === jadwal.id ? "Kelas Dipilih" : "Ambil Kelas" }}
              </button>
            </div>
          </div>
        </div>
      </div>
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
      <div class="input-form">
        <label for="fakultas">Nama Fakultas :</label>
        <select
          name="fakultas"
          id="fakultas"
          v-model="fakultas"
          required
          class="overflow-y-scroll"
        >
          <option value="" selected disabled>
            Silahkan pilih Nama Fakultas
          </option>
          <option
            v-for="fakultas in dataFakultas.objFakultas"
            :value="fakultas.singkatan"
          >
            {{ fakultas.namaFakultas }}
          </option>
        </select>
      </div>
      <div class="input-form">
        <label for="prodi">Nama Program Studi :</label>
        <input type="prodi" name="prodi" id="prodi" v-model="prodi" required />
      </div>
      <div class="input-form">
        <label for="kontak">No. HP / Whatsapp :</label>
        <input type="text" id="kontak" v-model="kontak" />
      </div>

      <div class="input-form">
        <button
          class="btn bg-orange text-white py-2 w-full"
          type="submit"
          @click.prevent="kirimPengajuan"
        >
          Ajukan Kelas
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma;
}

h1 {
  --at-apply: text-4xl my-5;
}

label {
  --at-apply: font-600;
}

.input-form {
  --at-apply: my-2;
}

.chosen-class {
  --at-apply: bg-orange-4;
}

input,
select {
  --at-apply: w-full border border-orange rounded p-2;
}
</style>
