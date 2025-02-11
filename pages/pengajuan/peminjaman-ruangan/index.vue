<script setup>
definePageMeta({
  middleware: ["authentication-check"],
});

const { data } = useAuth();
const { $directus, $uploadFiles } = useNuxtApp();
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
const judulKegiatan = ref("");
const unitPengajuan = ref("");
const tanggalPeminjaman = ref("");
const jamMulai = ref("");
const jamSelesai = ref("");
const tujuanPeminjaman = ref("");
const fileSurat = ref(null);
const uploadSurat = (event) => {
  fileSurat.value = event.target.files[0];
};
const emailPattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

const monthName = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
  date
);

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

const checkExistingPeminjaman = (tanggal, jamMulai) => {
  let isExist = false;

  dataPeminjaman.forEach((item) => {
    const isTimeInRange = () => {
      const [startHours, startMinutes, startSeconds] = item.jam_mulai_peminjaman
        .split(":")
        .map(Number);
      const [endHours, endMinutes, endSeconds] = item.jam_selesai_peminjaman
        .split(":")
        .map(Number);
      const [checkHours, checkMinutes, checkSeconds] = jamMulai
        .split(":")
        .map(Number);

      const startTime = new Date();
      startTime.setHours(startHours, startMinutes, startSeconds);

      const endTime = new Date();
      endTime.setHours(endHours, endMinutes, endSeconds);

      const checkTime = new Date();
      checkTime.setHours(checkHours, checkMinutes, checkSeconds);

      return checkTime >= startTime && checkTime <= endTime;
    };

    if (item.tanggal_peminjaman === tanggal && isTimeInRange()) {
      isExist = true;
    }
  });
  return isExist;
};

const isDatePast = (date) => {
  const today = new Date();
  // Set the time to the start of the day (midnight) for today
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const [year, month, day] = date.split("-").map(Number);
  const checkDate = new Date(year, month - 1, day);
  return checkDate < today;
};

const kirimPengajuan = async () => {
  const emailValidation = emailPattern.test(email.value);
  const formData = new FormData();
  const roomExist = checkExistingPeminjaman(
    tanggalPeminjaman.value,
    jamMulai.value + ":00"
  );
  if (
    namaLengkap.value === "" ||
    unitPengajuan.value === "" ||
    npm.value === "" ||
    kontak.value === "" ||
    namaRuangan.value === "" ||
    judulKegiatan.value === "" ||
    tanggalPeminjaman.value === "" ||
    jamMulai.value === "" ||
    jamSelesai.value === ""
  ) {
    alert("Mohon diisi kolom yang bertanda bintang merah!");
  } else if (isDatePast(tanggalPeminjaman.value)) {
    alert("Tanggal peminjaman tidak boleh tanggal sebelum hari ini!");
  } else if (roomExist) {
    alert("Ruangan sudah terpakai pada jam tersebut!");
  } else if (fileSurat.value === null) {
    let items = {
      nomor_induk: npm.value,
      nama_lengkap: namaLengkap.value,
      unit_pengajuan: unitPengajuan.value,
      email: email.value,
      kontak: kontak.value,
      judul_kegiatan: judulKegiatan.value,
      nama_ruangan: namaRuangan.value,
      tanggal_peminjaman: tanggalPeminjaman.value,
      jam_mulai_peminjaman: jamMulai.value,
      jam_selesai_peminjaman: jamSelesai.value,
      keterangan: tujuanPeminjaman.value,
      status_peminjaman: "pending",
    };
    if (emailValidation) {
      try {
        await createItems({ collection: "peminjaman_ruangan", items });
        textNotif.value = "text-green";
        notification.value = "Berhasil diajukan";
        namaLengkap.value = ref("");
        unitPengajuan.value = "";
        email.value = data.value.user.email;
        kontak.value = "";
        namaRuangan.value = "";
        tanggalPeminjaman.value = "";
        jamMulai.value = "";
        jamSelesai.value = "";
        tujuanPeminjaman.value = "";
        fileSurat.value = null;
        alert("Berhasil diajukan");
        setTimeout(async () => {
          notification.value =
            "Silahkan isi seluruh form sesuai dengan data asli";
          textNotif.value = "text-dark";
          await navigateTo({ path: "/pengajuan/peminjaman-ruangan/data" });
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    } else {
      textNotif.value = "text-red-7";
      notification.value = "Email tidak valid, silahkan coba lagi";
      setTimeout(async () => {
        notification.value =
          "Silahkan isi seluruh form sesuai dengan data asli";
        textNotif.value = "text-dark";
      }, 5000);
    }
  } else if (fileSurat.value !== null) {
    formData.append("file", fileSurat.value);
    formData.append("folder", "AD0865F0-F6A3-4F62-8551-FE52625C7308");
    await $directus.request($uploadFiles(formData)).then(async (res) => {
      let items = {
        nomor_induk: npm.value,
        nama_lengkap: namaLengkap.value,
        unit_pengajuan: unitPengajuan.value,
        email: email.value,
        kontak: kontak.value,
        nama_ruangan: namaRuangan.value,
        judul_kegiatan: judulKegiatan.value,
        tanggal_peminjaman: tanggalPeminjaman.value,
        jam_mulai_peminjaman: jamMulai.value,
        jam_selesai_peminjaman: jamSelesai.value,
        keterangan: tujuanPeminjaman.value,
        status_peminjaman: "pending",
        file_surat: res.id,
      };
      if (emailValidation) {
        try {
          await createItems({ collection: "peminjaman_ruangan", items });
          textNotif.value = "text-green";
          notification.value = "Berhasil diajukan";
          namaLengkap.value = ref("");
          unitPengajuan.value = "";
          email.value = data.value.user.email;
          kontak.value = "";
          namaRuangan.value = "";
          tanggalPeminjaman.value = "";
          jamMulai.value = "";
          jamSelesai.value = "";
          tujuanPeminjaman.value = "";
          fileSurat.value = null;
          alert("Berhasil diajukan");
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
          notification.value =
            "Silahkan isi seluruh form sesuai dengan data asli";
          textNotif.value = "text-dark";
        }, 5000);
      }
    });
  } else {
    alert("Error! Hubungi admin.");
    console.log(fileSurat.value);
  }
};
</script>

<template>
  <main>
    <div class="main-content">
      <section class="max-w-lg">
        <h1>Form Peminjaman Ruangan</h1>
        <p class="px-3">
          Silahkan isi form dibawah ini untuk melakukan peminjaman ruangan.
          Tanda bintang merah ( <span class="text-red-6">*</span> ) merupakan
          kolom yang wajib diisi.
        </p>
        <form
          @submit.prevent="kirimPengajuan"
          class="container ma max-w-md px-5 text-left"
        >
          <div class="input-form">
            <label for="email">Email <span class="text-red-6">*</span> :</label>
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
            <label for="npm">
              NPM / NIP <span class="text-red-6">*</span> :
            </label>
            <input type="text" name="npm" id="npm" v-model="npm" required />
          </div>
          <div class="input-form">
            <label for="nama">
              Nama Lengkap <span class="text-red-6">*</span> :
            </label>
            <input
              type="text"
              name="nama"
              id="nama"
              v-model="namaLengkap"
              required
            />
          </div>

          <div class="input-form">
            <label for="kontak"
              >No. HP / Whatsapp / Kontak Lain
              <span class="text-red-6">*</span> :</label
            >
            <input
              type="text"
              name="kontak"
              id="kontak"
              v-model="kontak"
              required
            />
          </div>

          <div class="input-form">
            <label for="unitpengajuan"
              >Unit Asal Pengajuan <span class="text-red-6">*</span> :</label
            >
            <input
              type="text"
              name="unitpengajuan"
              id="unitpengajuan"
              v-model="unitPengajuan"
              required
            />
          </div>

          <div class="input-form">
            <label for="namaruangan">
              Nama Ruangan yang ingin dipinjam
              <span class="text-red-6">*</span> :
            </label>
            <select
              name="namaruangan"
              id="namaruangan"
              v-model="namaRuangan"
              required
            >
              <option value="ruang_the_gade">Ruang Pegadaian Lt. 1</option>
              <option value="plaza_kandaga">Plaza Kandaga Lt. 1</option>
              <option value="ruang_kelas_2">Ruang Kelas Lt. 2</option>
              <option value="ruang_hybrid">Ruang Kelas Hybrid Lt. 4</option>
              <option value="ruang_alh">Ruang Assistive Learning Lt. 4</option>
              <option value="ruang_teater">Teater Pengetahuan Rektorat</option>
            </select>
          </div>

          <div class="input-form">
            <label for="judulkegiatan">
              Judul Kegiatan <span class="text-red-6">*</span> :
            </label>
            <input
              type="text"
              name="judulkegiatan"
              id="judulkegiatan"
              v-model="judulKegiatan"
              required
            />
          </div>

          <div class="input-form">
            <label for="tanggal"
              >Tanggal Peminjaman <span class="text-red-6">*</span> :</label
            >
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
              <label for="jamAwal"
                >Jam Mulai <span class="text-red-6">*</span> :</label
              >
              <input type="time" v-model="jamMulai" required />
            </div>
            <div class="w-full">
              <label for="jamSelesai"
                >Jam Selesai <span class="text-red-6">*</span> :</label
              >
              <input type="time" v-model="jamSelesai" required />
            </div>
          </div>
          <div class="input-form">
            <label for="tujuanpeminjaman">Tujuan Peminjaman :</label>
            <textarea
              name="tujuanpeminjaman"
              id="tujuanpeminjaman"
              rows="5"
              v-model="tujuanPeminjaman"
            />
          </div>
          <div class="input-form">
            <label for="fileSurat">Surat Pengajuan :</label>
            <input
              type="file"
              name="fileSurat"
              id="fileSurat"
              @change="uploadSurat"
              accept="application/pdf"
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
      </section>
      <section class="max-w-lg">
        <h1>Daftar Peminjaman Bulan Ini</h1>
        <p class="text-2xl font-semibold text-orange">
          {{ monthName }} {{ date.getFullYear() }}
        </p>
        <div
          class="max-w-md grid grid-cols-2 gap-4 ma py-5"
          v-if="dataPeminjaman.length > 0"
        >
          <div
            class="rounded bg-gray-1 w-full p-2"
            v-for="(item, index) in dataPeminjaman"
            v-bind:key="item.id"
          >
            <p class="font-semibold text-lg">
              {{ item.tanggal_peminjaman }}
            </p>
            <div class="text-xs">
              <p>
                <span class="font-semibold">Jam: </span
                >{{ item.jam_mulai_peminjaman }} -
                {{ item.jam_selesai_peminjaman }}
              </p>
              <p>
                <span class="font-semibold">Peminjam:</span>
                {{ item.nama_lengkap }}
              </p>
              <p>
                <span class="font-semibold">Ruangan: </span>
                {{ definePeminjamanRuangan(item.nama_ruangan) }}
              </p>
              <p>
                <span class="font-semibold">Kegiatan: </span>
                {{ item.judul_kegiatan }}
              </p>
            </div>
          </div>
        </div>
        <div v-else>
          <p>Belum ada data.</p>
        </div>
        <div>
          Lihat data peminjaman
          <NuxtLink to="/pengajuan/peminjaman-ruangan/data">disini</NuxtLink>
        </div>
      </section>
    </div>

    <div class="w-full max-w-7xl ma py-10">
      <div class="flex items-center max-w-2xl ma text-center">
        <NuxtLink class="btn w-full bg-orange text-white" to="/pengajuan">
          &leftarrow;Kembali
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main-content {
  --at-apply: max-w-7xl ma flex justify-center gap-2 flex-col-reverse text-center my-5 lg:(flex-row gap-15);
}

h1 {
  --at-apply: text-4xl my-5;
}

label {
  --at-apply: font-600;
}

.input-form {
  --at-apply: my-4;
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
