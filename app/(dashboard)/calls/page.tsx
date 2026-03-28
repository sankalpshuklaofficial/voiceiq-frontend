"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { formatDate, formatDuration, getIntentColor } from "@/lib/utils";

export default function CallsPage() {
  const router = useRouter();
  const { loadUser } = useAuthStore();
  const [calls, setCalls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [businessId, setBusinessId] = useState<number | null>(null);

  useEffect(() => {
    const init = async () => {
      await loadUser();
      const token = localStorage.getItem("access_token");
      if (!token) { router.push("/login"); return; }
      try {
        const biz = await api.business.getAll();
        if (biz.length > 0) {
          setBusinessId(biz[0].id);
          const callData = await api.calls.getAll(biz[0].id);
          setCalls(callData);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    init();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading calls...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">VoiceIQ</h1>
        <div className="flex gap-4">
          <button onClick={() => router.push("/overview")} className="text-sm text-gray-600 hover:text-blue-600">Dashboard</button>
          <button onClick={() => router.push("/settings")} className="text-sm text-gray-600 hover:text-blue-600">Settings</button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Call Logs</h2>

        {calls.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <p className="text-4xl mb-4">📞</p>
            <p className="text-gray-500 text-lg">No calls yet.</p>
            <p className="text-gray-400 text-sm mt-2">Calls will appear here once your AI receptionist starts receiving them.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Caller</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Intent</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Duration</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {calls.map((call) => (
                  <tr key={call.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{call.caller_name || "Unknown"}</p>
                      <p className="text-sm text-gray-400">{call.caller_number || "—"}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${getIntentColor(call.intent)}`}>
                        {call.intent || "general"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDuration(call.duration_seconds)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        {call.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(call.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}