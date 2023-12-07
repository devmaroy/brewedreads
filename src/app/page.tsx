import Hero from "@/app/_components/sections/hero/Hero";
import Genres from "@/app/_components/sections/genres/Genres";
import PopularBooks from "@/app/_components/sections/popular-books/PopularBooks";

const Home = () => {
  return (
    <main>
      <Hero />
      <Genres />
      <PopularBooks />
    </main>
  );
};

export default Home;
