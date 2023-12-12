import Image from "next/image";
import Link from "next/link";

const PreFooterSocial = () => {
  return (
    <div className="mt-32p">
      <ul className="flex flex-wrap gap-16p">
        <li>
          <Link href="https://facebook.com/brewedreads">
            <Image
              src="/facebook-icon.svg"
              alt="Facebook icon"
              height={18}
              width={11.25}
              className="transition-all hover:opacity-70"
            />
          </Link>
        </li>
        <li>
          <Link href="https://facebook.com/brewedreads">
            <Image
              src="/twitter-icon.svg"
              alt="Facebook icon"
              height={18}
              width={18}
              className="transition-all hover:opacity-70"
            />
          </Link>
        </li>
        <li>
          <Link href="https://facebook.com/brewedreads">
            <Image
              src="/instagram-icon.svg"
              alt="Facebook icon"
              height={18}
              width={15.75}
              className="transition-all hover:opacity-70"
            />
          </Link>
        </li>
        <li>
          <Link href="https://facebook.com/brewedreads">
            <Image
              src="/linkedin-icon.svg"
              alt="Facebook icon"
              height={18}
              width={15.75}
              className="transition-all hover:opacity-70"
            />
          </Link>
        </li>
        <li>
          <Link href="https://facebook.com/brewedreads">
            <Image
              src="/youtube-icon.svg"
              alt="Facebook icon"
              height={18}
              width={20.25}
              className="transition-all hover:opacity-70"
            />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default PreFooterSocial;
