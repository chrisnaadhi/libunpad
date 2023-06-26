<script setup>
const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>

<template>
  <Transition name="fade">
    <main @click="closeModal">
      <div class="relative flex justify-center cursor-pointer">
        <p
          class="absolute mt-18 text-center px-2 bg-orange rounded text-white"
          @click.stop="closeModal"
        >
          Close ✖
        </p>
      </div>

      <section class="flex mt--10 flex-col h-full items-center justify-center">
        <slot />
      </section>
    </main>
  </Transition>
</template>

<style scoped>
main {
  --at-apply: w-full h-full mt-15 fixed z-2 bg-dark/50;
  overflow: hidden;
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
