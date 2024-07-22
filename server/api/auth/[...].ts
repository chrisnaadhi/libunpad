import { NuxtAuthHandler } from "#auth";
import GoogleProvider from "next-auth/providers/google";

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET ?? useRuntimeConfig().authSecret,
  providers: [
    // @ts-expect-error
    GoogleProvider.default({
      clientId:
        process.env.GOOGLE_CLIENT_ID ?? useRuntimeConfig().authGoogleClientId,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ??
        useRuntimeConfig().authGoogleClientSecret,
      window: {
        name: "_blank",
        specs: {},
        replace: false,
      },
    }),
  ],
  session: {
    maxAge: 20 * 60,
  },
  callbacks: {
    /* on before signin */
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    /* on redirect to another url */
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    /* on session retrival */
    async session({ session, user, token }) {
      return session;
    },
    /* on JWT token creation or mutation */
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
});
