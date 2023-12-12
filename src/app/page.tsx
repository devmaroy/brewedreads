import Community from "@/app/_components/sections/community/Community";
import Genres from "@/app/_components/sections/genres/Genres";
import Hero from "@/app/_components/sections/hero/Hero";
import PopularBooks from "@/app/_components/sections/popular-books/PopularBooks";

const Home = () => {
  return (
    <main>
      <Hero />
      <Genres />
      <PopularBooks />
      <Community />
    </main>
  );
};

export default Home;
