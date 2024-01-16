import { Button } from "@/app/_components/ui/button";
import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <main className="flex-1">
      <section className="mt-72p">
        <div className="sm:container">
          <div className="relative w-[400px] h-[400px]  lg:w-[600px] lg:h-[600px] m-auto">
            <Image
              src="/not-found-page.svg"
              fill
              alt="Not found page image"
              style={{
                objectFit: "cover",
              }}
            />
          </div>

          <div className="m-auto text-center md:w-8/12 lg:w-6/12">
            <p className="text-20p lg:text-24p">
              The page you are looking for may have been removed, or it is
              temporarily unavailable.
            </p>

            <Button className="mt-24p rounded-full bg-gradient font-bold !text-16p !py-14p !px-40p h-auto lg:!py-16p lg:!px-64p">
              <Link href="/">Go back to homepage</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
