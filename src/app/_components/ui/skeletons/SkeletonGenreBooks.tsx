import { Skeleton } from "@/app/_components/ui/skeleton";

const SkeletonGenreBooks = () => {
  return (
    <div className="mt-32p grid grid-cols-fluid-fill gap-24p md:gap-32p">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="aspect-h-4 aspect-w-3">
          <Skeleton className="bg-gradient h-full w-full rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonGenreBooks;
