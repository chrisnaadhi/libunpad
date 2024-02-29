<script setup>
const header = ref("Submit Unggah Mandiri");
</script>

<template>
  <section>
    <div class="text-center px-4 lg:px-0">
      <h1>{{ header }}</h1>
      <p class="text-justify">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
        deserunt vero rem illum sit earum veniam, neque, quod nihil
        perspiciatis, accusamus eligendi? Ex, consequatur adipisci. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Consequatur ea aliquam ab,
        vel adipisci delectus aperiam modi fugiat, saepe quam a ipsa sunt qui
        dicta excepturi laboriosam praesentium reprehenderit blanditiis
        temporibus ut assumenda neque iste? Odio nemo officia accusantium nisi
        qui quae, id suscipit commodi enim, illum, corrupti nostrum neque
        ducimus recusandae perspiciatis! Neque facilis numquam assumenda non
        cupiditate provident totam hic eum eius. Soluta officia provident
        deserunt tenetur mollitia sit, totam nemo delectus libero voluptas
        blanditiis sint numquam animi tempore distinctio vel earum quod error ab
        cupiditate iusto suscipit placeat aliquid? Nemo quia exercitationem
        perferendis soluta asperiores nostrum, neque officia vero reiciendis est
        deleniti illum, error hic repudiandae nihil dolores alias ullam tempore
        totam. Vitae voluptatem quaerat delectus recusandae ducimus sit
        temporibus deleniti accusamus.
      </p>
      <div class="text-left">
        <ul>
          <!-- <li v-for="community in communityList">{{ community.id }}</li> -->
        </ul>
      </div>
      <div class="flex items-center justify-center my-3 gap-3">
        <NuxtLink href="/pengajuan/unggah-mandiri/submit/form" class="w-full">
          <button class="btn w-full bg-green-6 text-white">Unggah Skripsi / Tesis / Disertasi</button>
        </NuxtLink>
        <NuxtLink class="btn w-full bg-orange-6 text-white">
          <button>Unggah Karya Ilmiah dalam format lain</button>
        </NuxtLink>
      </div>
      <div>
        <NuxtLink href="/pengajuan/unggah-mandiri" class="btn bg-orange text-white py-0">
          &leftarrow; Kembali
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma py-15;
}

p {
  --at-apply: italic;
}
</style>
