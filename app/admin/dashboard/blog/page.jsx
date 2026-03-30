"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Loader2, CheckCircle, Plus, Trash2, FileText, Upload, Eye, EyeOff, ArrowLeft, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const CATEGORIES = ["Cinematic UI/UX", "Mobile Solutions", "Product Strategy", "Web Architecture", "SaaS & Cloud Engines", "Engineering"];
const ITEMS_PER_PAGE = 6;

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editingPost, setEditingPost] = useState(null); // null = list view, object = editor view
  const [hasChanges, setHasChanges] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coverInputRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/admin"; return; }
      const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      if (data) setPosts(data);
      setLoading(false);
    };
    init();
  }, []);

  const handleNew = () => {
    setEditingPost({
      id: null,
      title: "",
      slug: "",
      category: "Engineering",
      excerpt: "",
      content: "",
      image_url: "",
      author_name: "",
      author_role: "",
      read_time: "5 min read",
      is_published: false,
      published_at: new Date().toISOString(),
    });
    setHasChanges(true);
  };

  const handleEdit = (post) => {
    setEditingPost({ ...post });
    setHasChanges(false);
  };

  const handleFieldChange = (field, value) => {
    setEditingPost((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "title" && !prev.id) {
        updated.slug = slugify(value);
      }
      return updated;
    });
    setHasChanges(true);
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) { alert("Max 5MB."); return; }
    if (!file.type.startsWith("image/")) { alert("Image files only."); return; }
    setUploadingCover(true);
    const ext = file.name.split(".").pop();
    const filePath = `blog/cover-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("404").upload(filePath, file, { cacheControl: "3600", upsert: true });
    if (error) { alert("Upload failed: " + error.message); setUploadingCover(false); return; }
    const { data: urlData } = supabase.storage.from("404").getPublicUrl(filePath);
    handleFieldChange("image_url", urlData.publicUrl);
    setUploadingCover(false);
  };

  const handleSave = async () => {
    if (!editingPost.title.trim()) { alert("Title is required."); return; }
    if (!editingPost.slug.trim()) { alert("Slug is required."); return; }

    setSaving(true); setSaved(false);
    const row = {
      title: editingPost.title,
      slug: editingPost.slug,
      category: editingPost.category,
      excerpt: editingPost.excerpt,
      content: editingPost.content,
      image_url: editingPost.image_url,
      author_name: editingPost.author_name,
      author_role: editingPost.author_role,
      read_time: editingPost.read_time,
      is_published: editingPost.is_published,
      published_at: editingPost.is_published ? (editingPost.published_at || new Date().toISOString()) : editingPost.published_at,
    };

    let savedPost = editingPost;
    if (editingPost.id) {
      const { error } = await supabase.from("blog_posts").update(row).eq("id", editingPost.id);
      if (error) { alert("Update failed: " + error.message); setSaving(false); return; }
    } else {
      const { data, error } = await supabase.from("blog_posts").insert(row).select();
      if (error) { alert("Insert failed: " + error.message); setSaving(false); return; }
      if (data?.[0]) savedPost = data[0];
    }

    // Refresh list
    const { data: refreshed } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    if (refreshed) setPosts(refreshed);
    setEditingPost(savedPost);

    try { await fetch("/api/revalidate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ paths: ["/insights", `/insights/${savedPost.slug}`] }) }); } catch (e) {}

    setSaving(false); setSaved(true); setHasChanges(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDelete = async (post) => {
    if (!confirm(`Delete "${post.title}"?`)) return;
    if (post.id) await supabase.from("blog_posts").delete().eq("id", post.id);
    setPosts(posts.filter((p) => p.id !== post.id));
    if (editingPost?.id === post.id) setEditingPost(null);
    try { await fetch("/api/revalidate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ paths: ["/insights"] }) }); } catch (e) {}
  };

  if (loading) return <div className="flex items-center justify-center py-32"><Loader2 className="w-8 h-8 text-[#c2a66b] animate-spin" /></div>;

  // ---------- EDITOR VIEW ----------
  if (editingPost) {
    return (
      <div className="w-full relative pb-24">
        <div className="max-w-4xl mx-auto">

          {/* Editor Header */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <button onClick={() => { setEditingPost(null); setHasChanges(false); }}
              className="flex items-center gap-2 text-gray-400 hover:text-white text-xs uppercase tracking-widest font-semibold transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Posts
            </button>
            <div className="flex items-center gap-3">
              {editingPost.is_published && editingPost.slug && (
                <a href={`/insights/${editingPost.slug}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] text-gray-500 hover:text-[#c2a66b] uppercase tracking-widest font-semibold transition-colors">
                  <ExternalLink className="w-3 h-3" /> Preview
                </a>
              )}
              <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold tracking-widest uppercase ${editingPost.is_published ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                {editingPost.is_published ? "Published" : "Draft"}
              </span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="mb-6">
            <div className="relative w-full h-48 md:h-56 bg-[#0a1628] border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center group cursor-pointer" onClick={() => coverInputRef.current?.click()}>
              {editingPost.image_url ? (
                <img src={editingPost.image_url} alt="" className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-600">
                  <Upload className="w-8 h-8" />
                  <span className="text-xs tracking-widest uppercase font-semibold">Click to upload cover image</span>
                </div>
              )}
              {uploadingCover && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><Loader2 className="w-6 h-6 text-[#c2a66b] animate-spin" /></div>}
            </div>
            <input ref={coverInputRef} type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
          </div>

          {/* Title */}
          <div className="mb-4">
            <input
              type="text"
              value={editingPost.title}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              placeholder="Article Title..."
              className="w-full bg-transparent text-white text-3xl md:text-4xl font-bold font-outfit placeholder-gray-700 focus:outline-none border-none py-2"
            />
          </div>

          {/* Slug */}
          <div className="flex items-center gap-2 mb-6 text-xs text-gray-500">
            <span>/insights/</span>
            <input
              type="text"
              value={editingPost.slug}
              onChange={(e) => handleFieldChange("slug", slugify(e.target.value))}
              className="bg-[#0a1628] border border-white/10 rounded-lg px-2 py-1 text-white text-xs focus:outline-none focus:border-[#c2a66b]/50 transition-all w-64"
            />
          </div>

          {/* Meta Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-[9px] font-semibold tracking-widest uppercase ml-1">Category</label>
              <select value={editingPost.category} onChange={(e) => handleFieldChange("category", e.target.value)}
                className="w-full bg-[#0a1628] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#c2a66b]/50 transition-all">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-[9px] font-semibold tracking-widest uppercase ml-1">Author Name</label>
              <input type="text" value={editingPost.author_name} onChange={(e) => handleFieldChange("author_name", e.target.value)}
                className="w-full bg-[#0a1628] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#c2a66b]/50 transition-all" placeholder="e.g. John Doe" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-[9px] font-semibold tracking-widest uppercase ml-1">Author Role</label>
              <input type="text" value={editingPost.author_role} onChange={(e) => handleFieldChange("author_role", e.target.value)}
                className="w-full bg-[#0a1628] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#c2a66b]/50 transition-all" placeholder="e.g. CTO" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-[9px] font-semibold tracking-widest uppercase ml-1">Read Time</label>
              <input type="text" value={editingPost.read_time} onChange={(e) => handleFieldChange("read_time", e.target.value)}
                className="w-full bg-[#0a1628] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#c2a66b]/50 transition-all" placeholder="5 min read" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-[9px] font-semibold tracking-widest uppercase ml-1">Publish Status</label>
              <button onClick={() => handleFieldChange("is_published", !editingPost.is_published)}
                className={`w-full rounded-lg px-3 py-2 text-xs font-semibold tracking-widest uppercase transition-all border flex items-center justify-center gap-2 ${editingPost.is_published ? "bg-green-500/10 text-green-400 border-green-500/30" : "bg-[#0a1628] text-yellow-400 border-yellow-500/30"}`}>
                {editingPost.is_published ? <><Eye className="w-3 h-3" /> Published</> : <><EyeOff className="w-3 h-3" /> Draft</>}
              </button>
            </div>
          </div>

          {/* Excerpt */}
          <div className="flex flex-col gap-1 mb-6">
            <label className="text-gray-400 text-[9px] font-semibold tracking-widest uppercase ml-1">Excerpt (shown on listing page)</label>
            <textarea rows={2} value={editingPost.excerpt} onChange={(e) => handleFieldChange("excerpt", e.target.value)}
              className="w-full bg-[#0a1628] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c2a66b]/50 transition-all resize-none"
              placeholder="A brief summary that appears on the insights listing..." />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-1 mb-6">
            <label className="text-gray-400 text-[9px] font-semibold tracking-widest uppercase ml-1">Article Content (Markdown supported)</label>
            <textarea rows={18} value={editingPost.content} onChange={(e) => handleFieldChange("content", e.target.value)}
              className="w-full bg-[#0a1628] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c2a66b]/50 transition-all resize-y font-mono leading-relaxed"
              placeholder={"## Section Title\n\nYour article content goes here...\n\nUse **bold**, *italic*, and ## headings to format your article."} />
          </div>

          {/* Sticky Save Bar */}
          {(hasChanges || saved) && (
            <div className="sticky bottom-0 left-0 right-0 z-50 bg-[#050b14]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.5)] mt-8 -mx-4 md:-mx-8 rounded-t-2xl">
              <div>{saved && <div className="flex items-center gap-2 text-green-400 text-xs tracking-widest uppercase font-semibold animate-pulse"><CheckCircle className="w-4 h-4" /> Post Saved</div>}</div>
              <button onClick={handleSave} disabled={saving}
                className="bg-gradient-to-r from-[#c2a66b] to-[#f4d083] text-[#050b14] px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-3 hover:shadow-[0_0_30px_rgba(194,166,107,0.3)] transition-all duration-300 disabled:opacity-50">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> {editingPost.id ? "Update" : "Publish"}</>}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---------- LIST VIEW ----------
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const pagePosts = posts.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    <div className="w-full relative">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold font-outfit text-white mb-1">Insights / Blog</h2>
            <p className="text-gray-500 text-xs tracking-widest uppercase">{posts.length} articles · {posts.filter(p => p.is_published).length} published</p>
          </div>
          <button onClick={handleNew}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c2a66b]/10 text-[#c2a66b] border border-[#c2a66b]/30 text-xs font-bold tracking-widest uppercase hover:bg-[#c2a66b] hover:text-[#050b14] transition-all duration-300">
            <Plus className="w-4 h-4" /> New Article
          </button>
        </div>

        {/* Posts Grid  */}
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-600">
            <FileText className="w-12 h-12 mb-4" />
            <p className="text-sm font-semibold mb-1">No articles yet</p>
            <p className="text-xs text-gray-700">Click "New Article" to write your first insight.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pagePosts.map((post) => (
              <div key={post.id} className="bg-[#0a1628] rounded-2xl border border-white/5 shadow-lg overflow-hidden hover:border-white/10 transition-all duration-200">
                <div className="flex items-center gap-3 px-4 py-3">
                  {/* Thumbnail */}
                  <div className="w-12 h-12 rounded-xl bg-[#050b14] border border-white/10 overflow-hidden flex-shrink-0">
                    {post.image_url ? <img src={post.image_url} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><FileText className="w-4 h-4 text-gray-600" /></div>}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => handleEdit(post)}>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white truncate hover:text-[#c2a66b] transition-colors">{post.title || "Untitled"}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase flex-shrink-0 ${post.is_published ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                        {post.is_published ? "Live" : "Draft"}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 truncate">
                      {post.category} · {post.author_name || "No author"} · {new Date(post.published_at || post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => handleEdit(post)} className="p-2 text-gray-600 hover:text-[#c2a66b] transition-colors rounded-lg hover:bg-white/5 text-[10px] font-bold tracking-widest uppercase">Edit</button>
                    <button onClick={() => handleDelete(post)} className="p-2 text-gray-600 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
    </div>
  );
}
