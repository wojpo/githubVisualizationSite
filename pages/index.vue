<script setup lang="ts">
import Graph from 'graphology'
import Sigma from 'sigma'
import { onMounted, ref } from 'vue'

const container = ref<HTMLDivElement | null>(null)

onMounted(async () => {
  if (!container.value)
    return

  const graph = new Graph()
  graph.addNode('n1', { label: 'Node 1', x: 0, y: 0, size: 10, color: '#f66' })
  graph.addNode('n2', { label: 'Node 2', x: 1, y: 1, size: 10, color: '#6f6' })
  graph.addEdge('n1', 'n2')

  new Sigma(graph, container.value)

  async function useGit() {
    const query = `
      query ($login: String!) {
        user(login: $login) {
          login
          name
          avatarUrl
        }
      }
    `
    const variables = { login: 'octocat' }

    const data = await $fetch('/api/github-ql', {
      method: 'POST',
      body: { query, variables },
    })
  }

  await useGit()
})
</script>

<template>
  <div ref="container" class="w-screen h-screen" />
</template>
