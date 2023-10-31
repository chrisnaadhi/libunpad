<script setup>
const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>

<template>
  <Transition name="fade">
    <main @click="closeModal">
      <section
        class="flex mt--10 flex-col h-full w-full items-center justify-center"
      >
        <div class="relative cursor-pointer">
          <p
            class="px-10 bg-orange rounded text-white"
            @click.stop="closeModal"
          >
            Close ✖
          </p>
        </div>
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
