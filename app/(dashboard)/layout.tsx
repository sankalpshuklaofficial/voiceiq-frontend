"use client";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, loadUser } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.push("/login");
        return;
      }
      await loadUser();
    };
    init();
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navItems = [
    { href: "/onboarding", icon: "🧙", label: "Setup Wizard" },
    { href: "/overview", icon: "📊", label: "Overview" },
    { href: "/calls", icon: "📞", label: "Call Logs" },
    { href: "/appointments", icon: "📅", label: "Appointments" },
    { href: "/analytics", icon: "📈", label: "Analytics" },
    { href: "/knowledge-base", icon: "📚", label: "Knowledge Base" },
    { href: "/ai-config", icon: "🤖", label: "AI Config" },
    { href: "/notifications", icon: "🔔", label: "Notifications" },
    { href: "/settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full flex flex-col">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-100">
          <h1 className="text-xl font-bold text-blue-600">VoiceIQ</h1>
          <p className="text-xs text-gray-400 mt-1">AI Receptionist Dashboard</p>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
              {user?.full_name?.[0] || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{user?.full_name || "User"}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email || ""}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-2 flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  );
}