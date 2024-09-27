<script setup>
const route = useRoute();

const { getItemById } = useDirectusItems();
const getMuseumCollection = await getItemById({
  collection: "koleksi_museum",
  id: route.params.id,
});
</script>

<template>
  <section>
    <h3 class="mt-10 mb-3 text-center">
      Koleksi <br />
      <span class="text-orange font-semibold">{{
        getMuseumCollection.judul
      }}</span>
    </h3>
    <div class="flex items-center justify-center mb-5">
      <h5 class="bg-orange text-white px-5 py-1 rounded-md">
        Metadata Koleksi
      </h5>
    </div>
    <div class="flex justify-center gap-5 max-w-4xl ma">
      <div>
        <NuxtImg
          :src="directusImageUrl(getMuseumCollection.thumbnail)"
          format="webp"
          class="w-50 h-full rounded-md"
        />
      </div>
      <table>
        <tbody>
          <tr>
            <td class="font-semibold pr-5">Judul</td>
            <td>: {{ getMuseumCollection.judul ?? "-" }}</td>
          </tr>
          <tr>
            <td class="font-semibold pr-5">Tipe Koleksi</td>
            <td>: {{ getMuseumCollection.tipe_koleksi ?? "-" }}</td>
          </tr>
          <tr>
            <td class="font-semibold pr-5">Pembuat Koleksi</td>
            <td>: {{ getMuseumCollection.pembuat_koleksi ?? "-" }}</td>
          </tr>
          <tr>
            <td class="font-semibold pr-5">Keywords</td>
            <td>: {{ getMuseumCollection.keywords.join(", ") ?? "-" }}</td>
          </tr>
          <tr>
            <td class="font-semibold pr-5">Lembaga Penanggungjawab</td>
            <td>: {{ getMuseumCollection.lembaga_penanggungjawab ?? "-" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex items-center justify-center my-5">
      <h5 class="bg-orange text-white px-5 py-1 rounded-md">
        Keterangan Koleksi
      </h5>
    </div>
    <div class="max-w-4xl ma">
      <table class="my-5 italic">
        <tbody>
          <tr class="text-sm text-gray">
            <td class="pr-5">Tanggal Dibuat</td>
            <td>: {{ getMuseumCollection.tanggal_dibuat ?? "-" }}</td>
          </tr>
          <tr class="text-sm text-gray">
            <td class="pr-5">Tanggal publikasi</td>
            <td>: {{ getMuseumCollection.tanggal_publikasi ?? "-" }}</td>
          </tr>
        </tbody>
      </table>
      <div v-html="getMuseumCollection.keterangan_koleksi"></div>
    </div>
    <div class="my-10 text-center">
      <NuxtLink to="/museum" class="btn bg-orange text-white py-1">
        &leftarrow; Kembali
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma;
}
</style>
