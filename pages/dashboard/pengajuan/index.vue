<script setup>
import { displayKeperluanSurat } from "~/composables/user";
const name = ref("Chrisna Adhi Pranoto");
const { getItems } = useDirectusItems();

const dataPengajuan = await getItems({
  collection: "pengajuan_surat_bebas_pustaka",
  params: {
    sort: "-date_created",
  },
});

const convertTimeZone = (time) => {
  const newDate = new Date(time);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formatted = newDate.toLocaleDateString("id-ID", options);
  return formatted;
};

definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <section>
    <h1>{{ name }}</h1>
    <section class="overflow-x-auto relative px-5">
      <table class="w-full border-collapse border border-slate-400">
        <thead class="bg-orange-2">
          <tr>
            <th scope="col" class="table-border">NPM</th>
            <th scope="col" class="table-border">Nama Lengkap</th>
            <th scope="col" class="table-border">Email</th>
            <th scope="col">Keperluan</th>
            <th scope="col">Tanggal Pengajuan</th>
          </tr>
        </thead>
        <tbody v-for="data in dataPengajuan">
          <tr class="bg-white">
            <td class="table-border">{{ data.npm }}</td>
            <td class="table-border">
              {{ data.nama_lengkap }}
            </td>
            <td class="table-border">
              {{ data.email }}
            </td>
            <td class="table-border">
              {{ displayKeperluanSurat(data.keperluan) }}
            </td>
            <td class="table-border">
              {{ convertTimeZone(data.date_created) }}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <pre>
      {{ dataPengajuan }}
    </pre>
  </section>
</template>

<style scoped>
h1 {
  --at-apply: text-xl;
}

.table-border {
  --at-apply: border border-orange p-2;
}
</style>
