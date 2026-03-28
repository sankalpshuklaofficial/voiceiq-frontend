"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type BusinessType = "hospital" | "hotel" | "real_estate" | "restaurant" | "other";

const STEPS = {
  hospital: ["Business Type", "Basic Info", "Doctors & Departments", "Services & Timings", "AI Setup", "Done"],
  hotel: ["Business Type", "Basic Info", "Rooms & Amenities", "Services & Timings", "AI Setup", "Done"],
  real_estate: ["Business Type", "Basic Info", "Properties", "Services & Timings", "AI Setup", "Done"],
  restaurant: ["Business Type", "Basic Info", "Menu & Tables", "Services & Timings", "AI Setup", "Done"],
  other: ["Business Type", "Basic Info", "Services & Timings", "AI Setup", "Done"],
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [bizType, setBizType] = useState<BusinessType>("hospital");
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    // Basic Info
    businessName: "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    city: "",

    // Hospital
    doctors: [{ name: "", speciality: "" }],
    departments: [""],

    // Hotel
    totalRooms: "",
    roomTypes: [{ type: "", price: "", count: "" }],
    amenities: [] as string[],

    // Real Estate
    properties: [{ title: "", location: "", price: "", type: "sale" }],
    agentName: "",

    // Restaurant
    cuisines: "",
    totalTables: "",
    menuCategories: [""],

    // Services & Timings
    openTime: "09:00",
    closeTime: "18:00",
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    services: [""],

    // AI Setup
    language: "hi-en",
    voiceType: "female",
    greetingText: "",
  });

  const update = (key: string, value: any) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const steps = STEPS[bizType];
  const totalSteps = steps.length;
  const progress = Math.round((step / (totalSteps - 1)) * 100);

  const next = () => setStep(s => Math.min(s + 1, totalSteps - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const handleFinish = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1500));
    setSaving(false);
    router.push("/overview");
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const toggleDay = (day: string) => {
    const curr = form.workingDays;
    update("workingDays", curr.includes(day) ? curr.filter(d => d !== day) : [...curr, day]);
  };

  const amenityList = ["WiFi", "Pool", "Gym", "Parking", "Restaurant", "Spa", "Bar", "Conference Room"];
  const toggleAmenity = (a: string) => {
    const curr = form.amenities;
    update("amenities", curr.includes(a) ? curr.filter(x => x !== a) : [...curr, a]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-blue-600">VoiceIQ</h1>
        <p className="text-sm text-gray-400 mt-1">Let's set up your AI receptionist</p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden">

        {/* Progress Bar */}
        <div className="h-1.5 bg-gray-100">
          <div
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step Indicators */}
        <div className="px-8 pt-6 pb-2">
          <div className="flex items-center justify-between">
            {steps.map((label, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < step ? "bg-blue-600 text-white" :
                  i === step ? "bg-blue-600 text-white ring-4 ring-blue-100" :
                  "bg-gray-100 text-gray-400"
                }`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span className={`text-xs hidden md:block ${i === step ? "text-blue-600 font-medium" : "text-gray-400"}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="px-8 py-6">

          {/* ── STEP 0: Business Type ── */}
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">What type of business are you?</h2>
              <p className="text-sm text-gray-400 mb-6">We'll customize your AI receptionist based on your business</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  { id: "hospital", emoji: "🏥", label: "Hospital / Clinic", desc: "Appointments & doctors" },
                  { id: "hotel", emoji: "🏨", label: "Hotel / Resort", desc: "Room reservations" },
                  { id: "real_estate", emoji: "🏠", label: "Real Estate", desc: "Property leads" },
                  { id: "restaurant", emoji: "🍽️", label: "Restaurant", desc: "Table bookings" },
                  { id: "other", emoji: "🏢", label: "Other Business", desc: "General queries" },
                ].map(b => (
                  <button
                    key={b.id}
                    onClick={() => { setBizType(b.id as BusinessType); setStep(0); }}
                    className={`p-4 rounded-2xl border-2 text-left transition ${
                      bizType === b.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <p className="text-3xl mb-2">{b.emoji}</p>
                    <p className="font-semibold text-gray-800 text-sm">{b.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{b.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 1: Basic Info ── */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Basic Business Information</h2>
              <p className="text-sm text-gray-400 mb-6">This will be used by your AI receptionist</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "businessName", label: "Business Name", placeholder: "e.g. Sankalp Hospital" },
                  { key: "ownerName", label: "Owner / Manager Name", placeholder: "e.g. Dr. Sharma" },
                  { key: "phone", label: "Business Phone", placeholder: "+91 98765 43210" },
                  { key: "email", label: "Business Email", placeholder: "info@business.com" },
                  { key: "city", label: "City", placeholder: "e.g. Lucknow" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-xs font-medium text-gray-600 block mb-1">{f.label}</label>
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      value={(form as any)[f.key]}
                      onChange={e => update(f.key, e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-gray-600 block mb-1">Full Address</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. 12 Medical Road, Hazratganj, Lucknow"
                    value={form.address}
                    onChange={e => update("address", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: Domain-specific ── */}
          {step === 2 && bizType === "hospital" && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Doctors & Departments</h2>
              <p className="text-sm text-gray-400 mb-6">Add your doctors so AI can book appointments correctly</p>
              <div className="space-y-3 mb-4">
                {form.doctors.map((doc, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <input
                      placeholder="Doctor Name e.g. Dr. Mehta"
                      value={doc.name}
                      onChange={e => {
                        const updated = [...form.doctors];
                        updated[i] = { ...updated[i], name: e.target.value };
                        update("doctors", updated);
                      }}
                      className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      placeholder="Speciality e.g. Cardiology"
                      value={doc.speciality}
                      onChange={e => {
                        const updated = [...form.doctors];
                        updated[i] = { ...updated[i], speciality: e.target.value };
                        update("doctors", updated);
                      }}
                      className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {form.doctors.length > 1 && (
                      <button onClick={() => update("doctors", form.doctors.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 text-lg">×</button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => update("doctors", [...form.doctors, { name: "", speciality: "" }])}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + Add Doctor
              </button>
            </div>
          )}

          {step === 2 && bizType === "hotel" && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Rooms & Amenities</h2>
              <p className="text-sm text-gray-400 mb-6">Tell AI about your room types and facilities</p>
              <div className="mb-4">
                <label className="text-xs font-medium text-gray-600 block mb-1">Total Rooms</label>
                <input
                  type="number"
                  placeholder="e.g. 50"
                  value={form.totalRooms}
                  onChange={e => update("totalRooms", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-3 mb-4">
                {form.roomTypes.map((room, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input placeholder="Type e.g. Deluxe" value={room.type} onChange={e => { const u = [...form.roomTypes]; u[i] = { ...u[i], type: e.target.value }; update("roomTypes", u); }} className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input placeholder="₹ Price/night" value={room.price} onChange={e => { const u = [...form.roomTypes]; u[i] = { ...u[i], price: e.target.value }; update("roomTypes", u); }} className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input placeholder="Count" value={room.count} onChange={e => { const u = [...form.roomTypes]; u[i] = { ...u[i], count: e.target.value }; update("roomTypes", u); }} className="w-20 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {form.roomTypes.length > 1 && <button onClick={() => update("roomTypes", form.roomTypes.filter((_, j) => j !== i))} className="text-red-400 text-lg">×</button>}
                  </div>
                ))}
              </div>
              <button onClick={() => update("roomTypes", [...form.roomTypes, { type: "", price: "", count: "" }])} className="text-sm text-blue-600 font-medium mb-6">+ Add Room Type</button>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-2">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {amenityList.map(a => (
                    <button key={a} onClick={() => toggleAmenity(a)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${form.amenities.includes(a) ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{a}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && bizType === "real_estate" && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Property Listings</h2>
              <p className="text-sm text-gray-400 mb-6">Add properties your AI can tell callers about</p>
              <div className="space-y-4 mb-4">
                {form.properties.map((p, i) => (
                  <div key={i} className="border border-gray-200 rounded-2xl p-4 space-y-3">
                    <div className="flex gap-3">
                      <input placeholder="Property Title e.g. 3BHK Gomti Nagar" value={p.title} onChange={e => { const u = [...form.properties]; u[i] = { ...u[i], title: e.target.value }; update("properties", u); }} className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <select value={p.type} onChange={e => { const u = [...form.properties]; u[i] = { ...u[i], type: e.target.value }; update("properties", u); }} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="sale">For Sale</option>
                        <option value="rent">For Rent</option>
                      </select>
                    </div>
                    <div className="flex gap-3">
                      <input placeholder="Location" value={p.location} onChange={e => { const u = [...form.properties]; u[i] = { ...u[i], location: e.target.value }; update("properties", u); }} className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <input placeholder="₹ Price" value={p.price} onChange={e => { const u = [...form.properties]; u[i] = { ...u[i], price: e.target.value }; update("properties", u); }} className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      {form.properties.length > 1 && <button onClick={() => update("properties", form.properties.filter((_, j) => j !== i))} className="text-red-400 text-lg">×</button>}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => update("properties", [...form.properties, { title: "", location: "", price: "", type: "sale" }])} className="text-sm text-blue-600 font-medium">+ Add Property</button>
            </div>
          )}

          {step === 2 && bizType === "restaurant" && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Menu & Tables</h2>
              <p className="text-sm text-gray-400 mb-6">Help your AI answer menu and reservation queries</p>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Cuisines Served</label>
                  <input placeholder="e.g. North Indian, Chinese, Continental" value={form.cuisines} onChange={e => update("cuisines", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Total Tables</label>
                  <input type="number" placeholder="e.g. 20" value={form.totalTables} onChange={e => update("totalTables", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && bizType === "other" && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Your Services</h2>
              <p className="text-sm text-gray-400 mb-6">List services your AI can tell callers about</p>
              <div className="space-y-3">
                {form.services.map((s, i) => (
                  <div key={i} className="flex gap-3">
                    <input placeholder={`Service ${i + 1} e.g. Home Delivery`} value={s} onChange={e => { const u = [...form.services]; u[i] = e.target.value; update("services", u); }} className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {form.services.length > 1 && <button onClick={() => update("services", form.services.filter((_, j) => j !== i))} className="text-red-400 text-lg">×</button>}
                  </div>
                ))}
                <button onClick={() => update("services", [...form.services, ""])} className="text-sm text-blue-600 font-medium">+ Add Service</button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Services & Timings ── */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Services & Timings</h2>
              <p className="text-sm text-gray-400 mb-6">Set your business hours and main services</p>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-2">Working Days</label>
                  <div className="flex gap-2 flex-wrap">
                    {days.map(day => (
                      <button key={day} onClick={() => toggleDay(day)} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${form.workingDays.includes(day) ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{day}</button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">Opening Time</label>
                    <input type="time" value={form.openTime} onChange={e => update("openTime", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">Closing Time</label>
                    <input type="time" value={form.closeTime} onChange={e => update("closeTime", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                {bizType !== "other" && (
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-2">Main Services (for AI knowledge)</label>
                    <div className="space-y-2">
                      {form.services.map((s, i) => (
                        <div key={i} className="flex gap-3">
                          <input placeholder={`e.g. ${bizType === "hospital" ? "OPD Consultation" : bizType === "hotel" ? "Room Service" : "Site Visit"}`} value={s} onChange={e => { const u = [...form.services]; u[i] = e.target.value; update("services", u); }} className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          {form.services.length > 1 && <button onClick={() => update("services", form.services.filter((_, j) => j !== i))} className="text-red-400 text-lg">×</button>}
                        </div>
                      ))}
                      <button onClick={() => update("services", [...form.services, ""])} className="text-sm text-blue-600 font-medium">+ Add Service</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── STEP 4: AI Setup ── */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Configure Your AI Receptionist</h2>
              <p className="text-sm text-gray-400 mb-6">Choose voice and language for your AI</p>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-2">Language</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "hi-en", label: "Hinglish", flag: "🇮🇳", desc: "Hindi + English" },
                      { id: "hi", label: "Hindi", flag: "🇮🇳", desc: "Hindi only" },
                      { id: "en", label: "English", flag: "🇬🇧", desc: "English only" },
                      { id: "hi-en-mr", label: "Hindi + Marathi", flag: "🇮🇳", desc: "+ Marathi" },
                    ].map(l => (
                      <button key={l.id} onClick={() => update("language", l.id)} className={`p-3 rounded-xl border-2 text-left transition ${form.language === l.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}>
                        <span className="text-lg">{l.flag}</span>
                        <p className="text-sm font-medium text-gray-800 mt-1">{l.label}</p>
                        <p className="text-xs text-gray-400">{l.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-2">Voice Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "female", emoji: "👩", label: "Female", desc: "Warm & friendly" },
                      { id: "male", emoji: "👨", label: "Male", desc: "Strong & clear" },
                    ].map(v => (
                      <button key={v.id} onClick={() => update("voiceType", v.id)} className={`p-4 rounded-xl border-2 text-left transition ${form.voiceType === v.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}>
                        <p className="text-2xl">{v.emoji}</p>
                        <p className="font-medium text-gray-800 text-sm mt-1">{v.label}</p>
                        <p className="text-xs text-gray-400">{v.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Custom Greeting (optional)</label>
                  <textarea
                    rows={3}
                    placeholder={`e.g. Namaste! ${form.businessName || "Aapke business"} mein aapka swagat hai. Main aapki kaise help kar sakta hoon?`}
                    value={form.greetingText}
                    onChange={e => update("greetingText", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── FINAL STEP: Done ── */}
          {step === totalSteps - 1 && (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎉</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">You're all set!</h2>
              <p className="text-gray-400 mb-6">Your AI receptionist is configured and ready to handle calls for</p>
              <div className="bg-blue-50 rounded-2xl p-4 mb-6 text-left">
                <p className="font-semibold text-blue-800 text-lg">{form.businessName || "Your Business"}</p>
                <p className="text-sm text-blue-600 mt-1">📍 {form.city || "Your City"}</p>
                <p className="text-sm text-blue-600">🕐 {form.openTime} – {form.closeTime}</p>
                <p className="text-sm text-blue-600">🌐 {form.language === "hi-en" ? "Hindi + English" : form.language}</p>
                <p className="text-sm text-blue-600">🎙️ {form.voiceType === "female" ? "Female Voice 👩" : "Male Voice 👨"}</p>
              </div>
              <button
                onClick={handleFinish}
                disabled={saving}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-blue-700 transition disabled:opacity-70"
              >
                {saving ? "Setting up your AI... ⏳" : "Go to Dashboard →"}
              </button>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {step !== totalSteps - 1 && (
          <div className="px-8 pb-8 flex justify-between gap-4">
            <button
              onClick={back}
              disabled={step === 0}
              className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-2xl font-medium hover:bg-gray-50 transition disabled:opacity-40"
            >
              ← Back
            </button>
            <button
              onClick={next}
              className="flex-1 bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700 transition"
            >
              {step === totalSteps - 2 ? "Finish Setup ✓" : "Next →"}
            </button>
          </div>
        )}
      </div>

      {/* Skip link */}
      <button onClick={() => router.push("/overview")} className="mt-6 text-sm text-gray-400 hover:text-gray-600 transition">
        Skip for now →
      </button>
    </div>
  );
}