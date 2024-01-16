"use client";

import { Button } from "@/app/_components/ui/button";
import ErrorMessage from "@/app/_components/ui/custom/ErrorMessage";
import Rating from "@/app/_components/ui/custom/Rating";
import SkeletonReviews from "@/app/_components/ui/skeletons/SkeletonReviews";
import { useFetchPaginatedReviews } from "@/hooks/api";
import { formatDate } from "@/lib/utils";
import { type Review } from "@/types/types";
import Image from "next/image";

interface BookReviewsProps {
  reviews: Review[];
  limitReviews: number;
  reviewsNextCursor?: string;
}

const BookReviews = ({
  reviews: SSRReviews,
  reviewsNextCursor: SSRReviewsNextCursor,
  limitReviews,
}: BookReviewsProps) => {
  const {
    reviews,
    isFetching,
    isError,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useFetchPaginatedReviews({
    limit: limitReviews,
    enabled: false,
    select: {
      id: true,
      createdDate: true,
      content: true,
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      rating: {
        select: {
          id: true,
          score: true,
        },
      },
    },
    initialData: {
      pages: [
        {
          reviews: SSRReviews,
          nextCursor: SSRReviewsNextCursor ?? "",
        },
      ],
      pageParams: [null],
    },
  });

  const handleLoadMorePages = async () => {
    await fetchNextPage();
  };

  // Check if we have some error.
  if (isError || !isSuccess) {
    // Return an error message or a component to indicate the error
    return (
      <div className="mt-80p">
        <ErrorMessage explorePath="/" onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <div className="mt-80p">
      <h3 className="text-gradient mb-8p mt-24p font-serif text-clamp-24p-to-30p font-bold leading-1.2">
        Community Reviews ({reviews.length})
      </h3>

      <ul className="mt-24p">
        {isFetching ? (
          <li>
            <SkeletonReviews
              skeletonCount={
                reviews.length ? reviews.length + limitReviews : limitReviews
              }
            />
          </li>
        ) : (
          reviews.map(({ id, createdDate, content, user, rating }) => (
            <li key={id} className="mb-40p last:mb-0">
              <div className="flex gap-16p">
                {user.avatar && (
                  <div className="shrink-0">
                    <Image
                      src={user.avatar}
                      alt={`${user.name} profile picture`}
                      height={64}
                      width={64}
                      className="rounded-full w-[56px] h-[56px] md:w-[64px] md:h-[64px]"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}

                <div className="w-[37.5rem]">
                  <div className="md:flex md:items-center">
                    <h4 className="font-medium text-white md:text-18p">
                      {user.name}{" "}
                      <span className="text-base md:text-18p">rated it</span>
                    </h4>
                    <div className="text-base flex items-center mt-[0.25rem] md:mt-0 md:ml-10p gap-16p md:flex-1">
                      <span className="md:flex-1">
                        <Rating rating={rating ? rating.score : 0} />
                      </span>
                      <span className="text-14p md:text-16p font-medium">
                        {formatDate(createdDate)}
                      </span>
                    </div>
                  </div>

                  <ul className="flex gap-8p text-base mt-8p">
                    <li className="text-14p md:text-16p dot-shape-pseudo">
                      Like (41)
                    </li>
                    <li className="text-14p md:text-16p">Comments (0)</li>
                  </ul>

                  <div className="mt-16p leading-1.6 md:w-[26.5rem]">
                    <p>{content}</p>
                  </div>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      {hasNextPage && (
        <div className="text-center mt-56p">
          <Button
            onClick={handleLoadMorePages}
            className="rounded-full bg-gradient font-bold text-16p !py-14p !px-40p h-auto lg:!py-16p lg:!px-64p"
          >
            Find More Reviews
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookReviews;
