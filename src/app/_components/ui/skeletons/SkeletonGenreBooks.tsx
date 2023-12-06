import { Skeleton } from "@/app/_components/ui/skeleton";

const SkeletonGenreBooks = () => {
  return (
    <div className="grid-cols-fluid-fill mt-32p grid gap-24p md:gap-32p">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="aspect-w-3 aspect-h-4">
          <Skeleton className="bg-gradient h-full w-full rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonGenreBooks;
