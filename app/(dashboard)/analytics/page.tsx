"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function AnalyticsPage() {
  const router = useRouter();
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) { router.push("/login"); return; }
      try {
        const biz = await api.business.getAll();
        if (biz.length > 0) {
          const stats = await api.calls.getAnalytics(biz[0].id);
          setAnalytics(stats);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    init();
  }, []);

  const intentData = analytics?.intent_breakdown
    ? Object.entries(analytics.intent_breakdown).map(([name, value]) => ({ name, value }))
    : [];

  const callData = [
    { name: "Mon", calls: 4 },
    { name: "Tue", calls: 7 },
    { name: "Wed", calls: 3 },
    { name: "Thu", calls: 8 },
    { name: "Fri", calls: 5 },
    { name: "Sat", calls: 2 },
    { name: "Sun", calls: 1 },
  ];

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-500">Loading analytics...</p>
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics</h2>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-sm text-gray-500">Total Calls</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">{analytics?.total_calls ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-sm text-gray-500">Completed Calls</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{analytics?.completed_calls ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-sm text-gray-500">Success Rate</p>
          <p className="text-3xl font-bold text-purple-600 mt-1">
            {analytics?.total_calls > 0
              ? Math.round((analytics.completed_calls / analytics.total_calls) * 100)
              : 0}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Call Volume Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Call Volume (This Week)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={callData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="calls" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Intent Breakdown Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Call Intent Breakdown</h3>
          {intentData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={intentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {intentData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-48">
              <p className="text-gray-400">No call data yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}