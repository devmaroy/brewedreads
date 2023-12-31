import ActiveNavigationMenuLink from "@/app/_components/ui/custom/ActiveNavigationMenuLink";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/app/_components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";

interface NavigationProps {
  isOpen: boolean;
  toggleNavigation: () => void;
}

const Navigation = ({ isOpen, toggleNavigation }: NavigationProps) => {
  return (
    <>
      <div className="bg-gradient relative z-50 w-max cursor-pointer rounded p-2 text-white md:hidden">
        {isOpen ? (
          <X onClick={toggleNavigation} />
        ) : (
          <MenuIcon onClick={toggleNavigation} />
        )}
      </div>

      <NavigationMenu
        className={cn(
          "block",
          "basis-full",
          "absolute",
          "top-0",
          "left-0",
          "right-0",
          "bottom-0",
          "!pr-0",
          "bg-secondary-foreground",
          "max-w-full",
          "transition-transform",
          "-translate-x-full",
          isOpen ? "translate-x-0" : "",
          "md:static",
          "md:transform-none",
          "md:flex",
          "md:justify-start",
          "md:bg-transparent",
        )}
      >
        <NavigationMenuList
          className={cn(
            "inline-block pl-32p pr-32p",
            "md:flex",
            "md:ml-16p",
            "lg:ml-24p",
          )}
        >
          <NavigationMenuItem
            className={cn("!m-0", "!mt-120p", "md:!mt-0", "md:!mr-6")}
            onClick={toggleNavigation}
          >
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent",
                  "hover:bg-transparent",
                  "focus:bg-transparent",
                  "text-white",
                  "hover:text-primary",
                  "focus:text-primary",
                  "px-0 py-0",
                  "text-left",
                )}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem
            className={cn("!m-0", "md:!mr-6")}
            onClick={toggleNavigation}
          >
            <Link href="/discover" legacyBehavior passHref>
              <ActiveNavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent",
                  "hover:bg-transparent",
                  "focus:bg-transparent",
                  "text-white",
                  "hover:text-primary",
                  "focus:text-primary",
                  "active:text-primary",
                  "px-0 py-0",
                  "text-left",
                  "data-[active]:bg-transparent",
                  "data-[active]:text-primary",
                )}
              >
                Discover
              </ActiveNavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem className={cn("!m-0")} onClick={toggleNavigation}>
            <Link href="/about" legacyBehavior passHref>
              <ActiveNavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent",
                  "hover:bg-transparent",
                  "focus:bg-transparent",
                  "text-white",
                  "hover:text-primary",
                  "focus:text-primary",
                  "px-0 py-0",
                  "text-left",
                  "data-[active]:bg-transparent",
                  "data-[active]:text-primary",
                )}
              >
                About
              </ActiveNavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>

        <div className={cn("w-full")}>
          <NavigationMenuList
            className={cn(
              "block w-full pl-32p pr-32p",
              "md:flex",
              "md:w-full",
              "md:justify-end",
              "md:!pr-0",
            )}
          >
            <NavigationMenuItem
              className={cn("!m-0", "md:!mr-6")}
              onClick={toggleNavigation}
            >
              <Link href="/login" legacyBehavior passHref>
                <ActiveNavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent",
                    "hover:bg-transparent",
                    "focus:bg-transparent",
                    "text-white",
                    "hover:text-primary",
                    "focus:text-primary",
                    "px-0 py-0",
                    "text-left",
                    "data-[active]:bg-transparent",
                    "data-[active]:text-primary",
                  )}
                >
                  Sign In
                </ActiveNavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem
              className={cn("mt-32p w-full", "md:w-auto", "md:!mt-0")}
              onClick={toggleNavigation}
            >
              <Link href="/register" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-gradient",
                    "rounded-full",
                    "text-white",
                    "hover:text-white",
                    "text-center",
                    "w-full",
                    "md:w-auto",
                    "!px-22p !py-10p",
                  )}
                >
                  Sign Up
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </div>
      </NavigationMenu>
    </>
  );
};

export default Navigation;
