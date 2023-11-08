import { prisma } from "@/lib/prisma";

export default async function Home() {
  const user = await prisma.user.findFirst({
    where: { email: "test@test.com" },
  });

  return (
    <main>
      <h1>hello, {user?.email}</h1>
    </main>
  );
}
