import {
  Header,
  HeaderBrand,
  HeaderContent,
  HeaderNav,
} from "@/components/layout/header";
import { Typography } from "@repo/design-system/components/ui/typography";
import Logo from "@/components/logo";
import type { Header as HeaderData } from "@/payload-types";
import { CMSLink } from "@/components/cms-link";

type HeaderClientProps = {
  data: HeaderData;
};

export const HeaderClient = ({ data }: HeaderClientProps) => {
  return (
    <Header sticky hideOnScroll className="text-background">
      <HeaderContent>
        {/*branding*/}
        <HeaderBrand>
          <Logo />
          <Typography
            as="h1"
            variant="brandHeading"
            className="text-background"
          >
            T. M. Anbarasan
          </Typography>
        </HeaderBrand>

        {/*Desktop Nav*/}
        <HeaderNav className="hidden lg:flex">
          {data?.navItems?.map((item, index) => (
            <CMSLink key={`${index}-${item.id}`} {...item.link}>
              <Typography as="ul" variant="bodyMD" className="uppercase">
                {item.link.label}
              </Typography>
            </CMSLink>
          ))}

          {/* Desktop actions */}
          <div>ENG</div>
        </HeaderNav>

        <div className="lg:hidden">Mobile</div>
      </HeaderContent>
    </Header>
  );
};
