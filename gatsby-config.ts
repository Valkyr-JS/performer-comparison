import type { GatsbyConfig } from "gatsby";
import * as path from "path";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Glicko App`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@/apollo": path.resolve(__dirname, "src/apollo"),
          "@/components": path.resolve(__dirname, "src/components"),
          "@/constants": path.resolve(__dirname, "src/constants"),
          "@/gameplay": path.resolve(__dirname, "src/gameplay"),
          "@/hooks": path.resolve(__dirname, "src/hooks"),
          "@/images": path.resolve(__dirname, "src/images"),
          "@/layouts": path.resolve(__dirname, "src/layouts"),
          "@/pages": path.resolve(__dirname, "src/pages"),
          "@/scss": path.resolve(__dirname, "src/scss"),
          "@/utils": path.resolve(__dirname, "src/utils"),
        },
      },
    },
    {
      resolve: "gatsby-plugin-apollo",
      options: {
        uri: "http://192.168.0.20:7999/graphql",
      },
    },
  ],
};

export default config;
