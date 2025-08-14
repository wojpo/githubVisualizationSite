<script setup lang="ts">
const isMobileMenuOpen = ref(false)

function toggleMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
const { signIn } = useAuth()
</script>

<template>
  <div>
    <nav class="sticky top-0 z-50">
      <div class="mt-2 mx-4 md:mx-10 flex items-center justify-between text-[#2E2E2E] font-inter text-lg md:text-xl font-semibold">
        <div class="flex items-center space-x-4 md:space-x-12">
          <button>
            <img src="/img/logo.svg" alt="Logo">
          </button>
          <button class="md:hidden focus:outline-none mt-2" aria-label="Toggle menu" @click="toggleMenu">
            <Icon :name="isMobileMenuOpen ? 'mdi:close' : 'mdi:hamburger-menu'" size="36" />
          </button>

          <div class="hidden md:flex space-x-12">
            <NuxtLink to="/faq">
              FAQ
            </NuxtLink>
            <NuxtLink to="/example">
              Example
            </NuxtLink>
            <NuxtLink to="/example">
              Example
            </NuxtLink>
            <NuxtLink to="/example">
              Example
            </NuxtLink>
          </div>
        </div>

        <div
          class="cursor-pointer
" @click="signIn('github')"
        >
          <div
            class="transition-all border-4 border-[#E76F51] px-6 py-1 rounded-3xl bg-[#E76F51] text-[#fffaf0] hover:bg-[#fffaf0] hover:text-[#E76F51]"
          >
            Sign in
          </div>
        </div>
      </div>

      <div
        v-show="isMobileMenuOpen"
        class="md:hidden flex flex-col items-center text-[#2E2E2E] text-lg font-medium py-4 space-y-4 transition-all duration-200"
      >
        <NuxtLink to="/faq" @click="toggleMenu">
          FAQ
        </NuxtLink>
        <NuxtLink to="/example" @click="toggleMenu">
          Example
        </NuxtLink>
        <NuxtLink to="/example" @click="toggleMenu">
          Example
        </NuxtLink>
        <NuxtLink to="/example" @click="toggleMenu">
          Example
        </NuxtLink>
      </div>

      <div class="mt-2 border-b border-black" />
    </nav>
  </div>
</template>
