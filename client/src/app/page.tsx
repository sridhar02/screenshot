import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Navbar } from "./_components/Navbar";
import { Screenshot } from "./_components/screenshot";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="flex w-full flex-col">
        <Navbar session={session} />
      </div>
      <CrudShowcase />
    </main>
  );
}

interface screenshots {
  imageUrl: string;
  id: string;
  userProvidedUrl: string;
  userId: string;
  createdAt: Date;
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const allScreenshots: screenshots = await api.screenshot.getAll.query();
  console.log(allScreenshots);
  return (
    <div className="">
      <CreatePost allScreenshots={allScreenshots} />
      <div className="flex ">
        {allScreenshots.map((item, index) => (
          <div key={index} className="m-2 border-2 border-red-200 p-2">
            <h1>screenshot {index + 1}</h1>
            <img src={item.imageUrl} alt="asdas" className="" />
          </div>
        ))}
      </div>
    </div>
  );
}
