<script setup>
import { internationalization } from "~/composables/locale/main";

definePageMeta({
  layout: "kunjungan",
});
const heading = ref("Rekap Data Kunjungan");
const { currentTime } = useCurrentTime();
const message = internationalization();

const localeState = useState("lang", () => {
  return "en";
});

const changeLocale = () => {
  if (localeState.value === "en") {
    localeState.value = "id";
  } else {
    localeState.value = "en";
  }
};
</script>

<template>
  <section class="main-layer">
    <h1>{{ heading }}</h1>
    <div>
      <p>
        <span v-if="localeState === 'en'">{{ message.en.welcome }}</span>
        <span v-else>{{ message.id.welcome }}</span>
        Kandaga
      </p>
    </div>
    <button @click="changeLocale" class="btn bg-white">Change Locale</button>
    {{ localeState }}
  </section>
</template>

<style scoped>
.main-layer {
  background-image: url("/images/background-image-visitor.png");
  background-repeat: no-repeat;
  background-size: cover;
  --at-apply: min-h-screen w-full;
}

h1 {
  --at-apply: text-center text-3xl;
}
</style>
