<script setup>
const { createItems } = useDirectusItems();
const user = useDirectusUser();

const namaTugas = ref("");
const deskripsiTugas = ref("");
const linkTugas = ref("");

const createTask = async () => {
  try {
    const items = [
      {
        status: "pending",
        pegawai: user.value.id,
        nama_tugas: namaTugas.value,
        deskripsi_tugas: deskripsiTugas.value,
        link_berkas: linkTugas.value,
        user_created: user.value.id,
      },
    ];
    await createItems({ collection: "pekerjaan_harian", items });
    await navigateTo("/dashboard/tugas");
  } catch (error) {}
};

definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <section>
    <DashboardPekerjaanProfil />
    <h1>Tambah Data Pekerjaan</h1>
    <form @submit.prevent="createTask">
      <div>
        <label for="nama-tugas">Nama Tugas :</label>
        <input type="text" v-model="namaTugas" required />
      </div>
      <div>
        <label for="deskripsi-tugas">Deskripsi Tugas :</label>
        <input type="text" v-model="deskripsiTugas" required />
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
  </section>
</template>

<style scoped>
h1 {
  --at-apply: text-2xl;
}

div {
  --at-apply: flex flex-col;
}

input {
  --at-apply: border border-orange p-2 max-w-xl rounded bg-orange-1 my-2;
}
</style>
