import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/**
 * Internationalized navigation components and utilities
 *
 * These are type-safe wrappers around Next.js navigation that:
 * - Automatically handle locale prefixes in URLs
 * - Preserve current locale when navigating
 * - Provide proper TypeScript types
 *
 * @example
 * ```tsx
 * import { Link, useRouter } from '@repo/i18n/navigation';
 *
 * // Automatically handles locale: /en-IN/about
 * <Link href="/about">About</Link>
 *
 * // Router also locale-aware
 * const router = useRouter();
 * router.push('/dashboard');
 * ```
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export type { Locale } from "./config";
