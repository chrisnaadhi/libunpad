<script setup>
import { ref } from "vue";

const { getItemById } = useDirectusItems();
const { getUserById } = useDirectusUsers();
const fakultas = daftarNamaFakultasUnpad();
const { cariFakultasAbbrevation } = fakultas;
const route = useRoute();
const suratSection = ref(null);

const getDataSurat = await getItemById({
  collection: "pengajuan_surat_bebas_pustaka",
  id: route.params.nomor,
});

const getDataPegawai = await getUserById({
  id: getDataSurat.user_updated,
});

const date = new Date();

const downloadSurat = () => {
  window.print();
};

definePageMeta({
  layout: "surat",
});

useHead({
  title: `Surat Bebas Pustaka ${getDataSurat.nama_lengkap}`,
});
</script>

<template>
  <section>
    <div
      class="flex flex-col items-center my-2 noPrint"
      v-show="getDataSurat?.persyaratan?.length > 1"
    >
      <button
        type="button"
        class="btn bg-blue text-white"
        @click="downloadSurat"
      >
        Print / Simpan
      </button>
      <p class="italic text-center mt-4 text-sm">
        Surat ini bisa disimpan atau diprint langsung melalui perangkat Komputer
        / Laptop
      </p>
    </div>
    <article
      ref="suratSection"
      v-if="
        getDataSurat?.persyaratan?.length > 1 &&
        getDataSurat?.status_pengajuan === 'selesai'
      "
    >
      <div class="flex items-center justify-evenly">
        <NuxtImg src="images/lambang-unpad.png" class="w-24 h-24"></NuxtImg>
        <div class="text-center text-dark">
          <h6>KEMENTERIAN PENDIDIKAN TINGGI, SAINS, DAN TEKNOLOGI</h6>
          <h6>UNIVERSITAS PADJADJARAN</h6>
          <h6>KANTOR PENGELOLAAN PERPUSTAKAAN</h6>
          <p>Jl. Raya Bandung - Sumedang Km. 21 Jatinangor 45363</p>
          <p>Telp : 022-8428806 , E-mail : perpustakaan@unpad.ac.id</p>
        </div>
      </div>
      <hr class="border border-dark my-2" />
      <div class="text-center my-10">
        <h6 class="font-bold underline">
          SURAT KETERANGAN BEBAS PINJAM BUKU / MAJALAH
        </h6>
        <p>Nomor : {{ getDataSurat.nomor_surat }}</p>
      </div>
      <div>
        <p>
          Perpustakaan Pusat Universitas Padjadjaran, dengan ini menerangkan
          bahwa :
        </p>
        <div class="flex flex-col pl-6">
          <div class="grid grid-cols-4">
            <p>Nama</p>
            <p class="col-span-3">: {{ getDataSurat.nama_lengkap }}</p>
          </div>
          <div class="grid grid-cols-4">
            <p>NPM</p>
            <p class="col-span-3">: {{ getDataSurat.npm }}</p>
          </div>
          <div class="grid grid-cols-4">
            <p>Fakultas</p>
            <p class="col-span-3">
              : {{ cariFakultasAbbrevation(getDataSurat.nama_fakultas, true) }}
            </p>
          </div>
          <div class="grid grid-cols-4">
            <p>Jurusan / Prog. Studi</p>
            <p class="col-span-3">: {{ getDataSurat.nama_prodi }}</p>
          </div>
        </div>
        <div class="my-5">
          <p>
            Mahasiswa tersebut tidak mempunyai tunggakan / pinjaman buku /
            majalah dari Perpustakaan Pusat Universitas Padjadjaran.
          </p>
          <p class="mt-5">
            Demikian surat keterangan ini dibuat untuk digunakan sebagaimana
            mestinya.
          </p>
        </div>
        <div class="flex flex-col items-end my-10">
          <div>
            <p>Jatinangor, {{ bebasPustakaDate(getDataSurat.date_updated) }}</p>
            <p>a.n. Kepala Kantor Perpustakaan Unpad</p>
            <div
              v-if="
                getDataSurat.user_updated ===
                '18C2332E-6589-4424-B613-AAB2141F9450'
              "
            >
              <NuxtImg
                src="images/ttd_kepala.png"
                v-show="getDataSurat.nama_fakultas !== 'fikom'"
                class="w-45 mt--15 mb--8"
              />
            </div>
            <div
              v-else-if="
                getDataSurat.user_updated ===
                '95B9A96B-1BC5-44F4-BB6D-994D658CB1AF'
              "
            >
              <NuxtImg
                src="images/ttd_kepala2p.png"
                v-show="getDataSurat.nama_fakultas !== 'fikom'"
                class="w-45 mt--5 mb--5"
              />
            </div>
            <div
              v-else-if="
                getDataSurat.user_updated ===
                '02A58D68-B3EC-4B7F-BC72-E83A16BD5EBC'
              "
            >
              <NuxtImg
                src="images/pak_hendri_cap.png"
                v-show="getDataSurat.nama_fakultas !== 'fikom'"
                class="w-45 mt--5 mb--5"
              />
            </div>
            <div
              v-else-if="
                getDataSurat.user_updated ===
                'B1883F05-C5A3-408F-9617-417AB93DC0DF'
              "
            >
              <NuxtImg
                src="images/bu_aning_cap.png"
                v-show="getDataSurat.nama_fakultas !== 'fikom'"
                class="w-45 mt--5 mb--5"
              />
            </div>
            <div
              v-else-if="
                getDataSurat.user_updated ===
                '19E39D00-ED4B-4EBB-9C04-8C0570614B7E'
              "
            >
              <NuxtImg
                src="images/ttd/pak_taufik_cap.png"
                v-show="getDataSurat.nama_fakultas !== 'fikom'"
                class="w-45 mt--5 mb--5"
              />
            </div>
            <div v-else>
              <NuxtImg
                src="images/ttd_kepala2p.png"
                v-show="getDataSurat.nama_fakultas !== 'fikom'"
                class="w-45 mt--5 mb--5"
              />
            </div>
            <div v-show="getDataSurat.nama_fakultas === 'fikom'">
              <div class="py-10" />
            </div>
            <p>
              {{ getDataPegawai.first_name + " " + getDataPegawai.last_name }}
            </p>
            <p>NIP {{ getDataPegawai.nomor_induk }}</p>
          </div>
        </div>

        <div class="text-3 text-gray italic">
          <p>Surat Generated ID : {{ getDataSurat.id }}</p>
          <p>by Kandaga System</p>
        </div>
      </div>
    </article>
    <article class="text-center" v-else>
      <h3 class="text-red">Data Belum Sesuai!</h3>
      <p>Silahkan hubungi Petugas Bebas Pustaka:</p>
      <p>
        Bu Tati Asrianti:
        <a href="tel:+6282120475023">+6282120475023</a>
      </p>
      <p>
        Pak Ana Sobana:
        <a href="tel:+6282246842403">+6282246842403</a>
      </p>
    </article>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

* {
  font-family: "Open Sans";
}

section {
  --at-apply: max-w-7xl ma;
}

article {
  --at-apply: max-w-3xl ma border-none p-10 my-5;
}

h6 {
  --at-apply: font-bold;
}
</style>
