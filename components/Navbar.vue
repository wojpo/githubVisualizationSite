<script setup lang="ts">
const isMobileMenuOpen = ref(false)

function toggleMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const { status, data, signIn } = useAuth()
</script>

<template>
  <div>
    <nav class="sticky top-0 z-50">
      <div class="mt-2 mx-4 md:mx-10 flex items-center justify-between text-blackly font-inter text-lg md:text-xl font-semibold">
        <div class="flex items-center space-x-4 md:space-x-12">
          <a href="/">
            <img src="/img/logo.svg" alt="Logo">
          </a>
          <button class="md:hidden focus:outline-none mt-2" aria-label="Toggle menu" @click="toggleMenu">
            <Icon :name="isMobileMenuOpen ? 'mdi:close' : 'mdi:hamburger-menu'" size="36" />
          </button>

          <div class="hidden md:flex space-x-12">
            <NuxtLink to="/user">
              Users
            </NuxtLink>
            <NuxtLink to="/organizations">
              Organizations
            </NuxtLink>
            <NuxtLink to="/faq">
              FAQ
            </NuxtLink>
          </div>
        </div>

        <div v-if="status === 'authenticated' && data?.user" class="cursor-pointer">
          <a :href="`/user/${data.user.githubUsername}`">
            <img
              :src="data.user.image || '/img/logo.svg'"
              alt="Profile"
              class="w-12 h-12 rounded-full border-2 border-primary"
              :title="data.user.githubUsername || data.user.email || 'Profile'"
            >
          </a>
        </div>
        <div v-else class="cursor-pointer" @click="signIn('github')">
          <div
            class="transition-all border-4 border-primary px-6 py-1 rounded-3xl bg-primary text-bg hover:bg-bg hover:text-primary"
          >
            Sign in
          </div>
        </div>
      </div>

      <div
        v-show="isMobileMenuOpen"
        class="md:hidden flex flex-col items-center text-blackly text-lg font-medium py-4 space-y-4 transition-all duration-200"
      >
        <NuxtLink to="/users" @click="toggleMenu">
          Users
        </NuxtLink>
        <NuxtLink to="/organizations" @click="toggleMenu">
          Organizations
        </NuxtLink>
        <NuxtLink to="/example" @click="toggleMenu">
          Example
        </NuxtLink>
        <NuxtLink to="/faq" @click="toggleMenu">
          FAQ
        </NuxtLink>
        <div v-if="status === 'authenticated' && data?.user" @click="toggleMenu">
          <NuxtLink to="/profile">
            Profile
          </NuxtLink>
        </div>
        <div v-else @click="signIn('github'); toggleMenu()">
          Sign in
        </div>
      </div>

      <div class="mt-2 border-b border-black" />
    </nav>
  </div>
</template>
