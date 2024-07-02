<script setup>
const image = ref("https://www.svgrepo.com/show/428321/notebook.svg");
const route = useRoute();
const { getItems } = useDirectusItems();

const dataGallery = await getItems({
  collection: "koleksi_gallery",
  params: {
    limit: 2
  }
})

const dataArchive = await getItems({
  collection: "koleksi_archive",
  params: {
    limit: 2
  }
})

const dataLibrary = await getItems({
  collection: "koleksi_library",
  params: {
    limit: 2
  }
})

const dataMuseum = await getItems({
  collection: "koleksi_museum",
  params: {
    limit: 2
  }
})

useHead({
  title: "GLAM Kandaga Unpad | Universitas Padjadjaran",
});

</script>

<template>
  <main class="container ma my-10">
    <CollectionHeader :title="$t('collectionTitleHeader')" :image="image"
      :description="$t('collectionDescriptionHeader')" />

    <section class="my-5">
      <h2>Pilihan Kami</h2>
      <CollectionBooksHighlight />
    </section>

    <section class="mt-10">
      <h2>Koleksi Lainnya</h2>
      <CollectionBlockData :left="true" title="Gallery" description="Galeri diartikan sebagai ruangan atau bangunan tempat benda atau karya seni dipamerkan dan sebagainya" page="/gallery" :first-collection="dataGallery[0]" :second-collection="dataGallery[1]"/>
      <CollectionBlockData :left="false" title="Library" description="Merupakan kumpulan bahan, buku, atau media yang dapat diakses untuk digunakan dan tidak hanya untuk tujuan pajangan" page="/library" :first-collection="dataLibrary[0]" :second-collection="dataLibrary[1]" />
      <CollectionBlockData :left="true" title="Archive" description="Merupakan akumulasi catatan atau bahan sejarah – dalam media apa pun – atau fasilitas fisik di mana mereka berada" page="/records" :first-collection="dataArchive[0]" :second-collection="dataArchive[1]" />
      <CollectionBlockData :left="false" title="Museum" description="Merupakan bangunan atau lembaga yang merawat dan memamerkan koleksi artefak dan benda lain yang memiliki kepentingan seni, budaya, sejarah, atau ilmiah" page="/museum" :first-collection="dataMuseum[0]" :second-collection="dataMuseum[1]" />
      <CollectionBlockData :left="true" title="Repository" description="Repositori merupakan portal yang menampilkan seluruh koleksi tugas akhir berupa skripsi, tesis, disertasi dan format tugas akhir lainnya sesuai dengan program studi." :page="route.fullPath + '/repository'" />
    </section>
  </main>
</template>

<style scoped>
h2 {
  --at-apply: text-3xl my-3 font-600 text-center;
}
</style>
