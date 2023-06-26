<script setup>
const { logout } = useDirectusAuth();
const user = useDirectusUser();
const isPegawai = computed(() => {
  let state = null;
  try {
    switch (user.value.role) {
      case "BE2D46E4-CB00-4585-8E34-5B571A80A820":
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
    console.log(console.log(error));
  }

  return state;
});

const onLogout = async () => {
  logout();
  setTimeout(async () => {
    await navigateTo("/login", {
      redirectCode: 401,
    });
  }, 1000);
};

useHead({
  title: "Keanggotaan Perpustakaan Pusat Unpad",
});

definePageMeta({
  middleware: ["authentication-check"],
});
</script>

<template>
  <main class="ma container text-center">
    <section class="flex justify-center my-4 gap-4">
      <div v-if="user">
        <img
          :src="
            user.avatar
              ? `https://repository.unpad.ac.id:8050/assets/${user.avatar}.jpg`
              : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
          "
          alt=""
          class="w-35 h-35 object-cover border-2 border-orange rounded-xl"
        />
      </div>
      <div>
        <div v-if="user" class="text-left">
          <h1>Halo, {{ user.first_name }} {{ user.last_name }}!</h1>
          <p>Email: {{ user.email }}</p>
          <p>Status Anggota: {{ user.title }}</p>
        </div>
        <div v-else>
          <h1>
            Akun sedang Log Out! <br />
            Memindahkan ke halaman login...
          </h1>
        </div>
      </div>
    </section>
    <section class="flex justify-center gap-2">
      <NuxtLink
        to="/dashboard"
        class="btn bg-orange text-white"
        v-show="isPegawai"
      >
        Dashboard
      </NuxtLink>
      <button
        type="button"
        class="btn bg-red text-white"
        v-show="user"
        @click="onLogout"
      >
        Logout
      </button>
    </section>
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
