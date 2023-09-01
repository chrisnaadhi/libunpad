import { NuxtAuthHandler } from "#auth";
import GoogleProvider from "next-auth/providers/google";

const runtimeConfig = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET ?? runtimeConfig.authSecret,
  providers: [
    // @ts-expect-error
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      window: {
        name: "_blank",
        specs: {},
        replace: false,
      },
    }),
  ],
});
