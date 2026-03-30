"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Save, Loader2, CheckCircle, Settings, ChevronRight, Upload, X, ImageIcon } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Settings state
  const [companyName, setCompanyName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [logoPreview, setLogoPreview] = useState("");

  const fileInputRef = useRef(null);

  // Check auth and load settings on mount
  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/admin";
        return;
      }
      setUser(user);

      const { data } = await supabase
        .from("site_settings")
        .select("key, value");

      if (data) {
        const map = {};
        data.forEach((row) => (map[row.key] = row.value));
        setCompanyName(map.company_name || "404 Services");
        setLogoUrl(map.logo_url || "/404 slogo.png");
        setLogoPreview(map.logo_url || "/404 slogo.png");
      }

      setLoading(false);
    };
    init();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      alert(`File too large. Maximum allowed size is 5MB. Your file is ${(file.size / (1024 * 1024)).toFixed(1)}MB.`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (PNG, JPG, SVG, WebP).");
      return;
    }

    setUploading(true);

    // Generate a unique filename
    const ext = file.name.split(".").pop();
    const fileName = `logo-${Date.now()}.${ext}`;
    const filePath = `branding/${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("404")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      alert("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from("404")
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;
    setLogoUrl(publicUrl);
    setLogoPreview(publicUrl);
    setUploading(false);
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    const updates = [
      { key: "company_name", value: companyName, updated_at: new Date().toISOString() },
      { key: "logo_url", value: logoUrl, updated_at: new Date().toISOString() },
    ];

    const { error } = await supabase
      .from("site_settings")
      .upsert(updates, { onConflict: "key" });

    setSaving(false);

    if (!error) {
      // Purge cache
      try { await fetch("/api/revalidate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ paths: ["/", "/about", "/portfolio", "/contact", "/services", "/insights"] }) }); } catch (e) {}
      setSaved(true);
      setHasChanges(false);
      setTimeout(() => setSaved(false), 3000);
    } else {
      alert("Save failed: " + error.message);
    }
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

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 tracking-widest uppercase mb-10">
          <span>Dashboard</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#c2a66b]">Site Settings</span>
        </div>

        {/* Section: Company Identity */}
        <div className="bg-[#0a1628] rounded-3xl p-8 md:p-10 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-8">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
            <div className="w-10 h-10 rounded-full bg-[#c2a66b]/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-[#c2a66b]" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-outfit text-white">Company Identity</h2>
              <p className="text-gray-500 text-xs tracking-widest uppercase">Name & Logo displayed across the site</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Company Name */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-300 text-xs font-semibold tracking-widest uppercase ml-1">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => { setCompanyName(e.target.value); setHasChanges(true); }}
                className="w-full bg-[#050b14] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#c2a66b]/50 focus:ring-1 focus:ring-[#c2a66b]/50 transition-all duration-300"
                placeholder="404 Services"
              />
            </div>

            {/* Logo Upload */}
            <div className="flex flex-col gap-3">
              <label className="text-gray-300 text-xs font-semibold tracking-widest uppercase ml-1">
                Company Logo
              </label>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Preview Box */}
                <div className="w-full sm:w-48 h-28 bg-[#050b14] border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden relative group">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className={`object-contain max-h-20 max-w-[140px] p-3 ${
                        logoPreview.startsWith("/") ? "brightness-0 invert" : ""
                      }`}
                    />

                  ) : (
                    <ImageIcon className="w-8 h-8 text-gray-600" />
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#050b14]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">Preview</span>
                  </div>
                </div>

                {/* Upload Controls */}
                <div className="flex-1 flex flex-col gap-3">
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl border border-dashed border-white/10 hover:border-[#c2a66b]/40 bg-[#050b14] text-gray-400 hover:text-white transition-all duration-300 disabled:opacity-50"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#c2a66b]" />
                        <span className="text-xs font-semibold tracking-widest uppercase">Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span className="text-xs font-semibold tracking-widest uppercase">Upload New Logo</span>
                      </>
                    )}
                  </button>

                  <p className="text-gray-600 text-[11px] ml-1 leading-relaxed">
                    Accepted formats: PNG, JPG, SVG, WebP. <br/>
                    <span className="text-[#c2a66b]/60">Max file size: 5MB</span>
                  </p>

                  {/* Current URL display */}
                  {logoUrl && (
                    <div className="flex items-center gap-2 bg-[#050b14] border border-white/5 rounded-lg px-3 py-2 mt-1">
                      <span className="text-[10px] text-gray-500 truncate flex-1 font-mono">{logoUrl}</span>
                      <button 
                        onClick={() => { setLogoUrl(""); setLogoPreview(""); setHasChanges(true); }}
                        className="text-gray-600 hover:text-red-400 transition-colors flex-shrink-0"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Save Bar */}
      <div className={`fixed bottom-0 left-0 right-0 lg:left-64 z-50 bg-[#050b14]/80 backdrop-blur-xl border-t border-white/5 px-6 lg:px-10 py-5 flex items-center justify-between shadow-[0_-20px_40px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out ${hasChanges || saved ? "translate-y-0" : "translate-y-[150%]"}`}>
        <div>
          {saved && (
            <div className="flex items-center gap-2 text-green-400 text-xs tracking-widest uppercase font-semibold animate-pulse">
              <CheckCircle className="w-4 h-4" />
              Settings Saved Successfully
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
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}
