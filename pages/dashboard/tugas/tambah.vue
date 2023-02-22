<script setup>
const { createItems } = useDirectusItems();
const user = useDirectusUser();

const namaTugas = ref("");
const deskripsiTugas = ref("");
const linkTugas = ref("");
const kriteriaTugas = ref("");
const jumlahRencana = ref("");
const periodeTugas = ref("default");

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
        kriteria_tugas: kriteriaTugas.value,
        jumlah_rencana: jumlahRencana.value,
        periode: periodeTugas.value,
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
      <div class="form-edit">
        <label for="periode-tugas">
          Periode Tugas <span class="text-red">*</span> :
        </label>
        <select name="periode-tugas" v-model="periodeTugas" required>
          <option value="default" selected disabled>
            Silahkan pilih periode tugas
          </option>
          <option value="2023-1">Semester 1 - 2023</option>
          <option value="2023-2">Semester 2 - 2023</option>
          <option value="2024-1">Semester 1 - 2024</option>
          <option value="2024-2">Semester 2 - 2024</option>
        </select>
      </div>
      <div class="form-edit">
        <label for="nama-tugas">
          Nama Tugas <span class="text-red">*</span> :
        </label>
        <input type="text" name="nama-tugas" v-model="namaTugas" required />
      </div>
      <div class="form-edit">
        <label for="deskripsi-tugas">
          Deskripsi Tugas <span class="text-red">*</span> :
        </label>
        <textarea
          type="text"
          name="deskripsi-tugas"
          v-model="deskripsiTugas"
          required
        />
      </div>
      <div class="form-edit">
        <label for="kriteria-tugas">
          Jenis Tugas <span class="text-red">*</span> :
        </label>
        <div class="input-radio">
          <div>
            <input
              type="radio"
              id="wajib"
              name="kriteria"
              value="wajib"
              v-model="kriteriaTugas"
              required
              disabled
            />
            <label class="radio-text" for="wajib">Wajib</label>
          </div>
          <div>
            <input
              type="radio"
              id="tambahan"
              name="kriteria"
              value="tambahan"
              v-model="kriteriaTugas"
            />
            <label class="radio-text" for="tambahan">Tambahan</label>
          </div>
          <div>
            <input
              type="radio"
              id="lainnya"
              name="kriteria"
              value="lainnya"
              v-model="kriteriaTugas"
            />
            <label class="radio-text" for="lainnya">Lainnya</label>
          </div>
        </div>
      </div>
      <div class="form-edit">
        <label for="jumlah-rencana">Jumlah Rencana Tugas</label>
        <input type="text" v-model="jumlahRencana" required />
      </div>
      <div class="form-edit">
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

.form-edit {
  --at-apply: flex flex-col;
}

input,
textarea,
select {
  --at-apply: border border-orange p-2 max-w-xl rounded bg-orange-50 my-2;
}

input:focus,
textarea:focus {
  --at-apply: bg-white;
}

textarea {
  --at-apply: h-40;
}

.input-radio {
  --at-apply: max-w-xl flex flex-row justify-between;
}

.radio-text {
  --at-apply: pl-2 text-lg;
}
</style>
