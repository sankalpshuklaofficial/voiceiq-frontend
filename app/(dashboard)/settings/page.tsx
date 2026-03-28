"use client";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileSaved, setProfileSaved] = useState(false);
  const [billingSaved, setBillingSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: "Sankalp Sharma",
    email: "2sank29@gmail.com",
    phone: "+91 98765 43210",
    businessName: "Sankalp Hospital",
    city: "Lucknow",
    timezone: "Asia/Kolkata",
    avatar: "SS",
  });

  const [team, setTeam] = useState([
    { id: 1, name: "Sankalp Sharma", email: "2sank29@gmail.com", role: "Owner", status: "active" },
    { id: 2, name: "Dr. Mehta", email: "mehta@hospital.com", role: "Manager", status: "active" },
    { id: 3, name: "Priya Kapoor", email: "priya@hospital.com", role: "Viewer", status: "invited" },
  ]);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Viewer");
  const [inviteSent, setInviteSent] = useState(false);

  const [billing] = useState({
    plan: "Pro",
    price: "₹2,999/month",
    nextBilling: "28 April 2026",
    callsUsed: 342,
    callsLimit: 500,
    status: "active",
  });

  const [danger, setDanger] = useState({ showDelete: false, confirmText: "" });

  const updateProfile = (key: string, val: string) =>
    setProfile(prev => ({ ...prev, [key]: val }));

  const saveProfile = () => {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleInvite = () => {
    if (!inviteEmail) return;
    setTeam([...team, {
      id: Date.now(),
      name: inviteEmail.split("@")[0],
      email: inviteEmail,
      role: inviteRole,
      status: "invited",
    }]);
    setInviteEmail("");
    setInviteSent(true);
    setTimeout(() => setInviteSent(false), 3000);
  };

  const removeTeamMember = (id: number) =>
    setTeam(team.filter(m => m.id !== id));

  const tabs = [
    { id: "profile", label: "👤 Profile" },
    { id: "billing", label: "💳 Billing" },
    { id: "team", label: "👥 Team" },
    { id: "security", label: "🔒 Security" },
    { id: "danger", label: "⚠️ Danger Zone" },
  ];

  const roleBadge = (role: string) => {
    const map: any = {
      Owner: "bg-purple-100 text-purple-700",
      Manager: "bg-blue-100 text-blue-700",
      Viewer: "bg-gray-100 text-gray-600",
    };
    return map[role] || "bg-gray-100 text-gray-600";
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
        <p className="text-sm text-gray-400 mt-1">Manage your account, billing and team</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl w-fit flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === tab.id
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── PROFILE TAB ── */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          {profileSaved && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              ✅ Profile updated successfully!
            </div>
          )}

          {/* Avatar Card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {profile.avatar}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{profile.name}</p>
              <p className="text-sm text-gray-400">{profile.email}</p>
              <button className="text-xs text-blue-600 hover:text-blue-700 mt-1 font-medium">
                Change Photo
              </button>
            </div>
          </div>

          {/* Profile Form */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: "name", label: "Full Name", placeholder: "Your name" },
                { key: "phone", label: "Phone Number", placeholder: "+91 98765 43210" },
                { key: "businessName", label: "Business Name", placeholder: "Your business" },
                { key: "city", label: "City", placeholder: "e.g. Lucknow" },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-xs font-medium text-gray-600 block mb-1">{f.label}</label>
                  <input
                    type="text"
                    value={(profile as any)[f.key]}
                    onChange={e => updateProfile(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={e => updateProfile("email", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Timezone</label>
                <select
                  value={profile.timezone}
                  onChange={e => updateProfile("timezone", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST +5:30)</option>
                  <option value="Asia/Dubai">Asia/Dubai (GST +4:00)</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                </select>
              </div>
            </div>
            <button
              onClick={saveProfile}
              className="mt-6 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition text-sm font-medium"
            >
              {profileSaved ? "✅ Saved!" : "Save Profile"}
            </button>
          </div>
        </div>
      )}

      {/* ── BILLING TAB ── */}
      {activeTab === "billing" && (
        <div className="space-y-6">

          {/* Current Plan */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-200 text-sm font-medium mb-1">Current Plan</p>
                <h3 className="text-3xl font-bold">{billing.plan}</h3>
                <p className="text-blue-200 mt-1">{billing.price}</p>
              </div>
              <span className="bg-green-400 text-green-900 text-xs font-bold px-3 py-1 rounded-full uppercase">
                {billing.status}
              </span>
            </div>
            <div className="mt-5 pt-4 border-t border-blue-500">
              <p className="text-blue-200 text-xs">Next billing on <span className="text-white font-semibold">{billing.nextBilling}</span></p>
            </div>
          </div>

          {/* Usage */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">📞 Monthly Call Usage</h3>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">{billing.callsUsed} calls used</span>
              <span className="text-gray-400">{billing.callsLimit} limit</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${(billing.callsUsed / billing.callsLimit) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {billing.callsLimit - billing.callsUsed} calls remaining this month
            </p>
          </div>

          {/* Plan Comparison */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">🚀 Available Plans</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "Starter", price: "₹999", calls: "100 calls/mo", features: ["1 language", "SMS alerts", "Basic analytics"], current: false, color: "border-gray-200" },
                { name: "Pro", price: "₹2,999", calls: "500 calls/mo", features: ["3 languages", "WhatsApp alerts", "Advanced analytics", "Call transcripts"], current: true, color: "border-blue-500" },
                { name: "Enterprise", price: "₹7,999", calls: "Unlimited", features: ["All languages", "All alerts", "Custom AI training", "Priority support", "API access"], current: false, color: "border-gray-200" },
              ].map(plan => (
                <div key={plan.name} className={`rounded-2xl border-2 p-5 ${plan.color} ${plan.current ? "bg-blue-50" : ""}`}>
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-gray-800">{plan.name}</p>
                    {plan.current && <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">Current</span>}
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{plan.price}</p>
                  <p className="text-xs text-gray-400 mb-4">{plan.calls}</p>
                  <ul className="space-y-1 mb-4">
                    {plan.features.map(f => (
                      <li key={f} className="text-xs text-gray-600 flex items-center gap-1">
                        <span className="text-green-500">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-2 rounded-xl text-sm font-medium transition ${
                    plan.current
                      ? "bg-blue-600 text-white cursor-default"
                      : "border border-blue-200 text-blue-600 hover:bg-blue-50"
                  }`}>
                    {plan.current ? "Current Plan" : "Upgrade"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">💳 Payment Method</h3>
            <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl">
              <div className="w-12 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">VISA</div>
              <div>
                <p className="text-sm font-medium text-gray-800">•••• •••• •••• 4242</p>
                <p className="text-xs text-gray-400">Expires 12/27</p>
              </div>
              <button className="ml-auto text-sm text-blue-600 hover:text-blue-700 font-medium">Update</button>
            </div>
            <button className="mt-3 text-sm text-gray-500 hover:text-gray-700">+ Add new payment method</button>
          </div>
        </div>
      )}

      {/* ── TEAM TAB ── */}
      {activeTab === "team" && (
        <div className="space-y-6">

          {inviteSent && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              ✅ Invitation sent successfully!
            </div>
          )}

          {/* Invite */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">➕ Invite Team Member</h3>
            <div className="flex gap-3 flex-wrap">
              <input
                type="email"
                placeholder="colleague@example.com"
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-48"
              />
              <select
                value={inviteRole}
                onChange={e => setInviteRole(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Manager</option>
                <option>Viewer</option>
              </select>
              <button
                onClick={handleInvite}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition text-sm font-medium"
              >
                Send Invite
              </button>
            </div>
            <div className="mt-3 flex gap-6 text-xs text-gray-400">
              <span>👑 <strong className="text-gray-600">Owner</strong> — Full access</span>
              <span>🛠️ <strong className="text-gray-600">Manager</strong> — Edit access</span>
              <span>👁️ <strong className="text-gray-600">Viewer</strong> — Read only</span>
            </div>
          </div>

          {/* Team List */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Team Members ({team.length})</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {team.map(member => (
                <div key={member.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {member.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{member.name}</p>
                    <p className="text-xs text-gray-400">{member.email}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${roleBadge(member.role)}`}>
                    {member.role}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${
                    member.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {member.status}
                  </span>
                  {member.role !== "Owner" && (
                    <button
                      onClick={() => removeTeamMember(member.id)}
                      className="text-gray-300 hover:text-red-400 transition text-lg ml-2"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SECURITY TAB ── */}
      {activeTab === "security" && (
        <div className="space-y-6">

          {/* Change Password */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">🔑 Change Password</h3>
            <div className="space-y-4 max-w-md">
              {[
                { label: "Current Password", placeholder: "Enter current password" },
                { label: "New Password", placeholder: "Enter new password" },
                { label: "Confirm New Password", placeholder: "Confirm new password" },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-xs font-medium text-gray-600 block mb-1">{f.label}</label>
                  <input
                    type="password"
                    placeholder={f.placeholder}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition text-sm font-medium">
                Update Password
              </button>
            </div>
          </div>

          {/* 2FA */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">🛡️ Two-Factor Authentication</h3>
                <p className="text-sm text-gray-400 mt-1">Add extra security to your account with OTP verification</p>
              </div>
              <button className="bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-100 transition">
                Enable 2FA
              </button>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">💻 Active Sessions</h3>
            <div className="space-y-3">
              {[
                { device: "Chrome on Windows", location: "Lucknow, IN", time: "Now", current: true },
                { device: "Safari on iPhone", location: "Lucknow, IN", time: "2 hours ago", current: false },
              ].map((session, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{session.current ? "🖥️" : "📱"}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{session.device}</p>
                      <p className="text-xs text-gray-400">{session.location} · {session.time}</p>
                    </div>
                  </div>
                  {session.current
                    ? <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">Current</span>
                    : <button className="text-xs text-red-500 hover:text-red-700 font-medium">Revoke</button>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── DANGER ZONE TAB ── */}
      {activeTab === "danger" && (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
            ⚠️ Actions in this section are <strong>irreversible</strong>. Please proceed with caution.
          </div>

          {[
            { title: "Export All Data", desc: "Download all your business data, call logs, and AI configuration as a ZIP file.", action: "Export Data", color: "border-orange-200 text-orange-600 hover:bg-orange-50" },
            { title: "Pause AI Receptionist", desc: "Temporarily stop the AI from answering calls. You can re-enable anytime.", action: "Pause AI", color: "border-yellow-200 text-yellow-600 hover:bg-yellow-50" },
          ].map(item => (
            <div key={item.title} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
              </div>
              <button className={`flex-shrink-0 border px-4 py-2 rounded-xl text-sm font-medium transition ${item.color}`}>
                {item.action}
              </button>
            </div>
          ))}

          {/* Delete Account */}
          <div className="bg-white rounded-xl border-2 border-red-200 shadow-sm p-6">
            <h3 className="font-semibold text-red-700">🗑️ Delete Account</h3>
            <p className="text-sm text-gray-400 mt-1 mb-4">
              Permanently delete your account and all associated data. This cannot be undone.
            </p>
            {!danger.showDelete ? (
              <button
                onClick={() => setDanger({ ...danger, showDelete: true })}
                className="border border-red-300 text-red-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-50 transition"
              >
                Delete My Account
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">Type <strong>DELETE</strong> to confirm:</p>
                <input
                  type="text"
                  placeholder="Type DELETE to confirm"
                  value={danger.confirmText}
                  onChange={e => setDanger({ ...danger, confirmText: e.target.value })}
                  className="w-full border border-red-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setDanger({ showDelete: false, confirmText: "" })}
                    className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={danger.confirmText !== "DELETE"}
                    className="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-red-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Permanently Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}