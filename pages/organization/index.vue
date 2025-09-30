<script setup lang="ts">
definePageMeta({
  middleware: ['github-auth'],
})
</script>

<template>
  <SearchForm
    heading="Search"
    description="for any GitHub organization and visualize its repositories instantly."
    placeholder="Enter GitHub organization name..."
    button-text="Search"
    search-path="/organization"
  />
</template>
