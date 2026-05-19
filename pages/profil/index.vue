<script setup>
const data = ref("Profil Kandaga");
</script>

<template>
  <main>
    <div class="page-hero">
      <div class="page-hero-glow" />
      <div class="relative z-1 text-center">
        <div class="section-badge">
          <div class="i-mdi-library w-3.5 h-3.5" />
          Kandaga
        </div>
        <h1 class="page-hero-title">{{ data }}</h1>
        <p class="page-hero-desc">
          Pusat informasi dan pengetahuan Universitas Padjadjaran
        </p>
      </div>
    </div>

    <div class="hero-img-wrap">
      <NuxtImg
        src="/images/kandaga-bg.webp"
        class="hero-img"
        loading="eager"
        width="1200"
        height="500"
        format="webp"
        quality="80"
        alt=""
      />
    </div>

    <div class="content-wrap">
      <div class="content-card">
        <h2 class="section-title">Tentang Kandaga</h2>
        <div class="prose">
          <p>
            Kandaga merupakan branding lembaga Perpustakaan Pusat Universitas
            Padjadjaran. Kandaga memiliki visi menjadi pusat informasi dan
            pengetahuan yang terpercaya, inovatif, dan berdaya saing. Kandaga
            memiliki misi memberikan layanan informasi dan pengetahuan yang
            berkualitas, meningkatkan kualitas layanan informasi dan
            pengetahuan, serta meningkatkan kerjasama dengan berbagai pihak.
            Portal kandaga menyediakan layanan daring dan luring serta fasilitas
            lainnya yang dapat dimanfaatkan oleh pengguna.
          </p>
          <p>
            Sarana yang terdapat di Kandaga yakni layanan sirkulasi, ruang
            koleksi umum, ruang baca, layanan koleksi lama dan arsip, layanan
            tandon, layanan referensi, layanan multimedia, layanan disabilitas,
            layanan koleksi khusus, ruang diskusi dosen, ruang preservasi, ruang
            pengolahan dan pengembangan koleksi, museum, musholah dan toilet.
          </p>
          <!-- <NuxtImg src="/images/struktur-organisasi.jpg" /> -->
        </div>
      </div>

      <div class="content-card">
        <h2 class="section-title">Sejarah Kandaga</h2>
        <div class="prose">
          <p>
            Pendirian Perpustakaan Universitas Padjadjaran bermula dari kumpulan
            buku-buku Presiden/Rektor Universitas Padjadjaran yang pada waktu
            itu dijabat oleh Prof. Mr. Iwa Kusuma Sumantri dan dikelola ahli
            sekretariat di ruang rektor. Koleksinya terdiri dari buku, jumal,
            dan brosur-brosur demgan jumlah lebih kurang 500 eksemplar. Pada
            tahun 1959 dcngan ditempatkannya seorang lulusan pendidikan ahli
            perpustakaan dari Jakarta, Perpustakaan Universitas Padjadajaran
            mulai dirintis. Pada tahun 1964-1973 Perpustakaan Pusat pindah ke
            kampus yang berlokasi di Jalan Dipati Ukur No. 37 (sekarang No. 35)
            yang memiiiki ruangan lebih besar serta perlengkapan dan koleksinya
            mulai bertambah. Luas ruangan dan stock 12 x 6 m2 dan sebuah gudang
            ukuran 6 x 3 m. Pada Waktu itu bantuan luar negeri mulai mengalir,
            misalnya dari kedutaan Australia, lnggris, Belanda dan lain-lain.
            Jumlah pegawai saat itu 35 orang dengan jumlah koleksi sekitar
            110,000 eksemplar.
          </p>
          <p>
            Pada waktu almarhum Prof. R.S. Soeria Atmaja menjabat Rektor
            Universitas Padjadajaran tahun l966 sampai dengan tahun 1973,
            perhatian almarhum dengan pembinaan dan pengembangan perpustaakaan
            besar sekali. Hal ini dibuktikan dengan usaha-usaha diantaranya:
            1.Adanya penataran-penataran tenaga perpustakaan di lingkungan
            Universitas Padjadjaran baik di dalam maupun di luar negeri. 2, Usul
            Rektorat Universitas Padjadjaran yang berupa nota kepada Menteri P &
            K tentang perlunya Universitas Padjadjaran memilki suatu gedung
            perpustakaan pusat disamping perpustakaan-perpustakaan fakultas. 3.
            Usaha meminta bantuan baik dari instansi resmi maupun instansi
            swasta dan asing, serta lain-lainnya untuk perkembangan
            perpustakaan. Salah satu usaha almarhum yang dapat dirasakan
            manfaatnya adalah berupa gedung perpustakaan yang representatif
            dengan luas seluruhnya 2.4.24 m2. Terdiri dari 4 lantai dan taman
            yang luasnya 1.464 m2. Untuk mengenang jasa-jasa dari almarhum Prof.
            R.S. Soeria Atmadja, maka berdasarkan Surat Keputusan Rektor
            Universitas Padjadajaran tanggai 5 September 1974, nomor
            72.Kep/Unpad/1974 yang pada waktu itu dijabat oleh Prof. Dr. Muhtar
            Kusumaatmadja, menetapkan gedung perpustakaan ini diberi nama “Grha
            Soeriatmadja“.
          </p>
          <p>
            Sejalan dengan Peraturan Pemerintah No.05 Th.1980, tentang
            Pokok-pokok Organisasi Universitas/Institut Negeri serta Kepmen P
            dan K No. 0133/0/1983 tentang Organisasi dan Tata Kerja Unpad, maka
            Perpustakaan Pusat Graha Soeria Atmadja statusnya berubah menjadi
            Unit Pelaksana Teknis (UPT), sehingga bernama UPT Perpustakaan
            Universitas Padjadjaran. Sedangkan nama Soeria Atmadja tetap melekat
            pada nama fisik gedungnya. Karena lokasi fakultas yang ada di
            lingkungan Unpad sampai saat ini masih terdapat di berbagai lokasi,
            baik yang di Bandung maupun di Jatinangor, maka setiap fakultas dan
            lembaga di lingkungan Unpad mempunyai perpustakaan masing-masing
            namun pembinaannya, baik koleksi maupun tenaga pustakawannya berada
            dibawah koordinasi UPT Perpustakaan.
          </p>
          <p>
            Pada tahun 2003 UPT Perpustakaan berubah menjadi Center of
            Information Scientific, Research and Library atau dengan sebutan
            CISRAL, dikepalai oleh seorang Direktur. Pada awal tahun tahun 2014
            CISRAL kembali pada posisi sebelumnya yaitu UPT Perpustakaan Unpad,
            perubahan ini sesuai dengan Stuktur Organisasi dan Tata Kerja (SOTK)
            Universitas Padja-djaran, sebagai implikasi dari perubahan
            Universitas Padjadjaran menjadi Badan Layanan Umum (BLU),
            Perpustakaan dipimpin oleh Kepala Perpustakaan.
          </p>
          <p>
            Mengacu pada Peraturan Rektor Universitas Padjadjaran Nomor 70 Tahun
            2015 tentang Organisasi dan Tata Kerja Pengelola Universitas
            Padjadjaran sebagaimana telah diubah dengan Peraturan Rektor
            Universitas Padjadjaran Nomor 102 Tahun 2015 tentang Perubahan
            Peraturan Rektor Universitas Padjadjaran Nomor 70 Tahun 2015 tentang
            Organisasi dan Tata Kerja Pengelola Universitas Padjadjaran
            tercantum bahwa UPT Perpustakaan berada di bawah dan berkoordinasi
            dengan Wakil Rektor Bidang Akademik dan Kemahasiswaan Unpad dan
            dipimpin oleh Kepala UPT Perpustakaan.
          </p>
          <p>
            Tahun 2015, status Unpad berubah dari BLU menjadi PTNBH (Perguruan
            Tinggi Negeri Badan Hukum), yang berimplikasi adanya perubahan SOTK,
            dengan berbentuk UPT berada di bawah Direktorat Akademik dan
            Kemahasiswaan dengan dipimpin Kepala UPT, dibantu Kepala Sub Bagian
            Administrasi. Pada tahun 2015 pula pembangunan gedung perpustakaan
            di kampus Jatinangor yang dibiayai oleh Islamic Development Bank
            (IDB) selesai dilaksanakan, maka dimulailah proses perencanaan
            perpindahan yang dilakukan secara bertahap, dari Jalan Dipati Ukur
            ke gedung baru di Jatinangor. Proses perpindahan secara general
            selesai pada pertengahan tahun 2016.
          </p>
          <p>
            Seiring dengan terbitnya Peraturan Rektor Universitas Padjadjaran
            Nomor 40 Tahun 2016 tentang Organisasi dan Tata Kerja Pengelola
            Universitas Padjadjaran sebagaimana telah diubah dengan Peraturan
            Rektor Universitas Padjadjaran Nomor 47 Tahun 2016 tentang Perubahan
            Peraturan Rektor Universitas Padjadjaran Nomor 40 Tahun 2016 tentang
            Organisasi dan Tata Kerja Pengelola Universitas Padjadjaran yang
            menyatakan bahwa penyelenggaraan kegiatan pengelolaan perpustakaan
            Unpad yang semula berada di bawah Direktorat Sumber Daya
            Pembelajaran dan Perpustakaan berubah menjadi di bawah Direktorat
            Sumber Daya Akademik dan Perpustakaan serta dipimpin oleh Direktur
            Sumber Daya Akademik dan Perpustakaan. Bulan November 2016 sesuai
            dengan STOK baru ada pergantian pimpinan dan status perpustakaan
            yang semula UPT menjadi Perpustakaan Pusat yang langsung dipimpin
            oleh Direktur Sumber Daya Pembelajaran dan Perpustakaan. Pada
            Oktober 2017 kembali pergantian pimpinan di Direktorat Sumber Daya
            Akademik dan Perpustakaan.
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.page-hero {
  position: relative;
  padding: 5rem 1.5rem 4rem;
  background: linear-gradient(160deg, #06060e 0%, #160f03 50%, #06060e 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-hero-glow {
  position: absolute;
  top: -8rem;
  left: 50%;
  transform: translateX(-50%);
  width: 36rem;
  height: 24rem;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(249, 177, 41, 0.18) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #f9b129;
  background: rgba(249, 177, 41, 0.1);
  border: 1px solid rgba(249, 177, 41, 0.2);
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  margin-bottom: 1rem;
}

.page-hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: white;
  margin-bottom: 0.75rem;
}

.page-hero-desc {
  color: rgba(255, 255, 255, 0.55);
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  max-width: 40rem;
  margin: 0 auto;
}

.hero-img-wrap {
  max-width: 56rem;
  margin: -3rem auto 0;
  padding: 0 1.5rem;
  position: relative;
  z-index: 10;
}

.hero-img {
  background-color: white;
  width: 100%;
  height: 22rem;
  object-fit: cover;
  display: block;
  border-radius: 1.25rem;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.content-wrap {
  max-width: 56rem;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.content-card {
  background: white;
  border-radius: 1.25rem;
  padding: 2.5rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
}

@media (max-width: 640px) {
  .content-card {
    padding: 1.5rem;
  }
}

.section-title {
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f9b129;
  display: inline-block;
}

.prose {
  font-size: 0.95rem;
  line-height: 1.85;
  color: #444;
  text-align: justify;
}

.prose :deep(p) {
  margin-bottom: 1rem;
  font-style: italic;
}
</style>
