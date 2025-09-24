import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'

const runtimeConfig = useRuntimeConfig()

interface GitHubProfile {
  id: number
  login: string
  name?: string | null
  email?: string | null
  avatar_url?: string | null
}

export default NuxtAuthHandler({
  secret: runtimeConfig.AUTH_SECRET,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: runtimeConfig.public.GITHUB_CLIENT_ID,
      clientSecret: runtimeConfig.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user user:email repo read:org',
        },
      },
      profile(profile: GitHubProfile) {
        return {
          id: String(profile.id),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          login: profile.login,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.access_token = account.access_token
        token.githubUsername = (profile as GitHubProfile).login
      }
      return token
    },
    async session({ session, token }) {
      session.user = session.user || {}
      session.user.id = token.sub
      session.user.githubAccessToken = token.access_token
      session.user.githubUsername = token.githubUsername
      return session
    },
  },
})
