<script setup lang="ts">
const username = ref('')

function searchUser() {
  if (username.value.trim() !== '') {
    return reloadNuxtApp({ path: `/user/${username.value.trim()}` })
  }
}
definePageMeta({
  middleware: ['github-auth'],
})
</script>

<template>
  <div class="screen-navbar flex flex-col items-center font-inter px-4">
    <h1 class="text-primary text-center font-bold text-5xl md:text-6xl lg:text-7xl mt-60">
      Search
    </h1>
    <p class="text-[var(--color-blackly)] mt-6 text-center text-lg md:text-xl lg:text-2xl max-w-2xl">
      for any GitHub user and visualize their profile instantly.
    </p>
    <form
      class="mt-6 flex flex-col sm:flex-row w-full max-w-full sm:max-w-2xl gap-4"
      @submit.prevent="searchUser"
    >
      <input
        v-model="username"
        type="text"
        placeholder="Enter GitHub username..."
        class="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-full border-2 border-primary bg-bg text-primary placeholder:text-primary/60 focus:outline-none focus:ring-primary text-base sm:text-lg"
      >
      <button
        type="submit"
        class="cursor-pointer transition-all border-2 border-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-primary text-bg hover:bg-bg hover:text-primary font-semibold text-base sm:text-lg"
      >
        Search
      </button>
    </form>
  </div>
</template>
