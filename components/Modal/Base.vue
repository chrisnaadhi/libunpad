<script setup>
const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>

<template>
  <Transition name="fade">
    <main>
      <p class="close-btn" @click="closeModal">✖</p>
      <section class="flex flex-col h-full items-center justify-center">
        <slot />
        <button class="btn bg-orange-4 my-2" @click="closeModal">Tutup</button>
      </section>
    </main>
  </Transition>
</template>

<style scoped>
main {
  --at-apply: w-full h-full fixed z-2 bg-dark/50;
  overflow: hidden;
}

.close-btn {
  --at-apply: absolute right-0 m-2 text-2xl text-white cursor-pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
