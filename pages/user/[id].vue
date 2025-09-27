<script setup lang="ts">
interface InfoData {
  label: string
  description?: string
  typename: string
  url?: string
}

const route = useRoute('user-id')
const userId = route.params.id

definePageMeta({
  middleware: ['check-github-user'],
})

const nodeInfo = ref<InfoData | null>(null)

function updateNodeInfo(data: InfoData) {
  nodeInfo.value = data
}
</script>

<template>
  <div class="flex screen-navbar">
    <NodeInfoPanel class="max-md:hidden" :node-info="nodeInfo" />
    <UserChart :username="userId.toString()" class="max-md:w-full w-3/4 h-full" @node-info-update="updateNodeInfo" />
  </div>
</template>
