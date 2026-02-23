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

const route = useRoute();
const router = useRouter();

const send = () => {
  if (!input.value.trim()) return;
  messages.value.push({ from: "user", text: input.value });
  input.value = "";
  // TODO: call AI backend here and append response
};

// auto-send if query parameter exists
onMounted(() => {
  const q = route.query.q;
  if (q && typeof q === "string") {
    input.value = q;
    // give next tick for reactive DOM
    send();
    // remove query to avoid repeat
    router.replace({ query: {} });
  }
});
</script>

<template>
  <main v-if="isReady" class="max-w-4xl ma py-10 px-4">
    <section class="text-center mb-6">
      <h1 class="text-3xl md:text-4xl font-bold text-kandaga">Pitutur Chat</h1>
      <p class="text-gray-600">
        Ajukan pertanyaan anda tentang koleksi Kandaga.
      </p>
    </section>

    <section
      class="border border-gray-200 rounded-lg p-4 flex flex-col h-[70vh] bg-white shadow-lg"
    >
      <div
        class="flex-1 overflow-y-auto mb-4 space-y-2 pr-2 scrollbar-thin scrollbar-thumb-kandaga/30 scrollbar-track-gray-100"
        id="chat-window"
      >
        <div
          v-for="(msg, idx) in messages"
          :key="idx"
          :class="
            msg.from === 'bot' ? 'justify-start' : 'justify-end' + ' flex'
          "
        >
          <span
            :class="[
              'inline-block px-4 py-2 rounded-lg max-w-[80%] break-words',
              msg.from === 'bot'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-kandaga text-white',
            ]"
          >
            {{ msg.text }}
          </span>
        </div>
      </div>
      <div class="flex gap-2">
        <input
          v-model="input"
          @keyup.enter="send"
          type="text"
          class="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-kandaga/50"
          placeholder="Ketik pesan..."
        />
        <button
          :disabled="!input.trim()"
          class="btn bg-kandaga text-white px-4 py-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          @click="send"
        >
          Kirim
        </button>
      </div>
    </section>
  </main>
  <div v-else class="flex justify-center items-center h-screen">
    <div class="loader"></div>
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
