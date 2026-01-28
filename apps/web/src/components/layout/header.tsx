"use client";
import {
  Box,
  type BoxPadding,
} from "@repo/design-system/components/layout/box";
import { useHideOnScroll } from "@repo/design-system/hooks/use-hide-on-scroll";
import { cn } from "@repo/design-system/lib/utils";
import type React from "react";

export interface HeaderProps extends React.ComponentPropsWithRef<"header"> {
  sticky?: boolean;
  hideOnScroll?: boolean;
  padding?: BoxPadding;
}

const Header = ({
  className,
  children,
  sticky,
  hideOnScroll,
  padding,
  ref,
  ...props
}: HeaderProps) => {
  const isVisible = useHideOnScroll(hideOnScroll);

  return (
    <Box
      as="header"
      className={cn(
        "w-full bg-transparent transition-transform duration-300",
        sticky && "fixed top-0 z-50",
        hideOnScroll && !isVisible && "-translate-y-full",
        className
      )}
      data-slot="header"
      padding={padding}
      ref={ref}
      {...props}
    >
      {children}
    </Box>
  );
};

Header.displayName = "Header";

const HeaderContent = ({
  className,
  children,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.Ref<HTMLDivElement>;
}) => (
  <div
    className={cn(
      "mx-auto flex w-full items-center justify-between gap-2 rounded-full px-4 py-3 opacity-90 shadow-[0px_5px_16px_0px_rgba(0,0,0,0.28)] backdrop-blur-xs md:gap-4 md:px-6 lg:px-6",
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
  </div>
);

HeaderContent.displayName = "HeaderContent";

const HeaderBrand = ({
  className,
  children,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.Ref<HTMLDivElement>;
}) => (
  <div
    className={cn("flex items-center 4xl:gap-6 gap-2 lg:gap-4", className)}
    ref={ref}
    {...props}
  >
    {children}
  </div>
);

HeaderBrand.displayName = "HeaderBrand";

const HeaderNav = ({
  className,
  children,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.Ref<HTMLDivElement>;
}) => (
  <nav
    className={cn(
      "flex items-center justify-center 4xl:gap-10 gap-8",
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
  </nav>
);

HeaderNav.displayName = "HeaderNav";

const HeaderActions = ({
  className,
  children,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.Ref<HTMLDivElement>;
}) => (
  <div
    className={cn("flex items-center 4xl:gap-5 gap-4", className)}
    ref={ref}
    {...props}
  >
    {children}
  </div>
);

HeaderActions.displayName = "HeaderActions";

export { Header, HeaderContent, HeaderBrand, HeaderNav, HeaderActions };
