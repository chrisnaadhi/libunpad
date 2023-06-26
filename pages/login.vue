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
const loginNotif = ref("Silahkan masukkan Email dan Password untuk Login");
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
        loginNotif.value = "Silahkan masukkan Email dan Password untuk Login";
      }, 2000);
    } else {
      await login({ email: email.value, password: password.value });
      loginNotif.value = "Berhasil masuk ke akun Anda! Mengalihkan halaman...";
      textLogin.value = "text-green-7 font-600";
      setTimeout(async () => {
        if (isPegawai.value) {
          await navigateTo("/dashboard", { redirectCode: 301 });
        } else {
          const { redir } = route.query;
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
        loginNotif.value = "Silahkan masukkan Email dan Password untuk Login";
      }, 3000);
    } else if (err.message.includes("Bad Request")) {
      loginNotif.value = "Format Email tidak sesuai!";
      console.log(err.message);
      setTimeout(() => {
        textLogin.value = "text-dark";
        loginNotif.value = "Silahkan masukkan Email dan Password untuk Login";
      }, 3000);
    }
  }
};

const googleLogin = async () => {
  await signIn("google", { callbackUrl: "/" });
};

const errorLogger = () => {
  console.log(error.value);
};

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});
</script>

<template>
  <main class="ma container text-center my-25">
    <h1 class="text-5xl my-4">Login</h1>
    <form class="ma max-w-sm" @submit.prevent="submitLogin">
      <div class="flex flex-col">
        <label for="email" class="text-left">Email :</label>
        <input class="input-space px-3" type="email" v-model="email" required />
      </div>
      <div class="flex flex-col relative">
        <label for="password" class="text-left">Password: </label>
        <input
          :type="passwordType"
          name="password"
          id="password"
          class="input-space w-full pl-3 pr-10"
          v-model="password"
          required
        />
        <div @click="togglePasswordType" class="toggle-password">
          <div class="i-mdi-eye" v-if="!showPassword" />
          <div class="i-mdi-eye-off" v-else />
        </div>
        <NuxtErrorBoundary @error="errorLogger">
          <div class="my-2 text-xs text-left">
            <p :class="textLogin">{{ loginNotif }}</p>
          </div>
        </NuxtErrorBoundary>

        <div class="flex gap-2">
          <button
            class="form-btn"
            :class="email && password ? 'login-btn' : 'disable-btn'"
            :disabled="!email || !password"
            type="submit"
            @click.prevent="submitLogin"
          >
            Login
          </button>
          <button
            class="form-btn flex items-center justify-center gap-2"
            :class="email || password ? 'disable-btn' : 'oauth-btn'"
            @click="googleLogin"
            :disable="email.length > 0"
          >
            <span>
              <img src="/images/lambang-unpad.png" class="w-6 h-6" alt="" />
            </span>
            PAuS Email
          </button>
        </div>
      </div>
    </form>
  </main>
</template>

<style scoped>
input {
  --at-apply: border border-orange rounded;
}

.input-space {
  --at-apply: py-2;
}

.toggle-password {
  --at-apply: absolute right-0 top-9 mr-3;
}

.form-btn {
  --at-apply: btn w-full;
}

.disable-btn {
  --at-apply: bg-gray-2 cursor-not-allowed;
}

.login-btn {
  --at-apply: bg-green-3 cursor-pointer;
}

.oauth-btn {
  --at-apply: bg-orange-3 cursor-pointer;
}
</style>
