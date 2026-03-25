"use client";
import { useScrollSpy } from "@repo/design-system/components/ui/scroll-spy";
import { cn } from "@repo/design-system/lib/utils";
import { Link, usePathname } from "@repo/i18n/navigation";
import {
  BarChart2,
  Building2,
  FileUser,
  Globe,
  House,
  Info,
  type LucideIcon,
  Newspaper,
  Star,
  Trophy,
} from "lucide-react";
import { buildHref, CMSLink } from "@/components/cms-link";
import type { Header } from "@/payload-types";

const iconMap: Record<string, LucideIcon> = {
  house: House,
  user: FileUser,
  "bar-chart-2": BarChart2,
  newspaper: Newspaper,
  globe: Globe,
  info: Info,
  star: Star,
  "building-2": Building2,
  trophy: Trophy,
};

type Props = {
  navItems: NonNullable<Header["navItems"]>;
};

export function MobileBottomNav({ navItems }: Props) {
  const pathname = usePathname();
  const { activeValue } = useScrollSpy();
  const isHomeActive = pathname === "/" || pathname === "/home";
  const isHidden = activeValue === "footer";

  return (
    <nav
      className={cn(
        "fixed right-0 bottom-0 left-0 z-50 flex items-center justify-around border-primary/20 border-t bg-primary pb-safe transition-transform duration-300 lg:hidden",
        isHidden ? "translate-y-full" : "translate-y-0"
      )}
    >
      <Link
        className={cn(
          "flex flex-col items-center gap-1 px-3 py-3 text-xs transition-colors",
          isHomeActive
            ? "text-secondary"
            : "text-primary-foreground/70 hover:text-primary-foreground"
        )}
        href="/home"
      >
        <House
          className={cn(
            "h-5 w-5 transition-transform",
            isHomeActive && "scale-110"
          )}
        />
        <span className="max-w-[8ch] truncate text-center leading-none">
          Home
        </span>
      </Link>

      {/* CMS nav items */}
      {navItems.map((item) => {
        const Icon = iconMap[item.icon ?? "house"] ?? House;
        const href = buildHref(item.link);
        const isActive = href
          ? pathname === href || pathname.startsWith(`${href}/`)
          : false;

        return (
          <CMSLink
            key={item.id}
            {...item.link}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-3 text-xs transition-colors",
              isActive
                ? "text-secondary"
                : "text-primary-foreground/70 hover:text-primary-foreground"
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5 transition-transform",
                isActive && "scale-110"
              )}
            />
            <span className="max-w-[8ch] truncate text-center leading-none">
              {item.mobileLabel ?? item.link.label}
            </span>
          </CMSLink>
        );
      })}
    </nav>
  );
}
