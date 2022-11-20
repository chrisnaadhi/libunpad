<script setup>
const { login } = useDirectusAuth();
const router = useRouter();

const showPassword = ref(false);
const passwordType = ref("password");
const email = ref("");
const password = ref("");
const loginNotif = ref("Silahkan masukkan Email dan Password untuk Login");
const textLogin = ref("text-dark");

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
  try {
    await login({ email: email.value, password: password.value });
    loginNotif.value = "Berhasil masuk ke akun Anda! Mengalihkan halaman...";
    textLogin.value = "text-green-7 font-600";
    setTimeout(async () => {
      await navigateTo("/keanggotaan", { redirectCode: 200 });
    }, 2000);
  } catch (err) {
    textLogin.value = "text-red-7 font-600";
    if (err.message.includes("Unauthorized")) {
      loginNotif.value = "Password Salah! Silahkan coba lagi";
      setTimeout(() => {
        textLogin.value = "text-dark";
        loginNotif.value = "Silahkan masukkan Email dan Password untuk Login";
      }, 3000);
    } else {
      loginNotif.value = err;
    }
  }
};
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
        <div class="my-2 text-xs text-left">
          <p :class="textLogin">{{ loginNotif }}</p>
        </div>
        <div class="flex gap-2">
          <button
            class="form-btn"
            :class="email && password ? 'login-btn' : 'disable-btn'"
            :disabled="!email || !password"
            type="submit"
          >
            Login
          </button>
          <button
            class="form-btn"
            :class="email || password ? 'disable-btn' : 'register-btn'"
            :disabled="email || password"
          >
            Register
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

.register-btn {
  --at-apply: bg-blue-3 cursor-pointer;
}
</style>
