<script setup lang="ts">
interface infoData {
  label: string
  description?: string
  typename: string
  url?: string
}

const info = ref<infoData | null>(null)

function setObject(data: infoData) {
  info.value = data
}
</script>

<template>
  <div class="flex h-screen">
    <div class="w-1/4 p-6 border-r border-[#E76F51] flex flex-col justify-center">
      <div class="flex items-center gap-2 mb-4">
        <a
          v-if="info?.url"
          :href="info.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-3xl font-semibold text-[#E76F51] hover:underline"
        >
          {{ info.label }}
        </a>
        <h1 v-else class="text-3xl font-semibold text-[#E76F51]">
          Hover over a node
        </h1>
        <span
          v-if="info?.typename"
          class="bg-[#E76F51]/10 text-[#E76F51] text-sm mt-1.5 px-3 py-1 rounded-full font-medium"
        >
          {{ info.typename }}
        </span>
      </div>

      <h2 class="text-[#b29985] text-lg whitespace-pre-wrap">
        {{ info?.description || 'No description available.' }}
      </h2>
    </div>

    <UserChart class="w-3/4 h-full" @send-data="setObject" />
  </div>
</template>
