import { redirect } from "node_modules/next/navigation";

import { getServerAuthSession } from "~/server/auth";
import { ScreenLayout } from "../_components/ScreenLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return <ScreenLayout>{children}</ScreenLayout>;
}
