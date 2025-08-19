<script setup lang="ts">
interface InfoData {
  label: string
  description?: string
  typename: string
  url?: string
}
definePageMeta({
  auth: true,
})
const nodeInfo = ref<InfoData | null>(null)

const login = 'wojpo'

function updateNodeInfo(data: InfoData) {
  nodeInfo.value = data
}
</script>

<template>
  <div class="flex screen-navbar">
    <NodeInfoPanel class="max-md:hidden" :node-info="nodeInfo" />
    <UserChart :username="login" class="w-3/4 h-full" @node-info-update="updateNodeInfo" />
  </div>
</template>
