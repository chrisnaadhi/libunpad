<script setup>
const { createItems, getItems } = useDirectusItems();
const data = ref("Survey Kandaga");

const selectedRating = ref("");
const masukan = ref("");
const ruangan = useCookie("namaRuanganVisitor")

const ratingData = ref({
  firstStar: false,
  secondStar: false,
  thirdStar: false,
  fourthStar: false,
  fifthStar: false,
});

const changeStarValue = (starValue) => {
  selectedRating.value = starValue
  switch (starValue) {
    case "firstStar":
      ratingData.value.firstStar = true
      ratingData.value.secondStar = false
      ratingData.value.thirdStar = false
      ratingData.value.fourthStar = false
      ratingData.value.fifthStar = false
      break;
    case "secondStar":
    ratingData.value.firstStar = true
      ratingData.value.secondStar = true
      ratingData.value.thirdStar = false
      ratingData.value.fourthStar = false
      ratingData.value.fifthStar = false
      break;
    case "thirdStar":
      ratingData.value.firstStar = true
      ratingData.value.secondStar = true
      ratingData.value.thirdStar = true
      ratingData.value.fourthStar = false
      ratingData.value.fifthStar = false
      break;
    case "fourthStar":
      ratingData.value.firstStar = true
      ratingData.value.secondStar = true
      ratingData.value.thirdStar = true
      ratingData.value.fourthStar = true
      ratingData.value.fifthStar = false
      break;
    case "fifthStar":
      ratingData.value.firstStar = true
      ratingData.value.secondStar = true
      ratingData.value.thirdStar = true
      ratingData.value.fourthStar = true
      ratingData.value.fifthStar = true
      break;
    default:
      break;
  }
  console.log(starValue)
};

const sendSuveyData = async (starValue) => {
  try {
    await createItems({
      collection: "survey_kunjungan",
      items: {
        nama_ruangan: ruangan,
        selected_star: selectedRating,
        masukan: masukan
    }
  });
  } catch (error) {
    console.log(error)
  }
  selectedRating.value = "";
  masukan.value = "";
};
</script>

<template>
  <section>
    <h3 class="text-center">{{ data }}</h3>
    <div>
      <div class="msg-block" v-if="selectedRating === ''">
        <img src="/emoji/standard.png" alt="Hello User!" class="w-32 h-32">
        <p class="text-center">
          Halo! Kandaga saat ini sedang mengadakan survey rutin, sehingga kami membutuhkan kamu untuk mengisi penilaian terhadap fasilitas dan layanan yang sudah kamu rasakan di Gd. Kandaga. Silahkan klik bintang dibawah ini sesuai dengan pengalaman yang kamu rasakan dengan pelayanan kami.
        </p>
      </div>
      <div class="msg-block" v-else-if="selectedRating === 'firstStar'">
        <img src="/emoji/1star.png" alt="Hello User!" class="w-32 h-32">
        <p class="text-center">
          Halo! Kandaga saat ini sedang mengadakan survey rutin, sehingga kami membutuhkan kamu untuk mengisi penilaian terhadap fasilitas dan layanan yang sudah kamu rasakan di Gd. Kandaga. Silahkan klik bintang dibawah ini sesuai dengan pengalaman yang kamu rasakan dengan pelayanan kami.
        </p>
      </div>
      <div class="msg-block" v-else-if="selectedRating === 'secondStar'">
        <img src="/emoji/2star.png" alt="Hello User!" class="w-32 h-32">
        <p class="text-center">
          Halo! Kandaga saat ini sedang mengadakan survey rutin, sehingga kami membutuhkan kamu untuk mengisi penilaian terhadap fasilitas dan layanan yang sudah kamu rasakan di Gd. Kandaga. Silahkan klik bintang dibawah ini sesuai dengan pengalaman yang kamu rasakan dengan pelayanan kami.
        </p>
      </div>
      <div class="msg-block" v-else-if="selectedRating === 'thirdStar'">
        <img src="/emoji/3star.png" alt="Hello User!" class="w-32 h-32">
        <p class="text-center">
          Halo! Kandaga saat ini sedang mengadakan survey rutin, sehingga kami membutuhkan kamu untuk mengisi penilaian terhadap fasilitas dan layanan yang sudah kamu rasakan di Gd. Kandaga. Silahkan klik bintang dibawah ini sesuai dengan pengalaman yang kamu rasakan dengan pelayanan kami.
        </p>
      </div>
      <div class="msg-block" v-else-if="selectedRating === 'fourthStar'">
        <img src="/emoji/4star.png" alt="Hello User!" class="w-32 h-32">
        <p class="text-center">
          Halo! Kandaga saat ini sedang mengadakan survey rutin, sehingga kami membutuhkan kamu untuk mengisi penilaian terhadap fasilitas dan layanan yang sudah kamu rasakan di Gd. Kandaga. Silahkan klik bintang dibawah ini sesuai dengan pengalaman yang kamu rasakan dengan pelayanan kami.
        </p>
      </div>
      <div class="msg-block" v-else-if="selectedRating === 'fifthStar'">
        <img src="/emoji/5star.png" alt="Hello User!" class="w-32 h-32">
        <p class="text-center">
          Halo! Kandaga saat ini sedang mengadakan survey rutin, sehingga kami membutuhkan kamu untuk mengisi penilaian terhadap fasilitas dan layanan yang sudah kamu rasakan di Gd. Kandaga. Silahkan klik bintang dibawah ini sesuai dengan pengalaman yang kamu rasakan dengan pelayanan kami.
        </p>
      </div>
      <div class="my-2 flex items-center justify-center">
        <button @click="changeStarValue('firstStar')">
          <div class="w-20 h-20 text-amber" :class="ratingData.firstStar ? 'i-mdi-star' : 'i-mdi-star-outline'" />
        </button>
        <button @click="changeStarValue('secondStar')">
          <div class="w-20 h-20 text-amber" :class="ratingData.secondStar ? 'i-mdi-star' : 'i-mdi-star-outline'" />
        </button>
        <button @click="changeStarValue('thirdStar')">
          <div class="w-20 h-20 text-amber" :class="ratingData.thirdStar ? 'i-mdi-star' : 'i-mdi-star-outline'" />
        </button>
        <button @click="changeStarValue('fourthStar')">
          <div class="w-20 h-20 text-amber" :class="ratingData.fourthStar ? 'i-mdi-star' : 'i-mdi-star-outline'" />
        </button>
        <button @click="changeStarValue('fifthStar')">
          <div class="w-20 h-20 text-amber" :class="ratingData.fifthStar ? 'i-mdi-star' : 'i-mdi-star-outline'" />
        </button>
      </div>
      <form v-if="selectedRating !== ''">
        <div class="input-block">
          <label for="masukan" v-show="selectedRating === 'fifthStar'">Kesan / Pesan : </label>
          <label for="masukan" v-show="selectedRating === 'fourthStar'">Masukan : </label>
          <label for="masukan" v-show="selectedRating === 'thirdStar'">Masukan : </label>
          <label for="masukan" v-show="selectedRating === 'secondStar'">Kritik : </label>
          <label for="masukan" v-show="selectedRating === 'firstStar'">Kritik : </label>
          <textarea name="masukan" id="masukan" v-model="masukan" class="input-area" />
        </div>
        <button class="btn bg-orange w-full" type="submit">Kirim</button>
      </form>
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
