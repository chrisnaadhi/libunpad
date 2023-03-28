<script setup>
useHead({
  title: "Dashboard Kandaga",
});

const { logout } = useDirectusAuth();
const { currentTime } = useCurrentTime();
const user = useDirectusUser();
const router = useRouter();
const isLoad = ref(false);

const isKoordinator = computed(() => {
  let state = null;
  try {
    switch (user.value.role) {
      case "BE2D46E4-CB00-4585-8E34-5B571A80A820":
        state = true;
        break;
      case "19B573BB-B9DE-4CBC-89BB-596CFCA28448":
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

const logoutBtn = () => {
  isLoad.value = true;
  logout();
  setTimeout(() => {
    router.push("/login");
  }, 2000);
};
</script>

<template>
  <main class="flex min-h-screen">
    <section class="vertical-menu">
      <div class="flex items-center justify-center gap-1 py-4">
        <img src="/images/lambang-unpad.png" class="w-7" alt="" />
        <h1 class="text-center text-2xl text-orange">Kandaga</h1>
      </div>

      <section>
        <div class="flex flex-col items-center">
          <img
            :src="
              user.avatar
                ? `https://repository.unpad.ac.id:8050/assets/${user.avatar}.jpg`
                : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
            "
            class="w-15 h-15 object-cover rounded-lg border border-orange"
            alt="Foto Anggota"
          />
        </div>
        <div class="text-center">
          <p v-if="user.first_name">Halo, {{ user.first_name }}!</p>
          <p v-else>Halo, Pengunjung!</p>
        </div>
      </section>

      <ul class="pl-2">
        <li class="icon-block">
          <NuxtLink to="/dashboard" class="flex w-full">
            <div class="i-mdi-home-outline icon-item" />
            Dashboard
          </NuxtLink>
        </li>
        <li class="icon-block">
          <NuxtLink to="/dashboard/anggota" class="flex w-full">
            <div class="i-mdi-account-group icon-item" />
            Anggota
          </NuxtLink>
        </li>
        <li class="icon-block">
          <NuxtLink to="/dashboard/pengajuan" class="flex w-full">
            <div class="i-mdi-folder-arrow-up-down icon-item" />
            Pengajuan
          </NuxtLink>
        </li>
        <li class="icon-block">
          <NuxtLink to="/dashboard/tugas" class="flex w-full">
            <div class="i-mdi-archive-star icon-item" />
            Data Pekerjaan
          </NuxtLink>
        </li>
        <li class="icon-block" v-show="isKoordinator">
          <NuxtLink to="/dashboard/map" class="flex w-full">
            <div class="i-mdi-file-tree icon-item" />
            Map Pekerjaan
          </NuxtLink>
        </li>
      </ul>
      <ul class="absolute bottom-0 right-20% pb-2">
        <div class="flex items-center justify-center mb-5">
          <button class="btn bg-red text-white w-full" @click="logoutBtn">
            <div class="text-xs" v-show="isLoad">
              <span class="loader"></span>
            </div>
            <div class="text-xs" v-show="!isLoad">Logout</div>
          </button>
        </div>
        <ClientOnly>
          <div class="text-3xl font-600 text-center">
            {{ currentTime.toLocaleTimeString("en-GB") }}
          </div>
          <div class="text-center">
            {{
              new Intl.DateTimeFormat("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(currentTime)
            }}
          </div>
        </ClientOnly>
      </ul>
    </section>
    <section class="relative w-full h-4xl ml-0 md:ml-45 p-5">
      <slot />
    </section>
  </main>
</template>

<style scoped>
.vertical-menu {
  --at-apply: bg-gray-1 min-w-45 max-w-45 fixed overflow-y-auto top-0 bottom-0 hidden md:block;
  scrollbar-width: none;
}

.vertical-menu::-webkit-scrollbar {
  display: none;
}

.icon-block {
  --at-apply: flex items-center my-4 transition-all-500 cursor-pointer hover:(text-orange);
}

.icon-item {
  --at-apply: bg-gray-4 mr-2 mt-1;
}

.router-link-active, .rouer-link-exact-active {
  --at-apply: text-orange;
}

/* Spinner CSS */
.loader {
    width: 13px;
    height: 13px;
    border: 3px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    }
</style>
