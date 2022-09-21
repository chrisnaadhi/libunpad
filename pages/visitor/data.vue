<script setup>
useHead({
  title: "Data Pengunjung Kandaga | Pusat Pengelolaan Pengetahuan",
});

const { getItems } = useDirectusItems();
const router = useRouter();

let [fetchLastVisitor] = await getItems({
  collection: "data_kunjungan",
  params: {
    limit: 1,
    sort: "-date_created",
  },
});

const refreshPage = async () => {
  router.go();
};

onMounted(() => {
  setInterval(async () => {
    [fetchLastVisitor] = await getItems({
      collection: "data_kunjungan",
      params: {
        limit: 1,
        sort: "-date_created",
      },
    });
  }, 300000);
});
</script>

<template>
  <main>
    <section class="heading">
      <h1>Data Kunjungan</h1>
      <p class="font-500">
        Rekap data kunjungan ke Gd. Grha Kandaga / Pusat Pengelolaan Pengetahuan
        UNPAD
      </p>
    </section>
    <section class="max-w-7xl ma">
      <div class="card text-center">
        <p>Pengunjung Terakhir (Refresh setiap 5 menit) :</p>
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
    <FooterSection />
  </main>
</template>

<style scoped>
h1 {
  --at-apply: text-5xl font-600 py-4;
}

.heading {
  --at-apply: text-center;
}

.card {
  --at-apply: bg-gray-200 my-5 py-5 px-8 rounded-lg;
}

input {
  --at-apply: border border-black rounded;
}
</style>
