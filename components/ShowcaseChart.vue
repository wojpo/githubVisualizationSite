<script setup lang="ts">
import { NodeImageProgram } from '@sigma/node-image'
import Graph from 'graphology'
import Sigma from 'sigma'
import { onMounted, ref } from 'vue'

const container = ref<HTMLDivElement | null>(null)

onMounted(async () => {
  if (!container.value)
    return

  const response = await fetch('/graphs/vue-creator-graph.json')
  const graphData = await response.json()
  const graph = Graph.from(graphData)

  const renderer = new Sigma(graph, container.value, {
    labelColor: { attribute: 'color', color: '#fffffe' },
    defaultNodeType: 'image',
    nodeProgramClasses: {
      image: NodeImageProgram,
    },
  })

  renderer.on('clickNode', ({ node }: { node: string }) => {
    const url = graph.getNodeAttribute(node, 'url')
    if (url)
      window.open(url, '_blank')
  })
})
</script>

<template>
  <div ref="container" />
</template>
