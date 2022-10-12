<script setup>
const route = useRoute();
const books = booksData();
const buku = books.find((item) => item.path == route.params.id);
</script>

<template>
  <main>
    <NuxtLayout>
      <Head>
        <Title> {{ buku.judul }} | Kandaga Universitas Padjadjaran </Title>
      </Head>
      <section class="container ma my-15 flex justify-center items-center">
        <img :src="buku.cover" alt="" class="max-w-xl" />
        <div>
          <h1>{{ buku.judul }}</h1>
          <p>{{ buku.description }}</p>
          <pre>{{ buku }}</pre>
          <NuxtLink to="/koleksi">
            <button class="btn bg-sky-4">Kembali ke Koleksi</button>
          </NuxtLink>
        </div>
      </section>
    </NuxtLayout>
  </main>
</template>
