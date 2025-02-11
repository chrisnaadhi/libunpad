<script setup>
const { createItems, getItems } = useDirectusItems();
const data = ref("Survey Kandaga");

const selectedRating = ref("");
const masukan = ref("");
const ruangan = useCookie("namaRuanganVisitor");
const viewSurvey = ref(true);
const ratingValue = computed(() => {
  switch (selectedRating.value) {
    case "fifthStar":
      return 5;
    case "fourthStar":
      return 4;
    case "thirdStar":
      return 3;
    case "secondStar":
      return 2;
    case "firstStar":
      return 1;
    default:
      return null;
  }
});

const ratingData = ref({
  firstStar: false,
  secondStar: false,
  thirdStar: false,
  fourthStar: false,
  fifthStar: false,
});

const changeStarValue = (starValue) => {
  selectedRating.value = starValue;
  switch (starValue) {
    case "firstStar":
      ratingData.value.firstStar = true;
      ratingData.value.secondStar = false;
      ratingData.value.thirdStar = false;
      ratingData.value.fourthStar = false;
      ratingData.value.fifthStar = false;
      break;
    case "secondStar":
      ratingData.value.firstStar = true;
      ratingData.value.secondStar = true;
      ratingData.value.thirdStar = false;
      ratingData.value.fourthStar = false;
      ratingData.value.fifthStar = false;
      break;
    case "thirdStar":
      ratingData.value.firstStar = true;
      ratingData.value.secondStar = true;
      ratingData.value.thirdStar = true;
      ratingData.value.fourthStar = false;
      ratingData.value.fifthStar = false;
      break;
    case "fourthStar":
      ratingData.value.firstStar = true;
      ratingData.value.secondStar = true;
      ratingData.value.thirdStar = true;
      ratingData.value.fourthStar = true;
      ratingData.value.fifthStar = false;
      break;
    case "fifthStar":
      ratingData.value.firstStar = true;
      ratingData.value.secondStar = true;
      ratingData.value.thirdStar = true;
      ratingData.value.fourthStar = true;
      ratingData.value.fifthStar = true;
      break;
    default:
      break;
  }
};

const sendSuveyData = async () => {
  try {
    await createItems({
      collection: "survey_kunjungan",
      items: {
        nama_ruangan: ruangan.value,
        selected_star: selectedRating.value,
        masukan: masukan.value,
        number_value: ratingValue.value,
      },
    });
  } catch (error) {
    console.log(error);
  }
  viewSurvey.value = false;
  setTimeout(() => {
    selectedRating.value = "";
    masukan.value = "";
    ratingData.value.firstStar = false;
    ratingData.value.secondStar = false;
    ratingData.value.thirdStar = false;
    ratingData.value.fourthStar = false;
    ratingData.value.fifthStar = false;
    viewSurvey.value = true;
  }, 3000);
};
</script>

<template>
  <section>
    <h3 class="text-center">{{ data }}</h3>
    <div v-if="viewSurvey">
      <div class="msg-block" v-if="selectedRating === ''">
        <img src="/emoji/standard.png" alt="Hello User!" class="w-32 h-32" />
        <p class="text-center">
          Halo! Kandaga saat ini sedang mengadakan survey rutin, sehingga kami
          membutuhkan kamu untuk mengisi penilaian terhadap fasilitas dan
          layanan yang sudah kamu rasakan di Gd. Kandaga. Silahkan klik bintang
          dibawah ini sesuai dengan pengalaman yang kamu rasakan dengan
          pelayanan kami di ruang :
        </p>
        <div class="bg-dark w-full text-center text-unpad rounded-xl py-1">
          <h4>{{ displayRuangan(ruangan) }}</h4>
        </div>
      </div>
      <div class="msg-block" v-else-if="selectedRating === 'firstStar'">
        <img src="/emoji/1star.png" alt="Hello User!" class="w-32 h-32" />
        <p class="text-center">
          Apa yang membuatmu kecewa terhadap pelayanan kami di ruangan ini :
        </p>
        <div class="bg-dark w-full text-center text-unpad rounded-xl py-1">
          <h4>{{ displayRuangan(ruangan) }}</h4>
        </div>
      </div>
      <div class="msg-block" v-else-if="selectedRating === 'secondStar'">
        <img src="/emoji/2star.png" alt="Hello User!" class="w-32 h-32" />
        <p class="text-center">
          Menurutmu bagaimana kami bisa memperbaiki pelayanan kami untuk ruangan
          ini :
        </p>
        <div class="bg-dark w-full text-center text-unpad rounded-xl py-1">
          <h4>{{ displayRuangan(ruangan) }}</h4>
        </div>
      </div>
      <div class="msg-block" v-else-if="selectedRating === 'thirdStar'">
        <img src="/emoji/3star.png" alt="Hello User!" class="w-32 h-32" />
        <p class="text-center">
          Apakah ada masukan atau saran yang ingin kamu sampaikan terhadap
          ruangan ini :
        </p>
        <div class="bg-dark w-full text-center text-unpad rounded-xl py-1">
          <h4>{{ displayRuangan(ruangan) }}</h4>
        </div>
      </div>
      <div class="msg-block" v-else-if="selectedRating === 'fourthStar'">
        <img src="/emoji/4star.png" alt="Hello User!" class="w-32 h-32" />
        <p class="text-center">
          Menurutmu bagaimana kami bisa meningkatkan pelayanan kami untuk
          ruangan ini :
        </p>
        <div class="bg-dark w-full text-center text-unpad rounded-xl py-1">
          <h4>{{ displayRuangan(ruangan) }}</h4>
        </div>
      </div>
      <div class="msg-block" v-else-if="selectedRating === 'fifthStar'">
        <img src="/emoji/5star.png" alt="Hello User!" class="w-32 h-32" />
        <p class="text-center">
          Apa pesan kesan-mu terhadap pelayanan kami ? dan bagaimana pendapatmu
          mengenai ruangan ini :
        </p>
        <div class="bg-dark w-full text-center text-unpad rounded-xl py-1">
          <h4>{{ displayRuangan(ruangan) }}</h4>
        </div>
      </div>
      <div class="my-2 flex items-center justify-center">
        <button @click="changeStarValue('firstStar')">
          <div
            class="w-20 h-20 text-amber"
            :class="ratingData.firstStar ? 'i-mdi-star' : 'i-mdi-star-outline'"
          />
        </button>
        <button @click="changeStarValue('secondStar')">
          <div
            class="w-20 h-20 text-amber"
            :class="ratingData.secondStar ? 'i-mdi-star' : 'i-mdi-star-outline'"
          />
        </button>
        <button @click="changeStarValue('thirdStar')">
          <div
            class="w-20 h-20 text-amber"
            :class="ratingData.thirdStar ? 'i-mdi-star' : 'i-mdi-star-outline'"
          />
        </button>
        <button @click="changeStarValue('fourthStar')">
          <div
            class="w-20 h-20 text-amber"
            :class="ratingData.fourthStar ? 'i-mdi-star' : 'i-mdi-star-outline'"
          />
        </button>
        <button @click="changeStarValue('fifthStar')">
          <div
            class="w-20 h-20 text-amber"
            :class="ratingData.fifthStar ? 'i-mdi-star' : 'i-mdi-star-outline'"
          />
        </button>
      </div>
      <div class="my--3 text-center">
        <h3 v-show="selectedRating === 'firstStar'" class="text-red-6">
          Sangat Kurang
        </h3>
        <h3 v-show="selectedRating === 'secondStar'" class="text-red">
          Kurang
        </h3>
        <h3 v-show="selectedRating === 'thirdStar'" class="text-yellow">
          Cukup
        </h3>
        <h3 v-show="selectedRating === 'fourthStar'" class="text-green">
          Baik
        </h3>
        <h3 v-show="selectedRating === 'fifthStar'" class="text-green-6">
          Sangat Baik
        </h3>
      </div>
      <form
        v-if="selectedRating !== ''"
        @submit.prevent="sendSuveyData"
        autocomplete="off"
      >
        <div class="input-block">
          <label for="masukan" v-show="selectedRating === 'fifthStar'"
            >Kesan / Pesan :
          </label>
          <label for="masukan" v-show="selectedRating === 'fourthStar'"
            >Masukan :
          </label>
          <label for="masukan" v-show="selectedRating === 'thirdStar'"
            >Masukan :
          </label>
          <label for="masukan" v-show="selectedRating === 'secondStar'"
            >Kritik :
          </label>
          <label for="masukan" v-show="selectedRating === 'firstStar'"
            >Kritik :
          </label>
          <textarea
            name="masukan"
            id="masukan"
            v-model="masukan"
            class="input-area"
          />
        </div>
        <button class="btn bg-unpad w-full mt--4 text-white" type="submit">
          Kirim
        </button>
      </form>
    </div>
    <div v-else class="flex flex-col items-center text-center">
      <div class="i-mdi-check-decagram text-green-5 w-32 h-32" />
      <h3 class="text-green-6">Terima Kasih sudah mengisi survey!</h3>
      <p class="text-sm">
        Kritik, Saran dan Masukan anda sangat bermanfaat bagi kami untuk
        meningkatkan kembali pelayanan kami di kemudia hari. Jika ada pertanyaan
        atau pesan lebih lengkap yang ingin disampaikan kepada kami, silahkan
        hubungi kami di
      </p>
      <p>Instagram / Twitter : @kandagaunpad</p>
      <p>Whatsapp : +6282315798979</p>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: bg-white rounded-lg max-w-md p-3 mb-3;
}

p {
  --at-apply: italic;
}

.msg-block {
  --at-apply: flex flex-col items-center justify-center;
}
</style>
