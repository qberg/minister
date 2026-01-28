import { Box } from "@repo/design-system/components/layout/box";
import { Typography } from "@repo/design-system/components/ui/typography";
import Image from "next/image";
import type { TypedLocale } from "payload";
import BackgroundImage from "@/components/background-image";
import { CMSLink } from "@/components/cms-link";
import { getCachedGlobal } from "@/lib/get-globals";
import { getMediaUrl } from "@/lib/payload-media-utils";
import type { Footer as FooterData } from "@/payload-types";

type Props = {
  locale?: TypedLocale;
};

export async function Footer({ locale = "ta-IN" }: Props) {
  const footerData: FooterData = await getCachedGlobal("footer", locale, 1)();

  const bgImageSrc = getMediaUrl(footerData.bgImg);

  return (
    <Box
      as="footer"
      className="theme-dark relative flex min-h-[60vh] flex-col bg-surface"
    >
      {bgImageSrc && (
        <BackgroundImage className="opacity-10" src={bgImageSrc} />
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

          <div>Socials</div>
        </div>

        {/*contact + about */}
        <div className="flex w-full justify-between gap-2 lg:w-[45%]">
          {footerData.contacts && (
            <div className="flex max-w-[20ch] flex-col gap-2 lg:max-w-[30ch] lg:gap-4">
              <Typography
                as="h4"
                className="text-surface-muted"
                variant="bodyLG"
              >
                CONTACTS
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
                  <Typography
                    as="span"
                    className="leading-4"
                    intent="subtle"
                    variant="bodyLG"
                  >
                    {footerData.contacts.address}
                  </Typography>
                </address>
              )}
            </div>
          )}
          <div className="flex flex-col gap-4">
            <Typography as="h4" className="text-surface-muted" variant="bodyLG">
              SITEMAP
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

      <div className="mt-auto flex justify-between gap-4 border-t-1 border-t-neutral-50/40 4xl:pt-10 pt-4 lg:pt-6">
        <div className="flex-1">
          <Typography as="span" intent="subtle" variant="bodySM">
            © 2025 T. M. Anbarasan. All Rights Reserved.
          </Typography>
        </div>
        <div className="hidden flex-1 justify-center gap-2 md:flex">
          <Typography as="span" intent="subtle" variant="bodySM">
            Developed by
          </Typography>
          <span className="relative aspect-[1.5/1] w-10">
            <Image
              alt="Minsky Logo"
              className="object-cover"
              fill
              priority
              src="/minsky-logo.png"
              unoptimized
            />
          </span>
        </div>
        <div className="flex flex-1 justify-end gap-2">
          <Typography as="span" intent="subtle" variant="bodySM">
            Privacy Policy
          </Typography>

          <Typography as="span" intent="subtle" variant="bodySM">
            Terms and Conditions
          </Typography>
        </div>
      </div>
    </Box>
  );
}
