<script setup>
const { login } = useDirectusAuth();
const { signIn, status } = useAuth();
const user = useDirectusUser();
const error = useError();
const route = useRoute();

const showPassword = ref(false);
const passwordType = ref("password");
const email = ref("");
const password = ref("");
const defaultLoginNotif = ref(
  "Login khusus Staff Kandaga — gunakan PAuS SSO untuk mahasiswa, dosen, dan tenaga kependidikan.",
);
const loginNotif = ref(defaultLoginNotif.value);
const textLogin = ref("text-slate-700");

const togglePasswordType = () => {
  showPassword.value = !showPassword.value;
  passwordType.value = showPassword.value ? "text" : "password";
};

const submitLogin = async () => {
  loginNotif.value = "Memeriksa kredensial Anda...";
  const pattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const result = pattern.test(email.value);

  try {
    if (!result) {
      textLogin.value = "text-red-600 font-semibold";
      loginNotif.value = "Format email tidak valid. Mohon periksa kembali.";
      setTimeout(() => {
        textLogin.value = "text-slate-700";
        loginNotif.value = defaultLoginNotif.value;
      }, 2500);
      return;
    }

    await login({ email: email.value, password: password.value });
    textLogin.value = "text-emerald-700 font-semibold";
    loginNotif.value = "Berhasil masuk! Mengalihkan ke dashboard...";

    const { redir } = route.query;
    setTimeout(async () => {
      await navigateTo(redir ?? "/dashboard", {
        redirectCode: redir ? 200 : 301,
      });
    }, 1400);
  } catch (err) {
    textLogin.value = "text-red-600 font-semibold";
    if (err?.message?.includes("Unauthorized")) {
      loginNotif.value = "Kredensial tidak cocok. Silakan coba lagi.";
    } else if (err?.message?.includes("Bad Request")) {
      loginNotif.value = "Format login tidak sesuai. Periksa email Anda.";
    } else {
      loginNotif.value = "Terjadi kesalahan saat login. Coba lagi nanti.";
    }

    console.error(err);
    setTimeout(() => {
      textLogin.value = "text-slate-700";
      loginNotif.value = defaultLoginNotif.value;
    }, 3500);
  }
};

const googleLogin = async () => {
  await signIn("google", { callbackUrl: route.query.redir ?? "/" });
};

const pausLogin = async () => {
  await signIn("paus", { callbackUrl: route.query.redir ?? "/" });
};

const errorLogger = () => {
  console.error(error.value);
};

if (status.value === "authenticated") {
  await navigateTo("/");
}

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});
</script>

<template>
  <main class="min-h-screen bg-slate-50 py-10">
    <div
      class="container ma grid gap-10 xl:grid-cols-[1.2fr_0.95fr] items-center"
    >
      <section
        class="relative overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white shadow-[0_40px_80px_rgba(15,23,42,0.18)] sm:p-10"
      >
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,177,41,0.24),transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),transparent_35%)] pointer-events-none"
        ></div>
        <div class="relative space-y-8">
          <span
            class="inline-flex rounded-full bg-[#F9B129]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[#F9B129]"
          >
            Kandaga Staff Portal
          </span>
          <h1 class="text-4xl font-black leading-tight sm:text-5xl">
            Masuk ke akun Kandaga
          </h1>
          <p class="max-w-xl text-base leading-8 text-slate-200/90 sm:text-lg">
            Akses dashboard staf Kandaga, kelola koleksi, dan gunakan layanan
            perpustakaan dalam lingkungan kerja resmi Unpad.
          </p>

          <div class="grid gap-4 sm:grid-cols-2">
            <div
              class="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur-sm"
            >
              <p
                class="text-sm font-semibold uppercase tracking-[0.24em] text-[#F9B129]"
              >
                Keuntungan
              </p>
              <ul class="mt-4 space-y-3 text-sm text-slate-100">
                <li>• Akses data staf dan operasional</li>
                <li>• Pengelolaan koleksi internal</li>
                <li>• Notifikasi dan pengumuman khusus</li>
              </ul>
            </div>
            <div
              class="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur-sm"
            >
              <p
                class="text-sm font-semibold uppercase tracking-[0.24em] text-[#F9B129]"
              >
                Catatan penting
              </p>
              <p class="mt-4 text-sm leading-6 text-slate-200/80">
                Mahasiswa, dosen, dan tenaga kependidikan dapat menggunakan
                tombol PAuS SSO untuk membuka akses melalui akun Unpad resmi.
              </p>
            </div>
          </div>

          <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-3xl bg-[#F9B129]/10 p-5 text-slate-950">
              <p class="text-sm font-semibold uppercase tracking-[0.24em]">
                Staff Login
              </p>
              <p class="mt-3 text-sm leading-6">
                Gunakan akun Directus staf untuk masuk ke area manajemen
                Kandaga.
              </p>
            </div>
            <div class="rounded-3xl bg-white/5 p-5 text-slate-100">
              <p class="text-sm font-semibold uppercase tracking-[0.24em]">
                SSO Unpad
              </p>
              <p class="mt-3 text-sm leading-6">
                Pilihan cepat untuk akses akademik bagi sivitas Unpad melalui
                PAuS atau Google email.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        class="rounded-[2rem] bg-white p-8 shadow-[0_28px_70px_rgba(15,23,42,0.08)] sm:p-10"
      >
        <div class="space-y-6">
          <div>
            <p class="text-sm uppercase tracking-[0.34em] text-slate-400">
              Akses Direkomendasikan
            </p>
            <h2 class="mt-3 text-3xl font-black text-slate-950">
              Masuk dengan PAuS SSO
            </h2>
            <p class="mt-2 text-sm text-slate-600">
              Gunakan PAuS SSO untuk pengalaman login yang cepat, aman, dan
              prioritas. Ini adalah metode utama bagi sivitas Unpad.
            </p>
          </div>

          <div class="grid gap-4">
            <button
              type="button"
              class="primary-sso-btn"
              @click="pausLogin"
              :disabled="email.length > 0 || password.length > 0"
            >
              <img
                src="/images/lambang-unpad.png"
                alt="PAuS"
                class="btn-icon btn-icon-large"
              />
              <span>
                <span class="block text-base font-semibold"
                  >Login melalui PAuS SSO</span
                >
                <span class="block text-xs text-slate-900/70"
                  >Mahasiswa / Dosen / Tenaga Kependidikan</span
                >
              </span>
            </button>
            <button
              type="button"
              class="outline-btn outline-btn-secondary"
              @click="googleLogin"
              :disabled="email.length > 0"
            >
              <img
                src="/images/lambang-unpad.png"
                alt="Google"
                class="btn-icon"
              />
              <span>Login via PAuS Email (Google)</span>
            </button>
          </div>

          <section
            class="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-6"
          >
            <div class="mb-4">
              <p class="text-sm uppercase tracking-[0.34em] text-slate-400">
                Login Staff (Opsional)
              </p>
              <h3 class="mt-3 text-2xl font-semibold text-slate-950">
                Akses internal Kandaga
              </h3>
            </div>

            <form class="space-y-6" @submit.prevent="submitLogin">
              <div class="grid gap-5">
                <div class="space-y-2 text-left">
                  <label
                    for="email"
                    class="block text-sm font-semibold text-slate-700"
                    >Email</label
                  >
                  <input
                    id="email"
                    type="email"
                    v-model="email"
                    autocomplete="email"
                    required
                    class="input-card"
                    placeholder="nama@kandaga.unpad.ac.id"
                  />
                </div>
                <div class="space-y-2 text-left relative">
                  <label
                    for="password"
                    class="block text-sm font-semibold text-slate-700"
                    >Password</label
                  >
                  <input
                    id="password"
                    :type="passwordType"
                    v-model="password"
                    autocomplete="current-password"
                    required
                    class="input-card pr-12"
                    placeholder="Masukkan password Anda"
                  />
                  <button
                    type="button"
                    class="toggle-password"
                    @click="togglePasswordType"
                    aria-label="Toggle password visibility"
                  >
                    <div v-if="!showPassword" class="i-mdi-eye" />
                    <div v-else class="i-mdi-eye-off" />
                  </button>
                </div>
              </div>

              <div class="rounded-3xl bg-white p-4 text-sm text-slate-600">
                <NuxtErrorBoundary @error="errorLogger">
                  <p :class="textLogin">{{ loginNotif }}</p>
                </NuxtErrorBoundary>
              </div>

              <button
                type="submit"
                :disabled="!email || !password"
                class="subtle-btn"
              >
                Masuk ke Staff (opsional)
              </button>
            </form>

            <div class="rounded-3xl bg-white p-4 text-sm text-slate-600">
              <p class="font-semibold">Butuh akun staf?</p>
              <p class="mt-1">
                Hubungi tim Kandaga untuk aktivasi akun internal dan akses
                manajemen.
              </p>
            </div>
          </section>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.input-card {
  --at-apply: w-full rounded-3xl border border-slate-200 bg-white px-4 py-3
    text-sm text-slate-900 outline-none transition-shadow duration-200
    focus: (ring-2 ring-[#F9B129]/30 shadow-sm);
}

.primary-btn {
  --at-apply: w-full rounded-3xl bg-[#F9B129] px-5 py-3 text-sm font-semibold
    text-[#1a0f00] shadow-lg transition duration-200 hover: (brightness-95)
    disabled: (cursor-not-allowed opacity-60);
}

.secondary-btn {
  --at-apply: flex items-center gap-3 rounded-3xl bg-slate-950 px-5 py-3 text-sm
    font-semibold text-white transition duration-200 hover: (brightness-110)
    disabled: (cursor-not-allowed opacity-60);
}

.primary-sso-btn {
  --at-apply: flex items-center gap-4 rounded-3xl bg-[#F9B129] px-6 py-5
    text-base font-bold text-[#1a0f00]
    shadow-[0_18px_42px_rgba(249, 177, 41, 0.3)] transition duration-200
    hover: (brightness-95) disabled: (cursor-not-allowed opacity-60) w-full
    justify-center;
}

.btn-icon-large {
  --at-apply: h-11 w-11;
}

.outline-btn {
  --at-apply: flex items-center gap-3 rounded-3xl border border-slate-300
    bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition
    duration-200 hover: (bg-slate-100) disabled: (cursor-not-allowed opacity-60)
    min-h-[3.8rem] w-full justify-center;
}

.outline-btn-secondary {
  --at-apply: text-slate-700 bg-white border-slate-300;
}

.subtle-btn {
  --at-apply: w-full rounded-3xl border border-slate-200 bg-slate-100 px-5 py-3
    text-sm font-semibold text-slate-700 transition duration-200
    hover: (bg-slate-200) disabled: (cursor-not-allowed opacity-60);
}

.btn-icon {
  --at-apply: h-9 w-9 rounded-full border border-slate-200 bg-white object-cover;
}

.toggle-password {
  --at-apply: absolute right-4 top-1/2 -translate-y-1/2 text-slate-400
    hover: text-slate-700;
}

.divider {
  --at-apply: relative mx-auto my-3 w-full text-center text-xs uppercase
    tracking-[0.28em] text-slate-400;
}

.divider::before,
.divider::after {
  content: "";
  --at-apply: absolute top-1/2 h-px w-[calc(50%-4rem)] bg-slate-200;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

@media (max-width: 1024px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
</style>
