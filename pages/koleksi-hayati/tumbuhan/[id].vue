<script setup>
const { getItemById } = useDirectusItems();
const route = useRoute();

const getKoleksiHayati = await getItemById({
  collection: "koleksi_tumbuhan",
  id: route.params.id,
});
</script>

<template>
  <section>
    <h3 class="mt-10 mb-3 text-center">
      Koleksi <br />
      <span class="text-orange font-semibold">{{
        getKoleksiHayati.register_number
      }}</span>
    </h3>
    <pre>
      {{ getKoleksiHayati }}
    </pre>
    <div class="flex items-center justify-center mb-5">
      <h5 class="bg-orange text-white px-5 py-1 rounded-md">
        Metadata Koleksi
      </h5>
    </div>
    <div class="flex justify-center gap-5 w-full max-w-4xl ma">
      <div>
        <NuxtImg
          :src="directusImageUrl(getKoleksiHayati.featured_image)"
          format="webp"
          class="w-50 h-full rounded-md"
        />
      </div>
      <table>
        <tbody>
          <tr>
            <td class="font-semibold pr-5">Nama Lokal</td>
            <td>: {{ getKoleksiHayati.local_name ?? "-" }}</td>
          </tr>
          <tr>
            <td class="font-semibold pr-5">Tipe</td>
            <td>: {{ getKoleksiHayati.type ?? "-" }}</td>
          </tr>
          <tr>
            <td class="font-semibold pr-5">Ditentukan Oleh</td>
            <td>: {{ getKoleksiHayati.determinated_by ?? "-" }}</td>
          </tr>
          <tr>
            <td class="font-semibold pr-5">Lokasi</td>
            <td>: {{ getKoleksiHayati.locality_or_location ?? "-" }}</td>
          </tr>
          <tr>
            <td class="font-semibold pr-5">Nomor Koleksi</td>
            <td>: {{ getKoleksiHayati.number_of_collection ?? "-" }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-center my-5">
      <h5 class="bg-orange text-white px-5 py-1 rounded-md">
        Keterangan Koleksi
      </h5>
    </div>
    <div class="max-w-3xl ma">
      <table class="my-5 italic">
        <tbody>
          <tr class="text-sm text-gray">
            <td class="pr-5">Tanggal Dibuat</td>
            <td>: {{ getKoleksiHayati.tanggal_dibuat ?? "-" }}</td>
          </tr>
          <tr class="text-sm text-gray">
            <td class="pr-5">Tanggal publikasi</td>
            <td>: {{ getKoleksiHayati.tanggal_publikasi ?? "-" }}</td>
          </tr>
        </tbody>
      </table>
      <div class="w-full flex items-start justify-between">
        <div>
          <h6>Metadata Koleksi</h6>
          <div>
            <table class="table-auto border-separate border-spacing-3">
              <tbody>
                <tr>
                  <td>Register Number</td>
                  <td>: {{ getKoleksiHayati.register_number ?? "-" }}</td>
                </tr>
                <tr>
                  <td>Number of Collection</td>
                  <td>: {{ getKoleksiHayati.number_of_collection ?? "-" }}</td>
                </tr>
                <tr>
                  <td>Date of Collection</td>
                  <td>: {{ getKoleksiHayati.date_of_collection ?? "-" }}</td>
                </tr>
                <tr>
                  <td>Locality or Location</td>
                  <td>: {{ getKoleksiHayati.locality_or_location ?? "-" }}</td>
                </tr>
                <tr>
                  <td>Latitude</td>
                  <td>: {{ getKoleksiHayati.latitude ?? "-" }}</td>
                </tr>
                <tr>
                  <td>Longitude</td>
                  <td>: {{ getKoleksiHayati.longitude ?? "-" }}</td>
                </tr>
                <tr>
                  <td>Altitude</td>
                  <td>: {{ getKoleksiHayati.altitude ?? "-" }}</td>
                </tr>
                <tr>
                  <td>Habitat</td>
                  <td>: {{ getKoleksiHayati.habitat ?? "-" }}</td>
                </tr>
                <tr>
                  <td>Determinated by</td>
                  <td>: {{ getKoleksiHayati.determinated_by ?? "-" }}</td>
                </tr>
                <tr>
                  <td>Date Determinated</td>
                  <td>: {{ getKoleksiHayati.date_determinated ?? "-" }}</td>
                </tr>
                <tr>
                  <td>Uses or Bioprospect</td>
                  <td>: {{ getKoleksiHayati.uses_or_bioprospect ?? "-" }}</td>
                </tr>
                <tr>
                  <td>Use Category</td>
                  <td>: {{ getKoleksiHayati.user_category ?? "-" }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h6>Taksonomi Koleksi</h6>
          <div>
            <table class="table-auto border-separate border-spacing-3">
              <tbody>
                <tr>
                  <td>Kingdom</td>
                  <td>: {{ getKoleksiHayati.kingdom }}</td>
                </tr>
                <tr>
                  <td>Phylum</td>
                  <td>: {{ getKoleksiHayati.phylum }}</td>
                </tr>
                <tr>
                  <td>Classis</td>
                  <td>: {{ getKoleksiHayati.classis }}</td>
                </tr>
                <tr>
                  <td>Ordo</td>
                  <td>: {{ getKoleksiHayati.ordo }}</td>
                </tr>
                <tr>
                  <td>Family</td>
                  <td>: {{ getKoleksiHayati.famili }}</td>
                </tr>
                <tr>
                  <td>Genus</td>
                  <td>: {{ getKoleksiHayati.genus }}</td>
                </tr>
                <tr>
                  <td>Species</td>
                  <td>: {{ getKoleksiHayati.species }}</td>
                </tr>
                <tr>
                  <td>Field Note</td>
                  <td>: {{ getKoleksiHayati.kingdom }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="my-10 text-center">
      <NuxtLink to="/gallery" class="btn bg-orange text-white py-1">
        &leftarrow; Kembali
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma;
}

.content-data {
  --at-apply: flex flex-col gap-3;
}
</style>
