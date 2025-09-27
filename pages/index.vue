<script setup lang="ts">
const { signIn, status } = useAuth()
</script>

<template>
  <div class="flex flex-col text-blackly font-inter px-4 sm:px-8">
    <div class="mt-20 text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center max-w-3xl mx-auto">
      <h1>Visualize and Explore<br> Your <span class="text-primary">GitHub Data</span></h1>
    </div>
    <div class="mt-12 mx-auto text-xl sm:text-2xl">
      <div
        v-if="status !== 'authenticated'"
        class="cursor-pointer flex justify-between items-center transition-all border-4 border-primary pl-[20px] pr-[14px] py-2 rounded-4xl bg-primary text-bg hover:bg-bg hover:text-primary"
        @click="signIn('github')"
      >
        <span class=" text-left">
          Sign in<br>
          with Github
        </span>
        <img class="ml-5 w-14 sm:w-16" width="65" src="/img/github-logo-dark.svg" alt="github-logo">
      </div>
    </div>
    <div class="mx-auto mt-15 border border-blackly rounded-2xl shadow-lg h-[60vh] w-[90vw] sm:h-[90vh] sm:w-[70vw]">
      <ShowcaseChart class="w-full h-full" />
    </div>
  </div>
  <Footer />
</template>
