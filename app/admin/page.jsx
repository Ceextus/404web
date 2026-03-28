"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { LogIn, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Redirect to the admin dashboard on success
    window.location.href = "/admin/dashboard";
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#050b14] relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#1a4fb0]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#c2a66b]/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold font-outfit text-white tracking-tight mb-3">
            Admin <span className="text-[#c2a66b]">Console</span>
          </h1>
          <p className="text-gray-500 text-sm tracking-widest uppercase">404 Services CMS</p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleLogin}
          className="bg-[#0a1628] rounded-3xl p-8 md:p-10 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-gray-300 text-xs font-semibold tracking-widest uppercase ml-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#050b14] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#c2a66b]/50 focus:ring-1 focus:ring-[#c2a66b]/50 transition-all duration-300"
                placeholder="admin@404services.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-300 text-xs font-semibold tracking-widest uppercase ml-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#050b14] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#c2a66b]/50 focus:ring-1 focus:ring-[#c2a66b]/50 transition-all duration-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-gradient-to-r from-[#c2a66b] to-[#f4d083] text-[#050b14] py-4 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(194,166,107,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Authenticate
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
