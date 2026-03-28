"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function KnowledgeBasePage() {
  const router = useRouter();
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [selectedBiz, setSelectedBiz] = useState<any>(null);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [newQ, setNewQ] = useState("");
  const [newA, setNewA] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) { router.push("/login"); return; }
      try {
        const biz = await api.business.getAll();
        setBusinesses(biz);
        if (biz.length > 0) {
          setSelectedBiz(biz[0]);
          const kb = biz[0].profile_data?.faqs || [];
          setFaqs(kb);
        }
      } catch (err) {
        console.error(err);
      }
    };
    init();
  }, []);

  const addFaq = () => {
    if (!newQ || !newA) return;
    setFaqs([...faqs, { question: newQ, answer: newA }]);
    setNewQ("");
    setNewA("");
  };

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const saveKnowledgeBase = async () => {
    if (!selectedBiz) return;
    setSaving(true);
    try {
      await api.business.update(selectedBiz.id, {
        ...selectedBiz,
        profile_data: { ...selectedBiz.profile_data, faqs },
      });
      setSuccess("Knowledge base saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Knowledge Base</h2>
        <button
          onClick={saveKnowledgeBase}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm">
          {success}
        </div>
      )}

      {/* Business Selector */}
      {businesses.length > 1 && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
          <label className="text-sm font-medium text-gray-700 mb-2 block">Select Business</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            onChange={(e) => {
              const biz = businesses.find(b => b.id === Number(e.target.value));
              setSelectedBiz(biz);
              setFaqs(biz?.profile_data?.faqs || []);
            }}
          >
            {businesses.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Add FAQ */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add FAQ</h3>
        <div className="space-y-3">
          <input
            type="text"
            value={newQ}
            onChange={(e) => setNewQ(e.target.value)}
            placeholder="Question e.g. What are your timings?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={newA}
            onChange={(e) => setNewA(e.target.value)}
            placeholder="Answer e.g. We are open 9 AM to 6 PM, Monday to Saturday."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addFaq}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition"
          >
            + Add FAQ
          </button>
        </div>
      </div>

      {/* FAQ List */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          FAQs ({faqs.length})
        </h3>
        {faqs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-4xl mb-3">📚</p>
            <p className="text-gray-400">No FAQs added yet.</p>
            <p className="text-sm text-gray-400 mt-1">Add FAQs above so your AI can answer customer questions.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-100 rounded-xl p-4 hover:border-blue-200 transition">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 mb-1">Q: {faq.question}</p>
                    <p className="text-sm text-gray-500">A: {faq.answer}</p>
                  </div>
                  <button
                    onClick={() => removeFaq(index)}
                    className="text-red-400 hover:text-red-600 transition text-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}