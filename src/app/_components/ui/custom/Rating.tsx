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
          <div className="relative h-[0.8125rem] w-[0.9375rem] lg:h-[1rem] lg:w-[1.125rem]">
            <Image
              key={i}
              src="/star-icon.svg"
              alt="Star icon"
              fill
              className={i < starsRating ? "opacity-100" : "opacity-25"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
