import SkeletonReview from "@/app/_components/ui/skeletons/SkeletonReview";

interface SkeletonReviewsProps {
  variant?: "normal" | "card";
  skeletonCount?: number;
}

const SkeletonReviews = ({ skeletonCount = 6 }: SkeletonReviewsProps) => {
  return Array.from({ length: skeletonCount }).map((_, index) => (
    <SkeletonReview key={index} />
  ));
};

export default SkeletonReviews;
