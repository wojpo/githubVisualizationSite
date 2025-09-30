<script setup lang="ts">
defineProps<{
  nodeInfo: {
    label: string
    url?: string
    typename: string
    description?: string
  } | null
}>()
</script>

<template>
  <div class="w-1/4 p-6 border-r border-primary flex flex-col justify-center">
    <div class="flex flex-row items-center gap-2 mb-4">
      <a
        v-if="nodeInfo?.url"
        :href="nodeInfo.url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-3xl font-semibold text-primary hover:underline break-words"
      >
        {{ nodeInfo.label }}
      </a>
      <h1 v-else class="text-3xl font-semibold text-primary">
        Hover over a node
      </h1>
      <span
        v-if="nodeInfo?.typename"
        class="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full font-medium max-w-min overflow-hidden text-ellipsis"
      >
        {{ nodeInfo.typename }}
      </span>
    </div>

    <h2 class="text-secondary text-lg whitespace-pre-wrap break-words">
      {{ nodeInfo?.description || 'No description available.' }}
    </h2>
  </div>
</template>
