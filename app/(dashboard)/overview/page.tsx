"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { api } from "@/lib/api";

export default function OverviewPage() {
  const router = useRouter();
  const { user, loadUser, logout } = useAuthStore();
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await loadUser();
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const biz = await api.business.getAll();
        setBusinesses(biz);
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

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">VoiceIQ</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Hello, {user?.full_name || "User"} 👋
          </span>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-500">Total Calls</p>
            <p className="text-3xl font-bold text-blue-600 mt-1">
              {analytics?.total_calls ?? 0}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-500">Completed Calls</p>
            <p className="text-3xl font-bold text-green-600 mt-1">
              {analytics?.completed_calls ?? 0}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-500">Businesses</p>
            <p className="text-3xl font-bold text-purple-600 mt-1">
              {businesses.length}
            </p>
          </div>
        </div>

        {/* Businesses */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Your Businesses</h3>
            <button
              onClick={() => router.push("/calls")}
              className="text-sm text-blue-600 hover:underline"
            >
              View Call Logs →
            </button>
          </div>
          {businesses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No businesses added yet.</p>
              <button
                onClick={() => router.push("/settings")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
              >
                Add Your Business
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {businesses.map((biz) => (
                <div
                  key={biz.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">{biz.name}</p>
                    <p className="text-sm text-gray-500">{biz.phone_number || "No phone set"}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Intent Breakdown */}
        {analytics?.intent_breakdown && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Call Intent Breakdown</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Object.entries(analytics.intent_breakdown).map(([intent, count]) => (
                <div key={intent} className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-800">{count as number}</p>
                  <p className="text-sm text-gray-500 capitalize mt-1">{intent}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}