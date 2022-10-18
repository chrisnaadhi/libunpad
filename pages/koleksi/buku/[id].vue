<script setup>
const route = useRoute();
const router = useRouter();
const { data: books, pending } = await useFetch("/api/koleksi/buku");
const buku = books.value.results.find((item) => item.slugs == route.params.id);

const showModal = ref(false);
const viewModal = () => {
  showModal.value = !showModal.value;
};
</script>

<template>
  <NuxtLayout>
    <main class="container ma my-15">
      <LazyClientOnly>
        <teleport to="#modal">
          <ModalBase v-show="showModal" @close="viewModal">
            <iframe class="w-full lg:w-5xl h-lg" :src="buku.fileAttachment" />
          </ModalBase>
        </teleport>
      </LazyClientOnly>
      <Head>
        <Title> {{ buku.judul }} | Kandaga Universitas Padjadjaran </Title>
      </Head>

      <section v-if="pending">
        <pre> Data is Loading... </pre>
      </section>
      <section class="book-content" v-else>
        <img :src="buku.cover" alt="" />
        <div class="max-w-2xl">
          <h1>{{ buku.judul }}</h1>
          <h3>oleh {{ buku.author }}</h3>
          <p class="text-justify">
            {{ buku.description }}
          </p>
          <section class="grid sm:grid-cols-2 gap-5 my-5">
            <button
              class="w-full btn bg-orange-4 text-white"
              @click="viewModal"
            >
              Baca {{ buku.judul }}
            </button>
            <NuxtLink to="/koleksi">
              <button
                class="w-full btn text-orange border-orange border hover:(text-white bg-orange-4)"
              >
                Kembali ke Koleksi
              </button>
            </NuxtLink>
          </section>
        </div>
      </section>
      <section>
        <CollectionBooksItems />
      </section>
    </main>
  </NuxtLayout>
</template>

<style scoped>
.book-content {
  --at-apply: flex flex-col justify-center gap-10 items-center md:flex-row;
}

h1 {
  --at-apply: text-4xl font-600 my-2;
}

h3 {
  --at-apply: text-2xl font-500;
}
</style>
