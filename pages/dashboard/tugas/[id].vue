<script setup>
const { getItemById, updateItem, deleteItems } = useDirectusItems();
const { getUserById } = useDirectusUsers();
const route = useRoute();

const getPekerjaan = await getItemById({
  collection: "pekerjaan_harian",
  id: route.params.id,
});

const dataPemberiTugas = await getUserById({
  id: getPekerjaan.user_created,
});

const isWajib = computed(() => {
  if (getPekerjaan.kriteria_tugas === "wajib") {
    return true;
  } else {
    return false;
  }
});

const namaTugas = ref(getPekerjaan.nama_tugas);
const deskripsiTugas = ref(getPekerjaan.deskripsi_tugas);
const linkTugas = ref(getPekerjaan.link_berkas);
const statusTugas = ref(getPekerjaan.status);
const pemberiTugas = ref(
  `${dataPemberiTugas.first_name} ${dataPemberiTugas.last_name}`
);
const perkembanganTugas = ref(getPekerjaan.perkembangan_rencana);
const teksUpdate = ref("Silahkan isi data yang ingin diubah");
const colorTeks = ref("text-dark");

const updateTugas = async () => {
  try {
    const newItem = {
      nama_tugas: namaTugas.value,
      deskripsi_tugas: deskripsiTugas.value,
      link_tugas: linkTugas.value,
      status: statusTugas.value,
      perkembangan_rencana: perkembanganTugas.value,
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
    }, 1000);
  } catch (error) {
    console.log(error);
  }
};

const deleteTugas = async () => {
  try {
    let confirmation = confirm("Anda yakin ingin menghapus tugas ini ?");
    if (confirmation) {
      const itemId = [route.params.id];
      teksUpdate.value = "Data sedang dihapus...";
      colorTeks.value = "text-red-6 font-600";
      await deleteItems({
        collection: "pekerjaan_harian",
        items: itemId,
      });
      setTimeout(() => {
        return navigateTo("/dashboard/tugas");
      }, 1000);
    } else {
      alert("Data tidak jadi dihapus");
    }
  } catch (err) {
    console.log(err);
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
    <div class="text-center max-w-xl bg-orange-2 py-1 my-1 rounded-xl">
      Tipe Tugas:
      <p class="text-3xl font-600">
        {{
          getPekerjaan.kriteria_tugas
            ? getPekerjaan.kriteria_tugas.toUpperCase()
            : "Belum ditentukan"
        }}
      </p>
      <p>Periode: {{ getPekerjaan.periode }}</p>
    </div>
    <form @submit.prevent="updateTugas">
      <div class="form-edit">
        <label for="nama-tugas">Pemberi Tugas :</label>
        <input type="text" v-model="pemberiTugas" disabled />
      </div>
      <div class="form-edit">
        <label for="nama-tugas">Nama Tugas :</label>
        <input type="text" v-model="namaTugas" required />
      </div>
      <div class="form-edit">
        <label for="deskripsi-tugas">Deskripsi Tugas :</label>
        <textarea type="text" v-model="deskripsiTugas" required />
      </div>
      <div class="form-edit">
        <label for="status-tugas">Status Tugas :</label>
        <select name="status-tugas" id="statusTugas" v-model="statusTugas">
          <option value="pending" disabled>Pending</option>
          <option value="belum">Belum dikerjakan</option>
          <option value="proses">Sedang dikerjakan</option>
          <option value="selesai">Sudah dikerjakan</option>
        </select>
      </div>
      <div class="form-edit">
        <label for="perkembangan-tugas">Perkembangan Tugas :</label>
        <div class="flex items-center">
          <input
            type="text"
            class="min-w-10 max-w-xl"
            v-model="perkembanganTugas"
          />
          <p class="pl-1 text-xl">
            / {{ getPekerjaan.jumlah_rencana ?? "Belum ditentukan" }}
          </p>
        </div>
      </div>
      <div class="form-edit">
        <label for="link-tugas">Link Berkas :</label>
        <input type="text" v-model="linkTugas" />
      </div>
      <button type="submit" class="btn bg-orange text-white">Update</button>
      <button
        type="button"
        class="btn text-white ml-3"
        :class="isWajib ? 'bg-gray cursor-not-allowed' : 'bg-red'"
        @click="deleteTugas"
        :disabled="isWajib"
      >
        Hapus
      </button>
    </form>
    <div class="my-5">
      <NuxtLink to="/dashboard/tugas" class="btn bg-gray-3 text-center">
        &#8592; Kembali ke Daftar Pekerjaan
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
h1 {
  --at-apply: text-2xl;
}

.form-edit {
  --at-apply: flex flex-col;
}

input,
select,
textarea {
  --at-apply: border border-orange p-2 max-w-xl rounded bg-orange-50 my-2;
}

input:focus,
select:focus,
textarea:focus {
  --at-apply: bg-orange-50;
}

textarea {
  --at-apply: h-40;
}

input:disabled {
  --at-apply: bg-gray-2 cursor-not-allowed text-gray-5;
}
</style>
