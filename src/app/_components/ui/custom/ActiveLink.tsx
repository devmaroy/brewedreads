"use client";

// if you are planing to use it in the component which is not marker with use client directive this is a must
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

// usePathname is a hook now imported from navigation

type ActiveLinkProps = LinkProps & {
  activeClassName: string;
};

const ActiveLink = ({
  activeClassName,
  children,
  ...rest
}: { children: React.ReactNode } & ActiveLinkProps) => {
  const { href } = rest;
  const pathName = usePathname();

  const isActive = pathName === href;
  return (
    // you get a global isActive class name, it is better than
    // nothing, but it means you do not have scoping ability in
    // certain cases
    <Link {...rest} className={isActive ? activeClassName : ""}>
      {children}
    </Link>
  );
};

export default ActiveLink;
