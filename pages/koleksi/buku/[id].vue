<script setup>
const route = useRoute();
// const books = booksData();
const { data: books, pending } = await useFetch("/api/koleksi/buku");
const buku = books.value.results.find((item) => item.path == route.params.id);
</script>

<template>
  <NuxtLayout>
    <main class="container ma my-15">
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
          <p>
            {{ buku.description }}
          </p>
        </div>
      </section>
      <section class="text-center my-5">
        <NuxtLink to="/koleksi">
          <button class="btn bg-sky-4">Kembali ke Koleksi</button>
        </NuxtLink>
      </section>
    </main>
  </NuxtLayout>
</template>

<style scoped>
.book-content {
  --at-apply: flex justify-center gap-10 items-center;
}

h1 {
  --at-apply: text-4xl font-600 my-2;
}

h3 {
  --at-apply: text-2xl font-500;
}
</style>
