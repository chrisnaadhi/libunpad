<script setup>
const showPassword = ref(false);
const passwordType = ref("password");

const togglePasswordType = () => {
  showPassword.value = !showPassword.value;
  if (!showPassword.value) {
    passwordType.value = "password";
  } else {
    passwordType.value = "text";
  }
};
</script>

<template>
  <main class="ma container text-center my-25">
    <h1 class="text-5xl my-4">Login</h1>
    <section class="ma max-w-sm">
      <div class="flex flex-col">
        <label for="email" class="">Email</label>
        <input class="input-space" type="email" required />
      </div>
      <div class="flex flex-col relative">
        <label for="password">Password: </label>
        <input
          :type="passwordType"
          name="password"
          id="password"
          class="input-space w-full pr-10"
        />
        <div @click="togglePasswordType" class="absolute right-0 top-9 mr-3">
          <div class="i-mdi-eye" v-if="!showPassword" />
          <div class="i-mdi-eye-off" v-else />
        </div>
        <div class="flex my-4 gap-2">
          <button class="btn bg-green-3 w-full">Login</button>
          <button class="btn bg-blue-3 w-full" disabled>Register</button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
input {
  --at-apply: border border-orange rounded;
}

.input-space {
  --at-apply: py-2 px-3;
}
</style>
