import type { Page } from "@/payload-types";
import { cn } from "@repo/design-system/lib/utils";
import { Link } from "@repo/i18n/navigation";
import type React from "react";

type CMSLinkType = {
  type?: "custom" | "reference" | null;
  reference?: {
    value: Page | string | number;
  } | null;
  url?: string | null;
  anchor?: string | null;
  label?: string | null;
  newTab?: boolean | null;

  className?: string;
  children?: React.ReactNode;
};

export const CMSLink = (props: CMSLinkType) => {
  const { type, reference, url, anchor, label, newTab, className, children } =
    props;

  const href = buildHref({ type, reference, url, anchor });

  if (!href) {
    return null;
  }

  const newTabProps = newTab
    ? { rel: "noopener noreferrer", target: "_blank" }
    : {};

  return (
    <Link href={href} className={cn(className)} {...newTabProps}>
      {children ?? label}
    </Link>
  );
};

function buildHref({
  type,
  reference,
  url,
  anchor,
}: Pick<CMSLinkType, "type" | "reference" | "url" | "anchor">): string | null {
  let baseHref = "";

  if (type === "reference" && typeof reference?.value === "object") {
    const pageSlug = reference?.value.slug;
    baseHref = `/${pageSlug}`;
  } else if (type === "custom" && url) {
    baseHref = url;
  }

  if (!baseHref) {
    return null;
  }

  return anchor ? `${baseHref}#${anchor}` : baseHref;
}
