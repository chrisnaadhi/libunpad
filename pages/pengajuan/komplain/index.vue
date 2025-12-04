<script setup>
const val = ref("Ada masalah di Kandaga ?");
const { createItems } = useDirectusItems();

const komplain = ref("");
const ruangan = ref("");
const ruanganLain = ref("");

const kirimKomplain = async () => {
  let dataKomplain = {
    komplain: komplain.value,
    ruangan: ruangan.value === "lainnya" ? ruanganLain.value : ruangan.value,
  };

  if (komplain.value !== "" && ruangan.value !== "") {
    // Check if "lainnya" is selected but custom room is empty
    if (ruangan.value === "lainnya" && ruanganLain.value === "") {
      alert("Mohon isi nama ruangan lainnya");
      return;
    }

    try {
      await createItems({
        collection: "data_komplain",
        items: dataKomplain,
      });
      alert("Komplain berhasil dikirim");
      setTimeout(async () => {
        komplain.value = "";
        ruangan.value = "";
        ruanganLain.value = "";
      }, 500);
    } catch (error) {
      alert("Failed: " + error);
    }
  }
};
</script>

<template>
  <section>
    <h2 class="text-center mt-12">{{ val }}</h2>
    <div class="pb-12 pt-6 px-4">
      <div class="text-center text-6xl md:text-8xl mb-6">💬</div>
      <p
        class="text-center max-w-3xl mx-auto text-base md:text-lg leading-relaxed"
      >
        Halo! Kami di Perpustakaan Kandaga sangat menghargai setiap masukan dari
        Anda. Suara Anda adalah kunci bagi kami untuk terus berkembang dan
        memberikan layanan terbaik. Jangan ragu untuk menyampaikan keluhan,
        saran, atau pengalaman Anda – setiap pendapat Anda sangat berarti dan
        akan kami tindaklanjuti dengan sepenuh hati. Mari bersama-sama
        menciptakan lingkungan perpustakaan yang lebih nyaman dan menyenangkan
        untuk semua! 🌟📚
      </p>
    </div>
    <div class="mb-12">
      <form
        @submit.prevent="kirimKomplain"
        class="container ma max-w-md px-5 text-left"
      >
        <div class="input-form">
          <label for="ruangan">Ruangan:</label>
          <select name="ruangan" id="ruangan" v-model="ruangan">
            <option value="" selected disabled>Pilih Ruangan</option>
            <option value="lobby">Lobby Utama</option>
            <option value="r_belajar">Ruang Belajar</option>
            <option value="r_sirkulasi">Ruang Koleksi Sirkulasi</option>
            <option value="r_bni">BNI Coworking Space</option>
            <option value="r_multimedia">Ruang Multimedia</option>
            <option value="r_populer">Ruang Koleksi Populer</option>
            <option value="r_berkala">Ruang Koleksi Berkala</option>
            <option value="r_referensi">Ruang Koleksi Referensi</option>
            <option value="r_alh">Ruang Assistive Learning Hub</option>
            <option value="r_langka">Ruang Koleksi Langka</option>
            <option value="lainnya">Ruangan Lain</option>
          </select>
        </div>
        <div class="input-form" v-if="ruangan === 'lainnya'">
          <label for="ruangan-lain">Nama Ruangan Lain:</label>
          <input
            type="text"
            name="ruangan-lain"
            id="ruangan-lain"
            v-model="ruanganLain"
            placeholder="Sebutkan nama ruangan..."
          />
        </div>
        <div class="input-form">
          <label for="komplain">Komplain/Masukan:</label>
          <textarea
            name="komplain"
            id="komplain"
            v-model="komplain"
            rows="5"
            placeholder="Tuliskan komplain atau masukan Anda di sini..."
          ></textarea>
        </div>

        <button
          type="submit"
          class="btn bg-orange text-white w-full"
          :disabled="komplain === '' || ruangan === ''"
        >
          Kirim Komplain
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl mx-auto italic px-8;
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
  --at-apply: w-full border border-orange rounded p-2;
}

textarea {
  --at-apply: resize-vertical;
}
</style>
