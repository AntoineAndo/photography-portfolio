import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";

export default defineConfig({
  integrations: [
    sanity({
      projectId: "bgp3zmck",
      dataset: "production",
      apiVersion: "2023-02-08",
    }),
  ],
});
