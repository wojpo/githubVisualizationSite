import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session?.user?.githubAccessToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: No GitHub access token',
    })
  }

  const body = await readBody<{ query: string, variables?: Record<string, any> }>(event)
  if (!body?.query) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing "query" in request body',
    })
  }

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.user.githubAccessToken}`,
    },
    body: JSON.stringify({
      query: body.query,
      variables: body.variables || {},
    }),
  })

  const result = await response.json()

  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: `GitHub API request failed (${response.statusText})`,
    })
  }

  if (result.errors) {
    const message = (result.errors as { message: string }[]).map(e => e.message).join(', ')
    const isNotFound = message.includes('Could not resolve to a User')

    throw createError({
      statusCode: isNotFound ? 404 : 500,
      statusMessage: `GitHub GraphQL Error: ${message}`,
    })
  }

  return result.data
})
