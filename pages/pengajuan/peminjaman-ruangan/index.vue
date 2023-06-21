<script setup>
definePageMeta({
  middleware: ["authentication-check"],
});

const { data } = useAuth();

const { createItems, getItems } = useDirectusItems();

const date = new Date();
const lastDay = getTotalDays(date.getMonth(), date.getFullYear());
const firstDate = `${date.getFullYear()}-${date.getMonth() + 1}-01`;
const lastDate = `${date.getFullYear()}-${date.getMonth() + 1}-${lastDay}`;

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

const monthName = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
  date
);

const kirimPengajuan = async () => {
  const emailValidation = emailPattern.test(email.value);
  let items = {
    npm: npm.value,
    nama_lengkap: namaLengkap.value,
    email: email.value,
    kontak: kontak.value,
    nama_ruangan: namaRuangan.value,
    tanggal_peminjaman: tanggalPeminjaman.value,
    jam_mulai_peminjaman: jamMulai.value,
    jam_selesai_peminjaman: jamSelesai.value,
    tujuan_peminjaman: tujuanPeminjaman.value,
    status_peminjaman: "pending",
  };
  if (emailValidation) {
    try {
      await createItems({ collection: "peminjaman_ruangan", items });
      textNotif.value = "text-green";
      notification.value = "Berhasil diajukan";
      setTimeout(async () => {
        notification.value =
          "Silahkan isi seluruh form sesuai dengan data asli";
        textNotif.value = "text-dark";
        await navigateTo({ path: "/pengajuan/peminjaman-ruangan/data" });
      }, 2000);
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

const dataPeminjaman = await getItems({
  collection: "peminjaman_ruangan",
  params: {
    filter: {
      tanggal_peminjaman: {
        _between: [firstDate, lastDate],
      },
    },
  },
});
</script>

<template>
  <main class="main-content">
    <section class="max-w-lg ma">
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
            class="cursor-not-allowed"
            required
            disabled
          />
        </div>
        <div class="input-form">
          <label for="npm">NPM / NIP :</label>
          <input type="text" name="npm" id="npm" v-model="npm" required />
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
          <label for="namaruangan">Nama Ruangan</label>
          <select
            name="namaruangan"
            id="namaruangan"
            v-model="namaRuangan"
            required
          >
            <option value="ruang_the_gade">Ruang Pegadaian</option>
            <option value="ruang_kelas_2">Ruang Kelas Lt.2</option>
          </select>
        </div>
        <div class="input-form">
          <label for="tanggal">Tanggal Peminjaman</label>
          <input
            type="date"
            name="tanggal"
            id="tanggal"
            v-model="tanggalPeminjaman"
            required
          />
        </div>

        <div class="input-form flex gap-2">
          <div class="w-full">
            <label for="jamAwal">Jam Mulai {{ jamMulai }} :</label>
            <input type="time" v-model="jamMulai" required />
          </div>
          <div class="w-full">
            <label for="jamSelesai">Jam Selesai {{ jamSelesai }} :</label>
            <input type="time" v-model="jamSelesai" required />
          </div>
        </div>
        <div class="input-form">
          <label for="tujuanpeminjaman">Tujuan Peminjaman</label>
          <textarea
            name="tujuanpeminjaman"
            id="tujuanpeminjaman"
            rows="5"
            v-model="tujuanPeminjaman"
          />
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
    <section class="max-w-lg ma">
      <h1>Daftar Peminjaman Bulan Ini</h1>
      <p class="text-2xl font-semibold text-orange">
        {{ monthName }} {{ date.getFullYear() }}
      </p>
      <div class="max-w-md grid grid-cols-2 gap-4 ma">
        <div
          class="rounded bg-orange w-full p-2"
          v-for="(item, index) in dataPeminjaman"
          v-bind:key="item.id"
        >
          <p class="font-semibold text-white text-lg">
            {{ item.tanggal_peminjaman }}
          </p>
          <div class="text-xs text-white">
            <p>
              <span class="font-semibold">Jam: </span
              >{{ item.jam_mulai_peminjaman }} -
              {{ item.jam_selesai_peminjaman }}
            </p>
            <p>
              <span class="font-semibold">Peminjam:</span>
              {{ item.nama_lengkap }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.main-content {
  --at-apply: max-w-7xl ma flex flex-col-reverse items-center gap-2 text-center my-5 lg:(flex-row);
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

input,
select,
textarea {
  --at-apply: w-full bg-white border border-orange rounded p-2;
}

input:disabled {
  --at-apply: bg-gray-3;
}
</style>
