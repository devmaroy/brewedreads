import Image from "next/image";

interface RatingProps {
  rating: number | null;
}

const Rating = ({ rating = 0 }: RatingProps) => {
  const starsRating = Math.floor(rating ?? 0);

  return (
    <div className="flex flex-wrap gap-8p">
      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <Image
            key={i}
            src="/star-icon.svg"
            alt="Star icon"
            width={18}
            height={16}
            className={i < starsRating ? "opacity-100" : "opacity-25"}
          />
        );
      })}
    </div>
  );
};

export default Rating;
