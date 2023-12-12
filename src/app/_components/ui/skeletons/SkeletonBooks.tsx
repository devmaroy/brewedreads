import { Skeleton } from "@/app/_components/ui/skeleton";

interface SkeletonBooksProps {
  wrapperClassName?: string;
  itemClassName?: string;
  skeletonClassName?: string;
}

const SkeletonBooks = ({
  wrapperClassName = "mt-32p grid grid-cols-fluid-fill-8-5 gap-24p md:gap-32p",
  itemClassName = "aspect-h-4 aspect-w-3",
  skeletonClassName = "bg-gradient h-full w-full rounded-md",
}: SkeletonBooksProps) => {
  return (
    <div className={wrapperClassName}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={itemClassName}>
          <Skeleton className={skeletonClassName} />
        </div>
      ))}
    </div>
  );
};

export default SkeletonBooks;
