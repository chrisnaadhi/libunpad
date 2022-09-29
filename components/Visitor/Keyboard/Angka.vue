<script setup>
const userData = useIdentitasForm();
const { addCharacters, delCharacter } = processInputVirtualKeyboard(userData);

const keycaps = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
};
</script>

<template>
  <section class="w-full md:min-w-lg">
    <div class="grid grid-cols-3 gap-1 text-center m-1 sm:(gap-4 m-4)">
      <span
        class="kolom"
        v-for="angka in keycaps"
        @click="addCharacters(false, angka)"
      >
        {{ angka }}
      </span>
      <span class="kolom" @click="userData = ''">Clear</span>
      <span class="kolom" @click="addCharacters(false, '0')">0</span>
      <span class="kolom" @click="delCharacter">Delete</span>
    </div>
  </section>
</template>

<style scoped>
.kolom {
  --at-apply: bg-orange-400 rounded-md p-2 cursor-pointer;
}
.kolom:active {
  --at-apply: bg-dark text-white drop-shadow shadow-xl;
}
</style>
