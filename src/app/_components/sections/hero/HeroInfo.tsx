import { Button } from "@/app/_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";

const HeroInfo = () => {
  return (
    <div className="lg:max-w-[43.75rem]">
      <div>
        <h1 className="mb-16p font-serif text-clamp-44p-to-80p font-bold leading-1.2">
          <span className="text-gradient relative">
            Where Books
            <span className="z-1 absolute right-[-2.6rem] top-[-2.6rem] h-[4.25rem] w-[4.375rem] md:right-[-3.6rem] md:top-[-3.6rem] md:h-[5.25rem] md:w-[5.375rem] lg:right-[-7rem] lg:top-[-6rem] lg:h-[10.4375rem] lg:w-[10.875rem]">
              <Image
                src="/hero-shape-03.svg"
                fill
                alt="Dot decoration shapes"
              />
            </span>
          </span>{" "}
          <span className="block">Meet Coffee</span>
        </h1>

        <p className="text-gradient m-0 mb-32p text-clamp-18p-to-20p">
          Coffee in One Hand, Adventure{" "}
          <span className="block md:inline-block">in the Other</span>
        </p>
      </div>

      <div>
        <p className="mb-24p text-clamp-20p-to-24p leading-1.6 text-muted">
          Ever think of the perfect companion to a steaming cup of coffee? How
          about an unputdownable book?
        </p>

        <p className="mb-24p text-clamp-20p-to-24p leading-1.6 text-muted">
          Welcome to BrewedReads, where every coffee break turns into an
          exciting journey.
        </p>

        <p className="mb-24p text-clamp-20p-to-24p leading-1.6 text-muted">
          Here, we blend the love for a good read with the love for a good brew.
          So grab your cup, settle in, and let's find your next favorite book
          together.
        </p>
      </div>

      <div className="mt-48p">
        <Button className="bg-gradient !h-52p rounded-full !px-24p !text-16p">
          Discover Books
          <ChevronRightIcon className="ml-8p h-4 w-4" strokeWidth={3} />
        </Button>
      </div>
    </div>
  );
};

export default HeroInfo;
