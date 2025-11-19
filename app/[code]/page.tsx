import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function RedirectPage({
  params,
}: {
  params: { code: string };
}) {
  const { code } = params;

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) return <h1>404 Not Found</h1>;

  await prisma.link.update({
    where: { code },
    data: {
      clicks: link.clicks + 1,
      lastClicked: new Date(),
    },
  });

  redirect(link.url);
}
