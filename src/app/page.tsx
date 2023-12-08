import Hero from "@/app/_components/sections/hero/Hero";
import Genres from "@/app/_components/sections/genres/Genres";
import PopularBooks from "@/app/_components/sections/popular-books/PopularBooks";
import Community from "@/app/_components/sections/community/Community";

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
