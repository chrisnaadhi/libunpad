<script setup>
const tabs = ref(["Mode Angka", "Mode Huruf"]);
const tabActive = ref("Mode Angka");

const changeActiveTab = (tab) => {
  tabActive.value = tab;
};
</script>

<template>
  <main class="flex justify-between font-600">
    <section class="flex flex-col justify-center mx-3">
      <div class="tab" v-for="tab in tabs" @click="changeActiveTab(tab)">
        <h1>{{ tab }}</h1>
      </div>
    </section>
    <section class="min-w-lg" v-if="tabActive === 'Mode Angka'">
      <div class="flex justify-between text-center m-3">
        <span class="w-full bg-orange-300 rounded-md py-2 px-4 mx-3">1</span>
        <span class="w-full bg-orange-300 rounded-md py-2 px-4 mx-3">2</span>
        <span class="w-full bg-orange-300 rounded-md py-2 px-4 mx-3">3</span>
      </div>
      <div class="flex justify-between text-center m-3">
        <span class="w-full bg-orange-300 rounded-md py-2 px-4 mx-3">4</span>
        <span class="w-full bg-orange-300 rounded-md py-2 px-4 mx-3">5</span>
        <span class="w-full bg-orange-300 rounded-md py-2 px-4 mx-3">6</span>
      </div>
      <div class="flex justify-between text-center m-3">
        <span class="w-full bg-orange-300 rounded-md py-2 px-4 mx-3">7</span>
        <span class="w-full bg-orange-300 rounded-md py-2 px-4 mx-3">8</span>
        <span class="w-full bg-orange-300 rounded-md py-2 px-4 mx-3">9</span>
      </div>
      <div class="flex justify-between text-center m-3">
        <span class="w-full bg-orange-300 rounded-md py-2 px-4 mx-3"
          >Clear</span
        >
        <span class="w-full bg-orange-300 rounded-md py-2 px-4 mx-3">0</span>
        <span class="w-full bg-orange-300 rounded-md py-2 px-4 mx-3">Del</span>
      </div>
    </section>
    <section v-else>
      <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </div>
    </section>
  </main>
</template>

<style scoped>
.tab {
  --at-apply: w-full bg-gray-200 cursor-pointer rounded-md my-5 p-2;
}

.tab-active {
  --at-apply: bg-orange-400;
}
</style>
