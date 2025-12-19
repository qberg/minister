import { withPayload } from "@payloadcms/next/withPayload";
import createIntlPlugin from "@repo/i18n/plugin";
import { config } from "@repo/next-config";
import type { NextConfig } from "next";

const withNextIntl = createIntlPlugin("../../packages/i18n/messages/en.json");

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

export default withPayload(nextConfig, { devBundleServerPackages: false });
