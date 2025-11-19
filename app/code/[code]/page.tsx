import { prisma } from "@/lib/prisma";

export default async function Stats({ params }: { params: { code: string } }) {
  const { code } = params;

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) return <h1>Not Found</h1>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Stats for {code}</h1>

      <p>
        <strong>URL:</strong> {link.url}
      </p>
      <p>
        <strong>Total Clicks:</strong> {link.clicks}
      </p>
      <p>
        <strong>Last Clicked:</strong> {link.lastClicked?.toString() || "Never"}
      </p>
    </div>
  );
}
