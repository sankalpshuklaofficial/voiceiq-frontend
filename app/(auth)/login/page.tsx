"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Step = 1 | 2;

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessType: "",
    agreeTerms: false,
  });

  const update = (key: string, val: any) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const validateStep1 = () => {
    if (!form.name) return "Please enter your full name.";
    if (!form.email) return "Please enter your email.";
    if (!form.phone) return "Please enter your phone number.";
    if (!form.password) return "Please enter a password.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword) return "Passwords do not match.";
    return "";
  };

  const handleNext = () => {
    const err = validateStep1();
    if (err) { setError(err); return; }
    setError("");
    setStep(2);
  };

  const handleRegister = async () => {
    if (!form.businessName) { setError("Please enter your business name."); return; }
    if (!form.businessType) { setError("Please select your business type."); return; }
    if (!form.agreeTerms) { setError("Please agree to the Terms of Service."); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            password: form.password,
            business_name: form.businessName,
            business_type: form.businessType,
          }),
        }
      );
      const data = await res.json();
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        router.push("/onboarding");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const bizTypes = [
    { id: "hospital", emoji: "🏥", label: "Hospital / Clinic" },
    { id: "hotel", emoji: "🏨", label: "Hotel / Resort" },
    { id: "real_estate", emoji: "🏠", label: "Real Estate" },
    { id: "restaurant", emoji: "🍽️", label: "Restaurant" },
    { id: "other", emoji: "🏢", label: "Other Business" },
  ];

  const passwordStrength = (p: string) => {
    if (!p) return { label: "", color: "", width: "0%" };
    if (p.length < 6) return { label: "Weak", color: "bg-red-400", width: "33%" };
    if (p.length < 10) return { label: "Medium", color: "bg-yellow-400", width: "66%" };
    return { label: "Strong", color: "bg-green-500", width: "100%" };
  };
  const strength = passwordStrength(form.password);

  return (
    <div className="min-h-screen flex">

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-indigo-600 via-blue-700 to-blue-800 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-16 left-16 w-56 h-56 bg-white/5 rounded-full" />
          <div className="absolute bottom-24 right-8 w-80 h-80 bg-white/5 rounded-full" />
        </div>

        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <span className="text-white text-xl font-bold">VoiceIQ</span>
        </div>

        <div className="relative space-y-6">
          <h2 className="text-4xl font-extrabold text-white leading-tight">
            Join 500+ Indian<br />
            <span className="text-blue-200">businesses today</span>
          </h2>
          <p className="text-blue-200 text-lg leading-relaxed">
            Set up your AI receptionist in 3 minutes. No tech skills needed.
          </p>

          <div className="space-y-4">
            {[
              { icon: "✅", text: "14-day free trial — no credit card" },
              { icon: "✅", text: "Hindi + English AI out of the box" },
              { icon: "✅", text: "WhatsApp alerts after every call" },
              { icon: "✅", text: "Cancel anytime, no lock-in" },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="text-blue-100 text-sm">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Step indicator */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20">
            <p className="text-white/70 text-xs font-medium mb-3">REGISTRATION PROGRESS</p>
            <div className="flex gap-3 items-center">
              {[
                { n: 1, label: "Your Details" },
                { n: 2, label: "Business Info" },
              ].map((s, i) => (
                <div key={s.n} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step > s.n
                      ? "bg-green-400 text-white"
                      : step === s.n
                      ? "bg-white text-blue-700"
                      : "bg-white/20 text-white/50"
                  }`}>
                    {step > s.n ? "✓" : s.n}
                  </div>
                  <span className={`text-xs ${step >= s.n ? "text-white" : "text-white/50"}`}>
                    {s.label}
                  </span>
                  {i === 0 && (
                    <div className={`w-8 h-0.5 ${step > 1 ? "bg-green-400" : "bg-white/20"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="relative text-blue-300 text-sm">© 2026 VoiceIQ · Made with ❤️ in India 🇮🇳</p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">V</span>
            </div>
            <span className="text-gray-900 font-bold text-xl">VoiceIQ</span>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full">
                Step {step} of 2
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              {step === 1 ? "Create your account 🚀" : "About your business 🏢"}
            </h1>
            <p className="text-gray-400 mt-2">
              {step === 1
                ? "Start your 14-day free trial today"
                : "Help us customize your AI receptionist"}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Full Name</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                  <input
                    type="text"
                    placeholder="Sankalp Sharma"
                    value={form.name}
                    onChange={e => update("name", e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Email Address</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">📧</span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => update("email", e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Phone Number</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">📱</span>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={e => update("phone", e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Password</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔑</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    value={form.password}
                    onChange={e => update("password", e.target.value)}
                    className="w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${strength.color}`}
                        style={{ width: strength.width }}
                      />
                    </div>
                    <p className="text-xs mt-1 text-gray-500">{strength.label} password</p>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Confirm Password</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                  <input
                    type="password"
                    placeholder="Repeat your password"
                    value={form.confirmPassword}
                    onChange={e => update("confirmPassword", e.target.value)}
                    className="w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                  {form.confirmPassword && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm">
                      {form.password === form.confirmPassword ? "✅" : "❌"}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition shadow-md shadow-blue-200 mt-2"
              >
                Continue →
              </button>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Business Name</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🏢</span>
                  <input
                    type="text"
                    placeholder="e.g. Sankalp Hospital"
                    value={form.businessName}
                    onChange={e => update("businessName", e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Business Type</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {bizTypes.map(b => (
                    <button
                      key={b.id}
                      onClick={() => update("businessType", b.id)}
                      className={`p-3 rounded-xl border-2 text-left transition ${
                        form.businessType === b.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <p className="text-xl mb-1">{b.emoji}</p>
                      <p className="text-xs font-medium text-gray-700 leading-tight">{b.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <button
                  onClick={() => update("agreeTerms", !form.agreeTerms)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${
                    form.agreeTerms ? "bg-blue-600 border-blue-600" : "border-gray-300"
                  }`}
                >
                  {form.agreeTerms && <span className="text-white text-xs">✓</span>}
                </button>
                <p className="text-sm text-gray-500 leading-relaxed">
                  I agree to VoiceIQ's{" "}
                  <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </p>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => { setStep(1); setError(""); }}
                  className="flex-1 border border-gray-200 text-gray-600 py-3.5 rounded-xl text-sm font-medium hover:bg-gray-100 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={handleRegister}
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition shadow-md shadow-blue-200 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    "Create Account 🚀"
                  )}
                </button>
              </div>
            </div>
          )}

          <p className="text-center text-sm text-gray-400 mt-8">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-semibold hover:text-blue-700">
              Sign in →
            </a>
          </p>

          <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-100">
            {["🔒 SSL Secured", "🇮🇳 India Hosted", "⚡ 99.9% Uptime"].map(b => (
              <span key={b} className="text-xs text-gray-400">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}