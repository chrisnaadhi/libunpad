<script setup>
const userData = useIdentitasForm();
const uppercase = uppercaseOpt();
const { addCharacters, delCharacter } = processInputVirtualKeyboard(userData);

const keycaps = {
  q: "q",
  w: "w",
  e: "e",
  r: "r",
  t: "t",
  y: "y",
  u: "u",
  i: "i",
  o: "o",
  p: "p",
  a: "a",
  s: "s",
  d: "d",
  f: "f",
  g: "g",
  h: "h",
  j: "j",
  k: "k",
  l: "l",
  kutip: "'",
  z: "z",
  x: "x",
  c: "c",
  v: "v",
  b: "b",
  n: "n",
  m: "m",
  koma: ",",
  titik: ".",
  strip: "-",
};

const useShift = () => {
  uppercase.value = !uppercase.value;
};
</script>

<template>
  <section class="w-full">
    <div
      class="grid grid-cols-10 gap-1 text-center mx-2 my-5 text-xs sm:(gap-3 text-base)"
    >
      <span
        class="kolom"
        v-for="key in keycaps"
        @click="addCharacters(uppercase, key)"
      >
        {{ uppercase ? key.toUpperCase() : key }}
      </span>
      <span class="kolom col-span-2" @click="useShift">Shift</span>
      <span class="kolom col-span-5" @click="addCharacters(false, ' ')">
        Space
      </span>
      <span class="kolom col-span-2" @click="delCharacter">Delete</span>
      <span class="kolom" @click="userData = ''">(X)</span>
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
