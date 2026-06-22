<script setup>
// protect chat route
definePageMeta({ middleware: "authentication-check" });

const { status } = useAuth();
const isReady = computed(() => status.value === "authenticated");

// placeholder reactive state for messages
const messages = ref([
  { from: "bot", text: "Halo! Ada yang bisa saya bantu tentang koleksi?" },
]);
const input = ref("");
const relatedPosts = ref([]);

const route = useRoute();
const router = useRouter();

const lensPosts = ref([]);

watch([messages, relatedPosts], async () => {
  await nextTick();
  const el = document.getElementById("chat-window");
  if (el) el.scrollTop = el.scrollHeight;
});

const getCategoryBadge = (cat) => {
  const map = {
    layanan: {
      label: "Layanan",
      icon: "i-mdi-briefcase-outline",
      cls: "bg-green-50 text-green-700 border-green-200",
    },
    informasi: {
      label: "Informasi",
      icon: "i-mdi-information-outline",
      cls: "bg-blue-50 text-blue-700 border-blue-200",
    },
    edukasi_literasi: {
      label: "Edukasi",
      icon: "i-mdi-book-open-outline",
      cls: "bg-amber-50 text-amber-700 border-amber-200",
    },
    pengumuman: {
      label: "Pengumuman",
      icon: "i-mdi-bullhorn-outline",
      cls: "bg-red-50 text-red-700 border-red-200",
    },
    acara: {
      label: "Acara",
      icon: "i-mdi-calendar-star-outline",
      cls: "bg-purple-50 text-purple-700 border-purple-200",
    },
  };
  return (
    map[cat] ||
    {
      label: cat,
      icon: "i-mdi-tag-outline",
      cls: "bg-gray-100 text-gray-600 border-gray-200",
    }
  );
};

const demoResponses = [
  "Tentu! Saya dapat membantu Anda menemukan buku, jurnal, atau referensi yang sesuai. Silakan beritahu topik yang ingin Anda cari.",
  "Koleksi digital kami mencakup ribuan judul dari berbagai bidang ilmu. Apa yang ingin Anda pelajari hari ini?",
  "Saya dapat membantu Anda dengan pencarian koleksi, perpanjangan peminjaman, atau rekomendasi bacaan. Apa yang bisa saya bantu?",
  "Berdasarkan pertanyaan Anda, saya menemukan beberapa referensi relevan di katalog kami. Ingin saya tampilkan hasilnya?",
];

function pickResponse(query) {
  let reply =
    demoResponses[Math.floor(Math.random() * demoResponses.length)];
  const low = query.toLowerCase();
  if (low.includes("buku") || low.includes("koleksi")) {
    reply =
      "Perpustakaan kami memiliki koleksi lebih dari 50.000 judul buku, jurnal, dan e-book. Silakan beritahu topik atau judul yang Anda cari!";
  } else if (low.includes("halo") || low.includes("hai")) {
    reply =
      "Halo! Saya Pitutur, asisten pustakawan digital Anda. Ada yang bisa saya bantu hari ini?";
  }
  return reply;
}

function findRelatedPosts(query) {
  if (!lensPosts.value.length) return [];
  const q = query.toLowerCase();
  return lensPosts.value
    .filter((p) => {
      const title = (p.title || "").toLowerCase();
      const excerpt = (p.excerpt || "").toLowerCase();
      const tags = Array.isArray(p.tags)
        ? p.tags.map((t) => t.toLowerCase())
        : [];
      return (
        title.includes(q) ||
        excerpt.includes(q) ||
        tags.some((t) => t.includes(q))
      );
    })
    .slice(0, 3);
}

const send = () => {
  if (!input.value.trim()) return;
  const q = input.value.trim();
  messages.value.push({ from: "user", text: q });
  input.value = "";

  const related = findRelatedPosts(q);
  relatedPosts.value = related;

  let reply = pickResponse(q);
  if (related.length) {
    reply += ` Saya juga temukan ${related.length} informasi yang mungkin relevan di bawah:`;
  }
  messages.value.push({ from: "bot", text: reply });
  // TODO: call AI backend here and append response
};

// auto-send if query parameter exists
onMounted(async () => {
  const q = route.query.q;
  if (q && typeof q === "string") {
    input.value = q;
    // give next tick for reactive DOM
    send();
    // remove query to avoid repeat
    router.replace({ query: {} });
  }

  try {
    const posts = await getItems({
      collection: "kandaga_lens",
      params: {
        filter: { status: "published" },
        sort: "-date_created",
        limit: 20,
      },
    });
    lensPosts.value = posts || [];
  } catch (e) {
    console.error("Failed to fetch lens posts:", e);
  }
});
</script>

<template>
  <div>
    <main v-if="isReady" class="max-w-4xl ma py-10 px-4">
      <section>
        <div class="">
          <NuxtLink to="/pitutur" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <div class="i-mdi-arrow-left-thin w-4 h-4" />
            Kembali
          </NuxtLink>
        </div>
      </section>
      <section class="text-center mb-6">
        <h1 class="text-3xl md:text-4xl font-bold text-kandaga">Pitutur Chat</h1>
        <p class="text-gray-600">
          Ajukan pertanyaan anda tentang Layanan yang tersedia di Kandaga. Pitutur akan membantu menjawab dan memberikan
          informasi yang anda perlukan untuk belajar dan penelitian di Universitas Padjadjaran.
        </p>
      </section>

      <section class="border border-gray-200 rounded-lg p-4 flex flex-col h-[70vh] bg-white shadow-lg">
        <div
          class="flex-1 overflow-y-auto mb-4 space-y-2 pr-2 scrollbar-thin scrollbar-thumb-kandaga/30 scrollbar-track-gray-100"
          id="chat-window">
          <div v-for="(msg, idx) in messages" :key="idx" class="flex"
            :class="msg.from === 'bot' ? 'justify-start' : 'justify-end'">
            <div class="max-w-[85%]">
              <span :class="[
                'inline-block px-4 py-2 rounded-lg break-words',
                msg.from === 'bot'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-kandaga text-white',
              ]">
                {{ msg.text }}
              </span>

              <!-- Related Lens posts attached to latest bot message -->
              <div v-if="
                msg.from === 'bot' &&
                idx === messages.length - 1 &&
                relatedPosts.length
              " class="mt-3 space-y-2">
                <p class="text-xs font-600 text-gray-500 mb-1">
                  Informasi terkait dari Kandaga Lens:
                </p>
                <div v-for="post in relatedPosts" :key="post.id"
                  class="flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 bg-white hover:border-kandaga/30 hover:shadow-sm transition-all-200 cursor-pointer"
                  @click="router.push(`/lens/content/${post.slug}`)">
                  <div v-if="post.thumbnail" class="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <NuxtImg :src="handleAssets(post.thumbnail)" :alt="post.title" class="w-full h-full object-cover" />
                  </div>
                  <div v-else class="w-16 h-12 rounded-lg flex-shrink-0 bg-gray-100 flex items-center justify-center">
                    <div class="i-mdi-image-outline w-5 h-5 text-gray-300" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-600 text-gray-800 leading-snug line-clamp-2">
                      {{ trimTitle(post.title, 60) }}
                    </p>
                    <div class="flex items-center gap-2 mt-1">
                      <span class="text-[10px] font-600 px-1.5 py-0.5 rounded-full border"
                        :class="getCategoryBadge(post.category).cls">
                        {{ getCategoryBadge(post.category).label }}
                      </span>
                      <span class="text-[10px] text-gray-400">
                        {{ formatDate(post.date_created) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-2">
          <input v-model="input" @keyup.enter="send" type="text"
            class="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-kandaga/50"
            placeholder="Ketik pesan..." />
          <button :disabled="!input.trim()"
            class="btn bg-kandaga text-white px-4 py-2 disabled:bg-gray-400 disabled:cursor-not-allowed" @click="send">
            Kirim
          </button>
        </div>
      </section>
    </main>
    <div v-else class="flex justify-center items-center h-screen">
      <div class="loader"></div>
    </div>
  </div>
</template>

<style scoped>
/* automatically scroll chat to bottom when messages change */
#chat-window {
  scroll-behavior: smooth;
}
</style>

<style scoped>
/* chat specific styles could go here */
</style>
