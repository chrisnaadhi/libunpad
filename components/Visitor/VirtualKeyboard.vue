<script setup>
const tabs = ref(["Mode Angka", "Mode Huruf"]);
const tabActive = ref("Mode Angka");

const emit = defineEmits(["choose"]);

const changeActiveTab = (tab) => {
  tabActive.value = tab;
  emit("choose");
};
</script>

<template>
  <main class="flex justify-between font-600 flex-col my-5 sm:(flex-row my-0)">
    <section class="flex flex-col justify-center sm:mx-3">
      <div
        class="tab"
        v-for="tab in tabs"
        @click="changeActiveTab(tab)"
        :class="tabActive === tab ? 'tab-active' : ''"
      >
        <h1 class="text-xs sm:text-base">{{ tab }}</h1>
      </div>
    </section>
    <VisitorKeyboardAngka v-if="tabActive === 'Mode Angka'" />
    <VisitorKeyboardHuruf v-else />
  </main>
</template>

<style scoped>
.tab {
  --at-apply: w-full bg-orange-200 cursor-pointer rounded-md p-2 text-center sm:my-5;
}

.tab-active {
  --at-apply: bg-orange-400;
}
</style>
