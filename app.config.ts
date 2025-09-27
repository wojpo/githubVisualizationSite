export default defineAppConfig({
  ui: {
    toast: {
      slots: {
        title: 'text-blackly font-bold',
        description: 'text-blackly font-semibold',
      },
      variants: {
        color: {
          error: {
            root: 'bg-bg text-blackly ring-blackly',
            icon: 'text-blackly',
          },
        },
      },
    },
  },
})
