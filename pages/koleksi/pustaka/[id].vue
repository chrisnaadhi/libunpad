<script setup>
const route = useRoute();
const id = route.params.id;

const { data: res, pending, error } = await useFetch("/api/v1/koleksi/pustaka", {
  query: { id },
});

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode ?? 404,
    statusMessage: "Koleksi tidak ditemukan",
    fatal: true,
  });
}

const item = computed(() => res.value?.data);

const metaValue = (name) =>
  item.value?.metadata?.find((m) => m.name === name)?.value ?? "-";

const uniqueLocations = computed(() => {
  const locs = item.value?.items?.map((i) => i.location).filter(Boolean) ?? [];
  return [...new Set(locs)];
});

const availabilityLabel = (status) => {
  const map = {
    available: "Tersedia",
    borrowed: "Dipinjam",
    maintenance: "Perawatan",
    lost: "Hilang",
  };
  return map[status] ?? status;
};

const availabilityColor = (status) => {
  const map = {
    available: "text-green-6",
    borrowed: "text-yellow-6",
    maintenance: "text-orange-6",
    lost: "text-red-6",
  };
  return map[status] ?? "text-gray-6";
};
</script>

<template>
  <main class="container ma my-10 px-4 md:px-0">
    <Head>
      <Title>{{ item?.title ?? "Detail Koleksi" }} | Kandaga Unpad</Title>
    </Head>

    <section v-if="pending" class="flex justify-center items-center min-h-60">
      <p class="text-gray-5">Memuat data koleksi...</p>
    </section>

    <template v-else-if="item">
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-5 mb-6">
        <NuxtLink to="/" class="hover:text-unpad">Beranda</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/search" class="hover:text-unpad">Pencarian</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-unpad font-semibold truncate">{{ item?.title }}</span>
      </nav>

      <!-- Hero -->
      <section class="flex flex-col gap-8 md:flex-row">
        <div class="flex-shrink-0 flex flex-col items-center gap-3">
          <NuxtImg
            :src="item?.thumbnail ?? '/images/default_cover.png'"
            class="w-48 h-68 object-cover border border-unpad rounded-lg shadow-md"
            format="webp"
            :alt="item?.title"
          />
          <span
            class="text-xs px-3 py-1 rounded-full bg-unpad text-white font-semibold"
          >
            {{ item?.type?.label ?? item?.collection_type }}
          </span>
        </div>

        <div class="flex-1">
          <h1 class="text-2xl font-700 text-gray-8 leading-snug">
            {{ item?.title }}
          </h1>

          <p v-if="item?.creator?.creator_name" class="mt-1 text-unpad font-semibold">
            {{ item?.creator?.creator_name }}
            <span v-if="item?.creator?.affiliation" class="text-gray-5 font-normal">
              — {{ item?.creator?.affiliation }}
            </span>
          </p>

          <p v-if="item?.unit?.name" class="mt-1 text-sm text-gray-6">
            <span class="font-semibold">Unit:</span> {{ item?.unit?.name }}
            <span v-if="item?.unit?.abbr" class="ml-1">({{ item?.unit?.abbr }})</span>
          </p>

          <p v-if="item?.description" class="mt-4 text-justify text-gray-7 leading-relaxed">
            {{ item?.description }}
          </p>

          <!-- Quick meta pills -->
          <div class="flex flex-wrap gap-2 mt-4">
            <span
              v-for="loc in uniqueLocations"
              :key="loc"
              class="text-xs bg-yellow-1 text-unpad border border-unpad px-3 py-1 rounded-full"
            >
              📍 {{ loc }}
            </span>
            <span class="text-xs bg-gray-1 text-gray-7 border border-gray-3 px-3 py-1 rounded-full">
              {{ item?.items?.length ?? 0 }} eksemplar
            </span>
            <span
              v-if="item?.access_level"
              class="text-xs bg-green-1 text-green-7 border border-green-3 px-3 py-1 rounded-full capitalize"
            >
              {{ item?.access_level }}
            </span>
          </div>

          <div class="mt-6">
            <NuxtLink
              to="/search"
              class="btn text-unpad border border-unpad hover:(bg-unpad text-white) transition-all-300 px-5 py-2 text-sm"
            >
              ← Kembali ke Pencarian
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Metadata Table -->
      <section
        v-if="item?.metadata?.length"
        class="mt-10 bg-gray-50 rounded-xl shadow-sm p-6"
      >
        <h2 class="text-xl font-700 mb-4 text-gray-8">Detail Metadata</h2>
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div
            v-for="meta in item.metadata"
            :key="meta.id"
            class="flex gap-2 bg-white border border-gray-2 rounded-lg p-3"
          >
            <span class="text-xs font-semibold text-unpad bg-yellow-1 px-2 py-0.5 rounded-full h-fit whitespace-nowrap">
              {{ meta.label }}
            </span>
            <span class="text-sm text-gray-7 break-all">{{ meta.value }}</span>
          </div>
        </div>

        <!-- Extra standard fields not necessarily in metadata[] -->
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 mt-2">
          <div v-if="item.collection_code" class="flex gap-2 bg-white border border-gray-2 rounded-lg p-3">
            <span class="text-xs font-semibold text-unpad bg-yellow-1 px-2 py-0.5 rounded-full h-fit whitespace-nowrap">
              Kode Koleksi
            </span>
            <span class="text-sm text-gray-7 break-all">{{ item.collection_code }}</span>
          </div>
          <div v-if="item.collection_type" class="flex gap-2 bg-white border border-gray-2 rounded-lg p-3">
            <span class="text-xs font-semibold text-unpad bg-yellow-1 px-2 py-0.5 rounded-full h-fit whitespace-nowrap">
              Tipe Koleksi
            </span>
            <span class="text-sm text-gray-7 capitalize">{{ item.collection_type }}</span>
          </div>
        </div>
      </section>

      <!-- Items Table -->
      <section
        v-if="item?.items?.length"
        class="mt-8 bg-gray-50 rounded-xl shadow-sm p-6"
      >
        <h2 class="text-xl font-700 mb-4 text-gray-8">
          Eksemplar
          <span class="text-sm font-normal text-gray-5 ml-2">
            ({{ item.items.length }} item)
          </span>
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left border-collapse">
            <thead>
              <tr class="bg-unpad text-white">
                <th class="px-4 py-2 rounded-tl-lg">No.</th>
                <th class="px-4 py-2">Lokasi</th>
                <th class="px-4 py-2">Ketersediaan</th>
                <th class="px-4 py-2">Kode Inventaris</th>
                <th class="px-4 py-2 rounded-tr-lg">Barcode</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(it, idx) in item.items"
                :key="it.id"
                class="border-b border-gray-2 hover:bg-yellow-1/50"
              >
                <td class="px-4 py-2 text-gray-5">{{ idx + 1 }}</td>
                <td class="px-4 py-2">{{ it.location ?? "-" }}</td>
                <td class="px-4 py-2">
                  <span :class="availabilityColor(it.availability)" class="font-semibold capitalize">
                    {{ availabilityLabel(it.availability) }}
                  </span>
                </td>
                <td class="px-4 py-2 font-mono text-xs text-gray-6">{{ it.inventory_code ?? "-" }}</td>
                <td class="px-4 py-2 font-mono text-xs text-gray-6">{{ it.barcode ?? "-" }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section v-else class="mt-8 bg-gray-50 rounded-xl p-6 text-center text-gray-5">
        Tidak ada eksemplar terdaftar untuk koleksi ini.
      </section>
    </template>

    <section v-else class="text-center py-20">
      <p class="text-red-6 font-semibold">Koleksi tidak ditemukan.</p>
      <NuxtLink to="/search" class="btn bg-unpad text-white mt-4 inline-block">
        Kembali ke Pencarian
      </NuxtLink>
    </section>
  </main>
</template>

<style scoped>
h1 {
  --at-apply: text-2xl font-700;
}
h2 {
  --at-apply: text-lg font-600;
}
th {
  --at-apply: font-semibold text-sm;
}
td {
  --at-apply: text-sm;
}
</style>
