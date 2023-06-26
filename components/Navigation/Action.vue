<script setup>
import { mobileMenu } from "~/composables/navMenu";

const { status, data, signOut } = useAuth();
const emit = defineEmits(["toggle"]);
const menuState = mobileMenu();
const viewDropdown = ref(false);

const swapToggle = () => {
  emit("toggle");
};

const toggleProfile = () => {
  viewDropdown.value = !viewDropdown.value;
};

const logout = async () => {
  await signOut();
};
</script>

<template>
  <div class="action-group xl:mr-0">
    <button
      type="button"
      class="btn mode"
      @click.stop="swapToggle"
      aria-label="Jam Layanan"
    >
      <div class="i-mdi-calendar-clock bg-dark" />
    </button>
    <div v-if="status === 'authenticated'" class="relative hidden xl:block">
      <img
        v-if="data?.user?.image"
        :src="data?.user?.image ?? '/images/no-image.jpg'"
        class="w-10 h-10 rounded-full cursor-pointer"
        alt="Foto User"
        referrerpolicy="no-referrer"
        @click="toggleProfile"
      />
      <div class="account-dropdown" v-show="viewDropdown">
        <p>{{ data?.user?.name }}</p>
        <p class="text-xs">{{ data?.user?.email }}</p>
        <button class="btn py-0 bg-red text-xs text-white" @click="logout">
          Logout
        </button>
      </div>
    </div>
    <NuxtLink v-else to="/login" alt="Halaman Keanggotaan">
      <button type="button" class="btn login" aria-label="Login">
        <div class="i-mdi-account-multiple bg-white" />
      </button>
    </NuxtLink>
    <button
      class="btn hamburger"
      role="menu"
      aria-label="Menu Toggle"
      @click="menuState.changeMenuState"
    >
      <svg
        height="32px"
        id="Layer_1"
        style="enable-background: new 0 0 32 32"
        version="1.1"
        viewBox="0 0 32 32"
        width="16px"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <path
          d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2 s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2 S29.104,22,28,22z"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.action-group {
  --at-apply: flex ml-0 md:(ml-12);
}

.action-group button {
  --at-apply: mx-1;
}

.login {
  --at-apply: bg-orange-4 text-white py-3 hidden xl:block;
}

.account-dropdown {
  --at-apply: absolute right-100% bg-white/80 border border-orange min-w-25 mr--10 py-2 px-5 my-2 rounded text-right;
}

.mode {
  --at-apply: bg-gray-2 text-white font-600;
}

.hamburger {
  --at-apply: py-0 block xl:(hidden);
}
</style>
