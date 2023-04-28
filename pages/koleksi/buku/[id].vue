<script setup>
const route = useRoute();
const { data: books, pending } = await useFetch("/api/v1/koleksi/buku");
const buku = books.value.results.find((item) => item.slugs == route.params.id);
if (!buku) {
  throw createError({
    statusCode: 404,
    statusMessage: "Books not Found!",
    fatal: true,
  });
}

const showModal = ref(false);
const viewModal = () => {
  showModal.value = !showModal.value;
};
</script>

<template>
  <main class="container ma my-15">
    <LazyClientOnly>
      <teleport to="#modal">
        <ModalBase v-show="showModal" @close="viewModal">
          <iframe class="w-full lg:w-5xl h-75%" :src="buku.fileAttachment" />
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
      <div class="max-w-2xl mx-7">
        <h1>{{ buku.judul }}</h1>
        <h3>oleh {{ buku.author }}</h3>
        <p class="text-justify">
          {{ buku.description }}
        </p>
        <section class="grid my-5 gap-2 sm:(grid-cols-2)">
          <button class="w-full btn bg-orange text-white" @click="viewModal">
            Baca {{ buku.judul }}
          </button>
          <NuxtLink to="/koleksi">
            <button
              class="w-full btn text-orange border border-orange transition-all-500 hover:(text-white bg-orange)"
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
</template>

<style scoped>
.book-content {
  --at-apply: flex flex-col justify-center gap-10 items-center md:flex-row;
}

h1 {
  --at-apply: text-2xl font-600 my-2;
}

h3 {
  --at-apply: text-lg font-500;
}

iframe {
  --at-apply: bg-gray-3 p-3 rounded-lg;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
