<script setup>
const { logout } = useDirectusAuth();
const user = useDirectusUser();
const { getItems } = useDirectusItems();
const { data, status, signOut } = useAuth();

const getBebasPustaka = await getItems({
  collection: "pengajuan_surat_bebas_pustaka",
  params: {
    filter: {
      email: data?.value?.user?.email,
    },
  },
});

const getPeminjamanRuangan = await getItems({
  collection: "peminjaman_ruangan",
  params: {
    filter: {
      email: data?.value?.user?.email,
    },
  },
});

const getDataTurnitin = await getItems({
  collection: "pengajuan_pemeriksaan_turnitin",
  params: {
    filter: {
      email: data?.value?.user?.email,
    },
    fields: ["*", "berkas_hasil_pemeriksaan.*"],
  },
});

const isPegawai = computed(() => {
  let state = null;
  try {
    switch (user?.value?.role) {
      case "BE2D46E4-CB00-4585-8E34-5B571A80A820":
        state = true;
        break;
      case "9BB62337-8EAA-44AB-A47C-F8CACEF9B8A7":
        state = true;
        break;
      default:
        state = false;
        break;
    }
  } catch (error) {
    console.log(console.log(error));
  }

  return state;
});

const bebasPustakaBanner = (value) => {
  switch (value) {
    case "pengajuan":
      return "bg-gray text-white font-semibold";
    case "proses":
      return "bg-yellow-4 text-dark font-semibold";
    case "selesai":
      return "bg-green-6 text-white font-semibold";
    case "ditolak":
      return "bg-red-6 text-white font-semibold";
    default:
      return "bg-orange-3 text-dark font-semibold";
  }
};

const onLogout = async () => {
  logout();
  setTimeout(async () => {
    await navigateTo("/login", {
      redirectCode: 401,
    });
  }, 1000);
};

useHead({
  title: "Keanggotaan Perpustakaan Pusat Unpad",
});

definePageMeta({
  middleware: ["authentication-check"],
});
</script>

<template>
  <main class="max-w-7xl ma text-center w-full py-10">
    <section class="flex justify-center my-4 gap-4">
      <div v-if="user" class="pb-5">
        <img
          :src="
            user.avatar
              ? `https://repository.unpad.ac.id:8050/assets/${user.avatar}.jpg`
              : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
          "
          :alt="user?.first_name"
          class="w-35 h-35 object-cover border-2 border-unpad rounded-xl"
        />
      </div>
      <div class="w-full">
        <div v-if="user" class="text-left">
          <p>{{ status }}</p>
          <h1>Halo, {{ user.first_name }} {{ user.last_name }}!</h1>
          <p>Email: {{ user.email }}</p>
          <p>Status Anggota: {{ user.title }}</p>
        </div>
        <div
          v-else-if="status === 'authenticated'"
          class="flex flex-col items-center"
        >
          <NuxtImg :src="data.user.image" class="w-20 rounded-full mb-3" />
          <h5>Halo, {{ data.user.name }}!</h5>
          <div class="max-w-7xl ma">
            <GenericBaseCard>
              <h2 class="text-center font-semibold">
                Daftar Pengajuan Administratif
              </h2>
              <div
                class="flex flex-col items-start md:(grid grid-cols-2) gap-10 my-3 px-5 lg:px-0"
              >
                <div
                  class="flex flex-col items-center justify-center w-full bg-orange-50 p-5 rounded-xl"
                >
                  <h3 class="text-center mb-5">Surat Bebas Pustaka</h3>
                  <div v-if="getBebasPustaka.length > 0">
                    <p>
                      <span
                        :class="
                          bebasPustakaBanner(
                            getBebasPustaka[0]?.status_pengajuan
                          )
                        "
                        class="px-2 text-sm rounded"
                      >
                        {{
                          displayStatusPengajuanSurat(
                            getBebasPustaka[0]?.status_pengajuan
                          )
                        }}
                      </span>
                    </p>

                    <div v-if="getBebasPustaka[0]?.persyaratan?.length === 0">
                      <p>Kelengkapan sedang diperiksa</p>
                    </div>
                    <div v-else>
                      <div>Kelengkapan:</div>
                      <div class="flex">
                        <span
                          v-if="
                            getBebasPustaka[0].persyaratan?.includes('denda')
                          "
                          class="flex"
                        >
                          <p>- Tidak ada Denda</p>
                          <div
                            class="i-mdi-text-box-check text-green w-6 h-6"
                          ></div>
                        </span>
                        <span v-else class="flex">
                          <p>- Masih ada Denda</p>
                          <div
                            class="i-mdi-text-box-remove text-red w-6 h-6"
                          ></div>
                        </span>
                      </div>
                      <div class="flex">
                        <span
                          v-if="
                            getBebasPustaka[0].persyaratan?.includes(
                              'peminjaman'
                            )
                          "
                          class="flex"
                        >
                          <p>- Tidak ada Buku yang sedang dipinjam</p>
                          <div
                            class="i-mdi-text-box-check text-green w-6 h-6"
                          ></div>
                        </span>
                        <span v-else class="flex">
                          <p>- Masih ada Buku yang dipinjam</p>
                          <div
                            class="i-mdi-text-box-remove text-red w-6 h-6"
                          ></div>
                        </span>
                      </div>
                      <div
                        class="my-3"
                        v-if="
                          getBebasPustaka[0]?.status_pengajuan === 'selesai' &&
                          getBebasPustaka[0]?.persyaratan?.length > 0
                        "
                      >
                        <NuxtLink
                          :to="
                            '/pengajuan/bebas-pustaka/surat/' +
                            getBebasPustaka[0].id
                          "
                          class="btn py-2 px-4 bg-unpad text-white"
                          target="_blank"
                          >Unduh Surat</NuxtLink
                        >
                      </div>
                      <div class="my-3" v-else>
                        <button class="btn py-2 px-4" disabled>
                          Surat belum dapat diunduh
                        </button>
                      </div>
                      <div class="mt-5">
                        <h6>
                          Jika ada kendala silahkan hubungi petugas Bebas
                          Pustaka kami:
                        </h6>
                        <p>
                          Pak Taufik Hajar Wikara:
                          <a href="tel:085721738333">+62 857-2173-8333</a>
                        </p>
                        <p>
                          Bu Aning Yuningsih:
                          <a href="tel:081394503080">+62 813-9450-3080</a>
                        </p>
                      </div>
                      <div
                        class="text-xs text-center bg-white p-5 mt-5 rounded-xl"
                      >
                        <p class="text-gray-600">
                          Untuk Mahasiswa jenjang Magister (S2) atau Doktoral
                          (S3) yang ingin mengajukan Surat Bebas Pustaka namun
                          terkendala karena akun PAuS ID nya digabung dengan
                          jenjang sebelumnya (S1 atau S2) silahkan hubungi
                          Sistem Administrator Kandaga :
                        </p>
                        <div>
                          <a
                            href="mailto:chrisna.adhi@unpad.ac.id"
                            target="_blank"
                          >
                            chrisna.adhi@unpad.ac.id
                          </a>
                          <p>atau</p>
                          <a href="https://wa.me/6281573710645" target="_blank">
                            Whatsapp
                          </a>
                        </div>
                        <div>
                          <p class="text-red">
                            dengan melampirkan email unpad anda agar dapat
                            langsung diproses.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <p class="text-red italic text-center">
                      Tidak ada pengajuan bebas pustaka
                    </p>
                  </div>
                </div>
                <div class="w-full bg-orange-50 p-5 rounded-xl">
                  <h3 class="text-center mb-5">Peminjaman Ruangan</h3>
                  <div
                    class="grid grid-cols-2 gap-3"
                    v-if="getPeminjamanRuangan.length > 0"
                  >
                    <GenericBaseCard v-for="ruang in getPeminjamanRuangan">
                      <div class="p-3 rounded text-sm bg-gray-2">
                        <p>{{ definePeminjamanRuangan(ruang.nama_ruangan) }}</p>
                        <div class="py-1">
                          <span
                            class="px-2 rounded font-semibold w-full"
                            :class="
                              displayStatusPeminjamanRuangan(
                                ruang.status_peminjaman
                              )
                            "
                          >
                            {{ ruang.status_peminjaman }}
                          </span>
                        </div>
                        <p>
                          {{ ruang.jam_mulai_peminjaman }} -
                          {{ ruang.jam_selesai_peminjaman }}
                        </p>
                      </div>
                    </GenericBaseCard>
                  </div>
                  <div v-else>
                    <p class="italic text-center text-red">
                      Belum ada pengajuan peminjaman ruangan
                    </p>
                  </div>
                </div>
                <div class="flex flex-col bg-orange-50 p-5 rounded-xl">
                  <h3 class="text-center mb-5">
                    Pengajuan Pemeriksaan Turnitin
                  </h3>
                  <p class="text-center">Daftar Pengajuan Turnitin Anda.</p>
                  <div class="text-sm">
                    <p class="text-center">
                      Untuk cara pengutipan dapat dipelajari melalui
                      <a
                        href="https://penerbitdeepublish.com/wp-content/uploads/2017/01/Pedoman-Menulis-Buku-Tanpa-Plagiarisme-oleh-Penerbit-Deepublish.pdf"
                        target="_blank"
                        >E-Book ini</a
                      >
                    </p>
                    <ol class="text-left text-xs">
                      <li>Wajib melampirkan Cover dari karya tersebut</li>
                      <li>
                        Kata-kata atau kalimat yang diwarnai bersumber pada
                        website yang ada pada daftar yang ada pada bagian akhir
                        report (sesuai dengan warna dan nomornya)
                      </li>
                      <li>
                        Kalimat-kalimat yang diwarnai sebaiknya diganti dengan
                        kalimat lain atau parafrase tetapi memiliki arti yang
                        sama.
                      </li>
                      <li>
                        Pengutipan langsung sebaiknya menggunakan tanda "...."
                        (penulis, tahun).
                      </li>
                      <li>
                        Sebaiknya persentase (%) kurang dari 20%, bila lebih
                        silahkan untuk memperbaikinya dan diperiksakan kembali.
                      </li>
                      <li>
                        Untuk memperkecil similarity pada tugas akhir, surat
                        pernyataan, kata pengantar, dan daftar isi sebaiknya
                        tidak disertakan
                      </li>
                    </ol>
                  </div>
                  <div
                    class="flex flex-col items-center justify-center my-5 text-center"
                  >
                    <p class="mb-2">
                      Untuk mengajukan pemeriksaan lainnya silahkan klik tombol
                      berikut
                    </p>
                    <NuxtLink
                      class="btn bg-unpad text-white py-1"
                      href="/pengajuan/pemeriksaan-turnitin"
                    >
                      Ajukan Pemeriksaan Turnitin
                    </NuxtLink>
                  </div>
                  <div
                    class="grid grid-cols-1 md:grid-cols-2 gap-10"
                    v-if="getDataTurnitin.length > 0"
                  >
                    <div
                      class="flex flex-col gap-3 my-5 text-left bg-white rounded p-5"
                      v-for="file in getDataTurnitin"
                    >
                      <h6>
                        Judul :
                        <p>{{ file.judul_karya_tulis ?? "-" }}</p>
                      </h6>
                      <h6>
                        Status :
                        <p>
                          <span
                            :class="bebasPustakaBanner(file.status_pengajuan)"
                            class="px-2 text-sm rounded"
                          >
                            {{
                              displayStatusPengajuanSurat(file.status_pengajuan)
                            }}
                          </span>
                        </p>
                      </h6>
                      <h6>
                        Pengajuan Pada :
                        <p>{{ convertTimeZone(file.date_created) ?? "-" }}</p>
                      </h6>
                      <h6>
                        Diproses Pada :
                        <p>{{ convertTimeZone(file.date_updated) ?? "-" }}</p>
                      </h6>
                      <h6>
                        Hasil Similarity :
                        <p>{{ file.similarity_number ?? "-" }}</p>
                      </h6>
                      <h6>
                        Keterangan :
                        <p>{{ file.keterangan ?? "-" }}</p>
                      </h6>
                      <h6>Hasil Pemeriksaan :</h6>
                      <div
                        class="my-2 flex flex-col"
                        v-if="
                          file.berkas_hasil_pemeriksaan.length > 0 &&
                          file.status_pengajuan === 'selesai'
                        "
                        v-for="(item, index) in file.berkas_hasil_pemeriksaan"
                      >
                        <NuxtLink
                          :href="
                            'https://kandaga.unpad.ac.id/backoffice/assets/' +
                            item.directus_files_id +
                            '?download'
                          "
                          class="btn bg-unpad py-1 text-white text-center"
                          target="_blank"
                        >
                          Unduh Hasil Pemeriksaan {{ index + 1 }}
                        </NuxtLink>
                      </div>
                      <div
                        v-else-if="file.status_pengajuan === 'ditolak'"
                        class="text-xs"
                      >
                        <p>Silahkan cek Keterangan Penolakan</p>
                        <p class="mb-3">
                          Jika ingin mengajukan ulang, klik tombol berikut :
                        </p>
                        <NuxtLink
                          class="btn py-1 bg-unpad text-white"
                          href="/pengajuan/pemeriksaan-turnitin"
                        >
                          Ajukan Ulang
                        </NuxtLink>
                      </div>
                      <div v-else>
                        <p class="text-red-6">Belum diproses</p>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <p class="text-red-6 text-center mt-5">
                      Belum ada pengajuan
                    </p>
                    <div class="mt-5 flex items-center justify-center">
                      <NuxtLink
                        class="btn bg-unpad text-white py-1"
                        href="/pengajuan/pemeriksaan-turnitin"
                      >
                        Ajukan Pemeriksaan Turnitin
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </GenericBaseCard>
          </div>
        </div>
        <div v-else>
          <h1>
            Akun sedang Log Out! <br />
            Memindahkan ke halaman login...
          </h1>
          <p>Bermasalah ? silahkan klik tautan login dibawah ini</p>
          <NuxtLink to="/login">
            <button class="btn bg-unpad text-white">Login</button>
          </NuxtLink>
        </div>
      </div>
    </section>
    <section class="flex justify-center gap-2">
      <NuxtLink
        to="/dashboard"
        class="btn bg-unpad text-white"
        v-show="isPegawai"
      >
        Dashboard
      </NuxtLink>
      <NuxtLink to="/pengajuan" class="btn bg-unpad text-white">
        Pengajuan Lain
      </NuxtLink>
      <button
        type="button"
        class="btn bg-red text-white"
        v-show="user"
        @click="onLogout"
      >
        Logout
      </button>
      <button
        type="button"
        class="btn bg-red text-white"
        v-show="status"
        @click="signOut()"
      >
        Logout
      </button>
    </section>
  </main>
</template>

<style scoped>
h1 {
  --at-apply: text-2xl;
}

.logout {
  --at-apply: btn bg-red text-white;
}
</style>
