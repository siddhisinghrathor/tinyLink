import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: { code: string } }
) {
  const { code } = context.params;  // FIXED

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) return new Response("Not found", { status: 404 });

  return Response.json(link);
}

export async function DELETE(
  req: NextRequest,
  context: { params: { code: string } }
) {
  const { code } = context.params; // FIXED

  await prisma.link.delete({
    where: { code },
  });

  return new Response("Deleted", { status: 200 });
}
