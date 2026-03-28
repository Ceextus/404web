"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Loader2, CheckCircle, Plus, Trash2, Users, Upload, Sparkles } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function TeamAdminPage() {
  const [members, setMembers] = useState([]);
  const [values, setValues] = useState([]);
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

      const [{ data: memberData }, { data: valueData }] = await Promise.all([
        supabase.from("team_members").select("*").order("sort_order", { ascending: true }),
        supabase.from("core_values").select("*").order("sort_order", { ascending: true }),
      ]);

      if (memberData) setMembers(memberData);
      if (valueData) setValues(valueData);
      setLoading(false);
    };
    init();
  }, []);

  const handleMemberChange = (idx, field, value) => {
    const updated = [...members];
    updated[idx] = { ...updated[idx], [field]: value };
    setMembers(updated);
    setHasChanges(true);
  };

  const handlePhotoUpload = async (idx, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) { alert("Max 5MB allowed."); return; }
    if (!file.type.startsWith("image/")) { alert("Please upload an image file."); return; }

    setUploadingIdx(idx);
    const ext = file.name.split(".").pop();
    const fileName = `team-${Date.now()}.${ext}`;
    const filePath = `team/${fileName}`;

    const { error } = await supabase.storage.from("404").upload(filePath, file, { cacheControl: "3600", upsert: true });
    if (error) { alert("Upload failed: " + error.message); setUploadingIdx(null); return; }

    const { data: urlData } = supabase.storage.from("404").getPublicUrl(filePath);
    handleMemberChange(idx, "image_url", urlData.publicUrl);
    setUploadingIdx(null);
  };

  const handleAddMember = () => {
    setMembers([...members, { id: null, name: "", role: "", bio: "", image_url: "", linkedin_url: "", twitter_url: "", sort_order: members.length + 1 }]);
    setHasChanges(true);
  };

  const handleDeleteMember = async (idx) => {
    const m = members[idx];
    if (m.id) await supabase.from("team_members").delete().eq("id", m.id);
    setMembers(members.filter((_, i) => i !== idx));
    setHasChanges(true);
  };

  const handleValueChange = (idx, field, value) => {
    const updated = [...values];
    updated[idx] = { ...updated[idx], [field]: value };
    setValues(updated);
    setHasChanges(true);
  };

  const handleAddValue = () => {
    setValues([...values, { id: null, title: "", description: "", sort_order: values.length + 1 }]);
    setHasChanges(true);
  };

  const handleDeleteValue = async (idx) => {
    const v = values[idx];
    if (v.id) await supabase.from("core_values").delete().eq("id", v.id);
    setValues(values.filter((_, i) => i !== idx));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true); setSaved(false);

    for (let i = 0; i < members.length; i++) {
      const m = members[i];
      const row = { name: m.name, role: m.role, bio: m.bio, image_url: m.image_url, linkedin_url: m.linkedin_url || "", twitter_url: m.twitter_url || "", sort_order: i + 1 };
      if (m.id) { await supabase.from("team_members").update(row).eq("id", m.id); }
      else { const { data } = await supabase.from("team_members").insert(row).select(); if (data?.[0]) members[i].id = data[0].id; }
    }

    for (let i = 0; i < values.length; i++) {
      const v = values[i];
      const row = { title: v.title, description: v.description, sort_order: i + 1 };
      if (v.id) { await supabase.from("core_values").update(row).eq("id", v.id); }
      else { const { data } = await supabase.from("core_values").insert(row).select(); if (data?.[0]) values[i].id = data[0].id; }
    }

    setSaving(false); setSaved(true); setHasChanges(false);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <div className="flex items-center justify-center py-32"><Loader2 className="w-8 h-8 text-[#c2a66b] animate-spin" /></div>;

  return (
    <div className="w-full relative pb-24">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-bold font-outfit text-white mb-1">Core Team</h2>
            <p className="text-gray-500 text-xs tracking-widest uppercase">Manage team members and core values</p>
          </div>
          <button onClick={handleAddMember}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c2a66b]/10 text-[#c2a66b] border border-[#c2a66b]/30 text-xs font-bold tracking-widest uppercase hover:bg-[#c2a66b] hover:text-[#050b14] transition-all duration-300">
            <Plus className="w-4 h-4" /> Add Member
          </button>
        </div>

        {/* Team Member Cards */}
        <div className="space-y-6 mb-12">
          {members.map((m, idx) => (
            <div key={m.id || `new-${idx}`} className="bg-[#0a1628] rounded-3xl p-5 md:p-7 border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#c2a66b]/10 flex items-center justify-center text-[#c2a66b] text-xs font-bold">{idx + 1}</div>
                  <span className="text-sm font-semibold text-white">{m.name || "New Member"}</span>
                  {!m.id && <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full font-bold tracking-widest uppercase">New</span>}
                </div>
                <button onClick={() => handleDeleteMember(idx)} className="text-gray-600 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>
              </div>

              <div className="flex flex-col md:flex-row gap-5">
                {/* Photo */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className="w-24 h-28 bg-[#050b14] border border-white/10 rounded-xl overflow-hidden flex items-center justify-center">
                    {m.image_url ? (
                      <img src={m.image_url} alt={m.name} className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                  <input ref={(el) => (fileInputRefs.current[idx] = el)} type="file" accept="image/*" onChange={(e) => handlePhotoUpload(idx, e)} className="hidden" />
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
                      <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">Full Name</label>
                      <input type="text" value={m.name} onChange={(e) => handleMemberChange(idx, "name", e.target.value)}
                        className="w-full bg-[#050b14] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#c2a66b]/50 transition-all duration-300" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">Role / Title</label>
                      <input type="text" value={m.role} onChange={(e) => handleMemberChange(idx, "role", e.target.value)}
                        className="w-full bg-[#050b14] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#c2a66b]/50 transition-all duration-300" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">Bio</label>
                    <textarea rows={2} value={m.bio} onChange={(e) => handleMemberChange(idx, "bio", e.target.value)}
                      className="w-full bg-[#050b14] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#c2a66b]/50 transition-all duration-300 resize-none" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">LinkedIn URL</label>
                      <input type="text" value={m.linkedin_url || ""} onChange={(e) => handleMemberChange(idx, "linkedin_url", e.target.value)}
                        className="w-full bg-[#050b14] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#c2a66b]/50 transition-all duration-300" placeholder="https://linkedin.com/in/..." />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">Twitter URL</label>
                      <input type="text" value={m.twitter_url || ""} onChange={(e) => handleMemberChange(idx, "twitter_url", e.target.value)}
                        className="w-full bg-[#050b14] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#c2a66b]/50 transition-all duration-300" placeholder="https://x.com/..." />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#c2a66b]" />
            <span className="text-sm font-semibold text-white">Core Values</span>
          </div>
          <button onClick={handleAddValue}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c2a66b]/10 text-[#c2a66b] border border-[#c2a66b]/30 text-xs font-bold tracking-widest uppercase hover:bg-[#c2a66b] hover:text-[#050b14] transition-all duration-300">
            <Plus className="w-3 h-3" /> Add Value
          </button>
        </div>

        <div className="space-y-4">
          {values.map((v, idx) => (
            <div key={v.id || `newv-${idx}`} className="bg-[#0a1628] rounded-2xl p-5 border border-white/5 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500 font-bold tracking-widest uppercase">Value {idx + 1}</span>
                <button onClick={() => handleDeleteValue(idx)} className="text-gray-600 hover:text-red-400 transition-colors p-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">Title</label>
                  <input type="text" value={v.title} onChange={(e) => handleValueChange(idx, "title", e.target.value)}
                    className="w-full bg-[#050b14] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#c2a66b]/50 transition-all duration-300" />
                </div>
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase ml-1">Description</label>
                  <input type="text" value={v.description} onChange={(e) => handleValueChange(idx, "description", e.target.value)}
                    className="w-full bg-[#050b14] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#c2a66b]/50 transition-all duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Bottom Save Bar */}
      <div className={`fixed bottom-0 left-0 right-0 lg:left-64 z-50 bg-[#050b14]/80 backdrop-blur-xl border-t border-white/5 px-6 lg:px-10 py-5 flex items-center justify-between shadow-[0_-20px_40px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out ${hasChanges || saved ? "translate-y-0" : "translate-y-[150%]"}`}>
        <div>{saved && <div className="flex items-center gap-2 text-green-400 text-xs tracking-widest uppercase font-semibold animate-pulse"><CheckCircle className="w-4 h-4" /> Team Saved</div>}</div>
        <button onClick={handleSave} disabled={saving}
          className="bg-gradient-to-r from-[#c2a66b] to-[#f4d083] text-[#050b14] px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-3 hover:shadow-[0_0_30px_rgba(194,166,107,0.3)] transition-all duration-300 disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Save All</>}
        </button>
      </div>
    </div>
  );
}
