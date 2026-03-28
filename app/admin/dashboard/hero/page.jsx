"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Loader2, CheckCircle, Plus, Trash2, GripVertical, Type } from "lucide-react";

export default function HeroAdminPage() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/admin"; return; }

      const { data } = await supabase
        .from("hero_slides")
        .select("*")
        .order("sort_order", { ascending: true });

      if (data) setSlides(data);
      setLoading(false);
    };
    init();
  }, []);

  const handleSlideChange = (index, field, value) => {
    const updated = [...slides];
    updated[index] = { ...updated[index], [field]: value };
    setSlides(updated);
    setHasChanges(true);
  };

  const handleAddSlide = () => {
    setSlides([
      ...slides,
      {
        id: null, // null = new row
        pill: "",
        h1_main: "",
        h1_glow: "",
        description: "",
        sort_order: slides.length + 1,
      },
    ]);
    setHasChanges(true);
  };

  const handleDeleteSlide = async (index) => {
    const slide = slides[index];
    if (slide.id) {
      await supabase.from("hero_slides").delete().eq("id", slide.id);
    }
    setSlides(slides.filter((_, i) => i !== index));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    // Upsert each slide with its sort_order
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      const row = {
        pill: slide.pill,
        h1_main: slide.h1_main,
        h1_glow: slide.h1_glow,
        description: slide.description,
        sort_order: i + 1,
      };

      if (slide.id) {
        await supabase.from("hero_slides").update(row).eq("id", slide.id);
      } else {
        const { data } = await supabase.from("hero_slides").insert(row).select();
        if (data?.[0]) slides[i].id = data[0].id;
      }
    }

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-bold font-outfit text-white mb-1">Hero Slides</h2>
            <p className="text-gray-500 text-xs tracking-widest uppercase">
              Manage the rotating text content on the homepage hero
            </p>
          </div>
          <button
            onClick={handleAddSlide}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c2a66b]/10 text-[#c2a66b] border border-[#c2a66b]/30 text-xs font-bold tracking-widest uppercase hover:bg-[#c2a66b] hover:text-[#050b14] transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            Add Slide
          </button>
        </div>

        {/* Slide Cards */}
        <div className="space-y-6">
          {slides.map((slide, idx) => (
            <div
              key={slide.id || `new-${idx}`}
              className="bg-[#0a1628] rounded-3xl p-6 md:p-8 border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.4)] relative group"
            >
              {/* Slide Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#c2a66b]/10 flex items-center justify-center text-[#c2a66b] text-xs font-bold">
                    {idx + 1}
                  </div>
                  <span className="text-sm font-semibold text-white">
                    Slide {idx + 1}
                  </span>
                  {!slide.id && (
                    <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full font-bold tracking-widest uppercase">New</span>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteSlide(idx)}
                  className="text-gray-600 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-5">
                {/* Pill Label */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">
                    Pill Label
                  </label>
                  <input
                    type="text"
                    value={slide.pill}
                    onChange={(e) => handleSlideChange(idx, "pill", e.target.value)}
                    className="w-full bg-[#050b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c2a66b]/50 focus:ring-1 focus:ring-[#c2a66b]/50 transition-all duration-300"
                    placeholder="e.g. Digital Excellence"
                  />
                </div>

                {/* Headline Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">
                      Headline (Line 1)
                    </label>
                    <input
                      type="text"
                      value={slide.h1_main}
                      onChange={(e) => handleSlideChange(idx, "h1_main", e.target.value)}
                      className="w-full bg-[#050b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c2a66b]/50 focus:ring-1 focus:ring-[#c2a66b]/50 transition-all duration-300"
                      placeholder="e.g. Rewriting the"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">
                      Headline (Gold Glow)
                    </label>
                    <input
                      type="text"
                      value={slide.h1_glow}
                      onChange={(e) => handleSlideChange(idx, "h1_glow", e.target.value)}
                      className="w-full bg-[#050b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c2a66b]/50 focus:ring-1 focus:ring-[#c2a66b]/50 transition-all duration-300"
                      placeholder="e.g. Digital Standard."
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    value={slide.description}
                    onChange={(e) => handleSlideChange(idx, "description", e.target.value)}
                    className="w-full bg-[#050b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c2a66b]/50 focus:ring-1 focus:ring-[#c2a66b]/50 transition-all duration-300 resize-none"
                    placeholder="Subtitle / supporting copy for this slide..."
                  />
                </div>
              </div>
            </div>
          ))}

          {slides.length === 0 && (
            <div className="text-center py-20 bg-[#0a1628] rounded-3xl border border-dashed border-white/10">
              <Type className="w-8 h-8 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">No hero slides yet. Click "Add Slide" to get started.</p>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Save Bar */}
      <div className={`fixed bottom-0 left-0 right-0 lg:left-64 z-50 bg-[#050b14]/80 backdrop-blur-xl border-t border-white/5 px-6 lg:px-10 py-5 flex items-center justify-between shadow-[0_-20px_40px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out ${hasChanges || saved ? "translate-y-0" : "translate-y-[150%]"}`}>
        <div>
          {saved && (
            <div className="flex items-center gap-2 text-green-400 text-xs tracking-widest uppercase font-semibold animate-pulse">
              <CheckCircle className="w-4 h-4" />
              All Slides Saved
            </div>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-[#c2a66b] to-[#f4d083] text-[#050b14] px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-3 hover:shadow-[0_0_30px_rgba(194,166,107,0.3)] transition-all duration-300 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save All Slides
            </>
          )}
        </button>
      </div>
    </div>
  );
}
