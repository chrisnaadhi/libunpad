<script setup>
const { locale } = useI18n();
const val = ref("Panduan Akses E-Journal dan E-Resources Unpad");
</script>

<template>
  <section>
    <div class="w-full relative">
      <NuxtImg
        type="webp"
        src="https://kandaga.unpad.ac.id/backoffice/assets/ACFE8D01-7E69-4905-B70A-6F043E94C7E8"
        class="w-full max-h-80 object-cover relative"
        alt="daring"
      />
      <div
        class="absolute left-0 right-0 m-inline-auto top-35% w-fit text-white text-center"
      >
        <h2>{{ $t("eJournalAccess") }}</h2>
        <p>
          {{ $t("eJournalAccessDescription") }}
        </p>
      </div>
      <div
        class="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent"
      ></div>
    </div>
    <div class="max-w-7xl ma py-20">
      <div class="text-center">
        <h3 class="font-semibold">
          {{ $t("eJournalHeader") }}
        </h3>
        <p class="text-justify px-5">
          {{ $t("eJournalHeaderDescription") }}
        </p>
        <div class="my-5">
          <NuxtLink
            to="https://pintu.unpad.ac.id"
            target="_blank"
            class="btn bg-orange text-white py-1"
          >
            Pintu Unpad &rightarrow;
          </NuxtLink>
        </div>
        <p class="text-justify px-5">
          {{ $t("eJournalHelper") }}
        </p>

        <div class="overflow-hidden w-full h-screen px-5">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube-nocookie.com/embed/_nMfHZ_1kGQ?si=8RQTyExDlf9dlMyB"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            v-if="locale === 'id'"
          ></iframe>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube-nocookie.com/embed/dyw6DvTAelo?si=aFH7htDd4nDo11FL"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            v-else
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
p {
  --at-apply: italic;
}
</style>
