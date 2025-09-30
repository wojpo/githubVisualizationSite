<script setup lang="ts">
interface Props {
  visible: boolean
}

const props = defineProps<Props>()

const computedClasses = computed(() => {
  if (props.visible) {
    return 'bg-primary text-white hover:bg-primary/90'
  } else {
    return 'bg-blackly text-bg hover:bg-blackly/90'
  }
})
</script>

<template>
  <button
    class="px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md"
    :class="computedClasses"
  >
    <slot />
  </button>
</template>
