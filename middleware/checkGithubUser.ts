export default defineNuxtRouteMiddleware(async (to) => {
  const username = to.params.id as string
  if (!username) {
    return navigateTo('/user')
  }

  const query = `
    query($login: String!) {
      user(login: $login) {
        id
      }
    }
  `
  try {
    await $fetch<any>('/api/github-ql', {
      method: 'POST',
      body: {
        query,
        variables: { login: username },
      },
    })
  } catch {
    const toast = useToast()
    toast.add({
      title: 'Error!',
      description: 'Failed to fetch GitHub user (user probably does not exist)',
      color: 'error',
    })
    return navigateTo('/user')
  }
})
