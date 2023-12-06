import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div
      className={`relative top-1.5 h-30p w-206p flex-shrink-0 sm:h-35p sm:w-233p ${className}`}
    >
      <Link href="/">
        <Image src="/logo.svg" alt="Brewed Reads logo" fill />
      </Link>
    </div>
  );
};

export default Logo;
