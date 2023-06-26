<script setup>
import { displayRuangan, displayKeanggotaan } from "~/composables/user";

useHead({
  title: "Data Pengunjung Kandaga | Pusat Pengelolaan Pengetahuan",
});

definePageMeta({
  layout: "kunjungan",
});

const { getItems } = useDirectusItems();
const router = useRouter();

let [fetchLastVisitor] = await getItems({
  collection: "data_kunjungan",
  params: {
    limit: 1,
    sort: "-date_created",
  },
  meta: "filter_count",
});

const refreshPage = () => {
  router.go();
};

onMounted(() => {
  setInterval(async () => {
    refreshPage();
  }, 1800000);
});
</script>

<template>
  <main class="background-block">
    <section class="heading">
      <h1>Data Kunjungan</h1>
      <p class="font-500">
        Rekap data kunjungan ke Gd. Grha Kandaga / Pusat Pengelolaan Pengetahuan
        UNPAD
      </p>
    </section>
    <section class="w-full ma">
      <div class="card text-center">
        <p>
          Pengunjung Terakhir (Data akan diperbarui secara otomatis setiap 30
          menit) :
        </p>
        <h1 class="text-orange-5">{{ fetchLastVisitor.biodata_user }}</h1>
        <p class="text-xl">
          Nama Ruangan:
          <span class="font-500">{{
            displayRuangan(fetchLastVisitor.nama_ruangan)
          }}</span>
        </p>
        <p class="text-xl">
          Status Pengunjung:
          <span class="font-500">{{
            displayKeanggotaan(fetchLastVisitor.identitas_anggota)
          }}</span>
        </p>
        <div class="pt-5">
          <button class="btn bg-white" @click="refreshPage">Refresh</button>
        </div>
      </div>
    </section>
    <VisitorDataRecap />
  </main>
</template>

<style scoped>
.background-block {
  --at-apply: flex pt-5 flex-col items-center min-w-full;
}
h1 {
  --at-apply: text-5xl font-600;
}

.heading {
  --at-apply: text-center w-5xl;
}

.card {
  --at-apply: bg-gray-200 my-1 py-5 px-8 rounded-lg;
}

input {
  --at-apply: border border-black rounded;
}

.footer {
  --at-apply: w-full mt-5;
}
</style>
