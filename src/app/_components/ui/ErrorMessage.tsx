import { Button } from "@/app/_components/ui/button";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import { type ReactNode } from "react";

interface ErrorMessageProps {
  heading?: string;
  children?: ReactNode;
  buttonsHeading?: string;
  onRetry?: () => void;
  retryLabel?: string;
  exploreLabel?: string;
  explorePath?: string;
  className?: string;
}

const ErrorMessage = ({
  heading = "A Bit of a Spill in the Library!",
  children,
  buttonsHeading = "Keep Your Coffee Warm and Your Curiosity Warmer!",
  onRetry,
  retryLabel = "Retry Fetching Books",
  explorePath = "/discover",
  exploreLabel = "Explore Other Avenues",
}: ErrorMessageProps) => {
  return (
    <div className="rounded-lg bg-destructive p-6 shadow-lg">
      <h3 className="mb-16p text-24p font-bold">
        <ShieldAlert size={40} className="mb-16p" />
        {heading}
      </h3>
      <div className="error-message-body">
        {children ?? (
          <div className="mb-24p max-w-3xl">
            <p className="text-16p leading-1.6">
              Oh no, it looks like we've had a little mishap in our virtual
              library – perhaps a coffee spill on our book-fetching machine.
              We're mopping up and getting things sorted as you read this.
            </p>
          </div>
        )}
      </div>

      <h4 className="text-18p font-bold">{buttonsHeading}</h4>

      <div className="mt-16p">
        <Button variant="secondary" className="mr-8p">
          <Link href={explorePath}>{exploreLabel}</Link>
        </Button>

        {onRetry && (
          <>
            <span>or</span>

            <Button
              onClick={onRetry}
              variant="outline"
              className="bg-transparen ml-8p transition-all"
            >
              {retryLabel}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
