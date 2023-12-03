import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div
      className={`w-206p h-30p sm:h-35p sm:w-233p relative top-1.5 flex-shrink-0 ${className}`}
    >
      <Link href="/">
        <Image src="/logo.svg" alt="Brewed Reads logo" fill />
      </Link>
    </div>
  );
};

export default Logo;
