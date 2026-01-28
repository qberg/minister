import { Box } from "@repo/design-system/components/layout/box";
import { Typography } from "@repo/design-system/components/ui/typography";
import { cn } from "@repo/design-system/lib/utils";
import { getTranslations } from "@repo/i18n/server";
import Image from "next/image";
import Link from "next/link";
import type { TypedLocale } from "payload";
import BackgroundImage from "@/components/background-image";
import { CMSLink } from "@/components/cms-link";
import { FacebookIcon } from "@/components/icons/facebook-icon";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { XIcon } from "@/components/icons/x-icon";
import { YouTubeIcon } from "@/components/icons/youtube-icon";
import { getCachedGlobal } from "@/lib/get-globals";
import { getMediaUrl } from "@/lib/payload-media-utils";
import type { Footer as FooterData } from "@/payload-types";

type Props = {
  locale?: TypedLocale;
};

export async function Footer({ locale = "ta-IN" }: Props) {
  const footerData: FooterData = await getCachedGlobal("footer", locale, 1)();

  const bgImageSrc = getMediaUrl(footerData.bgImg);
  const t = await getTranslations({ locale, namespace: "Footer" });

  const platformConfig: Record<
    string,
    { Icon: React.ElementType; extraClass?: string }
  > = {
    youtube: {
      Icon: YouTubeIcon,
      extraClass: "scale-[1.4]",
    },
    instagram: {
      Icon: InstagramIcon,
      extraClass: "scale-100",
    },
    twitter: {
      Icon: XIcon,
      extraClass: "scale-90",
    },
    facebook: {
      Icon: FacebookIcon,
      extraClass: "scale-100",
    },
  };
  return (
    <Box
      as="footer"
      className="theme-dark relative flex min-h-[60vh] flex-col bg-surface"
    >
      {bgImageSrc && (
        <BackgroundImage className="opacity-90" src={bgImageSrc} />
      )}
      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:justify-between">
        {/*tagline + Socials*/}
        <div className="flex flex-col 4xl:gap-10 gap-4 md:gap-6">
          <div>
            <Typography as="h2" intent="title" variant="headingLG">
              {footerData.title}
            </Typography>

            <Typography
              as="span"
              className="mt-2"
              intent="body"
              variant="bodyLG"
            >
              {footerData.desc}
            </Typography>
          </div>

          <div className="flex gap-2 lg:gap-4">
            {footerData.socialLinks?.map((link) => {
              const config = platformConfig[link.platform];
              if (!config) {
                return null;
              }
              const { Icon, extraClass } = config;

              return (
                <Link
                  aria-label={`Visit our ${link.platform} page`}
                  className="text-body transition-colors duration-200 hover:text-secondary"
                  href={link.url || "https://youtube.com"}
                  key={link.id}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon
                    className={cn("h-5 w-5 lg:h-[2vw] lg:w-[2vw]", extraClass)}
                  />
                </Link>
              );
            })}
          </div>
        </div>

        {/*contact + about */}
        <div className="flex w-full justify-between gap-2 lg:w-[45%]">
          {footerData.contacts && (
            <div className="flex max-w-[20ch] flex-col gap-2 sxl:gap-4 lg:max-w-[30ch]">
              <Typography as="h4" intent={"body"} variant="bodyLG">
                {t("contacts")}
              </Typography>

              {footerData.contacts.phone && (
                <a
                  className="text-surface-default transition-colors hover:text-primary-default"
                  href={`tel:${footerData.contacts.phone}`}
                >
                  <Typography as="span" intent="subtle" variant="bodyLG">
                    {footerData.contacts.phone}
                  </Typography>
                </a>
              )}

              {footerData.contacts.email && (
                <a
                  className="text-surface-default transition-colors hover:text-primary-default"
                  href={`mailto:${footerData.contacts.email}`}
                >
                  <Typography as="span" intent="subtle" variant="bodyLG">
                    {footerData.contacts.email}
                  </Typography>
                </a>
              )}

              {footerData.contacts.address && (
                <address className="not-italic">
                  <Typography as="span" intent="subtle" variant="bodyLG">
                    {footerData.contacts.address}
                  </Typography>
                </address>
              )}
            </div>
          )}
          <div className="flex flex-col gap-2 sxl:gap-4">
            <Typography as="h4" intent={"body"} variant="bodyLG">
              {t("sitemap")}
            </Typography>

            {footerData?.navItems?.map((item, index) => (
              <CMSLink key={`${index}-${item.id}`} {...item.link}>
                <Typography as="span" intent="subtle" variant="bodyLG">
                  {item.link.label}
                </Typography>
              </CMSLink>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-auto flex flex-col gap-2 border-t-1 border-t-neutral-50/40 4xl:pt-10 pt-2 md:pt-4 lg:flex-row lg:justify-between lg:gap-4 lg:pt-6">
        <div className="flex-1">
          <Typography as="span" intent="subtle" variant="bodySM">
            {t("trademark")}
          </Typography>
        </div>
        <div className="hidden flex-1 items-center justify-center gap-2 md:flex">
          <Typography as="span" intent="subtle" variant="bodySM">
            {t("creatorTag")}
          </Typography>
          <span className="relative aspect-[1.5/1] w-12">
            <Image
              alt="Minsky Logo"
              className="object-contain"
              fill
              loading="lazy"
              src="/minsky-logo.svg"
            />
          </span>
        </div>
        <div className="flex flex-1 gap-2 md:justify-end md:gap-4">
          <Link href="/legal/privacy-policy">
            <Typography as="span" intent="subtle" variant="bodySM">
              {t("ppLabel")}
            </Typography>
          </Link>

          <Link href="/legal/terms-conditions">
            <Typography as="span" intent="subtle" variant="bodySM">
              {t("termsLabel")}
            </Typography>
          </Link>
        </div>
      </div>
    </Box>
  );
}
