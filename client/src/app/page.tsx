import { getServerAuthSession } from "~/server/auth";

import { Navbar } from "./_components/Navbar";
import { Screenshot } from "~/app/_components/screenshot";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="flex w-full flex-col">
        <Navbar session={session} />
      </div>
      <Screenshot />
    </main>
  );
}
