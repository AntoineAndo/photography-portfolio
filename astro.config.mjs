import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import vercelStatic from "@astrojs/vercel/static";

import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  integrations: [sanity({
    projectId: "bgp3zmck",
    dataset: "production",
    apiVersion: "2023-02-08"
  }), react(), prefetch()],
  output: "static",
  adapter: vercelStatic()
});