<script setup>
import { NodeImageProgram } from '@sigma/node-image'
import Graph from 'graphology'
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
      x: 0,
      y: 0,
      size: 30,
      label: user.name || user.login,
      color: '#ff69b4',
      image: user.avatarUrl,
      url: `https://github.com/${user.login}`,
    })

    const orgs = user.organizations.nodes

    if (orgs.length > 0) {
      orgs.forEach((org, index) => {
        const radius = 2
        const angle = Math.random() * 2 * Math.PI
        const x = radius * Math.cos(angle) + (Math.random() * 40 - 20)
        const y = radius * Math.sin(angle) + (Math.random() * 40 - 20)

        graph.addNode(`org${index}`, { // <-- unikalny id z numerem
          x,
          y,
          size: 20,
          label: org.name || org.login,
          color: '#ff69b4',
          image: org.avatarUrl,
          description: org.description,
          url: org.url,
        })

        graph.addEdge(`org${index}`, 'user', { color: '#ff69b4' })
      })

      const repos = user.repositories.nodes

      if (repos.length > 0) {
        repos.forEach((repo, index) => {
          const radius = 2
          const angle = Math.random() * 2 * Math.PI
          const x = radius * Math.cos(angle) + (Math.random() * 40 - 20)
          const y = radius * Math.sin(angle) + (Math.random() * 40 - 20)

          graph.addNode(`repo${index}`, { // <-- unikalny id z numerem
            x,
            y,
            size: 15,
            label: repo.name,
            url: repo.url,
          })

          graph.addEdge(`repo${index}`, 'user', { color: '#ff69b4' })
        })
      }
    }
  }

  const renderer = new Sigma(graph, container.value, { labelColor: { attribute: 'color', color: '#fffffe' }, defaultNodeType: 'image', nodeProgramClasses: {
    image: NodeImageProgram,
  } })

  renderer.on('clickNode', ({ node }) => {
    const url = graph.getNodeAttribute(node, 'url')
    if (url)
      window.open(url, '_blank')
  })
})
</script>

<template>
  <div ref="container" />
</template>
