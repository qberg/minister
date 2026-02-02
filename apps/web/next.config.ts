import { withPayload } from "@payloadcms/next/withPayload";
import createIntlPlugin from "@repo/i18n/plugin";
import { config } from "@repo/next-config";
import withSerwistInit from "@serwist/next"; // 1. Import Serwist
import type { NextConfig } from "next";

const withNextIntl = createIntlPlugin("../../packages/i18n/messages/en.json");

const withSerwist = withSerwistInit({
  swSrc: "src/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

let nextConfig: NextConfig = {
  ...config,
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };
    return webpackConfig;
  },
};

nextConfig = withNextIntl(nextConfig);

nextConfig = withSerwist(nextConfig);

export default withPayload(nextConfig, { devBundleServerPackages: false });
