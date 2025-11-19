"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const loadLinks = async () => {
    const res = await fetch("/api/links");
    const data = await res.json();
    setLinks(data);
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const create = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/links", {
      method: "POST",
      body: JSON.stringify({ url, code }),
    });

    if (res.ok) {
      setUrl("");
      setCode("");
      loadLinks();
    } else {
      alert(await res.text());
    }

    setLoading(false);
  };

  const del = async (c: string) => {
    await fetch(`/api/links/${c}`, { method: "DELETE" });
    loadLinks();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-3xl mx-auto">
        {/* HEADER */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          TinyLink Dashboard
        </h1>

        {/* CARD */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Create Short Link
          </h2>

          <form onSubmit={create} className="space-y-4">
            <input
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter long URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />

            <input
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Custom code (a-zA-Z0-9)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />

            <button
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold
                ${loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"}
              `}
            >
              {loading ? "Creating..." : "Create Short Link"}
            </button>
          </form>
        </div>

        {/* TABLE */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">All Links</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                  <th className="p-3 border">Code</th>
                  <th className="p-3 border">URL</th>
                  <th className="p-3 border">Clicks</th>
                  <th className="p-3 border">Action</th>
                </tr>
              </thead>

              <tbody>
                {links.map((l: any) => (
                  <tr
                    key={l.code}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-semibold text-blue-600">
                      <a href={`/${l.code}`} target="_blank">
                        {l.code}
                      </a>
                    </td>

                    <td className="p-3 max-w-xs truncate text-gray-700">
                      {l.url}
                    </td>

                    <td className="p-3">{l.clicks}</td>

                    <td className="p-3">
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => del(l.code)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {links.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-500 p-6">
                      No links created yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
