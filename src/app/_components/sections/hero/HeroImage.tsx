import Image from "next/image";

const HeroImage = () => {
  return (
    <div className="xl:-mr-88p 2xl:-mr-120p">
      <div className="relative hidden flex-shrink-0 lg:-mr-8 lg:block lg:h-824p lg:w-432p xl:h-904p xl:w-512p 2xl:-mr-0">
        <span className="z-1 absolute lg:left-[-2.5rem] lg:top-[-2.5rem]">
          <Image
            src="/hero-shape-01.svg"
            width={64}
            height={114}
            alt="Dot decoration shapes"
            style={{ width: "auto" }}
          />
        </span>

        <Image
          src="/hero.jpg"
          alt="Illustration of a woman that calmly drinks a coffe while reading a nice book"
          fill
          sizes="(min-width: 1280px) 512px, 432px"
          className="relative z-50 rounded-md"
          priority
        />

        <span className="z-1 absolute bottom-[-4rem] left-0 right-[-7.5rem] 2xl:right-[-4rem]">
          <Image
            src="/hero-shape-02.svg"
            width={541}
            height={264}
            alt="Dot decoration shapes"
          />
        </span>
      </div>
    </div>
  );
};

export default HeroImage;
