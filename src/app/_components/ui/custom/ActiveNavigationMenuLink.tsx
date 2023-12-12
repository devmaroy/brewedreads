"use client";

import { NavigationMenuLink } from "@/app/_components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { type ReactNode, forwardRef } from "react";

interface ActiveNavigationMenuLinkProps {
  href?: string;
  className?: string;
  children: ReactNode;
}

const ActiveNavigationMenuLink = forwardRef<
  HTMLAnchorElement,
  ActiveNavigationMenuLinkProps
>(({ href = "/", className, children, ...props }, ref) => {
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <NavigationMenuLink
      ref={ref}
      className={`cursor-pointer ${className}`}
      active={isActive}
      {...props}
    >
      {children}
    </NavigationMenuLink>
  );
});

export default ActiveNavigationMenuLink;
