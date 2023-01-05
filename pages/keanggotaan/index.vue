<script setup>
const { logout } = useDirectusAuth();
const user = useDirectusUser();
const router = useRouter();

if (!user.value) {
  await navigateTo("/login");
}

const onLogout = async () => {
  logout();
  console.log(user.value);
  setTimeout(async () => {
    logout();
    await navigateTo("/login", {
      redirectCode: 401,
    });
  }, 100);
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
            user
              ? `https://repository.unpad.ac.id:8050/assets/${user.avatar}.jpg`
              : ''
          "
          alt=""
          class="w-35 border-2 border-orange rounded-xl"
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
