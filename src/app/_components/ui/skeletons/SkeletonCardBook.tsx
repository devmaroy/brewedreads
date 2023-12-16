import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/_components/ui/card";
import { Skeleton } from "@/app/_components/ui/skeleton";

const SkeletonCardBook = () => {
  return (
    <Card className="border-none bg-card-foregroun">
      <CardHeader className="bg-none p-0">
        <div className="relative">
          <Skeleton className="rounded-md transition-all hover:opacity-80 bg-gradient h-[199px] lg:h-[235px]" />
          <Skeleton className="h-[37px] w-[100px] bg-gradient absolute bottom-8p left-1/2 -translate-x-1/2 transform  rounded-md  px-22p  py-8p  lg:bottom-16p lg:left-auto lg:right-16p  lg:translate-x-0 lg:transform-none" />
        </div>
      </CardHeader>

      <CardContent className="mt-24p p-0 lg:mt-32p">
        <Skeleton className="bg-gradient rounded-md h-[16px]" />

        <div className="mt-16p flex flex-wrap gap-8p">
          <Skeleton className="bg-gradient rounded-md h-[16px] w-[60px]" />
          <Skeleton className="bg-gradient rounded-md h-[16px] w-[60px]" />
        </div>

        <div className="mt-24p">
          <Skeleton className="bg-gradient rounded-md w-[140px] h-[20px]" />
        </div>
      </CardContent>

      <CardFooter className="mt-[33px] p-0">
        <Skeleton className="bg-gradient rounded-md w-[80px] h-[20px]" />
      </CardFooter>
    </Card>
  );
};

export default SkeletonCardBook;
