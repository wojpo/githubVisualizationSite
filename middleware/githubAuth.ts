export default defineNuxtRouteMiddleware((to) => {
  const { status } = useAuth()
  if (status.value !== 'authenticated') {
    if (to.path !== '/' && to.path !== '/faq') {
      const toast = useToast()
      toast.add({ title: 'Error!', description: 'You have to sign in first!', color: 'error' })
      return navigateTo('/')
    }
  }
})
