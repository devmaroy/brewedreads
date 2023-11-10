import { prisma } from "@/lib/prisma";

export default async function Home() {
  const books = await prisma.book.findMany();

  return (
    <main className="container mx-auto">
      {/* <h1>Meet your coffee book</h1> */}
    </main>
  );
}
