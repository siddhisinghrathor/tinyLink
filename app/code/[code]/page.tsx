import { prisma } from "@/lib/prisma";

export default async function Stats({ params }: { params: { code: string } }) {
  const { code } = params;

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) return <h1 className="text-center mt-20 text-2xl">Not Found</h1>;

  return (
    <div className="min-h-screen bg-gray-50 p-10 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Stats for <span className="text-blue-600">{code}</span>
        </h1>

        <div className="space-y-4 text-lg">
          <p>
            <strong className="text-gray-700">URL:</strong>{" "}
            <span className="text-blue-700 break-words">{link.url}</span>
          </p>

          <p>
            <strong className="text-gray-700">Total Clicks:</strong>{" "}
            {link.clicks}
          </p>

          <p>
            <strong className="text-gray-700">Last Clicked:</strong>{" "}
            {link.lastClicked?.toLocaleString() || "Never"}
          </p>
        </div>
      </div>
    </div>
  );
}
