export default defineNuxtRouteMiddleware(async (to) => {
  const name = to.params.id as string
  const type = to.meta.entityType || 'user'

  if (!name)
    return navigateTo(type === 'user' ? '/user' : '/organization')

  const query = type === 'user'
    ? `query($login: String!) { user(login: $login) { id } }`
    : `query($login: String!) { organization(login: $login) { id } }`

  try {
    await $fetch<any>('/api/github-ql', {
      method: 'POST',
      body: { query, variables: { login: name } },
    })
  } catch {
    const toast = useToast()
    toast.add({
      title: 'Error!',
      description: `Failed to fetch GitHub ${type} (probably does not exist)`,
      color: 'error',
    })
    return navigateTo(type === 'user' ? '/user' : '/organization')
  }
})
