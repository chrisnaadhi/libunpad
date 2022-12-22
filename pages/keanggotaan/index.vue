<script setup>
const { logout } = useDirectusAuth();
const user = useDirectusUser();

if (!user.value) {
  await navigateTo("/login");
}

const onLogout = async () => {
  try {
    logout();
    await navigateTo("/login");
  } catch (err) {
    console.log(err);
  }
};
useHead({
  title: "Keanggotaan Perpustakaan Pusat Unpad",
});
</script>

<template>
  <main class="ma container text-center">
    <section class="flex justify-center my-4 gap-4">
      <div v-if="user.avatar">
        <img
          :src="
            user.avatar
              ? `https://repository.unpad.ac.id:8050/assets/${user.avatar}.jpg`
              : ''
          "
          alt=""
          class="w-35 p-5 border-2 border-orange rounded-xl"
        />
      </div>
      <div>
        <div v-if="user" class="text-left">
          <h1>Halo, {{ user.first_name }} {{ user.last_name }}!</h1>
          <p>Email: {{ user.email }}</p>
          <p>Role: {{ user.role }}</p>
        </div>
        <div v-else>
          <h1>
            You're not Authorized! <br />
            Redirecting to Login Page...
          </h1>
        </div>
      </div>
    </section>
    <p>{{ user }}</p>
    <button
      type="button"
      class="btn bg-red text-white"
      v-show="user"
      @click="onLogout"
    >
      Logout
    </button>
  </main>
</template>

<style scoped>
h1 {
  --at-apply: text-2xl;
}

.logout {
  --at-apply: btn bg-red text-white;
}
</style>
