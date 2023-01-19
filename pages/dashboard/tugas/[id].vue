<script setup>
const { getItemById, updateItem } = useDirectusItems();
const config = useRuntimeConfig();
const route = useRoute();

const getPekerjaan = await getItemById({
  collection: "pekerjaan_harian",
  id: route.params.id,
});

const { data: dataPetugas } = await useFetch(
  `${config.public.directus.url}users`,
  {
    headers: {
      Authorization: `Bearer ${config.public.directus.token}`,
    },
    pick: ["data", ["id", "first_name", "last_name"]],
  }
);

const searchPetugas = (idPetugas) => {
  const petugas = dataPetugas.value.data.find((nama) => nama.id === idPetugas);
  if (!petugas) {
    return "Belum diproses";
  }
  const objPetugas = Object.assign({}, petugas);
  return `${objPetugas.first_name} ${objPetugas.last_name}`;
};

const namaTugas = ref(getPekerjaan.nama_tugas);
const deskripsiTugas = ref(getPekerjaan.deskripsi_tugas);
const linkTugas = ref(getPekerjaan.link_berkas);
const statusTugas = ref(getPekerjaan.status);
const pemberiTugas = ref(searchPetugas(getPekerjaan.user_created));
const teksUpdate = ref("Silahkan isi data yang ingin diubah");
const colorTeks = ref("text-dark");

const updateTugas = async () => {
  try {
    const newItem = {
      nama_tugas: namaTugas.value,
      deskripsi_tugas: deskripsiTugas.value,
      link_tugas: linkTugas.value,
      status: statusTugas.value,
    };
    await updateItem({
      collection: "pekerjaan_harian",
      id: route.params.id,
      item: newItem,
    });
    teksUpdate.value = "Data berhasil diubah! mengalihkan halaman...";
    colorTeks.value = "text-green-6 font-600";
    setTimeout(() => {
      return navigateTo("/dashboard/tugas");
    }, 2000);
  } catch (error) {
    console.log(error);
  }
};

definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <section>
    <h1>Update Data Tugas</h1>
    <p :class="colorTeks">{{ teksUpdate }}</p>
    <form @submit.prevent="updateTugas">
      <div>
        <label for="nama-tugas">Pemberi Tugas :</label>
        <input type="text" v-model="pemberiTugas" disabled />
      </div>
      <div>
        <label for="nama-tugas">Nama Tugas :</label>
        <input type="text" v-model="namaTugas" required />
      </div>
      <div>
        <label for="deskripsi-tugas">Deskripsi Tugas :</label>
        <input type="text" v-model="deskripsiTugas" required />
      </div>
      <div>
        <label for="status-tugas">Status Tugas :</label>
        <select name="status-tugas" id="statusTugas" v-model="statusTugas">
          <option value="pending" disabled>Pending</option>
          <option value="belum">Belum dikerjakan</option>
          <option value="proses">Sedang dikerjakan</option>
          <option value="selesai">Sudah dikerjakan</option>
        </select>
        {{ statusTugas }}
      </div>
      <div>
        <label for="link-tugas">Link Berkas :</label>
        <input type="text" v-model="linkTugas" />
      </div>
      <button type="submit" class="btn bg-orange text-white">Tambah</button>
    </form>
    <div class="my-5">
      <NuxtLink to="/dashboard/tugas" class="btn bg-gray-3 text-center">
        &#8592; Kembali ke Daftar Pekerjaan
      </NuxtLink>
    </div>
    <pre>{{ getPekerjaan }}</pre>
  </section>
</template>

<style scoped>
h1 {
  --at-apply: text-2xl;
}

div {
  --at-apply: flex flex-col;
}

input,
select {
  --at-apply: border border-orange p-2 max-w-xl rounded bg-orange-1 my-2;
}

input:focus,
select:focus {
  --at-apply: bg-orange-50;
}

input:disabled {
  --at-apply: bg-gray-2 cursor-not-allowed text-gray-5;
}
</style>
