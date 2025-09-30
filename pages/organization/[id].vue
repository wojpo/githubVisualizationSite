<script setup lang="ts">
interface InfoData {
  label: string
  description?: string
  typename: string
  url?: string
}

const route = useRoute('organization-id')
const organizationId = route.params.id

definePageMeta({
  middleware: ['check-github-existence', 'github-auth'],
  entityType: 'organization',
})

const nodeInfo = ref<InfoData | null>(null)

function updateNodeInfo(data: InfoData) {
  nodeInfo.value = data
}
</script>

<template>
  <div class="flex screen-navbar">
    <NodeInfoPanel class="max-lg:hidden" :node-info="nodeInfo" />
    <OrganizationGraph :org-name="organizationId.toString()" class="max-lg:w-full w-3/4 h-full" @node-info-update="updateNodeInfo" />
  </div>
</template>
