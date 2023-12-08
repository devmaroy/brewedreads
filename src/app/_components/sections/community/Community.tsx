import Image from "next/image";

const Community = () => {
  return (
    <section className="relative mt-96p lg:mt-120p">
      <div className="container overflow-hidden">
        <div className="relative">
          <div className="relative ml-[-12px] h-[33rem] w-[94%] sm:ml-[-12%] sm:h-[45.5rem] md:ml-[-18%] lg:ml-[-10%] lg:w-[80%] xl:ml-0 xl:h-[48.75rem]">
            <Image
              src="/community.jpg"
              alt="Happy community, people everywhere"
              layout="fill"
              className="rounded-r-[2.5rem] lg:rounded-[2.5rem]"
              style={{ objectFit: "cover" }}
            />

            <div className="bg-gradient absolute inset-0 h-[33rem] w-[100%] rounded-r-[2.5rem] opacity-25 sm:h-[45.5rem] lg:rounded-[2.5rem] xl:h-[48.75rem]" />
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 transform lg:top-3/4 lg:-translate-y-3/4">
            <div className="bg-gradient relative mx-0 ml-auto w-[80%] rounded-[2.5rem] px-24p py-40p md:px-48p md:py-64p lg:w-[94%] lg:px-72p lg:py-96p">
              <h3 className="mb-8p font-serif text-clamp-26p-to-40p font-bold leading-1.2">
                Sip, Read, Love:{" "}
                <span className="block md:inline-block">
                  Our Community Speaks
                </span>
              </h3>

              <blockquote className="w-[90%] text-clamp-16p-to-24p font-medium italic leading-1.6">
                “Nothing complements my morning coffee better than a book
                recommended by BrewedReads. It's the perfect blend of my two
                favorite things!”
              </blockquote>

              <span className="absolute right-[-3rem] top-[-4rem] h-[144px] w-[156px] md:top-[-6rem] md:h-[200px] md:w-[212px] lg:right-[-5rem] lg:top-[-5rem] lg:h-[376px] lg:w-[392px]">
                <Image
                  src="/community-shape.svg"
                  fill
                  alt="Decoration shapes"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
