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
      <div className="relative z-50 w-max cursor-pointer rounded bg-primary p-2 text-white lg:hidden">
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
          "lg:static",
          "lg:transform-none",
          "lg:flex",
          "lg:justify-start",
          "lg:bg-transparent",
        )}
      >
        <NavigationMenuList
          className={cn("inline-block pl-32p pr-32p", "lg:flex", "lg:ml-20")}
        >
          <NavigationMenuItem
            className={cn("!m-0", "!mt-120p", "lg:!mt-0", "lg:!mr-6")}
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
                  "text-left",
                )}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem className={cn("!m-0", "lg:!mr-6")}>
            <Link href="/discover" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent",
                  "hover:bg-transparent",
                  "text-white",
                  "hover:text-primary",
                  "px-0 py-0",
                  "text-left",
                )}
              >
                Discover
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem className={cn("!m-0")}>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent",
                  "hover:bg-transparent",
                  "text-white",
                  "hover:text-primary",
                  "px-0 py-0",
                  "text-left",
                )}
              >
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>

        <div className={cn("w-full")}>
          <NavigationMenuList
            className={cn(
              "block w-full pl-32p pr-32p",
              "lg:flex",
              "lg:w-full",
              "lg:justify-end",
            )}
          >
            <NavigationMenuItem
              className={cn("mt-32p w-full", "lg:w-auto", "lg:!mt-0")}
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
                    "lg:w-auto",
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
