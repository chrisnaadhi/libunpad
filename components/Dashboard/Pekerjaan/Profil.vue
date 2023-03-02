<script setup>
const user = useDirectusUser();
const { getItems } = useDirectusItems();
const totalPekerjaan = await getItems({
  collection: "pekerjaan_harian",
  params: {
    filter: {
      pegawai: {
        _eq: user.value.id,
      },
    },
    meta: "filter_count",
  },
});
</script>

<template>
  <section class="flex gap-2 mb-5" v-show="user">
    <div>
      <img
        :src="
          user.avatar
            ? `https://repository.unpad.ac.id:8050/assets/${user.avatar}.jpg`
            : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
        "
        alt="Foto Profil"
        class="w-30 rounded border border-orange"
      />
    </div>
    <div class="flex gap-2">
      <div>
        <p>Nama Lengkap</p>
        <p>Email</p>
        <p>NIP</p>
        <p>Role</p>
        <p>Jumlah Tugas</p>
      </div>
      <div>
        <p>: {{ user.first_name }} {{ user.last_name }}</p>
        <p>: {{ user.email }}</p>
        <p>: {{ user.nomor_induk }}</p>
        <p>
          :
          <span class="bg-orange px-2 rounded text-white">{{
            displayRoleUser(user.role)
          }}</span>
        </p>
        <p>: {{ totalPekerjaan.meta.filter_count }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
