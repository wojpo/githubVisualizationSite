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
  <div class="w-1/4 p-6 border-r border-[#E76F51] flex flex-col justify-center">
    <div class="flex items-center gap-2 mb-4">
      <a
        v-if="nodeInfo?.url"
        :href="nodeInfo.url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-3xl font-semibold text-[#E76F51] hover:underline"
      >
        {{ nodeInfo.label }}
      </a>
      <h1 v-else class="text-3xl font-semibold text-[#E76F51]">
        Hover over a node
      </h1>
      <span
        v-if="nodeInfo?.typename"
        class="bg-[#E76F51]/10 text-[#E76F51] text-sm mt-1.5 px-3 py-1 rounded-full font-medium"
      >
        {{ nodeInfo.typename }}
      </span>
    </div>

    <h2 class="text-[#b29985] text-lg whitespace-pre-wrap">
      {{ nodeInfo?.description || 'No description available.' }}
    </h2>
  </div>
</template>
