"use client";

import Logo from "@/components/common/Logo";
import Navigation from "@/components/layout/navigation/Navigation";
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
          "mt-10",
          "flex",
          "flex-wrap",
          "justify-between",
          "items-center",
          "sm:flex-nowrap",
          "sm:mt-0"
        )}
      >
        <Logo className="relative z-50" />
        <Navigation isOpen={isOpen} toggleNavigation={toggleNavigation} />
      </div>
    </header>
  );
};

export default Header;
