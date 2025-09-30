<script setup lang="ts">
import { NodeImageProgram } from '@sigma/node-image'
import Graph from 'graphology'
import FA2Layout from 'graphology-layout-forceatlas2'
import Sigma from 'sigma'

interface GraphNode {
  id: string
  label: string
  color?: string
  description?: string | null
  image?: string
  url?: string
  __typename: string
  size?: number
  hidden?: boolean
  x?: number
  y?: number
}

interface GraphEdge {
  source: string
  target: string
  color?: string
}

interface FetchDataResult {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

const props = defineProps<{
  fetchData: () => Promise<FetchDataResult>
  mainNodeIds?: string[]
}>()

const emit = defineEmits(['nodeInfoUpdate'])

const container = ref<HTMLDivElement | null>(null)
const toggleVisibility = ref<(typename: string) => void>()

const visibility = reactive<Record<string, boolean>>({})

const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary')
  .trim()

const secondaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-secondary')
  .trim()

onMounted(async () => {
  const graph = new Graph()

  const { nodes, edges } = await props.fetchData()

  nodes.forEach((node) => {
    graph.addNode(node.id, { ...node, hidden: false })
    if (!props.mainNodeIds?.includes(node.id) && !visibility[node.__typename]) {
      visibility[node.__typename] = true
    }
  })

  edges.forEach(edge => graph.addEdge(edge.source, edge.target, { color: edge.color || secondaryColor }))

  // Sigma requires nodes to have initial x and y values to render properly. These will be replaced by the ForceAtlas2 layout afterward.
  graph.forEachNode((node) => {
    graph.setNodeAttribute(node, 'x', Math.random())
    graph.setNodeAttribute(node, 'y', Math.random())
  })

  const layoutSettings = {
    gravity: 2,
    scalingRatio: 10,
    edgeWeightInfluence: 0.7,
    strongGravityMode: true,
    adjustSizes: true,
    barnesHutOptimize: true,
  }

  FA2Layout.assign(graph, { iterations: 200, settings: layoutSettings })

  if (!container.value)
    return

  const renderer = new Sigma(graph, container.value, {
    labelColor: { attribute: 'color', color: primaryColor },
    defaultNodeType: 'image',
    nodeProgramClasses: { image: NodeImageProgram },
  })

  toggleVisibility.value = (typename: string) => {
    visibility[typename] = !visibility[typename]
    const nodesToChange = graph.filterNodes((node, attrs) => attrs.__typename === typename)
    nodesToChange.forEach((node) => {
      const hidden = graph.getNodeAttribute(node, 'hidden')
      graph.setNodeAttribute(node, 'hidden', !hidden)
    })
  }

  renderer.on('clickNode', ({ node }) => {
    const url = graph.getNodeAttribute(node, 'url')
    if (url)
      window.open(url, '_blank')
  })

  renderer.on('enterNode', ({ node }) => {
    const label = graph.getNodeAttribute(node, 'label')
    const description = graph.getNodeAttribute(node, 'description')
    const typename = graph.getNodeAttribute(node, '__typename')
    const url = graph.getNodeAttribute(node, 'url')
    if (label && typename) {
      emit('nodeInfoUpdate', { label, description: description || null, typename, url: url || null })
    }
  })
})
</script>

<template>
  <div ref="container" class="flex justify-end items-end flex-col">
    <div class="text-blackly text-right z-10 flex flex-col gap-2 mb-5 mr-5">
      <NodeVisibilityToggleBtn
        v-for="(isVisible, type) in visibility"
        :key="type"
        :visible="isVisible"
        @click="toggleVisibility!(type)"
      >
        {{ type }}
      </NodeVisibilityToggleBtn>
    </div>
  </div>
</template>
