<script setup>
const tabs = ref(["Mode Angka", "Mode Huruf", "Kontak Kami"]);
const tabActive = ref("Mode Angka");

const emit = defineEmits(["choose", "writing"]);

const changeActiveTab = (tab) => {
  tabActive.value = tab;
  emit("choose");
};

const focusWriting = () => {
  emit("writing");
};
</script>

<template>
  <main class="flex justify-between font-600 flex-col my-5 sm:(flex-row my-0)">
    <section class="flex flex-col w-30 justify-center">
      <div
        class="tab"
        v-for="tab in tabs"
        @click="changeActiveTab(tab)"
        :class="tabActive === tab ? 'tab-active' : ''"
      >
        <h1 class="text-xs sm:text-sm">{{ tab }}</h1>
      </div>
    </section>
    <VisitorKeyboardAngka
      v-if="tabActive === 'Mode Angka'"
      @click="focusWriting"
    />
    <VisitorKeyboardHuruf
      v-else-if="tabActive === 'Mode Huruf'"
      @click="focusWriting"
    />
    <VisitorKeyboardKontak v-else-if="tabActive === 'Kontak Kami'" />
  </main>
</template>

<style scoped>
.tab {
  --at-apply: w-full bg-gray-400 text-white cursor-pointer rounded-md p-2 text-center sm:my-5;
}

.tab-active {
  --at-apply: bg-orange-400 text-dark;
}
</style>
