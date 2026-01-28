import { Typography } from "@repo/design-system/components/ui/typography";
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
  return (
    <Header className="text-background" hideOnScroll sticky>
      <HeaderContent>
        {/*branding*/}
        <HeaderBrand>
          <Logo />
          <Typography
            as="h1"
            className="text-background"
            variant="brandHeading"
          >
            T. M. Anbarasan
          </Typography>
        </HeaderBrand>

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
          <div>
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
