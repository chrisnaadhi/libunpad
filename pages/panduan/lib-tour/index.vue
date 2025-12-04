<script setup>
const val = ref("Library Tour Kandaga");
const { createItems } = useDirectusItems();

const nama = ref("");
const institusi = ref("");
const npm = ref("");
const detail = ref("");

const kirimPresensi = async () => {
  let dataPresence = {
    nama: nama.value,
    institusi: institusi.value,
    npm: npm.value,
    institusi_detail: detail.value,
  };

  if (nama.value !== "" && institusi.value !== "") {
    try {
      await createItems({
        collection: "data_kunjungan_panduan_libtour",
        items: dataPresence,
      });
      alert("Kunjungan berhasi diterima");
      setTimeout(async () => {
        nama.value = "";
        institusi.value = "";
        npm.value = "";
        detail.value = "";
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
    <div class="pt-6 pb-12">
      <div
        style="
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 56.25%;
          padding-bottom: 0;
          box-shadow: 0 2px 8px 0 rgba(63, 69, 81, 0.16);
          margin-top: 1.6em;
          margin-bottom: 0.9em;
          overflow: hidden;
          border-radius: 8px;
          will-change: transform;
        "
      >
        <iframe
          loading="lazy"
          style="
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border: none;
            padding: 0;
            margin: 0;
          "
          src="https://www.canva.com/design/DAGvQiVUgms/T0twalMeHCSCS21udcZuFw/view?embed"
          allowfullscreen="allowfullscreen"
          allow="fullscreen"
        >
        </iframe>
      </div>
      <a
        href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAGvQiVUgms&#x2F;T0twalMeHCSCS21udcZuFw&#x2F;view?utm_content=DAGvQiVUgms&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link"
        target="_blank"
        rel="noopener"
      >
        Kandaga Digital Library
      </a>
      by Kandaga Universitas Padjadjaran
    </div>
    <div class="pb-12">
      <p>
        Selamat datang di tur perpustakaan digital Kandaga! Dalam tur ini, Anda
        akan diajak untuk menjelajahi berbagai fitur dan layanan yang ditawarkan
        oleh perpustakaan digital kami. Kami berharap tur ini dapat membantu
        Anda memahami cara memanfaatkan sumber daya digital yang tersedia untuk
        mendukung pembelajaran dan penelitian Anda.
      </p>
    </div>
    <div class="mb-12">
      <h4 class="text-center">Data Kunjungan Library Tour</h4>
      <form
        @submit.prevent="kirimPresensi"
        class="container ma max-w-md px-5 text-left"
      >
        <div class="input-form">
          <label for="nama">Nama Lengkap:</label>
          <input type="text" name="nama" id="nama" v-model="nama" />
        </div>
        <div class="input-form">
          <label for="institusi">Institusi:</label>
          <select name="institusi" id="institusi" v-model="institusi">
            <option value="" selected disabled>Silahkan Pilih</option>
            <option value="unpad">Universitas Padjadjaran</option>
            <option value="other">Institusi Lainnya</option>
          </select>
        </div>
        <div>
          <div class="input-form" v-if="institusi == 'unpad'">
            <label for="npm">NPM: </label>
            <input type="text" v-model="npm" />
          </div>
          <div class="input-form" v-else-if="institusi == 'other'">
            <label for="institusi-lain">
              Sebutkan Nama Institusi jika memilih "Institusi Lainnya":
            </label>
            <input
              type="text"
              name="institusi-lain"
              id="institusi-lain"
              v-model="detail"
            />
          </div>
        </div>

        <button
          type="submit"
          class="btn bg-orange text-white w-full"
          :disabled="nama === '' || institusi === ''"
        >
          Submit
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
select {
  --at-apply: w-full border border-orange rounded p-2;
}
</style>
