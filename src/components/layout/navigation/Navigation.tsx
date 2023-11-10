import Logo from "@/components/common/Logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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
      <div className="p-2 bg-primary text-white rounded sm:hidden w-max relative z-50 cursor-pointer">
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
          "bg-secondary-foreground",
          "max-w-full",
          "p-8",
          "transition-transform",
          "-translate-x-full",
          isOpen ? "translate-x-0" : "",
          "sm:static",
          "sm:transform-none",
          "sm:flex",
          "sm:justify-start",
          "sm:bg-transparent"
        )}
      >
        <NavigationMenuList
          className={cn("inline-block", "sm:flex", "sm:ml-20")}
        >
          <NavigationMenuItem
            className={cn("!m-0", "!mt-28", "sm:!mt-0", "sm:!mr-6")}
          >
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent",
                  "hover:bg-transparent",
                  "text-white",
                  "hover:text-primary",
                  "px-0 py-0",
                  "text-left"
                )}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem className={cn("!m-0")}>
            <Link href="/discover" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent",
                  "hover:bg-transparent",
                  "text-white",
                  "hover:text-primary",
                  "px-0 py-0",
                  "text-left"
                )}
              >
                Discover
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>

        <div className={cn("w-full")}>
          <NavigationMenuList
            className={cn(
              "block w-full",
              "sm:flex",
              "sm:w-full",
              "sm:justify-end"
            )}
          >
            <NavigationMenuItem
              className={cn("mt-10 w-full", "sm:w-auto", "sm:!mt-0")}
            >
              <Link href="/register" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-primary",
                    "text-white",
                    "hover:text-primary",
                    "text-center",
                    "w-full",
                    "sm:w-auto"
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
