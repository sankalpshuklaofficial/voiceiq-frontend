"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("hospital");
  const [billingAnnual, setBillingAnnual] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const plans = [
    {
      name: "Starter",
      monthly: 999,
      annual: 799,
      calls: "100 calls/mo",
      color: "border-gray-200",
      features: ["1 Language (Hindi/English)", "SMS alerts", "Basic analytics", "Email support"],
      cta: "Start Free Trial",
      highlight: false,
    },
    {
      name: "Pro",
      monthly: 2999,
      annual: 2399,
      calls: "500 calls/mo",
      color: "border-blue-500",
      features: ["3 Languages + Hinglish", "WhatsApp + SMS alerts", "Advanced analytics", "Call transcripts", "Appointment booking", "Priority support"],
      cta: "Get Started",
      highlight: true,
    },
    {
      name: "Enterprise",
      monthly: 7999,
      annual: 6399,
      calls: "Unlimited calls",
      color: "border-gray-200",
      features: ["All languages", "All alert types", "Custom AI training", "CRM integration", "API access", "Dedicated account manager"],
      cta: "Contact Sales",
      highlight: false,
    },
  ];

  const useCases = {
    hospital: {
      emoji: "🏥",
      title: "Hospitals & Clinics",
      desc: "Never miss a patient call again. Your AI receptionist books appointments, answers FAQs about doctors and timings, and sends reminders — 24/7.",
      points: ["Auto appointment booking with doctor selection", "Patient call summaries on WhatsApp", "After-hours message with emergency info", "Multi-doctor, multi-department support"],
      stat: "3x more appointments booked",
    },
    hotel: {
      emoji: "🏨",
      title: "Hotels & Resorts",
      desc: "Handle room inquiries, reservations, and guest questions instantly. Your AI speaks Hindi and English so no caller is left confused.",
      points: ["Room availability & pricing queries", "Check-in/check-out information", "Restaurant & amenity details", "Reservation confirmation via SMS"],
      stat: "40% reduction in missed bookings",
    },
    real_estate: {
      emoji: "🏠",
      title: "Real Estate Agencies",
      desc: "Capture every lead, qualify site visit intent, and schedule property tours automatically — even when your agents are busy.",
      points: ["Property listing details on call", "Lead qualification by budget & location", "Site visit scheduling", "Hot lead WhatsApp alerts to agents"],
      stat: "2x more qualified leads",
    },
    restaurant: {
      emoji: "🍽️",
      title: "Restaurants & Cafes",
      desc: "Take table reservations, answer menu questions, and share your timings and location — all with a warm, friendly AI voice.",
      points: ["Table booking & party size", "Menu & cuisine information", "Delivery & takeaway details", "Special event reservations"],
      stat: "60% fewer missed table bookings",
    },
  };

  const testimonials = [
    { name: "Dr. Rajesh Mehta", role: "Director, Mehta Multispeciality Hospital", avatar: "RM", text: "VoiceIQ has transformed how we handle patient calls. We used to miss 30% of calls after 6 PM. Now our AI handles everything and sends us WhatsApp summaries. Appointments have gone up by 3x.", rating: 5 },
    { name: "Vikram Patel", role: "Owner, Patel Grand Resort, Jaipur", avatar: "VP", text: "Our front desk used to get overwhelmed during peak season. VoiceIQ's Hindi + English AI handles room inquiries perfectly. Guests love it and our staff can focus on in-person service.", rating: 5 },
    { name: "Anita Sharma", role: "MD, Sharma Realty, Lucknow", avatar: "AS", text: "We were losing leads because agents were in site visits and missing calls. Now VoiceIQ captures every lead, qualifies them, and pings us on WhatsApp. Our conversion rate doubled.", rating: 5 },
  ];

  const stats = [
    { value: "10,000+", label: "Calls handled daily" },
    { value: "500+", label: "Businesses onboarded" },
    { value: "98%", label: "Customer satisfaction" },
    { value: "3 min", label: "Average setup time" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">V</span>
            </div>
            <span className="text-xl font-bold text-gray-900">VoiceIQ</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Features", "Use Cases", "Pricing", "About"].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-sm text-gray-600 hover:text-blue-600 font-medium transition">
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => router.push("/login")} className="text-sm text-gray-600 hover:text-blue-600 font-medium transition px-4 py-2">
              Login
            </button>
            <button onClick={() => router.push("/onboarding")} className="bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition">
              Start Free Trial →
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-600 text-2xl">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
            {["Features", "Use Cases", "Pricing", "About"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block text-sm text-gray-700 py-2 font-medium">
                {item}
              </a>
            ))}
            <button onClick={() => router.push("/onboarding")} className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold mt-2">
              Start Free Trial →
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Background blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />

        <div className="max-w-5xl mx-auto text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            🇮🇳 Built for Indian Businesses · Hindi + English AI
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Your AI Receptionist,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Available 24/7
            </span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            VoiceIQ answers every call, books appointments, captures leads, and sends you WhatsApp summaries — in Hindi, English, or Hinglish.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/onboarding")}
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200 hover:shadow-xl hover:scale-105 transform"
            >
              Start Free Trial — No Credit Card 🚀
            </button>
            <button className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:border-blue-300 hover:text-blue-600 transition">
              ▶ Watch Demo (2 min)
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-4">Setup in 3 minutes · Cancel anytime · 14-day free trial</p>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold text-blue-600">{s.value}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">How It Works</p>
            <h2 className="text-4xl font-bold text-gray-900">Up and running in 3 minutes</h2>
            <p className="text-gray-400 mt-3 text-lg">No tech skills needed. Just fill a form and your AI is live.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: "🏢", title: "Tell us about your business", desc: "Answer a few simple questions about your business type, services, timings, and team. Takes under 3 minutes." },
              { step: "02", icon: "🤖", title: "AI gets trained instantly", desc: "VoiceIQ automatically creates a custom AI receptionist that knows your services, prices, doctors, and FAQs." },
              { step: "03", icon: "📞", title: "Forward your calls & go live", desc: "Forward your existing number to VoiceIQ. Your AI starts answering calls immediately in Hindi, English, or Hinglish." },
            ].map(item => (
              <div key={item.step} className="relative p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition group">
                <div className="text-5xl mb-4">{item.icon}</div>
                <span className="absolute top-6 right-6 text-5xl font-black text-gray-50 group-hover:text-blue-50 transition">{item.step}</span>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section id="use-cases" className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">Industry Solutions</p>
            <h2 className="text-4xl font-bold text-gray-900">Built for your industry</h2>
            <p className="text-gray-400 mt-3 text-lg">VoiceIQ adapts to your business type automatically</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-10 justify-center flex-wrap">
            {Object.entries(useCases).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition ${
                  activeTab === key
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {val.emoji} {val.title.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {Object.entries(useCases).map(([key, val]) =>
            activeTab === key ? (
              <div key={key} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div>
                  <p className="text-5xl mb-4">{val.emoji}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{val.title}</h3>
                  <p className="text-gray-500 mb-6 leading-relaxed">{val.desc}</p>
                  <ul className="space-y-3">
                    {val.points.map(pt => (
                      <li key={pt} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="text-blue-500 mt-0.5 flex-shrink-0">✓</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
                  <p className="text-6xl mb-4">{val.emoji}</p>
                  <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <p className="text-3xl font-extrabold text-blue-600">{val.stat}</p>
                    <p className="text-sm text-gray-400 mt-1">reported by customers</p>
                  </div>
                  <button
                    onClick={() => router.push("/onboarding")}
                    className="mt-5 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition text-sm"
                  >
                    Set up for {val.title.split(" ")[0]} →
                  </button>
                </div>
              </div>
            ) : null
          )}
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">Features</p>
            <h2 className="text-4xl font-bold text-gray-900">Everything your receptionist needs</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: "🗣️", title: "Hindi + English AI", desc: "Speaks Hinglish naturally. Callers feel comfortable and understood." },
              { icon: "📅", title: "Auto Appointment Booking", desc: "Books slots, picks doctors, and confirms — without any human intervention." },
              { icon: "💬", title: "WhatsApp Summaries", desc: "Get a WhatsApp message after every call with the full summary and intent." },
              { icon: "🏠", title: "Lead Capture", desc: "Qualifies real estate, insurance, and service leads automatically on the call." },
              { icon: "📊", title: "Analytics Dashboard", desc: "Track call volumes, peak hours, intent breakdown, and conversion rates." },
              { icon: "🔔", title: "Smart Notifications", desc: "SMS, WhatsApp, and email alerts for every missed call, booking, or lead." },
              { icon: "🌙", title: "24/7 Availability", desc: "Your AI works nights, weekends, and holidays — never takes a day off." },
              { icon: "📝", title: "Call Transcripts", desc: "Full searchable transcripts of every call stored in your dashboard." },
              { icon: "⚡", title: "3-Minute Setup", desc: "Fill a simple form and your AI is live. No coding or technical setup needed." },
            ].map(f => (
              <div key={f.title} className="p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition group">
                <p className="text-3xl mb-3">{f.icon}</p>
                <h3 className="font-bold text-gray-800 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">Testimonials</p>
            <h2 className="text-4xl font-bold text-gray-900">Loved by Indian businesses</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">Pricing</p>
            <h2 className="text-4xl font-bold text-gray-900">Simple, transparent pricing</h2>
            <p className="text-gray-400 mt-3 text-lg">No hidden fees. Cancel anytime.</p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <span className={`text-sm font-medium ${!billingAnnual ? "text-gray-800" : "text-gray-400"}`}>Monthly</span>
              <button
                onClick={() => setBillingAnnual(!billingAnnual)}
                className={`relative w-12 h-6 rounded-full transition-colors ${billingAnnual ? "bg-blue-600" : "bg-gray-300"}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${billingAnnual ? "translate-x-7" : "translate-x-1"}`} />
              </button>
              <span className={`text-sm font-medium ${billingAnnual ? "text-gray-800" : "text-gray-400"}`}>
                Annual <span className="text-green-600 font-bold text-xs ml-1">Save 20%</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map(plan => (
              <div key={plan.name} className={`rounded-3xl border-2 p-7 transition relative ${plan.highlight ? "border-blue-500 shadow-xl shadow-blue-100 scale-105" : "border-gray-200 hover:border-gray-300"}`}>
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    ⭐ Most Popular
                  </div>
                )}
                <p className="font-bold text-gray-800 text-lg">{plan.name}</p>
                <div className="mt-3 mb-1">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ₹{(billingAnnual ? plan.annual : plan.monthly).toLocaleString()}
                  </span>
                  <span className="text-gray-400 text-sm">/month</span>
                </div>
                <p className="text-xs text-gray-400 mb-5">{plan.calls}</p>
                <ul className="space-y-2.5 mb-7">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500 flex-shrink-0">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => router.push("/onboarding")}
                  className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition ${
                    plan.highlight
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                      : "border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400 mt-8">
            All plans include 14-day free trial · No credit card required
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Do I need to change my existing phone number?", a: "No! You simply forward your existing number to VoiceIQ. Your number stays the same — we just handle the calls on your behalf." },
              { q: "What languages does VoiceIQ support?", a: "VoiceIQ supports Hindi, English, Hinglish (Hindi + English mix), and regional language combinations like Hindi + Marathi. More languages coming soon." },
              { q: "How long does setup take?", a: "Most businesses are live in under 3 minutes. Just fill our onboarding wizard with your business details and your AI is ready to take calls." },
              { q: "Can the AI book actual appointments?", a: "Yes! For hospitals and clinics, VoiceIQ can collect patient details, preferred doctor, and time slot, then send you a WhatsApp notification to confirm." },
              { q: "What happens to missed calls after business hours?", a: "Your AI stays active 24/7. After hours, it plays your custom message and can still collect lead information and send you alerts." },
              { q: "Is there a free trial?", a: "Yes — all plans include a 14-day free trial. No credit card required to start." },
            ].map((faq, i) => (
              <details key={i} className="bg-white rounded-2xl border border-gray-100 px-6 py-5 group cursor-pointer">
                <summary className="font-semibold text-gray-800 flex justify-between items-center list-none">
                  {faq.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-xl">⌄</span>
                </summary>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Start answering every call today
          </h2>
          <p className="text-blue-200 text-lg mb-8">
            Join 500+ Indian businesses using VoiceIQ to never miss a call again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/onboarding")}
              className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition shadow-lg hover:scale-105 transform"
            >
              Start Free Trial — 14 Days Free 🚀
            </button>
            <button className="border-2 border-blue-400 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-500 transition">
              Talk to Sales →
            </button>
          </div>
          <p className="text-blue-300 text-sm mt-4">No credit card · Setup in 3 minutes · Cancel anytime</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">V</span>
                </div>
                <span className="text-white font-bold">VoiceIQ</span>
              </div>
              <p className="text-sm leading-relaxed">AI receptionist built for Indian businesses. Speaks Hindi, English & Hinglish.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Use Cases", "Changelog"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Refund Policy"] },
            ].map(col => (
              <div key={col.title}>
                <p className="text-white font-semibold text-sm mb-3">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm hover:text-white transition">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-sm">© 2026 VoiceIQ. Made with ❤️ in India 🇮🇳</p>
            <div className="flex gap-4 text-sm">
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">LinkedIn</a>
              <a href="#" className="hover:text-white transition">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}