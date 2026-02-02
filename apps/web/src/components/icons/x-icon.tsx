import { cn } from "@repo/design-system/lib/utils";
import type React from "react";

export function XIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      fill="none"
      viewBox="0 0 56 56"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>X</title>
      <g clipPath="url(#x_icon_clip)">
        <mask
          height="56"
          id="x_icon_mask"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "luminance" }}
          width="57"
          x="0"
          y="0"
        >
          <path d="M.00781 0H56.0078v56H.00781z" fill="#fff" />
        </mask>
        <g mask="url(#x_icon_mask)">
          <path
            d="M44.1922 2h8.7992L33.7701 24.0246 56.3849 54h-17.705l-13.877-18.1762L8.94224 54H.13486L20.6922 30.4344-.99219 2.0041H17.1636l12.5245 16.6107zM41.098 48.7213h4.877L14.4996 7.0041H9.27011z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id="x_icon_clip">
          <path d="M0 0h56v56H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}
