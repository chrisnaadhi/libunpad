<template>
  <div class="action-group mr-2 xl:mr-0">
    <button class="btn mode">
      <div class="i-mdi-calendar-clock bg-dark" />
    </button>
    <button class="btn login">Akun</button>
    <button class="btn hamburger">
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
  --at-apply: bg-orange-500 text-white hidden xl:(inline-block);
}

.mode {
  --at-apply: bg-gray-3 text-white font-600;
}

.hamburger {
  --at-apply: py-0 block xl:(hidden);
}
</style>
