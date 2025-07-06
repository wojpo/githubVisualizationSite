<script setup>
import { NodeImageProgram } from '@sigma/node-image'
import Graph from 'graphology'
import FA2Layout from 'graphology-layout-forceatlas2'
import Sigma from 'sigma'

const container = ref(null)

onMounted(async () => {
  const graph = new Graph()

  async function fetchGitHubUser(login) {
    const query = `
    query ($login: String!) {
      user(login: $login) {
        login
        name
        bio
        avatarUrl
        organizations(first: 100) {
          nodes {
            name
            login
            description
            url
            avatarUrl
          }
        }
        repositories(first: 100)
        {
          nodes {
            name
            url
            description
          }
        }
      }
    }
  `
    const variables = { login }

    const data = await $fetch('/api/github-ql', {
      method: 'POST',
      body: { query, variables },
    })
    return data.user
  }

  const user = await fetchGitHubUser('norbiros')

  if (user) {
    graph.addNode('user', {
      size: 30,
      label: user.name || user.login,
      color: '#ff69b4',
      description: user.bio || 'No bio',
      image: user.avatarUrl,
      url: `https://github.com/${user.login}`,
    })

    const orgs = user.organizations.nodes || []
    orgs.forEach((org, index) => {
      graph.addNode(`org${index}`, {
        size: 25,
        label: org.name || org.login,
        color: '#ff69b4',
        image: org.avatarUrl,
        description: org.description || 'No description',
        url: org.url,
      })
      graph.addEdge(`org${index}`, 'user', { color: '#ff69b4' })
    })

    const repos = user.repositories.nodes || []
    repos.forEach((repo, index) => {
      graph.addNode(`repo${index}`, {
        size: 15,
        label: repo.name,
        url: repo.url,
        description: repo.description || 'No description',
        color: '#E76F51',
      })
      graph.addEdge(`repo${index}`, 'user', { color: '#b29985' })
    })

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

    FA2Layout.assign(graph, {
      iterations: 200,
      settings: layoutSettings,
    })

    const renderer = new Sigma(graph, container.value, {
      labelColor: { attribute: 'color', color: '#fffffe' },
      defaultNodeType: 'image',
      nodeProgramClasses: {
        image: NodeImageProgram,
      },
    })

    renderer.on('clickNode', ({ node }) => {
      const url = graph.getNodeAttribute(node, 'url')
      if (url)
        window.open(url, '_blank')
    })
  }
})
</script>

<template>
  <div ref="container" />
</template>
