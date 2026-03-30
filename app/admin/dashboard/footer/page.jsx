"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Loader2, CheckCircle, Globe, Mail, MapPin, Phone, Twitter, Linkedin, Github, Instagram, MessageCircle } from "lucide-react";

const FIELDS = [
  { section: "Contact Information", fields: [
    { key: "contact_email", label: "Contact Email", icon: Mail, placeholder: "hello@404services.com" },
    { key: "contact_phone", label: "Phone Number", icon: Phone, placeholder: "+234 800 000 0000" },
    { key: "contact_address", label: "Office Location", icon: MapPin, placeholder: "Lagos, Nigeria" },
    { key: "footer_description", label: "Footer Description", icon: Globe, placeholder: "Brief company description for the footer...", multiline: true },
    { key: "availability_text", label: "Availability Status", icon: MessageCircle, placeholder: "Available for global remote projects" },
  ]},
  { section: "Social Media Links", fields: [
    { key: "social_twitter", label: "Twitter / X", icon: Twitter, placeholder: "https://x.com/404services" },
    { key: "social_linkedin", label: "LinkedIn", icon: Linkedin, placeholder: "https://linkedin.com/company/404services" },
    { key: "social_github", label: "GitHub", icon: Github, placeholder: "https://github.com/404services" },
    { key: "social_instagram", label: "Instagram", icon: Instagram, placeholder: "https://instagram.com/404services" },
  ]},
];

export default function FooterContactPage() {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/admin"; return; }
      const { data } = await supabase.from("site_settings").select("key, value");
      if (data) {
        const map = {};
        data.forEach((r) => (map[r.key] = r.value));
        setValues(map);
      }
      setLoading(false);
    };
    init();
  }, []);

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true); setSaved(false);
    const allKeys = FIELDS.flatMap((s) => s.fields.map((f) => f.key));
    const updates = allKeys.map((key) => ({
      key,
      value: values[key] || "",
      updated_at: new Date().toISOString(),
    }));
    const { error } = await supabase.from("site_settings").upsert(updates, { onConflict: "key" });
    if (error) { alert("Save failed: " + error.message); setSaving(false); return; }
    try { await fetch("/api/revalidate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ paths: ["/", "/insights", "/portfolio", "/about", "/services", "/contact"] }) }); } catch (e) {}
    setSaving(false); setSaved(true); setHasChanges(false);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <div className="flex items-center justify-center py-32"><Loader2 className="w-8 h-8 text-[#c2a66b] animate-spin" /></div>;

  return (
    <div className="w-full relative pb-24">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold font-outfit text-white mb-1">Footer & Contact</h2>
          <p className="text-gray-500 text-xs tracking-widest uppercase">Manage contact details, social links, and footer content</p>
        </div>

        {FIELDS.map((section) => (
          <div key={section.section} className="mb-10">
            <h3 className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-[#c2a66b]"></span>
              {section.section}
            </h3>
            <div className="space-y-4">
              {section.fields.map((field) => (
                <div key={field.key} className="bg-[#0a1628] rounded-2xl border border-white/5 p-5 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <field.icon className="w-3.5 h-3.5 text-[#c2a66b]" />
                    <label className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase">{field.label}</label>
                  </div>
                  {field.multiline ? (
                    <textarea
                      rows={3}
                      value={values[field.key] || ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-[#050b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c2a66b]/50 transition-all resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={values[field.key] || ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-[#050b14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c2a66b]/50 transition-all"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Sticky Save Bar */}
        {(hasChanges || saved) && (
          <div className="sticky bottom-0 left-0 right-0 z-50 bg-[#050b14]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.5)] mt-8 -mx-4 md:-mx-8 rounded-t-2xl">
            <div>{saved && <div className="flex items-center gap-2 text-green-400 text-xs tracking-widest uppercase font-semibold animate-pulse"><CheckCircle className="w-4 h-4" /> Settings Saved</div>}</div>
            <button onClick={handleSave} disabled={saving}
              className="bg-gradient-to-r from-[#c2a66b] to-[#f4d083] text-[#050b14] px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-3 hover:shadow-[0_0_30px_rgba(194,166,107,0.3)] transition-all duration-300 disabled:opacity-50">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Save Changes</>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
