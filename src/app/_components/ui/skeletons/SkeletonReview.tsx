import { Skeleton } from "@/app/_components/ui/skeleton";

const SkeletonReview = () => {
  return (
    <div className="mb-40p last:mb-0">
      <div className="mb-40p last:mb-0">
        <div className="flex gap-16p">
          <div className="shrink-0">
            <Skeleton className="w-[56px] h-[56px] md:w-[64px] md:h-[64px] bg-gradient rounded-full" />
          </div>

          <div className="w-[37.5rem]">
            <div className="md:flex md:items-center">
              <Skeleton className="w-[192px] h-[24px] bg-gradient rounded-md" />
              <div className="flex items-center mt-[0.25rem] md:mt-0 md:ml-10p gap-16p md:flex-1">
                <span className="md:flex-1">
                  <Skeleton className="w-[140px] h-[24px] bg-gradient rounded-md" />
                </span>
                <span>
                  <Skeleton className="w-[136px] h-[24px] bg-gradient rounded-md" />
                </span>
              </div>
            </div>

            <ul className="flex gap-8p mt-8p">
              <li>
                <Skeleton className="w-[116px] h-[24px] bg-gradient rounded-md" />
              </li>
              <li>
                <Skeleton className="w-[116px] h-[24px] bg-gradient rounded-md" />
              </li>
            </ul>

            <div className="mt-16p md:w-[26.5rem]">
              <Skeleton className="w-[420px] h-[60px] bg-gradient rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonReview;
