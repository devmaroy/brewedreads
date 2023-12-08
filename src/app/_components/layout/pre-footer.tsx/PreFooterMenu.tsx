import Link from "next/link";
import Image from "next/image";
import PreFooterSocial from "@/app/_components/layout/pre-footer.tsx/PreFooterSocial";

const PreFooterMenu = () => {
  return (
    <div className="sm:grid sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
      <div className="mt-32p">
        <h3 className="mb-16p font-serif text-20p font-bold leading-1.2">
          Quick Links
        </h3>
        <ul>
          <li className="mb-16p">
            <Link
              href="/"
              className="text-base transition-all hover:text-primary"
            >
              Home
            </Link>
          </li>

          <li className="mb-16p">
            <Link
              href="/discover"
              className="text-base transition-all hover:text-primary"
            >
              Discover
            </Link>
          </li>

          <li className="mb-16p">
            <Link
              href="/about"
              className="text-base transition-all hover:text-primary"
            >
              About
            </Link>
          </li>

          <li className="mb-16p">
            <Link
              href="/blog"
              className="text-base transition-all hover:text-primary"
            >
              Blog
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-32p">
        <h3 className="mb-16p font-serif text-20p font-bold leading-1.2">
          Work with Us
        </h3>
        <ul>
          <li className="mb-16p">
            <Link
              href="/getting-started"
              className="text-base transition-all hover:text-primary"
            >
              Getting started
            </Link>
          </li>

          <li className="mb-16p">
            <Link
              href="/help-center"
              className="text-base transition-all hover:text-primary"
            >
              Help center
            </Link>
          </li>

          <li className="mb-16p">
            <Link
              href="/server-status"
              className="text-base transition-all hover:text-primary"
            >
              Server status
            </Link>
          </li>

          <li>
            <Link
              href="/report-bug"
              className="text-base transition-all hover:text-primary"
            >
              Report a bug
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-32p">
        <h3 className="mb-16p font-serif text-20p font-bold leading-1.2">
          Contact Us
        </h3>
        <ul>
          <li>
            <Link
              href="@mailto:contact@brewedreads.com"
              className="inline-flex text-base"
            >
              <Image
                src="/envelope-icon.svg"
                alt="Email icon"
                className="mr-8p"
                height={16}
                width={16}
              />
              contact@brewedreads.com
            </Link>
          </li>
        </ul>

        <PreFooterSocial />
      </div>
    </div>
  );
};

export default PreFooterMenu;
