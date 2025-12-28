const TRAILING_SLASH_REGEX = /\/$/;

/**
 * Extract Twitter/X username from profile URL
 * @example getTwitterHandle("https://twitter.com/mkstalin") => "mkstalin"
 */
const getTwitterHandle = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const parts = urlObj.pathname.split("/").filter(Boolean);
    return parts[0] || "";
  } catch {
    return "";
  }
};

/**
 * Normalize Instagram URL to embed format
 * @example normalizeInstagramUrl("https://instagram.com/user") => "https://instagram.com/user/embed/"
 */
const normalizeInstagramUrl = (url: string): string => {
  if (url.endsWith("/embed/")) {
    return url;
  }
  return `${url.replace(TRAILING_SLASH_REGEX, "")}/embed/`;
};

/**
 * Get Facebook plugin embed URL
 */
const getFacebookEmbedUrl = (url: string): string => {
  const params = new URLSearchParams({
    href: url,
    tabs: "timeline",
    small_header: "true",
    width: "500",
    height: "800",
    adapt_container_width: "true",
    hide_cover: "false",
    show_facepile: "true",
  });
  return `https://www.facebook.com/plugins/page.php?${params.toString()}`;
};

export { getTwitterHandle, normalizeInstagramUrl, getFacebookEmbedUrl };
