<script setup>
const userData = useIdentitasForm();
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
  garing: "/",
};
const uppercase = ref(false);

const useShift = () => {
  uppercase.value = !uppercase.value;
};
</script>

<template>
  <section>
    <div
      class="grid grid-cols-10 gap-1 text-center my-5 text-xs sm:(gap-3 text-base)"
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
        Spasi
      </span>
      <span class="kolom col-span-2" @click="delCharacter">Delete</span>
      <span class="kolom" @click="userData = ''">(X)</span>
    </div>
  </section>
</template>

<style scoped>
.kolom {
  --at-apply: bg-orange-300 rounded-md px-3 py-2 cursor-pointer;
}
</style>
