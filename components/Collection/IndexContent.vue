<template>
  <main class="container ma bg-blue-500 w-full h-md text-center">
    <section class="flex justify-around h-md">
      <h1 v-for="angka of 10" class="border border-white">
        Buku No.{{ angka }}
      </h1>
    </section>
  </main>
</template>
