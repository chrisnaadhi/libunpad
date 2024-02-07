<script setup>
const defaultDescription = "Konten deskripsi belum tersedia";

defineProps({
  imgFile: String,
  description: String,
});
</script>

<template>
  <section>
    <div class="flex items-start justify-between gap-4">
      <NuxtImg
        src="/images/teater1.png"
        format="webp"
        class="max-w-full max-h-50 object-cover rounded-xl"
      />
      <div>
        <slot />
        <p>
          {{ description ?? defaultDescription }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
p {
  --at-apply: italic;
}
</style>
