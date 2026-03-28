"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Loader2, CheckCircle, Plus, Trash2, FileText, Sparkles } from "lucide-react";

const ICON_OPTIONS = ["Zap", "Layers", "ShieldCheck", "MonitorPlay", "Globe", "Code", "Cpu", "Rocket", "Target", "Award"];

export default function HomepageAboutAdmin() {
  const [brandStory, setBrandStory] = useState({ heading_line1: "", heading_glow: "", body: "", cta_text: "" });
  const [pillars, setPillars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/admin"; return; }

      const [{ data: aboutData }, { data: pillarData }] = await Promise.all([
        supabase.from("homepage_about").select("*").limit(1).single(),
        supabase.from("homepage_pillars").select("*").order("sort_order", { ascending: true }),
      ]);

      if (aboutData) setBrandStory(aboutData);
      if (pillarData) setPillars(pillarData);
      setLoading(false);
    };
    init();
  }, []);

  const handlePillarChange = (idx, field, value) => {
    const updated = [...pillars];
    updated[idx] = { ...updated[idx], [field]: value };
    setPillars(updated);
    setHasChanges(true);
  };

  const handleAddPillar = () => {
    setPillars([...pillars, { id: null, title: "", subtitle: "", description: "", icon_name: "Zap", sort_order: pillars.length + 1 }]);
    setHasChanges(true);
  };

  const handleDeletePillar = async (idx) => {
    const p = pillars[idx];
    if (p.id) await supabase.from("homepage_pillars").delete().eq("id", p.id);
    setPillars(pillars.filter((_, i) => i !== idx));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    // Save brand story
    if (brandStory.id) {
      await supabase.from("homepage_about").update({
        heading_line1: brandStory.heading_line1,
        heading_glow: brandStory.heading_glow,
        body: brandStory.body,
        cta_text: brandStory.cta_text,
        updated_at: new Date().toISOString(),
      }).eq("id", brandStory.id);
    }

    // Save pillars
    for (let i = 0; i < pillars.length; i++) {
      const p = pillars[i];
      const row = { title: p.title, subtitle: p.subtitle, description: p.description, icon_name: p.icon_name, sort_order: i + 1 };
      if (p.id) {
        await supabase.from("homepage_pillars").update(row).eq("id", p.id);
      } else {
        const { data } = await supabase.from("homepage_pillars").insert(row).select();
        if (data?.[0]) pillars[i].id = data[0].id;
      }
    }

    setSaving(false);
    setSaved(true);
    setHasChanges(false);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return <div className="flex items-center justify-center py-32"><Loader2 className="w-8 h-8 text-[#c2a66b] animate-spin" /></div>;
  }

  return (
    <div className="w-full relative pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl font-bold font-outfit text-white mb-1">Homepage — About Section</h2>
          <p className="text-gray-500 text-xs tracking-widest uppercase">Brand story &amp; four pillars on the landing page</p>
        </div>

        {/* Brand Story Card */}
        <div className="bg-[#0a1628] rounded-3xl p-6 md:p-8 border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.4)] mb-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
            <div className="w-8 h-8 rounded-full bg-[#c2a66b]/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-[#c2a66b]" />
            </div>
            <span className="text-sm font-semibold text-white">Brand Story (Left Column)</span>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">Heading Line 1</label>
                <input type="text" value={brandStory.heading_line1} onChange={(e) => { setBrandStory({ ...brandStory, heading_line1: e.target.value }); setHasChanges(true); }}
                  className="w-full bg-[#050b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c2a66b]/50 transition-all duration-300" placeholder="Solving the" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">Heading (Gold Glow)</label>
                <input type="text" value={brandStory.heading_glow} onChange={(e) => { setBrandStory({ ...brandStory, heading_glow: e.target.value }); setHasChanges(true); }}
                  className="w-full bg-[#050b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c2a66b]/50 transition-all duration-300" placeholder='"Unsolvable"' />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">Body Text</label>
              <textarea rows={10} value={brandStory.body} onChange={(e) => { setBrandStory({ ...brandStory, body: e.target.value }); setHasChanges(true); }}
                className="w-full bg-[#050b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c2a66b]/50 transition-all duration-300 resize-none leading-relaxed"
                placeholder="Brand story paragraphs..." />
              <p className="text-gray-600 text-[10px] ml-1">Separate paragraphs with blank lines. Lines starting with &gt; become gold quotes. Wrap text in **bold** for emphasis.</p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">CTA Button Text</label>
              <input type="text" value={brandStory.cta_text} onChange={(e) => { setBrandStory({ ...brandStory, cta_text: e.target.value }); setHasChanges(true); }}
                className="w-full bg-[#050b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c2a66b]/50 transition-all duration-300" placeholder="Discover Our Method" />
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#c2a66b]" />
            <span className="text-sm font-semibold text-white">Four Pillars (Right Column)</span>
          </div>
          <button onClick={handleAddPillar}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c2a66b]/10 text-[#c2a66b] border border-[#c2a66b]/30 text-xs font-bold tracking-widest uppercase hover:bg-[#c2a66b] hover:text-[#050b14] transition-all duration-300">
            <Plus className="w-3 h-3" /> Add Pillar
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {pillars.map((p, idx) => (
            <div key={p.id || `new-${idx}`} className="bg-[#0a1628] rounded-2xl p-5 md:p-6 border border-white/5 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500 font-bold tracking-widest uppercase">Pillar {idx + 1}</span>
                <button onClick={() => handleDeletePillar(idx)} className="text-gray-600 hover:text-red-400 transition-colors p-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">Title</label>
                  <input type="text" value={p.title} onChange={(e) => handlePillarChange(idx, "title", e.target.value)}
                    className="w-full bg-[#050b14] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#c2a66b]/50 transition-all duration-300" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">Subtitle</label>
                  <input type="text" value={p.subtitle} onChange={(e) => handlePillarChange(idx, "subtitle", e.target.value)}
                    className="w-full bg-[#050b14] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#c2a66b]/50 transition-all duration-300" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">Icon</label>
                  <select value={p.icon_name} onChange={(e) => handlePillarChange(idx, "icon_name", e.target.value)}
                    className="w-full bg-[#050b14] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#c2a66b]/50 transition-all duration-300">
                    {ICON_OPTIONS.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-1.5">
                <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">Description</label>
                <textarea rows={2} value={p.description} onChange={(e) => handlePillarChange(idx, "description", e.target.value)}
                  className="w-full bg-[#050b14] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#c2a66b]/50 transition-all duration-300 resize-none" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Bottom Save Bar */}
      <div className={`fixed bottom-0 left-0 right-0 lg:left-64 z-50 bg-[#050b14]/80 backdrop-blur-xl border-t border-white/5 px-6 lg:px-10 py-5 flex items-center justify-between shadow-[0_-20px_40px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out ${hasChanges || saved ? "translate-y-0" : "translate-y-[150%]"}`}>
        <div>{saved && <div className="flex items-center gap-2 text-green-400 text-xs tracking-widest uppercase font-semibold animate-pulse"><CheckCircle className="w-4 h-4" /> Saved Successfully</div>}</div>
        <button onClick={handleSave} disabled={saving}
          className="bg-gradient-to-r from-[#c2a66b] to-[#f4d083] text-[#050b14] px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-3 hover:shadow-[0_0_30px_rgba(194,166,107,0.3)] transition-all duration-300 disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Save All</>}
        </button>
      </div>
    </div>
  );
}
