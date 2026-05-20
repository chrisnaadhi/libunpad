<script setup>
import { computed } from "vue";
import { trimTitle } from "~/composables/utilsFunction";

const props = defineProps({
  left: Boolean,
  title: String,
  description: String,
  page: String,
  detailPage: String,
  firstCollection: Object,
  secondCollection: Object,
});

const {
  left,
  title,
  description,
  page,
  detailPage,
  firstCollection,
  secondCollection,
} = props;
const { getThumbnail: img } = useDirectusFiles();

const resolveImage = (source) => {
  if (!source) return "/images/no-image.jpg";
  if (typeof source === "string" && /^(https?:)?\//.test(source)) {
    return source;
  }
  return img(source);
};

const heroImage = computed(() => {
  const asset =
    firstCollection?.thumbnail ||
    firstCollection?.cover ||
    secondCollection?.thumbnail ||
    secondCollection?.cover;
  return asset ? resolveImage(asset) : "/images/9396112_3023.jpg";
});

const detailBase = computed(() => detailPage || page);

const firstTitle = computed(
  () => firstCollection?.judul || firstCollection?.title || "Belum ada Koleksi",
);
const secondTitle = computed(
  () =>
    secondCollection?.judul || secondCollection?.title || "Belum ada Koleksi",
);
const firstDescription = computed(() => {
  if (firstCollection?.keterangan_koleksi) {
    return trimTitle(firstCollection.keterangan_koleksi, 80);
  }
  if (firstCollection?.description) {
    return trimTitle(firstCollection.description, 80);
  }
  return "Belum ada deskripsi koleksi";
});
const secondDescription = computed(() => {
  if (secondCollection?.keterangan_koleksi) {
    return trimTitle(secondCollection.keterangan_koleksi, 80);
  }
  if (secondCollection?.description) {
    return trimTitle(secondCollection.description, 80);
  }
  return "Belum ada deskripsi koleksi";
});
</script>

<template>
  <main class="w-full">
    <div
      class="group rounded-[2rem] border border-slate-200/75 bg-slate-950/5 p-5 shadow-[0_28px_70px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 sm:p-6"
    >
      <div
        class="mb-6 flex flex-col gap-4 rounded-[1.75rem] border border-slate-200/75 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="space-y-3 text-center sm:text-left">
          <span
            class="inline-flex rounded-full bg-[#fff1d2] px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#b07b00]"
          >
            Koleksi {{ title }}
          </span>
          <NuxtLink
            :to="page"
            class="block text-2xl font-black leading-tight text-slate-950 transition hover:text-[#F9B129]"
          >
            {{ title }}
          </NuxtLink>
          <p class="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            {{ description }}
          </p>
        </div>
        <NuxtLink
          :to="page"
          class="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:border-[#F9B129] hover:text-[#1a0f00]"
        >
          Lihat Semua
        </NuxtLink>
      </div>

      <div class="grid gap-6 lg:grid-cols-[repeat(12,minmax(0,1fr))]">
        <div
          class="relative col-span-12 overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-xl ring-1 ring-slate-900/10 lg:col-span-5"
          :class="left ? 'lg:order-last' : ''"
        >
          <NuxtImg
            :src="heroImage"
            alt="Koleksi utama"
            class="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent"
          ></div>
          <div class="absolute inset-x-0 bottom-0 p-6">
            <span
              class="inline-flex rounded-full bg-[#fff1d2] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#b07b00]"
            >
              Eksplorasi cepat
            </span>
            <h3 class="mt-4 text-3xl font-black leading-tight text-white">
              {{ title }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-slate-200/90">
              {{ description }}
            </p>
            <NuxtLink
              :to="page"
              class="mt-6 inline-flex items-center rounded-full bg-[#F9B129] px-5 py-3 text-sm font-semibold text-[#1a0f00] transition hover:bg-[#e3a520]"
            >
              Akses koleksi
            </NuxtLink>
          </div>
        </div>

        <div class="col-span-12 grid gap-4 lg:col-span-7">
          <article class="grid gap-4 sm:grid-cols-2">
            <div
              class="overflow-hidden rounded-[1.75rem] bg-white shadow-md ring-1 ring-slate-200/80"
            >
              <NuxtImg
                :src="
                  resolveImage(
                    firstCollection?.thumbnail ?? firstCollection?.cover,
                  )
                "
                alt="Koleksi pertama"
                class="h-52 w-full object-cover transition duration-500 hover:scale-105"
              />
              <div class="p-5">
                <span
                  class="inline-flex rounded-full bg-[#fff4d7] px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#b07b00]"
                >
                  Koleksi Pilihan
                </span>
                <h4 class="mt-4 text-lg font-semibold text-slate-950">
                  {{ firstTitle }}
                </h4>
                <p class="mt-3 text-sm leading-6 text-slate-600">
                  {{ firstDescription }}
                </p>
                <NuxtLink
                  v-if="firstCollection?.id"
                  :to="`${detailBase}/${firstCollection.id}`"
                  class="mt-5 inline-flex items-center text-sm font-semibold text-[#F9B129] transition hover:text-[#b07b00]"
                >
                  Lihat detail →
                </NuxtLink>
              </div>
            </div>

            <div
              class="overflow-hidden rounded-[1.75rem] bg-white shadow-md ring-1 ring-slate-200/80"
            >
              <NuxtImg
                :src="
                  resolveImage(
                    secondCollection?.thumbnail ?? secondCollection?.cover,
                  )
                "
                alt="Koleksi kedua"
                class="h-52 w-full object-cover transition duration-500 hover:scale-105"
              />
              <div class="p-5">
                <span
                  class="inline-flex rounded-full bg-[#fff4d7] px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#b07b00]"
                >
                  Koleksi Pilihan
                </span>
                <h4 class="mt-4 text-lg font-semibold text-slate-950">
                  {{ secondTitle }}
                </h4>
                <p class="mt-3 text-sm leading-6 text-slate-600">
                  {{ secondDescription }}
                </p>
                <NuxtLink
                  v-if="secondCollection?.id"
                  :to="`${detailBase}/${secondCollection.id}`"
                  class="mt-5 inline-flex items-center text-sm font-semibold text-[#F9B129] transition hover:text-[#b07b00]"
                >
                  Lihat detail →
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main {
  width: 100%;
}

h4,
h3,
p,
span {
  margin: 0;
}

@media (max-width: 1024px) {
  .group {
    padding: 1.25rem;
  }
}
</style>
