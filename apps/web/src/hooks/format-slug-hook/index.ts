import type { FieldHook } from "payload";
import { slugify } from "@/utils";

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === "string") {
      return value;
    }

    if (
      data &&
      (operation === "create" || !data.slug) &&
      fallback &&
      fallback in data &&
      typeof data[fallback] === "string"
    ) {
      return slugify(data[fallback]);
    }

    return value;
  };
