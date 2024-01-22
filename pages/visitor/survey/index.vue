<script setup>
const { getItems } = useDirectusItems();

const lobbyB5 = await getItems(getSurveyKandagaVisitor("lobby", "fifthStar"));
const lobbyB4 = await getItems(getSurveyKandagaVisitor("lobby", "fourthStar"));
const lobbyB3 = await getItems(getSurveyKandagaVisitor("lobby", "thirdStar"));
const lobbyB2 = await getItems(getSurveyKandagaVisitor("lobby", "secondStar"));
const lobbyB1 = await getItems(getSurveyKandagaVisitor("lobby", "firstStar"));

const ruangSirkulasiB5 = await getItems(
  getSurveyKandagaVisitor("r_sirkulasi", "fifthStar")
);
const ruangSirkulasiB4 = await getItems(
  getSurveyKandagaVisitor("r_sirkulasi", "fourthStar")
);
const ruangSirkulasiB3 = await getItems(
  getSurveyKandagaVisitor("r_sirkulasi", "thirdStar")
);
const ruangSirkulasiB2 = await getItems(
  getSurveyKandagaVisitor("r_sirkulasi", "secondStar")
);
const ruangSirkulasiB1 = await getItems(
  getSurveyKandagaVisitor("r_sirkulasi", "firstStar")
);

const ruangMultimediaB5 = await getItems(
  getSurveyKandagaVisitor("r_multimedia", "fifthStar")
);
const ruangMultimediaB4 = await getItems(
  getSurveyKandagaVisitor("r_multimedia", "fourthStar")
);
const ruangMultimediaB3 = await getItems(
  getSurveyKandagaVisitor("r_multimedia", "thirdStar")
);
const ruangMultimediaB2 = await getItems(
  getSurveyKandagaVisitor("r_multimedia", "secondStar")
);
const ruangMultimediaB1 = await getItems(
  getSurveyKandagaVisitor("r_multimedia", "firstStar")
);

const ruangPopulerB5 = await getItems(
  getSurveyKandagaVisitor("r_populer", "fifthStar")
);
const ruangPopulerB4 = await getItems(
  getSurveyKandagaVisitor("r_populer", "fourthStar")
);
const ruangPopulerB3 = await getItems(
  getSurveyKandagaVisitor("r_populer", "thirdStar")
);
const ruangPopulerB2 = await getItems(
  getSurveyKandagaVisitor("r_populer", "secondStar")
);
const ruangPopulerB1 = await getItems(
  getSurveyKandagaVisitor("r_populer", "firstStar")
);

const ruangBerkalaB5 = await getItems(
  getSurveyKandagaVisitor("r_berkala", "fifthStar")
);
const ruangBerkalaB4 = await getItems(
  getSurveyKandagaVisitor("r_berkala", "fourthStar")
);
const ruangBerkalaB3 = await getItems(
  getSurveyKandagaVisitor("r_berkala", "thirdStar")
);
const ruangBerkalaB2 = await getItems(
  getSurveyKandagaVisitor("r_berkala", "secondStar")
);
const ruangBerkalaB1 = await getItems(
  getSurveyKandagaVisitor("r_berkala", "firstStar")
);

const ruangTesisB5 = await getItems(
  getSurveyKandagaVisitor("r_referensi", "fifthStar")
);
const ruangTesisB4 = await getItems(
  getSurveyKandagaVisitor("r_referensi", "fourthStar")
);
const ruangTesisB3 = await getItems(
  getSurveyKandagaVisitor("r_referensi", "thirdStar")
);
const ruangTesisB2 = await getItems(
  getSurveyKandagaVisitor("r_referensi", "secondStar")
);
const ruangTesisB1 = await getItems(
  getSurveyKandagaVisitor("r_referensi", "firstStar")
);

const ruangBNIB5 = await getItems(
  getSurveyKandagaVisitor("r_bni", "fifthStar")
);
const ruangBNIB4 = await getItems(
  getSurveyKandagaVisitor("r_bni", "fourthStar")
);
const ruangBNIB3 = await getItems(
  getSurveyKandagaVisitor("r_bni", "thirdStar")
);
const ruangBNIB2 = await getItems(
  getSurveyKandagaVisitor("r_bni", "secondStar")
);
const ruangBNIB1 = await getItems(
  getSurveyKandagaVisitor("r_bni", "firstStar")
);

const ruangBelajarB5 = await getItems(
  getSurveyKandagaVisitor("r_belajar", "fifthStar")
);
const ruangBelajarB4 = await getItems(
  getSurveyKandagaVisitor("r_belajar", "fourthStar")
);
const ruangBelajarB3 = await getItems(
  getSurveyKandagaVisitor("r_belajar", "thirdStar")
);
const ruangBelajarB2 = await getItems(
  getSurveyKandagaVisitor("r_belajar", "secondStar")
);
const ruangBelajarB1 = await getItems(
  getSurveyKandagaVisitor("r_belajar", "firstStar")
);

definePageMeta({
  layout: "kunjungan",
});
useHead({
  title: "Hasil Survey Pusat Pengelolaan Pengetahuan UNPAD",
});
</script>

<template>
  <section>
    <div class="heading-block">
      <img src="/images/lambang-unpad.png" alt="" class="w-16" />
      <h1 class="text-orange-6 font-700 text-xl md:text-4xl">
        Daftar Kunjungan
      </h1>
      <h3 class="text-dark font-800 py-2 text-xs sm:text-sm">
        Pusat Pengelolaan Pengetahuan Universitas Padjadjaran
      </h3>
    </div>
    <div class="text-center mb-5">
      <h1 class="bg-dark text-orange py-4 rounded-xl">Hasil Survey</h1>
    </div>
    <div class="flex flex-col gap-10 mb-10">
      <VisitorSurveyRuangan
        nama-ruangan="Lobby Utama"
        :jumlah-penilaian1="lobbyB1.length"
        :jumlah-penilaian2="lobbyB2.length"
        :jumlah-penilaian3="lobbyB3.length"
        :jumlah-penilaian4="lobbyB4.length"
        :jumlah-penilaian5="lobbyB5.length"
      />
      <VisitorSurveyRuangan
        nama-ruangan="Ruang Sirkulasi"
        :jumlah-penilaian1="ruangSirkulasiB1.length"
        :jumlah-penilaian2="ruangSirkulasiB2.length"
        :jumlah-penilaian3="ruangSirkulasiB3.length"
        :jumlah-penilaian4="ruangSirkulasiB4.length"
        :jumlah-penilaian5="ruangSirkulasiB5.length"
      />
      <VisitorSurveyRuangan
        nama-ruangan="Ruang Multimedia"
        :jumlah-penilaian1="ruangMultimediaB1.length"
        :jumlah-penilaian2="ruangMultimediaB2.length"
        :jumlah-penilaian3="ruangMultimediaB3.length"
        :jumlah-penilaian4="ruangMultimediaB4.length"
        :jumlah-penilaian5="ruangMultimediaB5.length"
      />
      <VisitorSurveyRuangan
        nama-ruangan="Ruang Populer"
        :jumlah-penilaian1="ruangPopulerB1.length"
        :jumlah-penilaian2="ruangPopulerB2.length"
        :jumlah-penilaian3="ruangPopulerB3.length"
        :jumlah-penilaian4="ruangPopulerB4.length"
        :jumlah-penilaian5="ruangPopulerB5.length"
      />
      <VisitorSurveyRuangan
        nama-ruangan="Ruang Referensi Koleksi Berkala"
        :jumlah-penilaian1="ruangBerkalaB1.length"
        :jumlah-penilaian2="ruangBerkalaB2.length"
        :jumlah-penilaian3="ruangBerkalaB3.length"
        :jumlah-penilaian4="ruangBerkalaB4.length"
        :jumlah-penilaian5="ruangBerkalaB5.length"
      />
      <VisitorSurveyRuangan
        nama-ruangan="Ruang Referensi Tesis Disertasi"
        :jumlah-penilaian1="ruangTesisB1.length"
        :jumlah-penilaian2="ruangTesisB2.length"
        :jumlah-penilaian3="ruangTesisB3.length"
        :jumlah-penilaian4="ruangTesisB4.length"
        :jumlah-penilaian5="ruangTesisB5.length"
      />
      <VisitorSurveyRuangan
        nama-ruangan="Ruang BNI Co-Working Space"
        :jumlah-penilaian1="ruangBNIB1.length"
        :jumlah-penilaian2="ruangBNIB2.length"
        :jumlah-penilaian3="ruangBNIB3.length"
        :jumlah-penilaian4="ruangBNIB4.length"
        :jumlah-penilaian5="ruangBNIB5.length"
      />
      <VisitorSurveyRuangan
        nama-ruangan="Ruang Belajar Lt. 4"
        :jumlah-penilaian1="ruangBelajarB1.length"
        :jumlah-penilaian2="ruangBelajarB2.length"
        :jumlah-penilaian3="ruangBelajarB3.length"
        :jumlah-penilaian4="ruangBelajarB4.length"
        :jumlah-penilaian5="ruangBelajarB5.length"
      />
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-5xl ma;
}

.heading-block {
  --at-apply: flex flex-col items-center;
}
</style>
