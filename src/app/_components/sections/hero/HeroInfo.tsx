import { Button } from "@/app/_components/ui/button";
import { ChevronRightIcon } from "lucide-react";

const HeroInfo = () => {
  return (
    <div className="lg:max-w-[700px]">
      <div>
        <h1 className="text-clamp-44p-to-80p leading-1.2 mb-16p font-serif font-bold">
          <span className="text-gradient">Where Books</span>{" "}
          <span className="block">Meet Coffee</span>
        </h1>
        <p className="text-gradient text-clamp-18p-to-20p m-0 mb-32p">
          Coffee in One Hand, Adventure{" "}
          <span className="block md:inline-block">in the Other</span>
        </p>
      </div>

      <div>
        <p className="text-clamp-20p-to-24p leading-1.6 mb-24p text-base">
          Ever think of the perfect companion to a steaming cup of coffee? How
          about an unputdownable book?
        </p>

        <p className="text-clamp-20p-to-24p leading-1.6 mb-24p text-base">
          Welcome to BrewedReads, where every coffee break turns into an
          exciting journey.
        </p>

        <p className="text-clamp-20p-to-24p leading-1.6 mb-24p text-base">
          Here, we blend the love for a good read with the love for a good brew.
          So grab your cup, settle in, and let's find your next favorite book
          together.
        </p>
      </div>

      <div className="mt-48p">
        <Button className="bg-gradient !h-52p !text-16p rounded-full !px-24p">
          Discover Books
          <ChevronRightIcon className="ml-8p h-4 w-4" strokeWidth={3} />
        </Button>
      </div>
    </div>
  );
};

export default HeroInfo;
