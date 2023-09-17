import { NextAuthOptions } from 'next-auth'
import { db } from '@/lib/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'

import bcrypt from 'bcrypt'

import { INVALID_CREDENTIALS_MSG, NOT_VERIFIED_EMAIL_MSG } from './constants'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          return null
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!,
        )

        if (!isCorrectPassword) {
          throw new Error(INVALID_CREDENTIALS_MSG)
        }

        if (!user.emailVerified) {
          throw new Error(NOT_VERIFIED_EMAIL_MSG)
        }

        return user
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      /////////////////////////// GOOGLE ///////////////////////////
      if (account?.provider === 'google') {
        if (!profile?.email) {
          return false
        }

        await db.user.upsert({
          where: {
            email: profile.email,
          },
          create: {
            email: profile.email,
            name: profile.name,
            image: (profile as any).picture,
            emailVerified: true,
            pack: {
              create: {},
            },
            accounts: {
              create: {
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account?.refresh_token,
                access_token: account?.access_token,
                expires_at: account?.expires_at,
                token_type: account?.token_type,
                scope: account?.scope,
                id_token: account?.id_token,
                session_state: account?.session_state,
              },
            },
          },
          update: {
            name: profile.name,
            image: (profile as any).picture,
          },
        })
      }
      /////////////////////////// FACEBOOK ///////////////////////////

      if (account?.provider === 'facebook') {
        if (!profile?.email) {
          return false
        }

        // Facebook returns a different image object than Google
        // so we need to check if the image is a string or an object
        // and then get the url accordingly
        let imageUrl = null

        if ((profile as any).picture?.data?.url) {
          imageUrl = (profile as any).picture.data.url
        }

        await db.user.upsert({
          where: {
            email: profile.email,
          },
          create: {
            email: profile.email,
            name: profile.name,
            image: imageUrl,
            emailVerified: true,
            pack: {
              create: {},
            },
            accounts: {
              create: {
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account?.refresh_token,
                access_token: account?.access_token,
                expires_at: account?.expires_at,
                token_type: account?.token_type,
                scope: account?.scope,
                id_token: account?.id_token,
                session_state: account?.session_state,
              },
            },
          },
          update: {
            name: profile.name,
            image: imageUrl,
          },
        })
      }

      return true
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.role = token.role
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
          token.role = user.role
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        role: dbUser.role,
      }
    },
  },
}
