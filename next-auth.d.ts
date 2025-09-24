import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
      githubAccessToken?: string
      githubUsername?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token?: string
    githubUsername?: string
  }
}
