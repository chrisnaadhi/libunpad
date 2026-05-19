<script setup>
const { createItems } = useDirectusItems();
const token = ref();

const namaLengkap = ref(null);
const isLoad = ref(false);
const email = ref(null);
const pesan = ref(null);

const sendMessage = async () => {
  if (token.value) {
    if (namaLengkap && email && pesan) {
      isLoad.value = true;
      await createItems({
        collection: "pesan_kontak_kandaga",
        items: [
          {
            nama_lengkap: namaLengkap.value,
            email: email.value,
            pesan: pesan.value,
          },
        ],
      }).then(() => {
        alert("Pesan Terkirim!");
        namaLengkap.value = null;
        email.value = null;
        pesan.value = null;
        isLoad.value = false;
      });
    } else {
      alert("Form Harus Diisi!");
      return;
    }
  } else {
    alert("Token Harus Diisi!");
    return;
  }
};
</script>

<template>
  <main>
    <div class="page-hero">
      <div class="page-hero-glow" />
      <div class="relative z-1 text-center">
        <div class="section-badge">
          <div class="i-mdi-email-outline w-3.5 h-3.5" />
          Kandaga
        </div>
        <h1 class="page-hero-title">Kontak Kami</h1>
        <p class="page-hero-desc">
          Hubungi kami untuk pertanyaan, masukan, atau keperluan lainnya
        </p>
      </div>
    </div>

    <div class="content-wrap">
      <div class="contact-grid">
        <div class="form-card">
          <h2 class="card-title">
            <span class="i-mdi-send w-5 h-5" />
            Hubungi Kami
          </h2>
          <form @submit.prevent="sendMessage">
            <div class="input-block">
              <label for="nama">Nama Lengkap :</label>
              <input
                type="text"
                name="nama"
                id="nama"
                v-model="namaLengkap"
                required
              />
            </div>
            <div class="input-block">
              <label for="email">E-mail :</label>
              <input type="email" name="email" id="" v-model="email" required />
            </div>
            <div class="input-block">
              <label for="pesan">Pesan :</label>
              <textarea
                name="pesan"
                id="pesan"
                rows="10"
                v-model="pesan"
                required
              ></textarea>
            </div>
            <div class="input-block">
              <ClientOnly>
                <NuxtTurnstile v-model="token" />
              </ClientOnly>
            </div>
            <button type="submit" class="submit-btn" :disabled="!token">
              <span v-if="isLoad">
                <div
                  class="i-mdi-loading w-4 h-4"
                  style="animation: spin 1s linear infinite"
                />
                Sedang mengirim...
              </span>
              <span v-else>
                <div class="i-mdi-send w-4 h-4" />
                Kirim Pesan
              </span>
            </button>
          </form>
        </div>

        <div class="social-card">
          <h2 class="card-title">
            <span class="i-mdi-account-group w-5 h-5" />
            Media Sosial
          </h2>
          <div class="social-list">
            <NuxtLink
              href="https://instagram.com/kandagaunpad"
              target="_blank"
              class="social-item"
            >
              <div
                class="social-icon"
                style="background: rgba(193, 53, 132, 0.12); color: #c13584"
              >
                <div class="i-mdi-instagram w-5 h-5" />
              </div>
              <div>
                <p class="social-platform">Instagram</p>
                <p class="social-handle">@kandagaunpad</p>
              </div>
              <div class="i-mdi-arrow-right w-4 h-4 social-arrow" />
            </NuxtLink>
            <NuxtLink
              href="https://twitter.com/kandagaunpad"
              target="_blank"
              class="social-item"
            >
              <div
                class="social-icon"
                style="background: rgba(29, 161, 242, 0.12); color: #1da1f2"
              >
                <div class="i-mdi-twitter w-5 h-5" />
              </div>
              <div>
                <p class="social-platform">Twitter / X</p>
                <p class="social-handle">@kandagaunpad</p>
              </div>
              <div class="i-mdi-arrow-right w-4 h-4 social-arrow" />
            </NuxtLink>
            <NuxtLink
              href="mailto:perpustakaan@unpad.ac.id"
              target="_blank"
              class="social-item"
            >
              <div
                class="social-icon"
                style="background: rgba(234, 67, 53, 0.12); color: #ea4335"
              >
                <div class="i-mdi-email-outline w-5 h-5" />
              </div>
              <div>
                <p class="social-platform">Email</p>
                <p class="social-handle">perpustakaan@unpad.ac.id</p>
              </div>
              <div class="i-mdi-arrow-right w-4 h-4 social-arrow" />
            </NuxtLink>
          </div>
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

.content-wrap {
  max-width: 80rem;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .contact-grid {
    grid-template-columns: 3fr 2fr;
    align-items: start;
  }
}

.form-card,
.social-card {
  background: white;
  border-radius: 1.25rem;
  padding: 2.5rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
}

@media (max-width: 640px) {
  .form-card,
  .social-card {
    padding: 1.5rem;
  }
}

.card-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 1.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f9b129;
}

.input-block {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
}

.input-block label {
  font-size: 0.82rem;
  font-weight: 600;
  color: #555;
}

.input-block input,
.input-block textarea {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: 1.5px solid #e5e5e5;
  border-radius: 0.625rem;
  font-size: 0.9rem;
  color: #1a1a1a;
  background: #fafafa;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.input-block input:focus,
.input-block textarea:focus {
  border-color: #f9b129;
  box-shadow: 0 0 0 3px rgba(249, 177, 41, 0.12);
  background: white;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: #1a1a2e;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #f9b129;
  color: #1a0f00;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.social-list {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.social-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1rem;
  border-radius: 0.875rem;
  border: 1.5px solid #f0f0f0;
  text-decoration: none;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.social-item:hover {
  border-color: #f9b129;
  transform: translateX(4px);
  box-shadow: 0 4px 16px rgba(249, 177, 41, 0.1);
}

.social-icon {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.social-platform {
  font-size: 0.72rem;
  color: #aaa;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.1rem;
}

.social-handle {
  font-size: 0.9rem;
  font-weight: 700;
  color: #1a1a1a;
}

.social-arrow {
  margin-left: auto;
  color: #ccc;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.social-item:hover .social-arrow {
  color: #f9b129;
  transform: translateX(3px);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
