import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { code: string } }
) {
  const link = await prisma.link.findUnique({ where: { code: params.code } });

  if (!link) return new Response("Not found", { status: 404 });

  return Response.json(link);
}

export async function DELETE(
  req: Request,
  { params }: { params: { code: string } }
) {
  await prisma.link.delete({ where: { code: params.code } });
  return new Response("Deleted", { status: 200 });
}
