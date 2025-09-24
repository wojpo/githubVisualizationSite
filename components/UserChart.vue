<script setup lang="ts">
import { NodeImageProgram } from '@sigma/node-image'
import Graph from 'graphology'
import FA2Layout from 'graphology-layout-forceatlas2'
import Sigma from 'sigma'

const { username } = defineProps<{ username: string }>()

const emit = defineEmits(['nodeInfoUpdate', 'userNotFound'])

const container = ref<HTMLDivElement | null>(null)

const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary')
  .trim()

const secondaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-secondary')
  .trim()

interface Organization {
  name: string | null
  login: string
  description: string | null
  url: string
  avatarUrl: string
}

interface Repository {
  name: string
  url: string
  description: string | null
}

interface GitHubUser {
  login: string
  name: string | null
  bio: string | null
  avatarUrl: string
  organizations: {
    nodes: Organization[]
  }
  repositories: {
    nodes: Repository[]
  }
}

const toggleVisibility = ref<(typename: string) => void>()

onMounted(async () => {
  const graph = new Graph()

  async function fetchGitHubUser(login: string): Promise<GitHubUser | null> {
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

    const data = await $fetch<{ user: GitHubUser | null }>('/api/github-ql', {
      method: 'POST',
      body: { query, variables },
    })

    return data.user
  }
  try {
    const user = await fetchGitHubUser(username)

    if (user) {
      graph.addNode('user', {
        size: 30,
        label: user.name || user.login,
        color: primaryColor,
        description: user.bio || 'No bio',
        image: user.avatarUrl,
        url: `https://github.com/${user.login}`,
        __typename: 'User',
        hidden: false,
      })

      const orgs = user.organizations?.nodes || []
      orgs.forEach((org, index) => {
        graph.addNode(`org${index}`, {
          size: 25,
          label: org.name || org.login,
          color: primaryColor,
          image: org.avatarUrl,
          description: org.description || 'No description',
          url: org.url,
          __typename: 'Organization',
          hidden: false,
        })
        graph.addEdge(`org${index}`, 'user', { color: secondaryColor })
      })

      const repos = user.repositories?.nodes || []
      repos.forEach((repo, index) => {
        graph.addNode(`repo${index}`, {
          size: 15,
          label: repo.name,
          url: repo.url,
          description: repo.description || 'No description',
          color: primaryColor,
          __typename: 'Repository',
          hidden: false,
        })
        graph.addEdge(`repo${index}`, 'user', { color: secondaryColor })
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

      if (container.value) {
        const renderer = new Sigma(graph, container.value, {
          labelColor: { attribute: 'color', color: primaryColor },
          defaultNodeType: 'image',
          nodeProgramClasses: {
            image: NodeImageProgram,
          },
        })

        toggleVisibility.value = (typename: string) => {
          const nodesToChange = graph.filterNodes((node, attrs) => attrs.__typename === typename)
          nodesToChange.forEach((node) => {
            graph.setNodeAttribute(node, 'hidden', !graph.getNodeAttribute(node, 'hidden'))
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
            emit('nodeInfoUpdate', {
              label,
              description: description || null,
              typename,
              url: url || null,
            })
          }
        })
      }
    }
  } catch {
    emit('userNotFound')
  }
})
</script>

<template>
  <div ref="container" class="flex justify-end items-end flex-col">
    <div class="text-blackly text-right z-10 flex flex-col gap-2 mb-5 mr-5">
      <button @click="toggleVisibility!('Repository')">
        Repositories
      </button>
      <button @click="toggleVisibility!('Organization')">
        Organizations
      </button>
    </div>
  </div>
</template>
