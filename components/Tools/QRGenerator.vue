<script setup>
import QRCode from "easyqrcodejs";
const textForQR = ref("");
const generatedArea = ref(null);
const options = {
  text: textForQR.value,
  width: 360,
  height: 360,
  correctLevel: QRCode.CorrectLevel.H,
  logo: "/images/versi3.png",
  logoWidth: 100,
  logoHeight: 100,
  PO: "#F7A22D",
  PI: "#101056",
  title: "KandagaQR",
  titleFont: "bold 18px Kanit",
  titleHeight: 35,
  titleTop: 25,
};

function generateQR() {
  if (generatedArea.value) {
    generatedArea.value.innerHTML = "";
  }
  const qrcode = new QRCode(generatedArea.value, options);
  qrcode.makeCode(textForQR.value);
}

function clearQR() {
  const qrcode = new QRCode(generatedArea.value);
  textForQR.value = "";
  return qrcode.clear();
}

function downloadQR() {
  const canvas = document.getElementsByTagName("canvas")[0];
  const image = canvas
    .toDataURL("image/png", 1.0)
    .replace("image/png", "image/octet-stream");
  const link = document.createElement("a");
  link.download = `KandagaQR-${textForQR.value}.png`;
  link.href = image;
  link.click();
}
</script>

<template>
  <h1>Kandaga QRCode Generator</h1>
  <p>
    Masukkan teks atau tautan (link) lalu klik tombol
    <span class="text-orange font-600">Generate</span>
  </p>
  <div class="input-area">
    <input type="text" name="textqr" id="" v-model="textForQR" />
    <button
      class="generate-btn"
      :class="!textForQR ? 'bg-gray cursor-not-allowed' : 'bg-orange'"
      @click="generateQR"
      :disabled="!textForQR"
    >
      Generate
    </button>
  </div>
  <div class="qr-area" ref="generatedArea"></div>
  <div class="my-5 flex items-center max-w-72 ma gap-2">
    <button
      :class="textForQR ? 'download-btn' : 'btn-disabled'"
      ref="download"
      @click="downloadQR"
      :disabled="!textForQR"
    >
      Download
    </button>
    <button
      :class="textForQR ? 'reset-btn' : 'btn-disabled'"
      @click="clearQR"
      :disabled="!textForQR"
    >
      Reset
    </button>
  </div>
  <div class="min-w-72 ma">
    <NuxtLink to="/toolkit" class="btn w-full bg-orange text-white">
      Kembali ke daftar Toolkit
    </NuxtLink>
  </div>
</template>

<style scoped>
h1 {
  --at-apply: text-3xl font-600;
}

.input-area {
  --at-apply: px-2 my-2 flex flex-col items-center justify-center gap-1 sm:(flex-row w-full);
}

input {
  --at-apply: border border-orange p-2 rounded w-full max-w-xl;
}

.generate-btn {
  --at-apply: btn w-full sm:max-w-24 text-white;
}

.qr-area {
  --at-apply: flex items-center justify-center;
}

.download-btn {
  --at-apply: btn bg-orange text-white w-full font-600;
}

.reset-btn {
  --at-apply: btn w-full bg-orange-1 text-orange font-600 hover:(bg-orange text-white);
}

.btn-disabled {
  --at-apply: btn w-full bg-gray-1 text-gray-5 font-600 cursor-not-allowed hover:(bg-gray text-white);
}
</style>
