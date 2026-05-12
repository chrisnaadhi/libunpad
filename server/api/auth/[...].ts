import { NuxtAuthHandler } from "#auth";
import GoogleProvider from "next-auth/providers/google";

const PausProvider = {
  id: "paus",
  name: "PAuS",
  type: "oauth",
  authorization: {
    url: "https://paus.unpad.ac.id/oauth",
    params: {
      scope: "user.basic",
      response_type: "code",
    },
  },
  token: {
    async request(context: any) {
      const params = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: context.provider.clientId,
        client_secret: context.provider.clientSecret,
        redirect_uri: context.provider.callbackUrl,
        code: context.params.code,
      });
      const res = await fetch("https://paus.unpad.ac.id/oauth/access-token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      const tokens = await res.json();
      return { tokens };
    },
  },
  userinfo: {
    async request(context: any) {
      const res = await fetch(
        `https://paus.unpad.ac.id/api/accounts?access_token=${context.tokens.access_token}`,
      );
      return res.json();
    },
  },
  profile(profile: any) {
    const accounts: any[] = profile.accounts ?? [];
    const account =
      accounts.find((a) => a.is_active === true) ?? accounts[0] ?? {};
    return {
      id: profile.id,
      name: profile.name,
      username: profile.username,
      email: profile.email,
      image: profile.image_url,
      identifier: account.number ?? null,
      type: account.group_code ?? null,
      faculty: account.faculty_name ?? null,
      unit: account.unit_name ?? null,
      study_program: account.study_program_name ?? null,
      jenjang: account.program_name ?? null,
    };
  },
  clientId: process.env.KANDAGA_PAUS_CLIENT_ID,
  clientSecret: process.env.KANDAGA_PAUS_CLIENT_SECRET,
  checks: ["state"],
};

export default NuxtAuthHandler({
  secret: process.env.AUTH_KANDAGA_SECRET ?? useRuntimeConfig().authSecret,
  providers: [
    // @ts-expect-error
    GoogleProvider.default({
      clientId:
        process.env.AUTH_KANDAGA_GOOGLE_CLIENT_ID ??
        useRuntimeConfig().authGoogleClientId,
      clientSecret:
        process.env.AUTH_KANDAGA_GOOGLE_CLIEN_SECRET ??
        useRuntimeConfig().authGoogleClientSecret,
      window: {
        name: "_blank",
        specs: {},
        replace: false,
      },
    }),
    PausProvider,
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
      return url;
    },
    /* on session retrival */
    async session({ session, user, token }) {
      if (token) {
        (session as any).provider = token.provider;
        if (token.provider === "paus") {
          (session.user as any).username = token.username;
          (session.user as any).identifier = token.identifier;
          (session.user as any).type = token.type;
          (session.user as any).faculty = token.faculty;
          (session.user as any).unit = token.unit;
          (session.user as any).study_program = token.study_program;
          (session.user as any).jenjang = token.jenjang;
        }
      }
      return session;
    },
    /* on JWT token creation or mutation */
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.provider = account.provider;
        if (account.provider === "paus" && user) {
          token.username = (user as any).username;
          token.identifier = (user as any).identifier;
          token.type = (user as any).type;
          token.faculty = (user as any).faculty;
          token.unit = (user as any).unit;
          token.study_program = (user as any).study_program;
          token.jenjang = (user as any).jenjang;
          token.pausAccessToken = (account as any).access_token;
        }
      }
      // Backfill missing unit for existing PAuS sessions (token minted before unit was added)
      if (
        token.provider === "paus" &&
        token.identifier &&
        token.unit === undefined &&
        token.pausAccessToken
      ) {
        try {
          const res = await fetch(
            `https://paus.unpad.ac.id/api/accounts?access_token=${token.pausAccessToken}`,
          );
          if (res.ok) {
            const pausProfile = await res.json();
            const accounts: any[] = pausProfile.accounts ?? [];
            const acc =
              accounts.find((a: any) => a.is_active === true) ??
              accounts[0] ??
              {};
            token.faculty = acc.faculty_name ?? null;
            token.unit = acc.unit_name ?? null;
            token.study_program = acc.study_program_name ?? null;
            token.jenjang = acc.program_name ?? null;
          }
        } catch {
          token.unit = null;
        }
      }
      return token;
    },
  },
});
