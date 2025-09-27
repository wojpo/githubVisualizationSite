<script setup lang="ts">
const faqs = [
  {
    label: 'Why this project was made?',
    content: 'This project was built during the Summer of Making as a way to create something fun. I wanted to combine learning with building a tool that helps visualize GitHub contributions and makes cool graphs with them.',
  },
  {
    label: 'How do I log in?',
    content: 'You log in securely using GitHub OAuth. We redirect you to GitHub’s authentication page and never see your password.',
  },
  {
    label: 'What permissions does the app request from my GitHub account?',
    content: 'The app requests read-only access to your repositories and contribution data. No write access is required.',
  },
  {
    label: 'Do you store my GitHub credentials?',
    content: 'No. We never store your GitHub credentials. Authentication is handled directly through GitHub OAuth.',
  },
  {
    label: 'Which technologies power this app?',
    content: 'The app is built with Nuxt 3, TailwindCSS, and the GitHub API for fetching contribution data.',
  },
]
</script>

<template>
  <div class="min-h-screen bg-bg text-blackly font-inter">
    <header class="py-10 text-center">
      <h1 class="text-4xl font-bold text-primary">
        FAQ
      </h1>
      <p class="text-lg text-secondary mt-2">
        Frequently asked questions
      </p>
    </header>

    <main class="max-w-3xl mx-auto px-4 space-y-6">
      <section
        v-for="(faq, index) in faqs"
        :key="index"
        class="bg-bg rounded-2xl shadow p-6 transition hover:shadow-lg"
      >
        <h2 class="text-xl font-semibold text-primary">
          {{ faq.label }}
        </h2>
        <p class="mt-2 text-base text-blackly]">
          {{ faq.content }}
        </p>
      </section>
    </main>
  </div>
</template>
