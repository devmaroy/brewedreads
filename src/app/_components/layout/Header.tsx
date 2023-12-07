"use client";

import Logo from "@/app/_components/ui/custom/Logo";
import Navigation from "@/app/_components/layout/navigation/Navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div
        className={cn(
          "container",
          "mx-auto",
          "mt-40p",
          "flex",
          "flex-wrap",
          "justify-between",
          "items-center",
          "sm:flex-nowrap",
        )}
      >
        <Logo className="relative z-50" />
        <Navigation isOpen={isOpen} toggleNavigation={toggleNavigation} />
      </div>
    </header>
  );
};

export default Header;
