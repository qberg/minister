import createNextIntlPlugin from "next-intl/plugin";

/**
 * Creates a Next.js plugin for next-intl with pre-configured settings
 *
 * @param messagesPath - Relative path from the app root to the messages file
 * @example
 * // In apps/web/next.config.ts
 * const withNextIntl = createIntlPlugin('../../packages/i18n/src/messages/en.json')
 */
export default function createIntlPlugin(
  messagesPath = "../../packages/i18n/messages/en.json",
) {
  return createNextIntlPlugin({
    experimental: {
      createMessagesDeclaration: messagesPath,
    },
  });
}
