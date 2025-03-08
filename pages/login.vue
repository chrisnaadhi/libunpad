<script setup>
const { login } = useDirectusAuth();
const { signIn, status } = useAuth();
const user = useDirectusUser();
const error = useError();
const route = useRoute();
const router = useRouter();

const showPassword = ref(false);
const passwordType = ref("password");
const email = ref("");
const password = ref("");
const defaultLoginNotif = ref(
  "Login khusus Staff Kandaga, jika anda bukan staff silahkan login dengan mengklik tombol PAuS E-Mail di bagian Login Mahasiswa / Dosen / Tenaga Kependidikan."
);
const loginNotif = ref(defaultLoginNotif.value);
const textLogin = ref("text-dark");
const isPegawai = computed(() => {
  let state = null;
  try {
    switch (user.value.role) {
      case "BE2D46E4-CB00-4585-8E34-5B571A80A820":
        state = true;
        break;
      case "19B573BB-B9DE-4CBC-89BB-596CFCA28448":
        state = true;
        break;
      case "9BB62337-8EAA-44AB-A47C-F8CACEF9B8A7":
        state = true;
        break;
      default:
        state = false;
        break;
    }
  } catch (error) {
    console.log("Logout..");
  }

  return state;
});

const togglePasswordType = () => {
  showPassword.value = !showPassword.value;
  if (!showPassword.value) {
    passwordType.value = "password";
  } else {
    passwordType.value = "text";
  }
};

const submitLogin = async () => {
  loginNotif.value = "Sedang mencoba masuk ke akun anda...";
  let pattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  let result = pattern.test(email.value);
  try {
    if (!result) {
      loginNotif.value = "Format Email Salah! Silahkan periksa kembali";
      setTimeout(() => {
        loginNotif.value = defaultLoginNotif.value;
      }, 2000);
    } else {
      await login({ email: email.value, password: password.value });
      loginNotif.value = "Berhasil masuk ke akun Anda! Mengalihkan halaman...";
      textLogin.value = "text-green-7 font-600";
      const { redir } = route.query;
      setTimeout(async () => {
        if (!redir) {
          await navigateTo("/dashboard", { redirectCode: 301 });
        } else {
          await navigateTo(`${redir}`, { redirectCode: 200 });
        }
      }, 2000);
    }
  } catch (err) {
    textLogin.value = "text-red-7 font-600";
    if (err.message.includes("Unauthorized")) {
      loginNotif.value = "Password Salah! Silahkan coba lagi";
      showError("Look like the password is wrong.");
      clearError();
      setTimeout(() => {
        textLogin.value = "text-dark";
        loginNotif.value = defaultLoginNotif.value;
      }, 3000);
    } else if (err.message.includes("Bad Request")) {
      loginNotif.value = "Format Email tidak sesuai!";
      console.log(err.message);
      setTimeout(() => {
        textLogin.value = "text-dark";
        loginNotif.value = defaultLoginNotif.value;
      }, 3000);
    }
  }
};

const googleLogin = async () => {
  await signIn("google", { callbackUrl: route.query.redir ?? "/" });
  console.log(route.query.redir);
};

const errorLogger = () => {
  console.log(error.value);
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
  <main class="ma text-center my-5 mb-25">
    <h1 class="text-5xl mb-8 text-unpad">Login</h1>
    <div class="flex flex-col-reverse max-w-5xl ma lg:flex-row justify-center">
      <div class="w-full">
        <form class="ma w-full max-w-sm" @submit.prevent="submitLogin">
          <h6>Login Staff Kandaga</h6>
          <div class="flex flex-col">
            <label for="email" class="text-left">Email :</label>
            <input
              class="input-space px-3"
              type="email"
              v-model="email"
              required
              autocomplete="email"
            />
          </div>
          <div class="flex flex-col relative">
            <label for="password" class="text-left">Password: </label>
            <input
              :type="passwordType"
              name="password"
              id="password"
              autocomplete="current-password"
              class="input-space w-full pl-3 pr-10"
              v-model="password"
              required
            />
            <div @click="togglePasswordType" class="toggle-password">
              <div class="i-mdi-eye text-xl" v-if="!showPassword" />
              <div class="i-mdi-eye-off text-xl" v-else />
            </div>
            <NuxtErrorBoundary @error="errorLogger">
              <div class="my-2 text-xs text-left">
                <p :class="textLogin">{{ loginNotif }}</p>
              </div>
            </NuxtErrorBoundary>

            <div class="flex gap-2 pt-1">
              <button
                class="form-btn"
                :class="email && password ? 'login-btn' : 'disable-btn'"
                :disabled="!email || !password"
                type="submit"
                @click.prevent="submitLogin"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>

      <div class="w-full max-w-sm ma lg:hidden">
        <div class="bg-unpad h-2 my-10" />
      </div>

      <div class="w-full max-w-sm ma flex flex-col items-center">
        <h6>Login Mahasiswa / Dosen / Tenaga Kependidikan</h6>
        <NuxtImg
          format="webp"
          src="/illustration/undraw_secure_login.png"
          class="w-70"
        />
        <button
          class="form-btn"
          :class="email || password ? 'disable-btn' : 'oauth-btn'"
          @click="googleLogin"
          :disable="email.length > 0"
        >
          <span>
            <img src="/images/lambang-unpad.png" class="w-8 h-8" alt="" />
          </span>
          PAuS Email
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
input {
  --at-apply: border border-unpad rounded;
}

.input-space {
  --at-apply: py-2;
}

.toggle-password {
  --at-apply: absolute right-0 top-11 mr-3;
}

.form-btn {
  --at-apply: btn flex items-center justify-center gap-2 w-full py-3 text-white font-semibold;
}

.disable-btn {
  --at-apply: bg-gray-2 border border-gray-3 border-2 cursor-not-allowed;
}

.login-btn {
  --at-apply: bg-green-3 border border-green-3 border-2 cursor-pointer;
}

.oauth-btn {
  --at-apply: bg-yellow-2 text-dark border border-unpad border-2 cursor-pointer transition-all-500 hover:(bg-unpad text-white);
}
</style>
