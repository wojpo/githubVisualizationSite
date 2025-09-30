<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-bg text-blackly font-inter border-t border-blackly mt-20">
    <div class="max-w-7xl mx-auto px-6 py-10 md:py-14">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="flex flex-col items-center md:items-start space-y-4">
          <a href="https://github.com/wojpo/githubVisualizationSite" target="_blank" class="flex items-center space-x-2">
            <img src="/img/logo.svg" alt="Logo" class="w-12 h-12">
            <span class="font-bold text-2xl text-primary">GitHub Visualization Site</span>
          </a>
          <p class="text-center md:text-left text-base text-blackly/80 max-w-xs">
            Instantly search and visualize any GitHub profile or organization.
          </p>
        </div>
      </div>

      <div class="border-t border-blackly mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-blackly/70">
        <p class="text-center md:text-left">
          Made with <span class="text-primary">♥</span> by
          <a href="https://github.com/wojpo" target="_blank" class="hover:text-primary font-semibold">wojpo</a> with Nuxt 3 and TailwindCSS
        </p>
        <p class="mt-3 md:mt-0 text-center md:text-right">
          © {{ year }}
        </p>
      </div>
    </div>
  </footer>
</template>
