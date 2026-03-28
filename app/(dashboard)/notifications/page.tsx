"use client";
import { useState } from "react";

type Notification = {
  id: number;
  type: "sms" | "whatsapp" | "email" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
  status: "delivered" | "pending" | "failed";
};

const mockNotifications: Notification[] = [
  { id: 1, type: "whatsapp", title: "New Appointment Booked", message: "Rahul Sharma booked appointment with Dr. Mehta on 29 March at 10:00 AM.", time: "2 mins ago", read: false, status: "delivered" },
  { id: 2, type: "sms", title: "Missed Call Alert", message: "You missed a call from +91 98765 43210. AI handled the call successfully.", time: "15 mins ago", read: false, status: "delivered" },
  { id: 3, type: "whatsapp", title: "Call Summary Ready", message: "Call summary for Priya Singh is ready. Intent: Appointment Booking. Duration: 2m 34s.", time: "1 hour ago", read: false, status: "delivered" },
  { id: 4, type: "sms", title: "New Lead Captured", message: "New real estate lead: Ankit Gupta interested in 3BHK Gomti Nagar. Site visit scheduled.", time: "2 hours ago", read: true, status: "delivered" },
  { id: 5, type: "email", title: "Weekly Report", message: "Your weekly call report is ready. Total calls: 42, Appointments: 18, Leads: 7.", time: "1 day ago", read: true, status: "delivered" },
  { id: 6, type: "system", title: "AI Config Updated", message: "Your AI receptionist language was changed to Hindi + English (Hinglish).", time: "1 day ago", read: true, status: "delivered" },
  { id: 7, type: "whatsapp", title: "Room Reservation", message: "Vikram Patel reserved Room 101 Deluxe. Check-in: 29 Mar, Check-out: 31 Mar.", time: "2 days ago", read: true, status: "delivered" },
  { id: 8, type: "sms", title: "SMS Delivery Failed", message: "Failed to deliver SMS to +91 87654 32109. Number may be unreachable.", time: "2 days ago", read: true, status: "failed" },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<"all" | "sms" | "whatsapp" | "email" | "system">("all");
  const [activeTab, setActiveTab] = useState<"inbox" | "settings">("inbox");

  // Notification settings state
  const [settings, setSettings] = useState({
    whatsappEnabled: true,
    whatsappNumber: "+91 98765 43210",
    smsEnabled: true,
    smsNumber: "+91 98765 43210",
    emailEnabled: true,
    emailAddress: "2sank29@gmail.com",
    notifyOnCall: true,
    notifyOnAppointment: true,
    notifyOnLead: true,
    notifyOnMissed: true,
    notifyOnSummary: true,
    notifyWeeklyReport: true,
    quietHoursEnabled: false,
    quietStart: "22:00",
    quietEnd: "08:00",
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const filtered = notifications.filter(n =>
    filter === "all" ? true : n.type === filter
  );

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const typeIcon = (type: string) => {
    const icons: any = {
      whatsapp: { icon: "💬", color: "bg-green-100 text-green-600" },
      sms: { icon: "📱", color: "bg-blue-100 text-blue-600" },
      email: { icon: "📧", color: "bg-purple-100 text-purple-600" },
      system: { icon: "⚙️", color: "bg-gray-100 text-gray-600" },
    };
    return icons[type] || { icon: "🔔", color: "bg-gray-100 text-gray-600" };
  };

  const statusBadge = (status: string) => {
    const map: any = {
      delivered: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      failed: "bg-red-100 text-red-700",
    };
    return map[status] || "bg-gray-100 text-gray-600";
  };

  const [settingsSaved, setSettingsSaved] = useState(false);
  const saveSettings = () => {
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            🔔 Notification Center
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </h2>
          <p className="text-sm text-gray-400 mt-1">SMS, WhatsApp & email alerts for your business</p>
        </div>
        {activeTab === "inbox" && unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
          >
            ✓ Mark all as read
          </button>
        )}
        {activeTab === "settings" && (
          <button
            onClick={saveSettings}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
          >
            {settingsSaved ? "✅ Saved!" : "Save Settings"}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
        {[
          { id: "inbox", label: "📥 Inbox" },
          { id: "settings", label: "⚙️ Alert Settings" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === tab.id
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── INBOX TAB ── */}
      {activeTab === "inbox" && (
        <>
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total", value: notifications.length, color: "text-gray-800", bg: "bg-gray-50" },
              { label: "Unread", value: unreadCount, color: "text-red-600", bg: "bg-red-50" },
              { label: "WhatsApp", value: notifications.filter(n => n.type === "whatsapp").length, color: "text-green-600", bg: "bg-green-50" },
              { label: "SMS", value: notifications.filter(n => n.type === "sms").length, color: "text-blue-600", bg: "bg-blue-50" },
            ].map(s => (
              <div key={s.label} className={`${s.bg} rounded-xl p-4 border border-gray-100`}>
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {[
              { id: "all", label: "All" },
              { id: "whatsapp", label: "💬 WhatsApp" },
              { id: "sms", label: "📱 SMS" },
              { id: "email", label: "📧 Email" },
              { id: "system", label: "⚙️ System" },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  filter === f.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Notification List */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">🔔</p>
                <p className="text-gray-400">No notifications found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {filtered.map(n => {
                  const { icon, color } = typeIcon(n.type);
                  return (
                    <div
                      key={n.id}
                      className={`flex items-start gap-4 px-6 py-4 hover:bg-gray-50 transition cursor-pointer ${
                        !n.read ? "bg-blue-50/30" : ""
                      }`}
                      onClick={() => markRead(n.id)}
                    >
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${color}`}>
                        <span className="text-lg">{icon}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className={`text-sm font-semibold ${!n.read ? "text-gray-900" : "text-gray-700"}`}>
                            {n.title}
                          </p>
                          {!n.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          )}
                          <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${statusBadge(n.status)}`}>
                            {n.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">{n.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={e => { e.stopPropagation(); deleteNotification(n.id); }}
                        className="text-gray-300 hover:text-red-400 transition flex-shrink-0 text-lg"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {/* ── SETTINGS TAB ── */}
      {activeTab === "settings" && (
        <div className="space-y-6">

          {settingsSaved && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              ✅ Notification settings saved successfully!
            </div>
          )}

          {/* WhatsApp */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💬</span>
                <div>
                  <h3 className="font-semibold text-gray-800">WhatsApp Alerts</h3>
                  <p className="text-xs text-gray-400">Receive alerts on WhatsApp</p>
                </div>
              </div>
              <button
                onClick={() => updateSetting("whatsappEnabled", !settings.whatsappEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.whatsappEnabled ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  settings.whatsappEnabled ? "translate-x-7" : "translate-x-1"
                }`} />
              </button>
            </div>
            {settings.whatsappEnabled && (
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">WhatsApp Number</label>
                <input
                  type="tel"
                  value={settings.whatsappNumber}
                  onChange={e => updateSetting("whatsappNumber", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="+91 98765 43210"
                />
              </div>
            )}
          </div>

          {/* SMS */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <h3 className="font-semibold text-gray-800">SMS Alerts</h3>
                  <p className="text-xs text-gray-400">Receive SMS notifications</p>
                </div>
              </div>
              <button
                onClick={() => updateSetting("smsEnabled", !settings.smsEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.smsEnabled ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  settings.smsEnabled ? "translate-x-7" : "translate-x-1"
                }`} />
              </button>
            </div>
            {settings.smsEnabled && (
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">SMS Number</label>
                <input
                  type="tel"
                  value={settings.smsNumber}
                  onChange={e => updateSetting("smsNumber", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+91 98765 43210"
                />
              </div>
            )}
          </div>

          {/* Email */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📧</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Email Alerts</h3>
                  <p className="text-xs text-gray-400">Receive email notifications</p>
                </div>
              </div>
              <button
                onClick={() => updateSetting("emailEnabled", !settings.emailEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.emailEnabled ? "bg-purple-500" : "bg-gray-300"
                }`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  settings.emailEnabled ? "translate-x-7" : "translate-x-1"
                }`} />
              </button>
            </div>
            {settings.emailEnabled && (
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={settings.emailAddress}
                  onChange={e => updateSetting("emailAddress", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="you@example.com"
                />
              </div>
            )}
          </div>

          {/* Alert Types */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">🔔 Alert Types</h3>
            <div className="space-y-3">
              {[
                { key: "notifyOnCall", label: "Every incoming call", icon: "📞" },
                { key: "notifyOnAppointment", label: "New appointment booked", icon: "📅" },
                { key: "notifyOnLead", label: "New lead captured", icon: "🏠" },
                { key: "notifyOnMissed", label: "Missed call alerts", icon: "⚠️" },
                { key: "notifyOnSummary", label: "AI call summary ready", icon: "📝" },
                { key: "notifyWeeklyReport", label: "Weekly report", icon: "📊" },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span>{item.icon}</span>
                    <p className="text-sm text-gray-700">{item.label}</p>
                  </div>
                  <button
                    onClick={() => updateSetting(item.key, !settings[item.key as keyof typeof settings])}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings[item.key as keyof typeof settings] ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      settings[item.key as keyof typeof settings] ? "translate-x-7" : "translate-x-1"
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quiet Hours */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌙</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Quiet Hours</h3>
                  <p className="text-xs text-gray-400">Pause all alerts during these hours</p>
                </div>
              </div>
              <button
                onClick={() => updateSetting("quietHoursEnabled", !settings.quietHoursEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.quietHoursEnabled ? "bg-indigo-500" : "bg-gray-300"
                }`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  settings.quietHoursEnabled ? "translate-x-7" : "translate-x-1"
                }`} />
              </button>
            </div>
            {settings.quietHoursEnabled && (
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">From</label>
                  <input
                    type="time"
                    value={settings.quietStart}
                    onChange={e => updateSetting("quietStart", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">To</label>
                  <input
                    type="time"
                    value={settings.quietEnd}
                    onChange={e => updateSetting("quietEnd", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}