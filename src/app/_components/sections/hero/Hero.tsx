import HeroImage from "@/app/_components/sections/hero/HeroImage";
import HeroInfo from "@/app/_components/sections/hero/HeroInfo";

const Hero = () => {
  return (
    <div className="mt-72p">
      <div className="container lg:flex lg:justify-between lg:gap-48p">
        <HeroInfo />
        <HeroImage />
      </div>
    </div>
  );
};

export default Hero;
