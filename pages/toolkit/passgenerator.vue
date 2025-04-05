<script setup>
const val = ref("Kandaga Password Generator");
const password = ref("");
const passLength = ref(16);
const useLowercase = ref(true);
const useUppercase = ref(true);
const useNumbers = ref(true);
const useSymbols = ref(true);

const generatedPass = () => {
  password.value = generateStrongPassword(
    passLength.value,
    useLowercase.value,
    useUppercase.value,
    useNumbers.value,
    useSymbols.value
  );
};

const copyPassword = () => {
  navigator.clipboard.writeText(password.value).then(() => {
    alert("Password berhasil disalin!");
  });
};

onMounted(() => {
  password.value = generateStrongPassword(
    passLength.value,
    useLowercase.value,
    useUppercase.value,
    useNumbers.value,
    useSymbols.value
  );
});
</script>

<template>
  <section>
    <h1>{{ val }}</h1>
    <p>
      Silahkan pilih jumlah karakter password yang diinginkan lalu klik tombol
      <span class="text-unpad font-600">Generate</span>
    </p>
    <div class="flex flex-col items-center">
      <label for="passLength">Jumlah Karakter: </label>
      <input
        type="number"
        class="border border-unpad p-2 rounded w-24 mb-5 text-center"
        v-model="passLength"
      />
    </div>
    <div class="max-w-3xl ma grid grid-cols-2 md:grid-cols-4 gap-1">
      <div class="flex flex-col items-center">
        <label for="useLowercase">Gunakan Huruf Kecil: </label>
        <input type="checkbox" v-model="useLowercase" />
      </div>
      <div class="flex flex-col items-center">
        <label for="useUppercase">Gunakan Huruf Besar: </label>
        <input type="checkbox" v-model="useUppercase" />
      </div>
      <div class="flex flex-col items-center">
        <label for="useNumbers">Gunakan Angka: </label>
        <input type="checkbox" v-model="useNumbers" />
      </div>
      <div class="flex flex-col items-center">
        <label for="useSymbols">Gunakan Simbol: </label>
        <input type="checkbox" v-model="useSymbols" />
      </div>
    </div>
    <div class="max-w-3xl ma py-5 px-2 flex flex-col">
      <button class="generate-btn" @click="generatedPass">Generate</button>
    </div>
    <div class="max-w-3xl ma px-2 flex flex-col">
      <p class="italic">
        Tips : Semakin banyak jumlah karakter maka semakin baik. Minimum paling
        aman adalah 16 digit.
      </p>
    </div>
    <div class="max-w-3xl ma py-5 px-2 flex flex-col">
      <h5>Password :</h5>
      <div
        class="bg-unpad p-5 rounded-xl text-dark cursor-pointer overflow-overlay"
        @click="copyPassword"
      >
        <h2 v-if="password.length > 0">
          {{ password }}
        </h2>
        <h2 v-else>Password akan muncul disini</h2>
      </div>
      <div class="my-5">
        <button class="generate-btn w-full" @click="copyPassword">
          Salin Password
        </button>
      </div>
    </div>
    <div class="min-w-72 ma">
      <NuxtLink to="/toolkit" class="btn w-full bg-unpad text-white">
        &leftarrow; Kembali ke daftar Toolkit
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: pt-5 text-center;
}

.generate-btn {
  --at-apply: bg-unpad hover:bg-orange text-dark px-4 py-2 rounded-md transition-all-500;
}
</style>
