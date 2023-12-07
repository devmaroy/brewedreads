import Image from "next/image";

interface SectionHeaderProps {
  heading: string;
  decorationImage: string;
  decorationClassName?: string;
  content: string;
}

const SectionHeader = ({
  heading,
  decorationImage,
  decorationClassName = "",
  content,
}: SectionHeaderProps) => {
  return (
    <div>
      <h2 className="text-gradient relative mb-8p font-serif text-clamp-32p-to-46p font-bold leading-1.2">
        {heading}
        <span className={`absolute ${decorationClassName}`}>
          <Image src={decorationImage} alt="Decoration image" fill />
        </span>
      </h2>
      <p className="text-base text-clamp-16p-to-18p leading-1.4">{content}</p>
    </div>
  );
};

export default SectionHeader;
