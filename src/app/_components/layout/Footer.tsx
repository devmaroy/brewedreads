import PreFooter from "@/app/_components/layout/pre-footer.tsx/PreFooter";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-112p bg-card-foreground py-40p lg:mt-120p lg:py-64p">
      <div className="container">
        <PreFooter />

        <div className="mt-56p md:flex md:justify-between lg:mt-80p">
          <p className="text-16p text-base leading-1.4">
            &copy; {currentYear} BrewedReads All rights reserved.
          </p>

          <ul className="mt-24p flex flex-wrap md:mt-0">
            <li className="bar-shape-pseudo">
              <Link
                href="/terms-conditions"
                className="text-16p text-base transition-all hover:text-primary"
              >
                Terms & Conditions
              </Link>
            </li>
            <li className="bar-shape-pseudo">
              <Link
                href="/privacy-policy"
                className="text-16p text-base transition-all hover:text-primary"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
