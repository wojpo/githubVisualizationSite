export default defineEventHandler(async (event) => {
    const { username } = event.context.params as { username: string }

    const query = `
    query {
      user(login: "${username}") {
        login
        name
        bio
        avatarUrl
        company
        location
        websiteUrl
        email
        twitterUsername
        followers {
          totalCount
        }
        following {
          totalCount
        }
        organizations(first: 100) {
          totalCount
          nodes {
            login
            name
            url
            avatarUrl
          }
        }
        createdAt
        updatedAt
      }
    }
  `
    const config = useRuntimeConfig();
    const apikey = config.githubApiKey
    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apikey}`,
        },
        body: JSON.stringify({ query }),
    })

    if (!response.ok) {
        const errorText = await response.text()
        return { error: 'GitHub API error', details: errorText }
    }

    const data = await response.json()
    return data.data
})