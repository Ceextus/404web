"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Loader2, CheckCircle, Plus, Trash2, Briefcase, Upload, Star } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const CATEGORIES = ["Web Architecture", "Mobile Solutions", "Cinematic UI/UX", "SaaS & Cloud Engines"];

export default function PortfolioAdminPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState(null);
  const fileInputRefs = useRef({});

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/admin"; return; }

      const { data } = await supabase.from("projects").select("*").order("sort_order", { ascending: true });
      if (data) setProjects(data);
      setLoading(false);
    };
    init();
  }, []);

  const handleChange = (idx, field, value) => {
    const updated = [...projects];
    updated[idx] = { ...updated[idx], [field]: value };
    setProjects(updated);
    setHasChanges(true);
  };

  const handleImageUpload = async (idx, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) { alert("Max 5MB."); return; }
    if (!file.type.startsWith("image/")) { alert("Image files only."); return; }

    setUploadingIdx(idx);
    const ext = file.name.split(".").pop();
    const filePath = `portfolio/project-${Date.now()}.${ext}`;

    const { error } = await supabase.storage.from("404").upload(filePath, file, { cacheControl: "3600", upsert: true });
    if (error) { alert("Upload failed: " + error.message); setUploadingIdx(null); return; }

    const { data: urlData } = supabase.storage.from("404").getPublicUrl(filePath);
    handleChange(idx, "image_url", urlData.publicUrl);
    setUploadingIdx(null);
  };

  const handleAdd = () => {
    setProjects([...projects, { id: null, title: "", category: "Web Architecture", client: "", description: "", image_url: "", is_featured: false, sort_order: projects.length + 1 }]);
    setHasChanges(true);
  };

  const handleDelete = async (idx) => {
    const p = projects[idx];
    if (p.id) await supabase.from("projects").delete().eq("id", p.id);
    setProjects(projects.filter((_, i) => i !== idx));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true); setSaved(false);
    for (let i = 0; i < projects.length; i++) {
      const p = projects[i];
      const row = { title: p.title, category: p.category, client: p.client, description: p.description, image_url: p.image_url, is_featured: p.is_featured, sort_order: i + 1 };
      if (p.id) { await supabase.from("projects").update(row).eq("id", p.id); }
      else { const { data } = await supabase.from("projects").insert(row).select(); if (data?.[0]) projects[i].id = data[0].id; }
    }
    setSaving(false); setSaved(true); setHasChanges(false);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <div className="flex items-center justify-center py-32"><Loader2 className="w-8 h-8 text-[#c2a66b] animate-spin" /></div>;

  return (
    <div className="w-full relative pb-24">
      <div className="max-w-4xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-bold font-outfit text-white mb-1">Portfolio Projects</h2>
            <p className="text-gray-500 text-xs tracking-widest uppercase">Manage projects shown on portfolio page &amp; homepage</p>
          </div>
          <button onClick={handleAdd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c2a66b]/10 text-[#c2a66b] border border-[#c2a66b]/30 text-xs font-bold tracking-widest uppercase hover:bg-[#c2a66b] hover:text-[#050b14] transition-all duration-300">
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>

        <div className="space-y-6">
          {projects.map((p, idx) => (
            <div key={p.id || `new-${idx}`} className="bg-[#0a1628] rounded-3xl p-5 md:p-7 border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#c2a66b]/10 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-[#c2a66b]" />
                  </div>
                  <span className="text-sm font-semibold text-white truncate max-w-[200px]">{p.title || "New Project"}</span>
                  {p.is_featured && <span className="text-[10px] bg-[#c2a66b]/10 text-[#c2a66b] px-2 py-0.5 rounded-full font-bold tracking-widest uppercase flex items-center gap-1"><Star className="w-2.5 h-2.5" /> Featured</span>}
                  {!p.id && <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full font-bold tracking-widest uppercase">New</span>}
                </div>
                <button onClick={() => handleDelete(idx)} className="text-gray-600 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>
              </div>

              <div className="flex flex-col md:flex-row gap-5">
                {/* Image */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className="w-32 h-24 bg-[#050b14] border border-white/10 rounded-xl overflow-hidden flex items-center justify-center">
                    {p.image_url ? <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" /> : <Briefcase className="w-6 h-6 text-gray-600" />}
                  </div>
                  <input ref={(el) => (fileInputRefs.current[idx] = el)} type="file" accept="image/*" onChange={(e) => handleImageUpload(idx, e)} className="hidden" />
                  <button onClick={() => fileInputRefs.current[idx]?.click()} disabled={uploadingIdx === idx}
                    className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-gray-500 hover:text-[#c2a66b] transition-colors">
                    {uploadingIdx === idx ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                    {uploadingIdx === idx ? "Uploading..." : "Upload"}
                  </button>
                </div>

                {/* Fields */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">Title</label>
                      <input type="text" value={p.title} onChange={(e) => handleChange(idx, "title", e.target.value)}
                        className="w-full bg-[#050b14] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#c2a66b]/50 transition-all duration-300" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">Client</label>
                      <input type="text" value={p.client} onChange={(e) => handleChange(idx, "client", e.target.value)}
                        className="w-full bg-[#050b14] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#c2a66b]/50 transition-all duration-300" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">Category</label>
                      <select value={p.category} onChange={(e) => handleChange(idx, "category", e.target.value)}
                        className="w-full bg-[#050b14] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#c2a66b]/50 transition-all duration-300">
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">Featured on Homepage</label>
                      <button onClick={() => handleChange(idx, "is_featured", !p.is_featured)}
                        className={`w-full rounded-xl px-3 py-2.5 text-sm font-semibold tracking-widest uppercase transition-all duration-300 border ${p.is_featured ? "bg-[#c2a66b]/10 text-[#c2a66b] border-[#c2a66b]/30" : "bg-[#050b14] text-gray-500 border-white/10"}`}>
                        {p.is_featured ? "★ Featured" : "Not Featured"}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">Description</label>
                    <textarea rows={2} value={p.description} onChange={(e) => handleChange(idx, "description", e.target.value)}
                      className="w-full bg-[#050b14] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#c2a66b]/50 transition-all duration-300 resize-none" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Save Bar */}
      <div className={`fixed bottom-0 left-0 right-0 lg:left-64 z-50 bg-[#050b14]/80 backdrop-blur-xl border-t border-white/5 px-6 lg:px-10 py-5 flex items-center justify-between shadow-[0_-20px_40px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out ${hasChanges || saved ? "translate-y-0" : "translate-y-[150%]"}`}>
        <div>{saved && <div className="flex items-center gap-2 text-green-400 text-xs tracking-widest uppercase font-semibold animate-pulse"><CheckCircle className="w-4 h-4" /> Projects Saved</div>}</div>
        <button onClick={handleSave} disabled={saving}
          className="bg-gradient-to-r from-[#c2a66b] to-[#f4d083] text-[#050b14] px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-3 hover:shadow-[0_0_30px_rgba(194,166,107,0.3)] transition-all duration-300 disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Save All</>}
        </button>
      </div>
    </div>
  );
}
