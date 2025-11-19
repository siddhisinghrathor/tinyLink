import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function RedirectPage({
  params,
}: {
  params: { code: string };
}) {
  const link = await prisma.link.findUnique({ where: { code: params.code } });

  if (!link)
    return <h1 className="text-center text-3xl mt-20">404 - Link Not Found</h1>;

  await prisma.link.update({
    where: { code: params.code },
    data: { clicks: link.clicks + 1, lastClicked: new Date() },
  });

  redirect(link.url);
}
