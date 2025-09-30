<script setup lang="ts">
interface GitHubUser {
  login: string
  name?: string | null
  bio?: string | null
  avatarUrl: string
  organizations: { nodes: { name?: string | null, login: string, description?: string | null, url: string, avatarUrl: string }[] }
  repositories: { nodes: { name: string, url: string, description?: string | null }[] }
}

const { username } = defineProps<{ username: string }>()

defineEmits(['nodeInfoUpdate'])

async function fetchUserGraph() {
  const query = `
    query ($login: String!) {
      user(login: $login) {
        login
        name
        bio
        avatarUrl
        organizations(first: 100) { nodes { name login description url avatarUrl } }
        repositories(first: 100) { nodes { name url description } }
      }
    }
  `

  const data = await $fetch<{ user: GitHubUser | null }>('/api/github-ql', {
    method: 'POST',
    body: { query, variables: { login: username } },
  })

  const user = data.user
  if (!user)
    return { nodes: [], edges: [] }

  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim()

  const nodes = [
    {
      id: 'user',
      label: user.name || user.login,
      color: primaryColor,
      description: user.bio || 'No bio',
      image: user.avatarUrl,
      url: `https://github.com/${user.login}`,
      __typename: 'User',
      size: 30,
    },
    ...user.organizations.nodes.map((org, i) => ({
      id: `org${i}`,
      label: org.name || org.login,
      color: primaryColor,
      description: org.description || 'No description',
      image: org.avatarUrl,
      url: org.url,
      __typename: 'Organization',
      size: 25,
    })),
    ...user.repositories.nodes.map((repo, i) => ({
      id: `repo${i}`,
      label: repo.name,
      url: repo.url,
      description: repo.description || 'No description',
      color: primaryColor,
      __typename: 'Repository',
      size: 15,
    })),
  ]

  const edges = [
    ...user.organizations.nodes.map((_, i) => ({ source: `org${i}`, target: 'user' })),
    ...user.repositories.nodes.map((_, i) => ({ source: `repo${i}`, target: 'user' })),
  ]

  return { nodes, edges }
}
</script>

<template>
  <GraphVisualizer
    :fetch-data="fetchUserGraph"
    :main-node-ids="['user']"
    @node-info-update="$emit('nodeInfoUpdate', $event)"
  />
</template>
