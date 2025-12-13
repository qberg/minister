"use client";
import {
  Box,
  type BoxPadding,
} from "@repo/design-system/components/layout/box";
import { useHideOnScroll } from "@repo/design-system/hooks/use-hide-on-scroll";
import { cn } from "@repo/design-system/lib/utils";
import type React from "react";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean;
  hideOnScroll?: boolean;
  padding?: BoxPadding;
  ref?: React.Ref<HTMLElement>;
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
        "w-full transition-transform duration-300 bg-transparent",
        sticky && "fixed top-0 z-50",
        hideOnScroll && !isVisible && "-translate-y-full",
        className,
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
}) => {
  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto flex w-full items-center justify-between gap-4 px-6 py-3 lg:px-6 rounded-full opacity-90 shadow-[0px_5px_16px_0px_rgba(0,0,0,0.28)] backdrop-blur-lg",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

HeaderContent.displayName = "HeaderContent";

const HeaderBrand = ({
  className,
  children,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-2 lg:gap-4 4xl:gap-6", className)}
      {...props}
    >
      {children}
    </div>
  );
};

HeaderBrand.displayName = "HeaderBrand";

const HeaderNav = ({
  className,
  children,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <nav
      ref={ref}
      className={cn("flex items-center gap-8 4xl:gap-10", className)}
      {...props}
    >
      {children}
    </nav>
  );
};

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
    ref={ref}
    className={cn("flex items-center gap-4 4xl:gap-5", className)}
    {...props}
  >
    {children}
  </div>
);

HeaderActions.displayName = "HeaderActions";

export { Header, HeaderContent, HeaderBrand, HeaderNav, HeaderActions };
