import SkeletonBook from "@/app/_components/ui/skeletons/SkeletonBook";
import SkeletonCardBook from "@/app/_components/ui/skeletons/SkeletonCardBook";

interface SkeletonBooksProps {
  variant?: "normal" | "card";
  skeletonCount?: number;
}

const SkeletonBooks = ({
  variant = "normal",
  skeletonCount = 6,
}: SkeletonBooksProps) => {
  return Array.from({ length: skeletonCount }).map((_, index) =>
    variant === "card" ? (
      <SkeletonCardBook key={index} />
    ) : (
      <SkeletonBook key={index} />
    ),
  );
};

export default SkeletonBooks;
