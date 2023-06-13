<script setup>
import { Calendar, createCalendar } from "v-calendar";
const { getItems } = useDirectusItems();
const { getUserById } = useDirectusUsers();

const date = new Date();
const lastDay = getTotalDays(date.getMonth(), date.getFullYear());
const firstDate = `${date.getFullYear()}-${date.getMonth() + 1}-01`;
const lastDate = `${date.getFullYear()}-${date.getMonth() + 1}-${lastDay}`;
const attributes = ref([]);

const getDataPegawai = await getItems({
  collection: "piket_layanan",
  params: {
    filter: {
      tanggal: {
        _between: [firstDate, lastDate],
      },
    },
    sort: "tanggal",
  },
});

for (const pegawai of getDataPegawai) {
  const [tahun, bulan, tanggal] = pegawai.tanggal.split("-");
  const dataPegawai = await getUserById({ id: pegawai.petugas_pertama });
  let newObj = new Object({
    key: pegawai.id,
    highlight: true,
    customData: {
      petugas: dataPegawai.first_name + " " + dataPegawai.last_name,
    },
    dates: new Date(tahun, bulan, tanggal),
  });

  attributes.value.push(newObj);
}
</script>

<template>
  <Calendar :locale="{ id: 'id', masks: { weekdays: 'WWWW' } }">
    <template v-slot:day-content="{ day, attributes }">
      <div>
        <span>{{ day.day }}</span>
        <p v-for="attr in attributes">{{ attr.key }}</p>
        <p>{{ attributes }}</p>
      </div>
    </template>
  </Calendar>

  <p v-for="attr in attributes">
    {{ attr.customData.petugas }}
  </p>
</template>
