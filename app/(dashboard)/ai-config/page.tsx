"use client";
import { useState } from "react";

export default function AIConfigPage() {
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("voice");

  const [config, setConfig] = useState({
    // Voice settings
    voiceName: "female",
    voiceSpeed: 1.0,
    voiceTone: "professional",
    language: "hi-en",

    // Greeting
    greetingText: "Namaste! Main VoiceIQ AI receptionist bol raha hoon. Aap kaise help kar sakta hoon?",
    holdMessage: "Kripya hold karein, main aapki help ke liye abhi aata hoon.",
    closingMessage: "Call karne ke liye shukriya! Aapka din shubh ho.",

    // Behaviour
    maxCallDuration: 5,
    transferAfterMissed: 3,
    enableSmsSummary: true,
    enableWhatsapp: true,
    enableTranscript: true,

    // Business hours
    mondayFriday: true,
    saturday: true,
    sunday: false,
    openTime: "09:00",
    closeTime: "18:00",
    afterHoursMessage: "Abhi humara office band hai. Kripya subah 9 baje call karein.",
  });

  const update = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "voice", label: "🎙️ Voice", },
    { id: "greeting", label: "💬 Greeting" },
    { id: "behaviour", label: "⚙️ Behaviour" },
    { id: "hours", label: "🕐 Business Hours" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">AI Configuration</h2>
          <p className="text-sm text-gray-400 mt-1">Customize your AI receptionist's voice, language & behaviour</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
        >
          {saved ? "✅ Saved!" : "Save Changes"}
        </button>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm">
          ✅ AI configuration saved successfully!
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
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

      {/* ── VOICE TAB ── */}
      {activeTab === "voice" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Voice Gender */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">🎙️ Voice Type</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "female", label: "Female", emoji: "👩", desc: "Warm & friendly" },
                { id: "male", label: "Male", emoji: "👨", desc: "Strong & clear" },
              ].map(v => (
                <button
                  key={v.id}
                  onClick={() => update("voiceName", v.id)}
                  className={`p-4 rounded-xl border-2 text-left transition ${
                    config.voiceName === v.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <p className="text-2xl mb-1">{v.emoji}</p>
                  <p className="font-medium text-gray-800">{v.label}</p>
                  <p className="text-xs text-gray-400">{v.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">🌐 Language</h3>
            <div className="space-y-3">
              {[
                { id: "hi-en", label: "Hindi + English (Hinglish)", flag: "🇮🇳" },
                { id: "hi", label: "Hindi Only", flag: "🇮🇳" },
                { id: "en", label: "English Only", flag: "🇬🇧" },
                { id: "hi-en-mr", label: "Hindi + English + Marathi", flag: "🇮🇳" },
              ].map(lang => (
                <button
                  key={lang.id}
                  onClick={() => update("language", lang.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition ${
                    config.language === lang.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="text-sm font-medium text-gray-700">{lang.label}</span>
                  {config.language === lang.id && (
                    <span className="ml-auto text-blue-500 text-xs font-bold">✓ Active</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Voice Speed */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-1">⚡ Speaking Speed</h3>
            <p className="text-xs text-gray-400 mb-4">Adjust how fast the AI speaks</p>
            <input
              type="range"
              min={0.5}
              max={2}
              step={0.1}
              value={config.voiceSpeed}
              onChange={e => update("voiceSpeed", parseFloat(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>Slow (0.5x)</span>
              <span className="text-blue-600 font-semibold">{config.voiceSpeed}x</span>
              <span>Fast (2x)</span>
            </div>
          </div>

          {/* Voice Tone */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">🎭 Conversation Tone</h3>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: "professional", label: "Professional", desc: "Formal & business-like" },
                { id: "friendly", label: "Friendly", desc: "Warm & conversational" },
                { id: "neutral", label: "Neutral", desc: "Balanced & calm" },
              ].map(tone => (
                <button
                  key={tone.id}
                  onClick={() => update("voiceTone", tone.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 transition ${
                    config.voiceTone === tone.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-800">{tone.label}</p>
                    <p className="text-xs text-gray-400">{tone.desc}</p>
                  </div>
                  {config.voiceTone === tone.id && (
                    <span className="text-blue-500 font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── GREETING TAB ── */}
      {activeTab === "greeting" && (
        <div className="space-y-6">

          {/* Preview Card */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
            <p className="text-xs font-medium text-blue-200 mb-2">📞 Live Preview — What callers hear:</p>
            <p className="text-lg font-medium leading-relaxed">"{config.greetingText}"</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Opening Greeting */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                👋 Opening Greeting
              </label>
              <p className="text-xs text-gray-400 mb-3">First message the caller hears</p>
              <textarea
                rows={4}
                value={config.greetingText}
                onChange={e => update("greetingText", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <div className="flex gap-2 mt-3">
                {[
                  { label: "Hindi", text: "Namaste! Main VoiceIQ AI receptionist hoon. Kaise help kar sakta hoon?" },
                  { label: "English", text: "Hello! You've reached VoiceIQ AI Receptionist. How can I help you today?" },
                ].map(preset => (
                  <button
                    key={preset.label}
                    onClick={() => update("greetingText", preset.text)}
                    className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-blue-100 hover:text-blue-600 transition"
                  >
                    {preset.label} preset
                  </button>
                ))}
              </div>
            </div>

            {/* Hold Message */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                ⏸️ Hold Message
              </label>
              <p className="text-xs text-gray-400 mb-3">Played when transferring or processing</p>
              <textarea
                rows={4}
                value={config.holdMessage}
                onChange={e => update("holdMessage", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Closing Message */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                👋 Closing Message
              </label>
              <p className="text-xs text-gray-400 mb-3">Last message before call ends</p>
              <textarea
                rows={4}
                value={config.closingMessage}
                onChange={e => update("closingMessage", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* After Hours */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                🌙 After Hours Message
              </label>
              <p className="text-xs text-gray-400 mb-3">Played when business is closed</p>
              <textarea
                rows={4}
                value={config.afterHoursMessage}
                onChange={e => update("afterHoursMessage", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── BEHAVIOUR TAB ── */}
      {activeTab === "behaviour" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Call Settings */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">📞 Call Settings</h3>
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Max Call Duration (minutes)
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={config.maxCallDuration}
                  onChange={e => update("maxCallDuration", parseInt(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">AI will end call after this duration</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Transfer After Missed Inputs
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={config.transferAfterMissed}
                  onChange={e => update("transferAfterMissed", parseInt(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">Transfer to human after N failed attempts</p>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">🔔 Notifications</h3>
            <div className="space-y-4">
              {[
                { key: "enableSmsSummary", label: "SMS Call Summary", desc: "Get SMS after each call", icon: "📱" },
                { key: "enableWhatsapp", label: "WhatsApp Alerts", desc: "Receive WhatsApp notifications", icon: "💬" },
                { key: "enableTranscript", label: "Call Transcript", desc: "Save full call transcript", icon: "📝" },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => update(item.key, !config[item.key as keyof typeof config])}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      config[item.key as keyof typeof config] ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      config[item.key as keyof typeof config] ? "translate-x-7" : "translate-x-1"
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── BUSINESS HOURS TAB ── */}
      {activeTab === "hours" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Days */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">📅 Working Days</h3>
              <div className="space-y-3">
                {[
                  { key: "mondayFriday", label: "Monday – Friday" },
                  { key: "saturday", label: "Saturday" },
                  { key: "sunday", label: "Sunday" },
                ].map(day => (
                  <div key={day.key} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                    <span className="text-sm font-medium text-gray-700">{day.label}</span>
                    <button
                      onClick={() => update(day.key, !config[day.key as keyof typeof config])}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        config[day.key as keyof typeof config] ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        config[day.key as keyof typeof config] ? "translate-x-7" : "translate-x-1"
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Timings */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">🕐 Business Timings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Opening Time</label>
                  <input
                    type="time"
                    value={config.openTime}
                    onChange={e => update("openTime", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Closing Time</label>
                  <input
                    type="time"
                    value={config.closeTime}
                    onChange={e => update("closeTime", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Visual Timeline */}
              <div className="mt-6 bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-2">AI Active Hours</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{config.openTime}</span>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "60%" }} />
                  </div>
                  <span className="text-xs text-gray-400">{config.closeTime}</span>
                </div>
                <p className="text-xs text-green-600 mt-2">✅ AI is active during these hours</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}