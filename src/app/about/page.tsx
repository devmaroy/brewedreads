import Link from "next/link";

const AboutPage = () => {
  return (
    <main className="flex-1">
      <section className="mt-72p">
        <div className="sm:container">
          <div className="rounded-md bg-card-foreground px-12p py-40p sm:px-16p md:px-40p md:py-64p text-base">
            <h2 className="text-gradient mb-8p font-serif text-clamp-32p-to-46p font-bold leading-1.2">
              About Brewed Reads
            </h2>
            <p className="text-16p md:text-18p mb-40p leading-1.6 lg:w-9/12">
              Welcome to Brewed Reads – your cozy corner where the aroma of
              coffee blends with the allure of books. We believe that a great
              book and a perfect cup of coffee are soulmates, and our mission is
              to unite them in the hands of readers around the world.
            </p>

            <h3 className="text-26p md:text-32p font-bold text-white font-serif mb-16p">
              Our Story
            </h3>
            <p className="text-16p md:text-18p mb-40p leading-1.6 lg:w-9/12">
              Born from a love for reading and a passion for coffee, Brewed
              Reads is more than just a platform; it's a community. We
              understand that there's nothing quite like the experience of
              delving into an enthralling book while sipping your favorite brew.
              That's why we've created a space that celebrates this magical
              combination.
            </p>

            <h3 className="text-26p md:text-32p font-bold text-white font-serif mb-16p">
              What We Offer
            </h3>
            <p className="text-16p md:text-18p mb-40p leading-1.6 lg:w-9/12">
              At Brewed Reads, you'll find an ever-growing collection of books
              from a variety of genres – each waiting to be paired with your
              coffee break. Whether you're into romance that warms the heart,
              mysteries that stimulate the mind, or sci-fi that transports you
              to another world, we've got you covered.
            </p>

            <h3 className="text-26p md:text-32p font-bold text-white font-serif mb-16p">
              Join Our Community
            </h3>
            <p className="text-16p md:text-18p mb-40p leading-1.6 lg:w-9/12">
              Become part of a unique community where book lovers and coffee
              enthusiasts come together. Share your reviews, discover new
              favorites, and find your next coffee book match. With Brewed
              Reads, every reading session is an adventure, and every coffee
              break is a journey.
            </p>

            <h3 className="text-26p md:text-32p font-bold text-white font-serif mb-16p">
              Our Promise
            </h3>
            <p className="text-16p md:text-18p mb-40p leading-1.6 lg:w-9/12">
              We are committed to enriching your reading experience. Explore,
              connect, and indulge in the twin joys of reading and coffee with
              Brewed Reads.
            </p>

            <h3 className="text-26p md:text-32p font-bold text-white font-serif mb-16p">
              Connect With Us
            </h3>
            <p className="text-16p md:text-18p mb-40p leading-1.6 lg:w-9/12">
              Have a question, suggestion, or just want to share your latest
              coffee-book pairing? We'd love to hear from you! Reach out to us
              at{" "}
              <Link
                href="mailto:contact@brewedreads.com"
                className="text-white hover:text-primary transition"
              >
                contact@brewedreads.com
              </Link>{" "}
              or join our social media family.
            </p>
            <p className="text-16p md:text-18p mb-40p leading-1.6 lg:w-9/12">
              Welcome to Brewed Reads – where every sip of coffee takes you
              deeper into the world of stories.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
