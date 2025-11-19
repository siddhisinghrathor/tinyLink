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
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">TinyLink Dashboard</h1>

      {/* Add Form */}
      <form onSubmit={create} className="space-y-3 mb-10">
        <input
          className="border p-2 w-full"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Custom code (a-zA-Z0-9)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Short Link"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="border">
            <th className="p-2 border">Code</th>
            <th className="p-2 border">URL</th>
            <th className="p-2 border">Clicks</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {links.map((l: any) => (
            <tr key={l.code} className="border">
              <td className="p-2 border">{l.code}</td>
              <td className="p-2 border max-w-xs truncate">{l.url}</td>
              <td className="p-2 border">{l.clicks}</td>
              <td className="p-2 border">
                <button className="text-red-600" onClick={() => del(l.code)}>
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
