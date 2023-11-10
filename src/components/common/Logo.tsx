import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }) => {
  return (
    <div className={`text-white ${className}`}>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Brewed Reads logo"
          width="220"
          height="220"
        />
      </Link>
    </div>
  );
};

export default Logo;
