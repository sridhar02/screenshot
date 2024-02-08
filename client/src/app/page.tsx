import { Navbar } from "./_components/Navbar";
import { Screenshot } from "~/app/_components/screenshot";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "node_modules/next/navigation";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/app");
  }

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col">
        <Navbar session={session} />
      </div>
    </main>
  );
}
