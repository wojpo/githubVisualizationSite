<script setup lang="ts">
const props = defineProps<{
  placeholder?: string
  buttonText?: string
  searchPath: string
  heading?: string
  description?: string
}>()

const name = ref('')

function search() {
  if (name.value.trim() !== '') {
    return reloadNuxtApp({ path: `${props.searchPath}/${name.value.trim()}` })
  }
}
</script>

<template>
  <div class="screen-navbar flex flex-col items-center font-inter px-4">
    <h1 class="text-primary text-center font-bold text-5xl md:text-6xl lg:text-7xl mt-60">
      {{ props.heading }}
    </h1>
    <p class="text-blackly mt-6 text-center text-lg md:text-xl lg:text-2xl max-w-2xl">
      {{ props.description }}
    </p>
    <form
      class="mt-6 flex flex-col sm:flex-row w-full max-w-full sm:max-w-2xl gap-4"
      @submit.prevent="search"
    >
      <input
        v-model="name"
        type="text"
        :placeholder="props.placeholder"
        class="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-full border-2 border-primary bg-bg text-primary placeholder:text-primary/60 focus:outline-none focus:ring-primary text-base sm:text-lg"
      >
      <button
        type="submit"
        class="cursor-pointer transition-all border-2 border-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-primary text-bg hover:bg-bg hover:text-primary font-semibold text-base sm:text-lg"      >
        {{ props.buttonText }}
      </button>
    </form>
  </div>
</template>
