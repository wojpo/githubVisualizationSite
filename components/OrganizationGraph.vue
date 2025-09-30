<script setup lang="ts">
interface GitHubOrg {
  login: string
  name?: string | null
  description?: string | null
  avatarUrl: string
  repositories: { nodes: { name: string, url: string, description?: string | null }[] }
}
const { orgName } = defineProps<{ orgName: string }>()
defineEmits(['nodeInfoUpdate'])

async function fetchOrgGraph() {
  const query = `
    query ($login: String!) {
      organization(login: $login) {
        login
        name
        description
        avatarUrl
        repositories(first: 100) { nodes { name url description } }
      }
    }
  `

  const data = await $fetch<{ organization: GitHubOrg | null }>('/api/github-ql', {
    method: 'POST',
    body: { query, variables: { login: orgName } },
  })

  const org = data.organization
  if (!org)
    return { nodes: [], edges: [] }

  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim()

  const nodes = [
    {
      id: 'org',
      label: org.name || org.login,
      color: primaryColor,
      description: org.description || 'No description',
      image: org.avatarUrl,
      url: `https://github.com/${org.login}`,
      __typename: 'Organization',
      size: 30,
    },
    ...org.repositories.nodes.map((repo, i) => ({
      id: `repo${i}`,
      label: repo.name,
      url: repo.url,
      description: repo.description || 'No description',
      color: primaryColor,
      __typename: 'Repository',
      size: 20,
    })),
  ]

  const edges = [
    ...org.repositories.nodes.map((_, i) => ({ source: `repo${i}`, target: 'org' })),
  ]

  return { nodes, edges }
}
</script>

<template>
  <GraphVisualizer
    :fetch-data="fetchOrgGraph"
    :main-node-ids="['org']"
    @node-info-update="$emit('nodeInfoUpdate', $event)"
  />
</template>
