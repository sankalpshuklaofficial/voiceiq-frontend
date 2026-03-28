"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

type BusinessType = "hospital" | "hotel" | "real_estate" | "restaurant" | "other";

export default function AppointmentsPage() {
  const router = useRouter();
  const [business, setBusiness] = useState<any>(null);
  const [bizType, setBizType] = useState<BusinessType>("hospital");
  const [loading, setLoading] = useState(true);

  // Hospital state
  const [appointments, setAppointments] = useState([
    { id: 1, patient: "Rahul Sharma", doctor: "Dr. Mehta", date: "2026-03-29", time: "10:00 AM", status: "confirmed" },
    { id: 2, patient: "Priya Singh", doctor: "Dr. Kapoor", date: "2026-03-29", time: "11:30 AM", status: "pending" },
    { id: 3, patient: "Amit Verma", doctor: "Dr. Mehta", date: "2026-03-30", time: "09:00 AM", status: "confirmed" },
  ]);

  // Hotel state
  const [reservations, setReservations] = useState([
    { id: 1, guest: "Vikram Patel", room: "101 - Deluxe", checkIn: "2026-03-29", checkOut: "2026-03-31", status: "confirmed" },
    { id: 2, guest: "Sneha Joshi", room: "205 - Suite", checkIn: "2026-03-30", checkOut: "2026-04-02", status: "pending" },
    { id: 3, guest: "Rohan Das", room: "302 - Standard", checkIn: "2026-04-01", checkOut: "2026-04-03", status: "confirmed" },
  ]);

  // Real estate state
  const [leads, setLeads] = useState([
    { id: 1, name: "Ankit Gupta", phone: "9876543210", property: "3BHK Gomti Nagar", visit: "2026-03-29", status: "hot" },
    { id: 2, name: "Meena Rawat", phone: "9123456780", property: "2BHK Hazratganj", visit: "2026-03-30", status: "warm" },
    { id: 3, name: "Suresh Kumar", phone: "9988776655", property: "Villa Aliganj", visit: "2026-04-01", status: "cold" },
  ]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) { router.push("/login"); return; }
      try {
        const biz = await api.business.getAll();
        if (biz.length > 0) {
          setBusiness(biz[0]);
          const type = biz[0].business_type?.toLowerCase() || "hospital";
          setBizType(type as BusinessType);
        }
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    init();
  }, []);

  const statusBadge = (status: string) => {
    const map: any = {
      confirmed: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      cancelled: "bg-red-100 text-red-700",
      hot: "bg-red-100 text-red-700",
      warm: "bg-orange-100 text-orange-700",
      cold: "bg-blue-100 text-blue-700",
    };
    return map[status] || "bg-gray-100 text-gray-600";
  };

  const handleAdd = () => {
    setForm({});
    setShowModal(true);
  };

  const handleSave = () => {
    if (bizType === "hospital") {
      setAppointments([...appointments, { id: Date.now(), ...form, status: "pending" }]);
    } else if (bizType === "hotel") {
      setReservations([...reservations, { id: Date.now(), ...form, status: "pending" }]);
    } else {
      setLeads([...leads, { id: Date.now(), ...form, status: "warm" }]);
    }
    setShowModal(false);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400">Loading...</p>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {bizType === "hospital" && "🏥 Appointments"}
            {bizType === "hotel" && "🏨 Room Reservations"}
            {bizType === "real_estate" && "🏠 Lead Management"}
            {!["hospital","hotel","real_estate"].includes(bizType) && "📅 Bookings"}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {business?.name || "Your Business"} · Manage all bookings here
          </p>
        </div>

        <div className="flex gap-3 items-center">
          {/* Business Type Switcher (for demo/testing) */}
          <select
            value={bizType}
            onChange={(e) => setBizType(e.target.value as BusinessType)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600"
          >
            <option value="hospital">Hospital View</option>
            <option value="hotel">Hotel View</option>
            <option value="real_estate">Real Estate View</option>
          </select>

          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
          >
            + Add New
          </button>
        </div>
      </div>

      {/* ── HOSPITAL VIEW ── */}
      {bizType === "hospital" && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Total Today", value: appointments.length, color: "text-blue-600" },
              { label: "Confirmed", value: appointments.filter(a => a.status === "confirmed").length, color: "text-green-600" },
              { label: "Pending", value: appointments.filter(a => a.status === "pending").length, color: "text-yellow-600" },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">All Appointments</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Patient", "Doctor", "Date", "Time", "Status", "Action"].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-gray-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {appointments.map(a => (
                  <tr key={a.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">{a.patient}</td>
                    <td className="px-6 py-4 text-gray-600">{a.doctor}</td>
                    <td className="px-6 py-4 text-gray-600">{a.date}</td>
                    <td className="px-6 py-4 text-gray-600">{a.time}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(a.status)}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setAppointments(appointments.filter(x => x.id !== a.id))}
                        className="text-red-400 hover:text-red-600 text-xs"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── HOTEL VIEW ── */}
      {bizType === "hotel" && (
        <>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Total Reservations", value: reservations.length, color: "text-blue-600" },
              { label: "Confirmed", value: reservations.filter(r => r.status === "confirmed").length, color: "text-green-600" },
              { label: "Pending", value: reservations.filter(r => r.status === "pending").length, color: "text-yellow-600" },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Room Reservations</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Guest", "Room", "Check-In", "Check-Out", "Status", "Action"].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-gray-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {reservations.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">{r.guest}</td>
                    <td className="px-6 py-4 text-gray-600">{r.room}</td>
                    <td className="px-6 py-4 text-gray-600">{r.checkIn}</td>
                    <td className="px-6 py-4 text-gray-600">{r.checkOut}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(r.status)}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setReservations(reservations.filter(x => x.id !== r.id))}
                        className="text-red-400 hover:text-red-600 text-xs"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── REAL ESTATE VIEW ── */}
      {bizType === "real_estate" && (
        <>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Total Leads", value: leads.length, color: "text-blue-600" },
              { label: "Hot Leads 🔥", value: leads.filter(l => l.status === "hot").length, color: "text-red-600" },
              { label: "Site Visits", value: leads.length, color: "text-purple-600" },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {leads.map(lead => (
              <div key={lead.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-gray-800">{lead.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${statusBadge(lead.status)}`}>
                    {lead.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-1">📞 {lead.phone}</p>
                <p className="text-sm text-gray-500 mb-1">🏠 {lead.property}</p>
                <p className="text-sm text-gray-500 mb-4">📅 Visit: {lead.visit}</p>
                <div className="flex gap-2">
                  <button className="flex-1 text-xs bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition">
                    📞 Call
                  </button>
                  <button
                    onClick={() => setLeads(leads.filter(x => x.id !== lead.id))}
                    className="flex-1 text-xs bg-red-50 text-red-500 py-2 rounded-lg hover:bg-red-100 transition"
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── ADD MODAL ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
            <h3 className="text-lg font-bold text-gray-800 mb-6">
              {bizType === "hospital" && "Add Appointment"}
              {bizType === "hotel" && "Add Reservation"}
              {bizType === "real_estate" && "Add Lead"}
            </h3>

            <div className="space-y-4">
              {bizType === "hospital" && (
                <>
                  <input placeholder="Patient Name" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setForm({...form, patient: e.target.value})} />
                  <input placeholder="Doctor Name" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setForm({...form, doctor: e.target.value})} />
                  <input type="date" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setForm({...form, date: e.target.value})} />
                  <input placeholder="Time e.g. 10:00 AM" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setForm({...form, time: e.target.value})} />
                </>
              )}
              {bizType === "hotel" && (
                <>
                  <input placeholder="Guest Name" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setForm({...form, guest: e.target.value})} />
                  <input placeholder="Room e.g. 101 - Deluxe" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setForm({...form, room: e.target.value})} />
                  <input type="date" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setForm({...form, checkIn: e.target.value})} />
                  <input type="date" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setForm({...form, checkOut: e.target.value})} />
                </>
              )}
              {bizType === "real_estate" && (
                <>
                  <input placeholder="Lead Name" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setForm({...form, name: e.target.value})} />
                  <input placeholder="Phone Number" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setForm({...form, phone: e.target.value})} />
                  <input placeholder="Property Interested In" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setForm({...form, property: e.target.value})} />
                  <input type="date" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setForm({...form, visit: e.target.value})} />
                </>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl hover:bg-gray-50 transition text-sm">
                Cancel
              </button>
              <button onClick={handleSave} className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition text-sm font-medium">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}