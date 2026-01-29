"use client";

import { useScrollSpy } from "@repo/design-system/components/ui/scroll-spy";
import { Typography } from "@repo/design-system/components/ui/typography";
import { cn } from "@repo/design-system/lib/utils";
import { useTranslations } from "@repo/i18n";
import { Link } from "@repo/i18n/navigation";
import { CMSLink } from "@/components/cms-link";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  Header,
  HeaderBrand,
  HeaderContent,
  HeaderNav,
} from "@/components/layout/header";
import Logo from "@/components/logo";
import type { Header as HeaderData } from "@/payload-types";

type HeaderClientProps = {
  data: HeaderData;
};

export const HeaderClient = ({ data }: HeaderClientProps) => {
  const t = useTranslations("Header");
  const { activeValue } = useScrollSpy();
  const isHero = activeValue === "hero";
  return (
    <Header className="text-background" hideOnScroll sticky>
      <HeaderContent
        className={cn(
          "border-b transition-all duration-300 ease-in-out",
          isHero
            ? "border-transparent bg-transparent"
            : "border-border border-primary bg-primary/50 shadow-sm backdrop-blur-md"
        )}
      >
        {/*branding*/}
        <Link href={"/home"}>
          <HeaderBrand>
            <Logo />
            <Typography
              as="h1"
              className="hidden whitespace-nowrap text-surface-muted md:block"
              variant="headingSM"
            >
              {t("name")}
            </Typography>

            <Typography
              as="h1"
              className="whitespace-nowrap text-surface-muted md:hidden"
              variant="headingXS"
            >
              {t("name")}
            </Typography>
          </HeaderBrand>
        </Link>

        {/*Desktop Nav*/}
        <HeaderNav className="hidden lg:flex">
          {data?.navItems?.map((item, index) => (
            <CMSLink key={`${index}-${item.id}`} {...item.link}>
              <Typography as="ul" className="uppercase" variant="bodyMD">
                {item.link.label}
              </Typography>
            </CMSLink>
          ))}

          {/* Desktop actions */}
          <div className="-mt-[6px]">
            <LanguageSwitcher />
          </div>
        </HeaderNav>

        <div className="lg:hidden">
          <LanguageSwitcher />
        </div>
      </HeaderContent>
    </Header>
  );
};
