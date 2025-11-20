
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // TODO: Replace with real database check + bcrypt comparison
        // For now, hardcoded admin for initial setup
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          if (email === "admin@s3vtgroup.com" && password === "admin123") {
            return { id: "1", name: "Admin User", email: "admin@s3vtgroup.com", role: "admin" }
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/admin')
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // Redirect authenticated users to dashboard if they try to visit login
        if (nextUrl.pathname.startsWith('/auth/signin')) {
            return Response.redirect(new URL('/admin', nextUrl))
        }
      }
      return true
    },
  },
})

