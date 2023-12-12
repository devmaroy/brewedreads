import Discover from "@/app/_components/pages/discover/Discover";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover | BrewedReads",
  description:
    "Explore our diverse collection and uncover hidden gems that align with your taste.",
};

const DiscoverPage = () => {
  return (
    <main className="flex-1">
      <Discover />
    </main>
  );
};

export default DiscoverPage;
