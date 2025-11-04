
import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      domain: "https://choice-deer-48.clerk.accounts.dev/",
      applicationID: "convex",
    },
  ]
} satisfies AuthConfig;