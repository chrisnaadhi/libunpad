<template>
  <div class="action-group mr-2 xl:mr-0">
    <div class="lang-wrapper">
      <button class="btn lang">
        <img
          class="w-12px"
          src="https://img.icons8.com/color/48/000000/indonesia-circular.png"
        />
        ID
      </button>
      <div class="dropdown-lang">
        <button class="btn px-1 w-50px bg-gray-2 py-1">
          <img
            class="w-12px"
            src="https://img.icons8.com/color/48/000000/indonesia-circular.png"
          />
          SU
        </button>
        <button class="btn px-1 w-50px bg-gray-2 py-2">
          <img
            class="w-12px"
            src="https://img.icons8.com/color/48/000000/great-britain-circular.png"
          />
          EN
        </button>
      </div>
    </div>
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
  @apply flex ml-0 md:(ml-12);
}

.action-group button {
  @apply mx-2;
}

.lang-wrapper {
  @apply relative transition inline-block;
}

.dropdown-lang {
  @apply hidden absolute bg-gray-2 drop-shadow transition;
  z-index: 1;
}

.dropdown-lang button {
  @apply transition block;
}

.lang-wrapper:hover .dropdown-lang {
  @apply transition block;
}

.login {
  @apply bg-orange-500 text-white hidden xl:(inline-block);
}

.lang {
  @apply px-3 py-2 bg-gray-300 hidden xl:(inline-block) hover:(bg-orange-400 text-white transition transition-all);
}

.hamburger {
  @apply py-0 block xl:(hidden);
}
</style>
