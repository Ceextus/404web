"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Save, Loader2, CheckCircle, Plus, Trash2, Briefcase, Upload, Star, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, GripVertical } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const CATEGORIES = ["Web Architecture", "Mobile Solutions", "Cinematic UI/UX", "SaaS & Cloud Engines"];
const ITEMS_PER_PAGE = 5;

export default function PortfolioAdminPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedIdx, setExpandedIdx] = useState(null);
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
    setProjects([...projects, { id: null, title: "", category: "Web Architecture", client: "", description: "", image_url: "", project_url: "", is_featured: false, sort_order: projects.length + 1 }]);
    setHasChanges(true);
    // Jump to last page
    const newTotal = projects.length + 1;
    setCurrentPage(Math.ceil(newTotal / ITEMS_PER_PAGE));
    setExpandedIdx(newTotal - 1);
  };

  const handleDelete = async (idx) => {
    const p = projects[idx];
    if (p.id) await supabase.from("projects").delete().eq("id", p.id);
    setProjects(projects.filter((_, i) => i !== idx));
    setHasChanges(true);
    setExpandedIdx(null);
  };

  const handleMoveUp = (idx) => {
    if (idx === 0) return;
    const updated = [...projects];
    [updated[idx - 1], updated[idx]] = [updated[idx], updated[idx - 1]];
    setProjects(updated);
    setHasChanges(true);
    setExpandedIdx((prev) => prev === idx ? idx - 1 : prev === idx - 1 ? idx : prev);
  };

  const handleMoveDown = (idx) => {
    if (idx === projects.length - 1) return;
    const updated = [...projects];
    [updated[idx], updated[idx + 1]] = [updated[idx + 1], updated[idx]];
    setProjects(updated);
    setHasChanges(true);
    setExpandedIdx((prev) => prev === idx ? idx + 1 : prev === idx + 1 ? idx : prev);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const srcIdx = startIdx + result.source.index;
    const destIdx = startIdx + result.destination.index;
    if (srcIdx === destIdx) return;
    const updated = [...projects];
    const [moved] = updated.splice(srcIdx, 1);
    updated.splice(destIdx, 0, moved);
    setProjects(updated);
    setHasChanges(true);
    setExpandedIdx((prev) => {
      if (prev === null) return null;
      if (prev === srcIdx) return destIdx;
      if (srcIdx < destIdx && prev > srcIdx && prev <= destIdx) return prev - 1;
      if (srcIdx > destIdx && prev >= destIdx && prev < srcIdx) return prev + 1;
      return prev;
    });
  };

  const handleSave = async () => {
    setSaving(true); setSaved(false);
    let failed = false;
    for (let i = 0; i < projects.length; i++) {
      const p = projects[i];
      const row = { title: p.title, category: p.category, client: p.client, description: p.description, image_url: p.image_url, project_url: p.project_url || "", is_featured: p.is_featured, sort_order: i + 1 };
      if (p.id) {
        const { error } = await supabase.from("projects").update(row).eq("id", p.id);
        if (error) { alert("Update failed for \"" + p.title + "\": " + error.message); failed = true; break; }
      } else {
        const { data, error } = await supabase.from("projects").insert(row).select();
        if (error) { alert("Insert failed for \"" + p.title + "\": " + error.message); failed = true; break; }
        if (data?.[0]) projects[i].id = data[0].id;
      }
    }
    if (!failed) {
      try { await fetch("/api/revalidate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ paths: ["/", "/portfolio"] }) }); } catch (e) {}
      setSaved(true); setHasChanges(false);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  if (loading) return <div className="flex items-center justify-center py-32"><Loader2 className="w-8 h-8 text-[#c2a66b] animate-spin" /></div>;

  // Pagination
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageProjects = projects.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    <div className="w-full relative pb-24">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold font-outfit text-white mb-1">Portfolio Projects</h2>
            <p className="text-gray-500 text-xs tracking-widest uppercase">{projects.length} projects · Page {currentPage}/{totalPages || 1}</p>
          </div>
          <button onClick={handleAdd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c2a66b]/10 text-[#c2a66b] border border-[#c2a66b]/30 text-xs font-bold tracking-widest uppercase hover:bg-[#c2a66b] hover:text-[#050b14] transition-all duration-300">
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>

        {/* Compact Project Rows */}
        <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="projects">
          {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
          {pageProjects.map((p, pageIdx) => {
            const globalIdx = startIdx + pageIdx;
            const isExpanded = expandedIdx === globalIdx;

            return (
              <Draggable key={p.id || `new-${pageIdx}`} draggableId={String(p.id || `new-${pageIdx}`)} index={pageIdx}>
              {(dragProvided, snapshot) => (
              <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} className={`bg-[#0a1628] rounded-2xl border shadow-lg overflow-hidden transition-all duration-200 ${snapshot.isDragging ? "border-[#c2a66b]/40 shadow-[0_0_30px_rgba(194,166,107,0.15)] scale-[1.01]" : "border-white/5"}`}>
                
                {/* Compact Row Header — always visible */}
                <div
                  className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  onClick={() => setExpandedIdx(isExpanded ? null : globalIdx)}
                >
                  {/* Drag Handle */}
                  <div {...dragProvided.dragHandleProps} className="flex-shrink-0 cursor-grab active:cursor-grabbing p-1 -ml-1 text-gray-600 hover:text-[#c2a66b] transition-colors" onClick={(e) => e.stopPropagation()}>
                    <GripVertical className="w-4 h-4" />
                  </div>

                  {/* Thumbnail */}
                  <div className="w-10 h-10 rounded-lg bg-[#050b14] border border-white/10 overflow-hidden flex-shrink-0">
                    {p.image_url ? <img src={p.image_url} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><Briefcase className="w-4 h-4 text-gray-600" /></div>}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white truncate">{p.title || "Untitled Project"}</span>
                      {p.is_featured && <Star className="w-3 h-3 text-[#c2a66b] flex-shrink-0" />}
                      {!p.id && <span className="text-[9px] bg-green-500/10 text-green-400 px-1.5 py-0.5 rounded font-bold uppercase">New</span>}
                    </div>
                    <p className="text-[10px] text-gray-500 truncate">{p.category} · {p.client || "No client"}</p>
                  </div>

                  {/* Sort Order Buttons */}
                  <div className="flex items-center gap-0.5 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    <span className="text-[10px] text-gray-600 mr-1.5 font-mono">#{globalIdx + 1}</span>
                    <button onClick={() => handleMoveUp(globalIdx)} disabled={globalIdx === 0}
                      className="p-1 text-gray-600 hover:text-[#c2a66b] disabled:opacity-20 disabled:cursor-default transition-colors"><ChevronUp className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleMoveDown(globalIdx)} disabled={globalIdx === projects.length - 1}
                      className="p-1 text-gray-600 hover:text-[#c2a66b] disabled:opacity-20 disabled:cursor-default transition-colors"><ChevronDown className="w-3.5 h-3.5" /></button>
                  </div>

                  {/* Expand Arrow */}
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 flex-shrink-0 ${isExpanded ? "rotate-180" : ""}`} />
                </div>

                {/* Expanded Edit Panel */}
                <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                  <div className="px-4 pb-4 pt-1 border-t border-white/5 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Photo Upload */}
                      <div className="flex flex-col items-center gap-2 flex-shrink-0">
                        <div className="w-28 h-20 bg-[#050b14] border border-white/10 rounded-xl overflow-hidden flex items-center justify-center">
                          {p.image_url ? <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" /> : <Briefcase className="w-5 h-5 text-gray-600" />}
                        </div>
                        <input ref={(el) => (fileInputRefs.current[globalIdx] = el)} type="file" accept="image/*" onChange={(e) => handleImageUpload(globalIdx, e)} className="hidden" />
                        <button onClick={() => fileInputRefs.current[globalIdx]?.click()} disabled={uploadingIdx === globalIdx}
                          className="flex items-center gap-1 text-[9px] font-bold tracking-widest uppercase text-gray-500 hover:text-[#c2a66b] transition-colors">
                          {uploadingIdx === globalIdx ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                          {uploadingIdx === globalIdx ? "..." : "Upload"}
                        </button>
                      </div>

                      {/* Fields */}
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-gray-400 text-[9px] font-semibold tracking-widest uppercase ml-1">Title</label>
                            <input type="text" value={p.title} onChange={(e) => handleChange(globalIdx, "title", e.target.value)}
                              className="w-full bg-[#050b14] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#c2a66b]/50 transition-all" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-gray-400 text-[9px] font-semibold tracking-widest uppercase ml-1">Client</label>
                            <input type="text" value={p.client} onChange={(e) => handleChange(globalIdx, "client", e.target.value)}
                              className="w-full bg-[#050b14] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#c2a66b]/50 transition-all" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-gray-400 text-[9px] font-semibold tracking-widest uppercase ml-1">Category</label>
                            <select value={p.category} onChange={(e) => handleChange(globalIdx, "category", e.target.value)}
                              className="w-full bg-[#050b14] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#c2a66b]/50 transition-all">
                              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-gray-400 text-[9px] font-semibold tracking-widest uppercase ml-1">Featured</label>
                            <button onClick={() => handleChange(globalIdx, "is_featured", !p.is_featured)}
                              className={`w-full rounded-lg px-3 py-2 text-xs font-semibold tracking-widest uppercase transition-all border ${p.is_featured ? "bg-[#c2a66b]/10 text-[#c2a66b] border-[#c2a66b]/30" : "bg-[#050b14] text-gray-500 border-white/10"}`}>
                              {p.is_featured ? "★ Featured" : "Not Featured"}
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-gray-400 text-[9px] font-semibold tracking-widest uppercase ml-1">Project URL <span className="text-red-400">*</span></label>
                          <div className="flex gap-2">
                            <input type="url" value={p.project_url || ""} onChange={(e) => handleChange(globalIdx, "project_url", e.target.value)}
                              className="flex-1 bg-[#050b14] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#c2a66b]/50 transition-all" placeholder="https://..." />
                            {p.project_url && <a href={p.project_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 text-gray-500 hover:text-[#c2a66b] hover:border-[#c2a66b]/30 transition-colors"><ExternalLink className="w-3 h-3" /></a>}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-gray-400 text-[9px] font-semibold tracking-widest uppercase ml-1">Description</label>
                          <textarea rows={2} value={p.description} onChange={(e) => handleChange(globalIdx, "description", e.target.value)}
                            className="w-full bg-[#050b14] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#c2a66b]/50 transition-all resize-none" />
                        </div>
                      </div>
                    </div>

                    {/* Delete */}
                    <div className="flex justify-end">
                      <button onClick={() => handleDelete(globalIdx)}
                        className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-gray-600 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-500/10">
                        <Trash2 className="w-3 h-3" /> Delete Project
                      </button>
                    </div>
                  </div>
                  </motion.div>
                )}
                </AnimatePresence>
              </div>
              )}
              </Draggable>
            );
          })}
          {provided.placeholder}
          </div>
          )}
        </Droppable>
        </DragDropContext>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
              className="p-2 rounded-lg border border-white/10 text-gray-500 hover:text-[#c2a66b] hover:border-[#c2a66b]/30 disabled:opacity-20 disabled:cursor-default transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentPage === page ? "bg-[#c2a66b]/10 text-[#c2a66b] border border-[#c2a66b]/30" : "border border-white/10 text-gray-500 hover:text-white"}`}>
                {page}
              </button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-white/10 text-gray-500 hover:text-[#c2a66b] hover:border-[#c2a66b]/30 disabled:opacity-20 disabled:cursor-default transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Sticky Save Bar */}
      {(hasChanges || saved) && (
        <div className="sticky bottom-0 left-0 right-0 z-50 bg-[#050b14]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.5)] mt-8 -mx-4 md:-mx-8 rounded-t-2xl">
          <div>{saved && <div className="flex items-center gap-2 text-green-400 text-xs tracking-widest uppercase font-semibold animate-pulse"><CheckCircle className="w-4 h-4" /> Projects Saved</div>}</div>
          <button onClick={handleSave} disabled={saving}
            className="bg-gradient-to-r from-[#c2a66b] to-[#f4d083] text-[#050b14] px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-3 hover:shadow-[0_0_30px_rgba(194,166,107,0.3)] transition-all duration-300 disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Save All</>}
          </button>
        </div>
      )}
    </div>
  );
}
