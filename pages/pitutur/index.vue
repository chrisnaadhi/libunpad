<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
// marketing/landing page for Pitutur feature
const { status } = useAuth();
const isLoggedIn = computed(() => status.value === "authenticated");
const router = useRouter();

/* demo chat simulation state */
const demoMessages = ref([
  { from: "user", text: "Apa itu “Pitutur” dalam konteks perpustakaan?" },
  {
    from: "bot",
    text: "Pitutur adalah AI berbasis kearifan Sunda, siap memandumu menemukan naskah, buku, dan ilmu dengan cara yang hangat dan bijak.",
  },
]);
const demoInput = ref("");
const demoReply = ref("Silakan ketik pertanyaanmu...");

const demoResponses = [
  "Punten, koleksi naskah Sunda di perpustakaan kami di antarana: Carita Parahyangan, Siksa Kanda Ng Kawih, jeung Fragmen Carita Pantun. Badé milari anu mana?",
  "Pitutur tiasa ngabantosan milarian rujukan tentang upacara adat atawa kasenian wayang golek. Mangga, kéngingkeun patalékan anjeun.",
  "Punten, aya naskah kuno “Bujangga Manik” anu nyaritakeun perjalanan suci. Itu tiasa diaksés dina form digital.",
  "Pitutur mendeteksi minat anjeun kana budaya Sunda. Aya ogé kumpulan wawacan jeung pupuh. Hoyong terang langkung lengkep?",
];

function pickResponse(query) {
  let reply = demoResponses[Math.floor(Math.random() * demoResponses.length)];
  const low = query.toLowerCase();
  if (low.includes("naskah") || low.includes("sunda")) {
    reply =
      "Punten, koleksi naskah Sunda nu aya: Carita Parahyangan, Fragmen Carita Pantun, jeung Amanat Galunggung. Eta sadaya tos didigitalisasi. Aya anu hoyong ditingali?";
  } else if (low.includes("halo") || low.includes("hai")) {
    reply =
      "Halo! Aya anu tiasa dibantos? Abdi Pitutur, siap ngabantosan anjeun.";
  }
  return reply;
}

function goToChat(question) {
  const encoded = encodeURIComponent(question);
  if (isLoggedIn.value) {
    router.push({ path: "/pitutur/chat", query: { q: question } });
  } else {
    router.push({
      path: "/login",
      query: { redir: `/pitutur/chat?q=${encoded}` },
    });
  }
}

function sendDemo() {
  const question = demoInput.value.trim();
  if (!question) return;
  // keep local simulation
  demoMessages.value.push({ from: "user", text: question });
  demoReply.value = pickResponse(question);
  demoInput.value = "";
  // then redirect user to actual chat with same query
  goToChat(question);
}

function simulateAsk() {
  const q = "Apa saja koleksi naskah Sunda?";
  demoInput.value = q;
  sendDemo();
  // also scroll (optional)
  scrollDemo();
}

function scrollDemo() {
  const demo = document.getElementById("demoSection");
  demo?.scrollIntoView({ behavior: "smooth", block: "center" });
}

onMounted(() => {
  // nothing extra for now
});
</script>

<template>
  <div class="batik-bg fixed inset-0 pointer-events-none"></div>

  <main class="container">
    <!-- header -->
    <div class="header">
      <div class="logo">
        <div class="logo-icon">
          <i class="i-mdi-feather text-xl"></i>
        </div>
        <div class="logo-text">Pitutur<span>·Kandaga</span></div>
      </div>
      <div class="pill">
        <i class="i-mdi-domain"></i>
        <span>Perpustakaan Universitas Padjadjaran</span>
      </div>
    </div>

    <!-- hero explanation -->
    <section
      class="hero-explainer flex flex-col-reverse md:flex-row items-center gap-8 my-16 bg-kandaga/10 p-8 rounded-lg"
    >
      <div class="flex-1 text-center md:text-left">
        <h1 class="hero-title text-5xl font-extrabold text-kandaga">
          Apa itu Pitutur?
        </h1>
        <p class="mt-4 text-xl text-gray-700 max-w-xl">
          Pitutur adalah pustakawan digital yang menggunakan kecerdasan buatan
          untuk membantu Anda menemukan koleksi Kandaga dengan cepat dan ramah.
        </p>
        <div class="mt-6">
          <NuxtLink
            :to="isLoggedIn ? '/pitutur/chat' : '/login?redir=/pitutur/chat'"
            class="btn bg-kandaga text-white px-8 py-4"
          >
            {{ isLoggedIn ? "Mulai Chat" : "Login untuk Chat" }}
          </NuxtLink>
        </div>
      </div>
      <div class="flex-1">
        <NuxtImg
          src="/illustration/undraw_Futuristic_interface.png"
          class="w-full max-w-md ma"
          alt="Ilustrasi Pitutur AI"
        />
      </div>
    </section>

    <!-- features grid -->
    <div class="section-header">
      <h2>· Tri Pustaka Pitutur ·</h2>
      <p>silih asah, silih asih, silih asuh — dalam layanan cerdas</p>
    </div>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon"><i class="i-mdi-brain"></i></div>
        <h3>Silih Asah <span>asah</span></h3>
        <p>
          Mengasah wawasan dengan rekomendasi personal, riset akademik, dan
          referensi lintas budaya Sunda &amp; dunia.
        </p>
      </div>
      <div class="feature-card">
        <div class="feature-icon"><i class="i-mdi-heart"></i></div>
        <h3>Silih Asih <span>asih</span></h3>
        <p>
          Ramah, empati, dan selalu menghargai setiap pertanyaan. Dibangun
          dengan prinsip kasih dalam melayani.
        </p>
      </div>
      <div class="feature-card">
        <div class="feature-icon"><i class="i-mdi-handshake"></i></div>
        <h3>Silih Asuh <span>asuh</span></h3>
        <p>
          Membimbing pengguna dari muda hingga dewasa, menjaga kelestarian
          naskah kuno dan nilai luhur.
        </p>
      </div>
    </div>

    <!-- demo section -->
    <div class="demo-section" id="demoSection">
      <div class="demo-inner">
        <div class="demo-text">
          <h3><i class="i-mdi-feather"></i> Tanyakan pada Pitutur</h3>
          <p>
            “Naon éta naskah Siksa Kanda Ng Kawih?” — coba tanyakan sekarang,
            rasakan bimbingan layaknya seorang sesepuh.
          </p>
          <p style="font-size: 0.95rem; opacity: 0.8">
            <i class="i-mdi-map"></i> Menjawab dalam bahasa Sunda &amp;
            Indonesia, merujuk ke koleksi digital perpustakaan.
          </p>
        </div>
        <div class="chat-window">
          <div v-for="(m, idx) in demoMessages" :key="idx" class="chat-message">
            <div
              class="chat-avatar"
              :class="m.from === 'bot' ? 'bg-kandaga' : ''"
            >
              <i
                :class="m.from === 'bot' ? 'i-mdi-robot' : 'i-mdi-account'"
              ></i>
            </div>
            <div :class="['chat-bubble', m.from === 'user' ? 'user' : '']">
              {{ m.text }}
            </div>
          </div>
          <div class="chat-input-sim">
            <input
              v-model="demoInput"
              type="text"
              placeholder="Tanyakan sesuatu... (demo)"
            />
            <button @click="sendDemo">&rightarrow;</button>
          </div>
          <p class="text-xs text-right opacity-60">*simulasi interaksi</p>
        </div>
      </div>
    </div>

    <!-- closing cultural remark -->
    <div class="closing-remark">
      <p>
        <i class="i-mdi-format-quote-open"></i> Pitutur: jembatan antara lontar
        kuno dan kecerdasan masa depan.
      </p>
      <p>Hadir untuk setiap warga perpustakaan, kapanpun, dimanapun.</p>
    </div>
  </main>
</template>

<style scoped>
/* batik pattern background */
.batik-bg {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 30 L30 55 L5 30 Z' fill='none' stroke='%23e9dccd' stroke-width='0.8' opacity='0.3' /%3E%3Cpath d='M30 15 L45 30 L30 45 L15 30 Z' fill='none' stroke='%23c5a028' stroke-width='0.6' opacity='0.2' /%3E%3C/svg%3E");
  background-repeat: repeat;
  z-index: -1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  position: relative;
  z-index: 2;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  background: #1e3c72;
  color: #f8f3e6;
  width: 48px;
  height: 48px;
  border-radius: 12px 4px 12px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  box-shadow: 0 8px 12px -6px rgba(0, 20, 30, 0.2);
}

.logo-text {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #1e3c72;
}

.logo-text span {
  font-family: "Source Serif Pro", serif;
  font-weight: 400;
  font-style: italic;
  color: #c5a028;
  margin-left: 4px;
}

.pill {
  background: #e8e0d3;
  border-radius: 40px;
  padding: 0.6rem 1.4rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #1e3c72;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

.pill i {
  color: #c5a028;
}

.cta-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-primary {
  background: #1e3c72;
  color: white;
  border: none;
  padding: 0.9rem 2.2rem;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  box-shadow: 0 10px 20px -8px #1e3c72;
  border: 1px solid #1e3c72;
}

.btn-primary:hover {
  background: #132a4d;
  transform: translateY(-3px);
  box-shadow: 0 15px 25px -10px #132a4d;
}

.btn-outline {
  background: transparent;
  border: 1px solid #b9aa8f;
  color: #1e2b3c;
  padding: 0.9rem 2.2rem;
  font-weight: 500;
  border-radius: 40px;
  cursor: pointer;
  transition: 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-outline:hover {
  background: #e8e0d3;
  border-color: #a59273;
}

.hero-image {
  flex: 1 1 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.hero-image i {
  font-size: 6rem;
  color: #1e3c72;
  opacity: 0.2;
}

.hero-image .wayang-silhouette {
  width: 80%;
  height: auto;
  filter: drop-shadow(0 10px 6px rgba(30, 60, 114, 0.2));
}

.wayang-silhouette svg {
  width: 100%;
  height: auto;
}

.section-header {
  text-align: center;
  margin: 5rem 0 2.5rem;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e3c72;
}

.section-header p {
  font-size: 1.1rem;
  color: #4f5f72;
  max-width: 650px;
  margin: 0.5rem auto 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.feature-card {
  background: rgba(255, 250, 240, 0.7);
  backdrop-filter: blur(2px);
  padding: 2rem 1.8rem;
  border-radius: 24px 8px 24px 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.03);
  border: 1px solid #f0e7db;
  transition: 0.2s;
}

.feature-card:hover {
  transform: translateY(-6px);
  border-color: #c5a028;
  box-shadow: 0 20px 25px -12px rgba(197, 160, 40, 0.25);
}

.feature-icon {
  width: 60px;
  height: 60px;
  background: #fff2df;
  border-radius: 18px 4px 18px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #1e3c72;
  font-size: 1.8rem;
  border: 1px solid #e3d5c3;
}

.feature-card h3 {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e2b3c;
}

.feature-card h3 span {
  font-size: 1rem;
  background: #c5a02822;
  color: #846f28;
  padding: 0.2rem 0.6rem;
  border-radius: 30px;
  margin-left: 0.5rem;
  font-weight: 400;
}

.feature-card p {
  color: #3f5065;
}

.demo-section {
  background: #1e3c72;
  background-image: radial-gradient(circle at 20% 30%, #2a4b82, #0f2a4a);
  border-radius: 40px 16px 40px 16px;
  padding: 3rem 2.5rem;
  margin: 5rem 0 3rem;
  color: white;
  box-shadow: 0 30px 35px -15px #0a1a2c;
}

.demo-inner {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
}

.demo-text {
  flex: 1 1 250px;
}

.demo-text h3 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.demo-text h3 i {
  color: #c5a028;
  margin-right: 0.3rem;
}

.demo-text p {
  opacity: 0.9;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.chat-window {
  flex: 1 1 350px;
  background: #fcf9f3;
  border-radius: 28px 10px 28px 10px;
  padding: 1.5rem;
  color: #1e2b3c;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
}

.chat-message {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1.2rem;
  align-items: flex-start;
}

.chat-avatar {
  width: 36px;
  height: 36px;
  background: #1e3c72;
  border-radius: 10px 2px 10px 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
  flex-shrink: 0;
}

.chat-bubble {
  background: #eae2d7;
  padding: 0.8rem 1.2rem;
  border-radius: 18px 6px 18px 6px;
  max-width: 80%;
}

.chat-bubble.user {
  background: #c5a028;
  color: white;
  margin-left: auto;
  border-radius: 6px 18px 6px 18px;
}

.chat-input-sim {
  display: flex;
  margin-top: 1.5rem;
  background: white;
  border-radius: 40px;
  border: 1px solid #ddd2c2;
  padding: 0.3rem 0.3rem 0.3rem 1.2rem;
}

.chat-input-sim input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0.6rem 0;
  font-size: 0.95rem;
  outline: none;
}

.chat-input-sim button {
  background: #1e3c72;
  border: none;
  color: white;
  width: 42px;
  height: 42px;
  border-radius: 40px;
  cursor: pointer;
  transition: 0.2s;
}

.chat-input-sim button:hover {
  background: #c5a028;
}

.closing-remark {
  background: #fef9f3;
  border-left: 4px solid #c5a028;
  padding: 1.5rem 2rem;
  margin: 4rem 0 2rem;
  border-radius: 0.5rem;
}

.closing-remark p:first-child {
  font-family: "Source Serif Pro", serif;
  font-style: italic;
  font-size: 1.75rem;
  color: #1e3c72;
}

.closing-remark p:last-child {
  margin-top: 0.5rem;
  color: #5a6b7c;
}

.footnote {
  text-align: center;
  margin-top: 3rem;
  padding: 1.5rem 0;
  border-top: 1px solid #e0d6c9;
  color: #5f6f82;
  font-size: 0.9rem;
}

.footnote i {
  color: #c5a028;
}

/* hero explanation typography */
.hero-title {
  font-size: 2.75rem;
  font-weight: 700;
  color: #1e2b3c;
  margin-bottom: 0.75rem;
}

.hero-explainer p {
  color: #4a5568;
}

.hero-explainer {
  background: #fffaf0;
}

@media (max-width: 700px) {
  .hero-title {
    font-size: 2.5rem;
  }
}
</style>
