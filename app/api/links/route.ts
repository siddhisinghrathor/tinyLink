import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { url, code } = await req.json();

  if (!url) return new Response("URL required", { status: 400 });

  const valid = url.startsWith("http://") || url.startsWith("https://");
  if (!valid) return new Response("Invalid URL", { status: 400 });

  const exists = await prisma.link.findUnique({ where: { code } });
  if (exists) return new Response("Code already exists", { status: 409 });

  const link = await prisma.link.create({ data: { url, code } });

  return Response.json(link);
}

export async function GET() {
  const links = await prisma.link.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json(links);
}
