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
        <h1>{{ fetchLastVisitor.biodata_user }}</h1>
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
        <button class="btn bg-white my-5" @click="refreshPage">Refresh</button>
      </div>
    </section>
    <section class="main-content">
      <div class="card">
        <h3>Data Pengunjung Hari Ini</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
          ipsum?
        </p>
      </div>
      <div class="card">
        <h3>Data Pengunjung Kemarin</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
          delectus!
        </p>
      </div>
    </section>
    <FooterSection />
  </main>
</template>

<style scoped>
h1 {
  --at-apply: text-5xl font-600 py-4;
}

h3 {
  --at-apply: text-2xl font-600 text-center;
}

.heading {
  --at-apply: text-center;
}

.main-content {
  --at-apply: max-w-7xl ma flex flex-col sm:flex-row items-center justify-between;
}

.card {
  --at-apply: bg-blue-500 my-5 py-5 px-8;
}

input {
  --at-apply: border border-black rounded;
}
</style>
