<script setup>
const user = useDirectusUser();
const dataPengajuan = ref("default");
const fetchService = [
  {
    namaLayanan: "Pengajuan Bebas Pustaka",
    deskripsiLayanan:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus pariatur aut ut totam velit dignissimos itaque, sint soluta eligendi ab!",
  },
  {
    namaLayanan: "Pengajuan Reservasi Online",
    deskripsiLayanan:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias error dolor sit temporibus minus asperiores at ab, illum voluptatibus laborum?",
  },
  {
    namaLayanan: "Pengajuan Peminjaman Ruangan",
    deskripsiLayanan:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus nisi inventore sint. Natus ducimus assumenda, quam quas fuga praesentium sed!",
  },
  {
    namaLayanan: "Pengajuan Kelas Literasi",
    deskripsiLayanan:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi voluptate ad harum veritatis eaque ducimus libero dolore rem nulla quidem.",
  },
  {
    namaLayanan: "Pengajuan Lainnya",
    deskripsiLayanan:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet officia quaerat assumenda sequi dicta mollitia incidunt dolorum natus et reprehenderit.",
  },
  {
    namaLayanan: "Pengajuan Tambahan",
    deskripsiLayanan:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis expedita tempore obcaecati, aperiam sapiente magnam impedit reprehenderit nesciunt repellat culpa?",
  },
];
</script>

<template>
  <main>
    <section class="my-10 text-center">
      <h1 class="font-600 text-4xl">Administrasi dan Pengajuan</h1>
      <section class="profile">
        <div>
          <img src="images/lambang-unpad.png" class="w-xl" />
        </div>
        <div class="text-justify">
          <h1 class="text-2xl font-600">Halo, Nama Lengkap</h1>
          <p>
            Jika kamu membutuhkan berkas administrasi dari Perpustakaan Pusat
            Unpad untuk keperluan akademik silahkan ajukan melalui salah satu
            kolom pengajuan berikut. Petunjuk mengenai pengisian form pengajuan
            dapat dilihat melalui tautan berikut.
          </p>
        </div>
      </section>
      <section class="card-group">
        <GenericBaseCard v-for="layanan in fetchService" class="card-item">
          <div>
            <h1 class="text-center text-2xl">
              {{ layanan.namaLayanan }}
            </h1>
            <p class="text-sm">{{ layanan.deskripsiLayanan }}</p>
          </div>
          <div class="flex justify-center">
            <button class="btn bg-orange">Ajukan</button>
          </div>
        </GenericBaseCard>
      </section>

      <p>{{ dataPengajuan }}</p>
    </section>
  </main>
</template>

<style scoped>
input {
  --at-apply: border border-black rounded my-1;
}

.profile {
  --at-apply: flex items-center justify-center gap-4 max-w-lg ma py-10;
}

.card-group {
  --at-apply: container ma flex flex-col gap-4 p-4 md:(grid grid-cols-2) lg:(grid-cols-3);
}

.card-item {
  --at-apply: bg-white flex flex-col justify-between shadow-lg shadow-orange/20 top-0 hover:(top--2 shadow-orange/50);
  transition: top ease 0.5s;
}
</style>
