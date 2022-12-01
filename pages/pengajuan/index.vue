<script setup>
const user = useDirectusUser();
const dataPengajuan = ref("default");

const isVerified = ref(false);
</script>

<template>
  <main>
    <section class="my-10 text-center">
      <h1 class="font-600 text-4xl">Administrasi dan Pengajuan</h1>
      <div class="flex flex-col items-center">
        <select name="pengajuan" id="" v-model="dataPengajuan">
          <option value="default" selected disabled>
            Pilih jenis pengajuan
          </option>
          <option value="1">Satu</option>
          <option value="2">Dua</option>
          <option value="3">Tiga</option>
          <option value="4">Empat</option>
          <option value="5">Lima</option>
          <option value="6">Enam</option>
          <option value="7">Tujuh</option>
          <option value="8">Delapan</option>
          <option value="9">Sembilan</option>
          <option value="10">Sepuluh</option>
        </select>
        <button>Submit</button>
      </div>
      <section class="container ma grid gap-2 grid-cols-3 my-5">
        <GenericBaseCard v-for="num in 9">
          <h1>Title {{ num }}</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae
            molestiae nostrum recusandae mollitia dolorum distinctio dolores ea
            possimus doloremque fugiat quisquam, modi voluptatem dolor, qui
            explicabo hic magnam sint nobis rem odio facere ullam! Nobis quos
            dolorem provident blanditiis animi, necessitatibus at itaque enim.
            Voluptatibus inventore necessitatibus voluptates rerum. Omnis!
          </p>
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
button {
  --at-apply: bg-blue rounded py-2 px-4;
}
</style>
