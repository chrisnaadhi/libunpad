<script setup>
const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>

<template>
  <Transition name="fade">
    <main>
      <section class="flex flex-col mt--10 z-5 h-full w-full items-center justify-center gap-3">
        <div class="mb--8 z-2 w-full max-w-80 flex items-center justify-end">
          <button class="bg-orange rounded-full max-w-8 px-2 py-1 text-white" @click.stop="closeModal">
            &cross;
          </button>
        </div>
        <slot class="z-4 min-w-full" />
        <div class="relative cursor-pointer">
          <p class=" px-5 py-1 text-sm bg-orange rounded text-white" @click.stop="closeModal">
            Close ✖
          </p>
        </div>
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
