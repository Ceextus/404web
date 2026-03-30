"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Loader2, CheckCircle, FileText } from "lucide-react";

const SECTIONS = [
  { key: "who_we_are", label: "Who We Are", description: "Main company narrative displayed on the left column" },
  { key: "vision", label: "Vision", description: "Vision card content on the right column" },
  { key: "mission", label: "Mission", description: "Mission card content on the right column" },
];

export default function AboutAdminPage() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/admin"; return; }

      const { data } = await supabase
        .from("about_content")
        .select("*");

      if (data) {
        const map = {};
        data.forEach((row) => {
          map[row.section_key] = { title: row.title, body: row.body };
        });
        setContent(map);
      }
      setLoading(false);
    };
    init();
  }, []);

  const handleChange = (sectionKey, field, value) => {
    setContent((prev) => ({
      ...prev,
      [sectionKey]: { ...prev[sectionKey], [field]: value },
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    for (const section of SECTIONS) {
      const data = content[section.key];
      if (!data) continue;

      await supabase
        .from("about_content")
        .upsert(
          { 
            section_key: section.key, 
            title: data.title, 
            body: data.body, 
            updated_at: new Date().toISOString() 
          },
          { onConflict: "section_key" }
        );
    }
    // Purge cache
    try { await fetch("/api/revalidate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ paths: ["/", "/about"] }) }); } catch (e) {}
    setSaving(false);
    setSaved(true);
    setHasChanges(false);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 text-[#c2a66b] animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full relative pb-24">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold font-outfit text-white mb-1">About Page Content</h2>
          <p className="text-gray-500 text-xs tracking-widest uppercase">
            Edit the Who We Are, Vision &amp; Mission sections
          </p>
        </div>

        {/* Section Cards */}
        <div className="space-y-6">
          {SECTIONS.map((section) => {
            const data = content[section.key] || { title: "", body: "" };
            return (
              <div
                key={section.key}
                className="bg-[#0a1628] rounded-3xl p-6 md:p-8 border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
              >
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                  <div className="w-8 h-8 rounded-full bg-[#c2a66b]/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-[#c2a66b]" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white">{section.label}</span>
                    <p className="text-gray-600 text-[10px] tracking-widest uppercase">{section.description}</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Title */}
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={data.title}
                      onChange={(e) => handleChange(section.key, "title", e.target.value)}
                      className="w-full bg-[#050b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c2a66b]/50 focus:ring-1 focus:ring-[#c2a66b]/50 transition-all duration-300"
                      placeholder="Section title..."
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">
                      Content
                    </label>
                    <textarea
                      rows={section.key === "who_we_are" ? 8 : 5}
                      value={data.body}
                      onChange={(e) => handleChange(section.key, "body", e.target.value)}
                      className="w-full bg-[#050b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c2a66b]/50 focus:ring-1 focus:ring-[#c2a66b]/50 transition-all duration-300 resize-none leading-relaxed"
                      placeholder="Write body content here..."
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom Save Bar */}
      <div className={`fixed bottom-0 left-0 right-0 lg:left-64 z-50 bg-[#050b14]/80 backdrop-blur-xl border-t border-white/5 px-6 lg:px-10 py-5 flex items-center justify-between shadow-[0_-20px_40px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out ${hasChanges || saved ? "translate-y-0" : "translate-y-[150%]"}`}>
        <div>
          {saved && (
            <div className="flex items-center gap-2 text-green-400 text-xs tracking-widest uppercase font-semibold animate-pulse">
              <CheckCircle className="w-4 h-4" />
              About Content Saved
            </div>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-[#c2a66b] to-[#f4d083] text-[#050b14] px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-3 hover:shadow-[0_0_30px_rgba(194,166,107,0.3)] transition-all duration-300 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Save Changes</>}
        </button>
      </div>
    </div>
  );
}
