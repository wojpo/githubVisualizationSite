<script setup lang="ts">
import Graph from 'graphology'
import Sigma from 'sigma'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!container.value)
    return

  const graph = new Graph()
  graph.addNode('n1', { label: 'Node 1', x: 0, y: 0, size: 10, color: '#f66' })
  graph.addNode('n2', { label: 'Node 2', x: 1, y: 1, size: 10, color: '#6f6' })
  graph.addEdge('n1', 'n2')

  new Sigma(graph, container.value)
})
</script>

<template>
  <div ref="container" class="w-screen h-screen" />
</template>
