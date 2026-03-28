"use client";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">VoiceIQ</div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition">Pricing</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition">How it works</a>
            <Link href="/login" className="text-gray-600 hover:text-blue-600 transition">Login</Link>
            <Link href="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition font-medium">
              Get Started Free
            </Link>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="text-2xl">☰</span>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
            <a href="#features" className="text-gray-600">Features</a>
            <a href="#pricing" className="text-gray-600">Pricing</a>
            <a href="#how-it-works" className="text-gray-600">How it works</a>
            <Link href="/login" className="text-gray-600">Login</Link>
            <Link href="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-full text-center">Get Started Free</Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
            🤖 AI-Powered Voice Receptionist
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Never Miss a
            <span className="text-blue-600"> Business Call</span>
            <br />Again
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            VoiceIQ answers your business calls 24/7 using AI. Books appointments, answers FAQs, and handles customers — in Hindi and English.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
              Start Free Trial →
            </Link>
            <a href="#how-it-works" className="border border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition">
              See How It Works
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-6">No credit card required • Setup in 5 minutes</p>

          {/* Hero Image/Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">24/7</p>
              <p className="text-sm text-gray-500 mt-1">Always Available</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">2s</p>
              <p className="text-sm text-gray-500 mt-1">Response Time</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">Hindi</p>
              <p className="text-sm text-gray-500 mt-1">+ English</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Built for Indian Businesses</h2>
          <p className="text-center text-gray-500 mb-12">Works perfectly for any business that receives phone calls</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🏥", title: "Hospitals & Clinics", desc: "Book appointments, answer queries" },
              { icon: "🏨", title: "Hotels & Resorts", desc: "Room bookings, check-in info" },
              { icon: "🏠", title: "Real Estate", desc: "Property enquiries, site visits" },
              { icon: "🍽️", title: "Restaurants", desc: "Table reservations, menu info" },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-md transition">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">How VoiceIQ Works</h2>
          <p className="text-center text-gray-500 mb-12">Get started in minutes, not days</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Sign Up & Configure", desc: "Create your account, add your business details, FAQs, and services in minutes.", icon: "⚙️" },
              { step: "02", title: "Get Your AI Number", desc: "We assign you a phone number. Point your business calls to this number.", icon: "📞" },
              { step: "03", title: "AI Handles Calls", desc: "Your AI receptionist answers calls 24/7, books appointments, and saves call logs.", icon: "🤖" },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-8 shadow-sm relative">
                <div className="text-5xl font-bold text-blue-100 absolute top-6 right-6">{item.step}</div>
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Everything You Need</h2>
          <p className="text-center text-gray-500 mb-12">Powerful features built for modern businesses</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🎙️", title: "Voice AI", desc: "Natural conversations in Hindi and English using advanced AI" },
              { icon: "📅", title: "Auto Appointments", desc: "AI books appointments directly during the call" },
              { icon: "📊", title: "Call Analytics", desc: "Track call volume, intent, and peak hours in real-time" },
              { icon: "📝", title: "Call Transcripts", desc: "Every call is transcribed and summarized automatically" },
              { icon: "💬", title: "WhatsApp Alerts", desc: "Get notified on WhatsApp for every important call" },
              { icon: "🔧", title: "Easy Setup", desc: "Configure your AI in minutes with our simple dashboard" },
            ].map((f) => (
              <div key={f.title} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-blue-200 transition">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Simple Pricing</h2>
          <p className="text-center text-gray-500 mb-12">Start free, scale as you grow</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "₹999",
                period: "/month",
                desc: "Perfect for small businesses",
                features: ["100 calls/month", "1 business profile", "Call logs & transcripts", "Email support"],
                color: "bg-white",
                button: "bg-gray-800 text-white",
                popular: false,
              },
              {
                name: "Professional",
                price: "₹2,499",
                period: "/month",
                desc: "For growing businesses",
                features: ["500 calls/month", "3 business profiles", "AI summaries", "WhatsApp alerts", "Priority support"],
                color: "bg-blue-600",
                button: "bg-white text-blue-600",
                popular: true,
              },
              {
                name: "Enterprise",
                price: "₹5,999",
                period: "/month",
                desc: "For large organizations",
                features: ["Unlimited calls", "10 business profiles", "Custom AI persona", "CRM integration", "Dedicated support"],
                color: "bg-white",
                button: "bg-gray-800 text-white",
                popular: false,
              },
            ].map((plan) => (
              <div key={plan.name} className={`${plan.color} rounded-2xl p-8 shadow-sm relative ${plan.popular ? "shadow-xl scale-105" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className={`text-xl font-bold mb-1 ${plan.popular ? "text-white" : "text-gray-800"}`}>{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.popular ? "text-blue-100" : "text-gray-500"}`}>{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? "text-blue-100" : "text-gray-500"}`}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${plan.popular ? "text-blue-100" : "text-gray-600"}`}>
                      <span className="text-green-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className={`${plan.button} w-full py-3 rounded-full font-semibold text-center block hover:opacity-90 transition`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-blue-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Business?</h2>
          <p className="text-blue-100 text-lg mb-8">Join hundreds of businesses using VoiceIQ to handle calls 24/7</p>
          <Link href="/signup" className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition inline-block">
            Start Free Trial Today →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-2xl font-bold text-white mb-1">VoiceIQ</p>
              <p className="text-sm">AI Voice Receptionist for Indian Businesses</p>
            </div>
            <div className="flex gap-8 text-sm">
              <a href="#features" className="hover:text-white transition">Features</a>
              <a href="#pricing" className="hover:text-white transition">Pricing</a>
              <Link href="/login" className="hover:text-white transition">Login</Link>
              <Link href="/signup" className="hover:text-white transition">Sign Up</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© 2026 VoiceIQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}