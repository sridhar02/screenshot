import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { Navbar } from "./Navbar";

export const ScreenLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerAuthSession();

  return (
    <div className="flex">
      <div className="flex h-screen w-[20%] flex-col gap-4 border-r-2 bg-gray-200 p-4">
        <h1 className="text-2xl">Screenshot Pro</h1>
        <div className="p-2">
          <Link href="dashboard"> Dashboard</Link>
        </div>
        <div className="p-2">
          <Link href="gallery"> Gallery</Link>
        </div>
        <div className="p-2">
          <Link href="playground"> Playground</Link>
        </div>
        <div className="p-2">
          <Link href="history"> History</Link>
        </div>
        <div className="p-2">
          <Link href="subscription"> Subscription</Link>
        </div>
        <div className="p-2">
          <Link href="payments"> Payments</Link>
        </div>
        <div className="p-2">
          <Link href="notifications"> Notifications</Link>
        </div>
        <div className="p-2">
          <Link href="organization"> Organizations</Link>
        </div>
      </div>
      <div className="flex w-full flex-col">
        <Navbar session={session} />
        {children}
      </div>
    </div>
  );
};
