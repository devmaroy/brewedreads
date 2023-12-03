import Image from "next/image";

const HeroImage = () => {
  return (
    <div className="lg:w-432p lg:h-824p xl:w-512p xl:h-904p relative hidden flex-shrink-0 lg:-mr-8 lg:block 2xl:-mr-0">
      <span className="z-1 absolute left-[-1.625rem] top-[-1.625rem]">
        <Image
          src="/hero-shape-01.svg"
          width={64}
          height={114}
          alt="Dot decoration shapes"
        />
      </span>

      <Image
        src="/hero.jpg"
        alt="Brewed Reads logo"
        fill
        className="relative z-50 rounded-md"
      />

      <span className="z-1 absolute bottom-[-64px] left-0 right-[-120px] 2xl:right-[-64px]">
        <Image
          src="/hero-shape-02.svg"
          layout="responsive"
          width={541}
          height={264}
          alt="Dot decoration shapes"
        />
      </span>
    </div>
  );
};

export default HeroImage;
