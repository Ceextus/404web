"use client";

import { useState } from "react";
import { BookOpen, Database, Image, FileText, Users, Briefcase, Globe, Settings, ChevronDown, Terminal, Shield, Zap, ExternalLink } from "lucide-react";

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Zap,
    content: [
      { type: "p", text: "Welcome to the 404 Services CMS. This dashboard allows you to manage all content on your website without touching any code." },
      { type: "h3", text: "First-Time Setup" },
      { type: "ol", items: [
        "Ensure you have a Supabase project with the correct URL and anon key in your .env.local file.",
        "Run all SQL migration files (000 through 007) in the Supabase SQL Editor — in order.",
        "Create a storage bucket named \"404\" in Supabase Storage, set it to Public.",
        "Sign up for an account via Supabase Auth (Email/Password).",
        "Log in at /admin to access this dashboard.",
      ]},
      { type: "h3", text: "Environment Variables" },
      { type: "code", text: "NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co\nNEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key" },
    ],
  },
  {
    id: "identity",
    title: "Identity & Branding",
    icon: Settings,
    content: [
      { type: "p", text: "Manage your company name and logo from the main Dashboard page." },
      { type: "h3", text: "Company Name" },
      { type: "p", text: "Used in the navbar, footer copyright, and meta tags across the site. Changes take effect after saving and refreshing the public site." },
      { type: "h3", text: "Logo Upload" },
      { type: "ul", items: [
        "Supported formats: PNG, JPG, SVG, WebP",
        "Maximum file size: 5MB",
        "The logo is uploaded to Supabase Storage (404/branding/ folder)",
        "If the logo is a local file (starts with /), it will be auto-inverted to white for the dark background",
      ]},
    ],
  },
  {
    id: "hero",
    title: "Hero Section",
    icon: Image,
    content: [
      { type: "p", text: "The hero section is the first thing visitors see on the homepage. It supports multiple slides with a cinematic transition effect." },
      { type: "h3", text: "Managing Slides" },
      { type: "ul", items: [
        "Each slide has a badge text, headline, subtext, image, and CTA button",
        "Upload high-resolution images (1920×1080 recommended) for best quality",
        "Slides are ordered by sort_order — drag to reorder or use the number field",
        "Add or remove slides as needed — the hero carousel adapts automatically",
      ]},
      { type: "h3", text: "Best Practices" },
      { type: "p", text: "Keep headlines punchy (under 8 words). Use the badge text for context (e.g., 'New Service' or 'Featured'). CTA buttons should use clear action verbs." },
    ],
  },
  {
    id: "about",
    title: "About & Homepage About",
    icon: FileText,
    content: [
      { type: "p", text: "Two separate sections manage the About content:" },
      { type: "h3", text: "About Details (/admin/dashboard/about)" },
      { type: "p", text: "Manages the dedicated /about page content. Uses section_key based rows for different content blocks (mission, vision, story, etc.)." },
      { type: "h3", text: "Homepage About (/admin/dashboard/homepage-about)" },
      { type: "p", text: "Controls the About preview shown on the homepage. Includes a brand story block and editable pillars (strength cards). Each pillar has a title, description, and sort order." },
    ],
  },
  {
    id: "team",
    title: "Core Team",
    icon: Users,
    content: [
      { type: "p", text: "Manage team members and core values displayed on the homepage." },
      { type: "h3", text: "Team Members" },
      { type: "ul", items: [
        "Each member has: Name, Role, Bio, Photo, LinkedIn URL, Twitter URL",
        "Photos are uploaded to Supabase Storage (404/team/ folder)",
        "Members are ordered by sort_order",
        "Maximum photo size: 5MB",
      ]},
      { type: "h3", text: "Core Values" },
      { type: "p", text: "Simple title + description cards displayed below the team section. Add, edit, or remove as needed." },
    ],
  },
  {
    id: "portfolio",
    title: "Portfolio Projects",
    icon: Briefcase,
    content: [
      { type: "p", text: "Manage your portfolio of live projects. Projects appear on both the homepage (featured only) and the /portfolio page." },
      { type: "h3", text: "Project Fields" },
      { type: "ul", items: [
        "Title — The project name",
        "Category — Choose from: Web Architecture, Mobile Solutions, Cinematic UI/UX, SaaS & Cloud Engines",
        "Client — The client name",
        "Project URL — Required field, links to the live project",
        "Description — Brief project summary",
        "Image — Cover thumbnail (uploaded to Supabase Storage)",
        "Featured — Toggle to show on the homepage bento grid (max 4 recommended)",
      ]},
      { type: "h3", text: "Ordering" },
      { type: "p", text: "Drag the grip handle (⠿) to reorder projects, or use the up/down arrows. The sort order determines display sequence on both the homepage and portfolio page." },
      { type: "h3", text: "Pagination" },
      { type: "p", text: "The admin shows 5 projects per page. Use the pagination controls at the bottom to navigate between pages." },
    ],
  },
  {
    id: "blog",
    title: "Insights / Blog",
    icon: BookOpen,
    content: [
      { type: "p", text: "Write and publish articles that appear on the /insights page. Articles use slug-based URLs for SEO-friendly links." },
      { type: "h3", text: "Creating an Article" },
      { type: "ol", items: [
        "Click 'New Article' to open the editor",
        "Enter a title — the URL slug auto-generates from it",
        "Upload a cover image (shown on the listing and article pages)",
        "Fill in category, author name, author role, and read time",
        "Write the article content using Markdown",
        "Toggle the status from 'Draft' to 'Published' when ready",
        "Hit Save — the article is now live",
      ]},
      { type: "h3", text: "Markdown Formatting" },
      { type: "code", text: "## Section Heading\n### Sub-heading\n\nRegular paragraph text.\n\n**Bold text** and *italic text* are supported." },
      { type: "h3", text: "Draft vs Published" },
      { type: "ul", items: [
        "Draft — Only visible in the admin, not on the public site",
        "Published — Live on /insights and accessible at /insights/your-slug",
        "You can toggle between states at any time",
      ]},
    ],
  },
  {
    id: "footer",
    title: "Footer & Contact",
    icon: Globe,
    content: [
      { type: "p", text: "Manage contact information and social media links displayed in the site footer." },
      { type: "h3", text: "Available Fields" },
      { type: "ul", items: [
        "Contact Email — Displayed with a mailto: link",
        "Phone Number — Only shown if provided",
        "Office Location — Text describing your location",
        "Footer Description — Company description in the footer",
        "Availability Status — Text next to the gold pulsing indicator",
        "Social Links — Twitter/X, LinkedIn, GitHub, Instagram (only icons with URLs are shown)",
      ]},
      { type: "p", text: "All fields are optional. The footer uses sensible defaults when fields are empty." },
    ],
  },
  {
    id: "database",
    title: "Database & Migrations",
    icon: Database,
    content: [
      { type: "p", text: "The CMS uses Supabase (PostgreSQL) with the following tables:" },
      { type: "table", headers: ["Migration", "Table", "Purpose"], rows: [
        ["000", "Storage Bucket", "Creates the '404' public storage bucket"],
        ["001", "site_settings", "Key-value store for branding, contact, social links"],
        ["002", "hero_slides", "Homepage hero carousel slides"],
        ["003", "about_content", "About page section content"],
        ["004", "homepage_about", "Homepage about section + pillars"],
        ["005", "team_members + core_values", "Team and values data"],
        ["006", "projects", "Portfolio projects"],
        ["007", "blog_posts", "Blog articles with slugs"],
      ]},
      { type: "h3", text: "Running Migrations" },
      { type: "ol", items: [
        "Go to your Supabase project → SQL Editor",
        "Open each migration file from lib/migrations/ in order (000 first, 007 last)",
        "Copy the SQL content and execute it",
        "All migrations are idempotent — safe to run multiple times",
      ]},
    ],
  },
  {
    id: "storage",
    title: "Storage & Media",
    icon: Image,
    content: [
      { type: "p", text: "All uploaded images are stored in Supabase Storage under the '404' bucket." },
      { type: "h3", text: "Folder Structure" },
      { type: "code", text: "404/\n├── branding/     → Logos\n├── hero/         → Hero slide images\n├── team/         → Team member photos\n├── portfolio/    → Project thumbnails\n└── blog/         → Blog cover images" },
      { type: "h3", text: "Requirements" },
      { type: "ul", items: [
        "The '404' bucket must be set to Public in Supabase Storage settings",
        "Maximum upload size: 5MB per file",
        "Supported formats: PNG, JPG, WebP, SVG (images only)",
        "RLS policies: Public SELECT, Authenticated INSERT/UPDATE/DELETE",
      ]},
    ],
  },
  {
    id: "cache",
    title: "Caching & Revalidation",
    icon: Zap,
    content: [
      { type: "p", text: "Public pages are cached for 60 seconds using Next.js ISR (Incremental Static Regeneration). When you save changes in the admin, the cache is automatically purged via the /api/revalidate endpoint." },
      { type: "h3", text: "How It Works" },
      { type: "ol", items: [
        "You save content in the admin dashboard",
        "The save handler calls POST /api/revalidate with the affected page paths",
        "Next.js immediately purges the cached HTML for those paths",
        "The next visitor gets a freshly-rendered page with updated content",
      ]},
      { type: "p", text: "In development mode (npm run dev), pages are always server-rendered on every request, so caching behavior is mostly relevant in production." },
    ],
  },
  {
    id: "security",
    title: "Security & Auth",
    icon: Shield,
    content: [
      { type: "p", text: "The admin dashboard is protected by Supabase Authentication." },
      { type: "h3", text: "Access Control" },
      { type: "ul", items: [
        "All admin pages check for an authenticated user on mount",
        "If no user is found, you're redirected to /admin (login page)",
        "Database tables use Row Level Security (RLS) policies",
        "Public visitors can only READ published content",
        "Only authenticated users can INSERT, UPDATE, or DELETE records",
      ]},
      { type: "h3", text: "Creating Admin Users" },
      { type: "p", text: "New admin users must be created through the Supabase Auth dashboard. Go to Authentication → Users → Add User. Email/Password method is used." },
    ],
  },
];

function RenderContent({ content }) {
  return content.map((block, i) => {
    switch (block.type) {
      case "p":
        return <p key={i} className="text-gray-400 text-sm leading-relaxed mb-4">{block.text}</p>;
      case "h3":
        return <h3 key={i} className="text-white text-sm font-bold font-outfit mt-6 mb-2 flex items-center gap-2"><span className="w-4 h-[1px] bg-[#c2a66b]"></span>{block.text}</h3>;
      case "ul":
        return <ul key={i} className="space-y-1.5 mb-4 ml-4">{block.items.map((item, j) => <li key={j} className="text-gray-400 text-sm flex gap-2"><span className="text-[#c2a66b] mt-1.5 w-1 h-1 rounded-full bg-[#c2a66b] flex-shrink-0"></span>{item}</li>)}</ul>;
      case "ol":
        return <ol key={i} className="space-y-1.5 mb-4 ml-4">{block.items.map((item, j) => <li key={j} className="text-gray-400 text-sm flex gap-2"><span className="text-[#c2a66b] text-xs font-bold w-5 flex-shrink-0">{j + 1}.</span>{item}</li>)}</ol>;
      case "code":
        return <pre key={i} className="bg-[#050b14] border border-white/5 rounded-xl px-4 py-3 text-xs text-gray-300 font-mono overflow-x-auto mb-4 leading-relaxed whitespace-pre-wrap">{block.text}</pre>;
      case "table":
        return (
          <div key={i} className="overflow-x-auto mb-4 rounded-xl border border-white/5">
            <table className="w-full text-sm">
              <thead><tr className="bg-[#050b14]">{block.headers.map((h, j) => <th key={j} className="text-left px-4 py-2 text-gray-500 text-[10px] font-bold tracking-widest uppercase border-b border-white/5">{h}</th>)}</tr></thead>
              <tbody>{block.rows.map((row, j) => <tr key={j} className="border-b border-white/5 last:border-none hover:bg-white/[0.02]">{row.map((cell, k) => <td key={k} className="px-4 py-2 text-gray-400 text-xs">{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  });
}

export default function DocsPage() {
  const [openSection, setOpenSection] = useState("getting-started");

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold font-outfit text-white mb-1">Documentation</h2>
          <p className="text-gray-500 text-xs tracking-widest uppercase">Complete guide to managing your 404 Services CMS</p>
        </div>

        {/* Quick Nav */}
        <div className="flex flex-wrap gap-2 mb-8">
          {sections.map((s) => (
            <button key={s.id} onClick={() => setOpenSection(s.id)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all ${openSection === s.id ? "bg-[#c2a66b]/10 text-[#c2a66b] border border-[#c2a66b]/30" : "bg-[#0a1628] text-gray-500 border border-white/5 hover:text-white"}`}>
              {s.title}
            </button>
          ))}
        </div>

        {/* Accordion Sections */}
        <div className="space-y-3">
          {sections.map((section) => {
            const isOpen = openSection === section.id;
            return (
              <div key={section.id} className="bg-[#0a1628] rounded-2xl border border-white/5 shadow-lg overflow-hidden">
                <button onClick={() => setOpenSection(isOpen ? null : section.id)}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors">
                  <section.icon className={`w-4 h-4 flex-shrink-0 ${isOpen ? "text-[#c2a66b]" : "text-gray-600"}`} />
                  <span className={`text-sm font-semibold flex-1 ${isOpen ? "text-white" : "text-gray-400"}`}>{section.title}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-white/5">
                    <RenderContent content={section.content} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-xs tracking-widest uppercase">404 Services CMS · Built with Next.js & Supabase</p>
        </div>
      </div>
    </div>
  );
}
