<script setup>
const number = ref(10);

const decreaseValue = () => {
  if (number.value !== 0) {
    number.value -= 1;
  }
};

onMounted(async () => {
  if (number.value !== 0) {
    setInterval(() => {
      if (number.value === 0) {
        clearInterval();
        window.location.assign("https://kandaga.unpad.ac.id:3000");
      } else {
        decreaseValue();
      }
    }, 1000);
  }

  console.log("done");
});

useHead({
  meta: [
    {
      name: "description",
      content: "Kandaga GLAM Situs Resmi Pusat Pengelolaan Pengetahuan UNPAD",
    },
    {
      property: "og:title",
      content: "GLAM Kandaga Unpad",
    },
    {
      property: "og:description",
      content:
        "Situs GLAM (Gallery, Library, Archive & Museums) dari Kandaga Pusat Pengelolaan Pengetahuan Universitas Padjadjaran. Situs ini menjadi pintu pencarian dan penyajian koleksi yang dimiliki oleh Universitas Padjadjaran yang dapat diakses oleh seluruh kalangan masyarakat.",
    },
    {
      property: "og:image",
      content: "/images/kandaga-bg.webp",
    },
  ],
  title: "GLAM Kandaga Unpad | Universitas Padjadjaran",
});
</script>

<template>
  <section class="flex flex-col items-center w-full max-w-7xl ma py-25">
    <div>
      <NuxtImg src="/images/lambang-unpad.png" width="180px" height="180px" />
    </div>
    <h1 class="text-5xl my-3">
      Website Resmi Kandaga saat ini sudah beralih ke:
    </h1>
    <div class="bg-orange text-white rounded my-5 py-4 px-8">
      <NuxtLink
        href="https://kandaga.unpad.ac.id:3000"
        class="text-white text-3xl no-underline"
      >
        https://kandaga.unpad.ac.id
      </NuxtLink>
    </div>
    <div class="text-center">
      <p>
        Anda akan dialihkan ke halaman tersebut dalam
        <span class="text-orange font-semibold">{{ number }}</span> detik.
      </p>
      <p>atau klik tautan berikut</p>
      <NuxtLink href="https://kandaga.unpad.ac.id:3000" target="_blank">
        Klik disini
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped></style>
