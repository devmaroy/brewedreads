import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div
      className={`w-logo-sm h-logo-sm sm:w-logo-lg sm:h-logo-lg relative top-1.5 flex-shrink-0 ${className}`}
    >
      <Link href="/">
        <Image src="/logo.svg" alt="Brewed Reads logo" fill />
      </Link>
    </div>
  );
};

export default Logo;
