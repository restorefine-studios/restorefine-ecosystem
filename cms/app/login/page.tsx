"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital@1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lr-root {
          display: flex;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Left dark panel ── */
        .lr-left {
          width: 50%;
          background: #0c0c0c;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2.75rem 3rem;
          position: relative;
          overflow: hidden;
        }

        .lr-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 20% 80%, rgba(220,38,38,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .lr-brand {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          color: #444;
          text-transform: uppercase;
        }

        .lr-headline-wrap {
          text-align: left;
        }

        .lr-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(4.5rem, 6.5vw, 7rem);
          line-height: 0.88;
          color: #fff;
          letter-spacing: 0.01em;
          display: block;
        }

        .lr-italic {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: clamp(3.8rem, 5.5vw, 6rem);
          color: #fff;
          line-height: 1.05;
          display: block;
        }

        .lr-dot {
          color: #dc2626;
        }

        .lr-desc {
          margin-top: 1.75rem;
          font-size: 0.78rem;
          color: #555;
          line-height: 1.7;
          max-width: 270px;
          font-weight: 300;
        }

        .lr-footer {
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          color: #333;
          text-transform: uppercase;
          font-weight: 500;
        }

        /* ── Right white panel ── */
        .lr-right {
          width: 50%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
        }

        .lr-form-wrap {
          width: 100%;
          max-width: 340px;
        }

        .lr-eyebrow {
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #aaa;
          font-weight: 600;
          margin-bottom: 0.35rem;
        }

        .lr-subtitle {
          font-size: 0.82rem;
          color: #999;
          margin-bottom: 2.75rem;
          font-weight: 300;
        }

        .lr-field {
          margin-bottom: 1.25rem;
        }

        .lr-label {
          display: block;
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #aaa;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .lr-input {
          width: 100%;
          border: 1px solid #e8e8e8;
          border-radius: 7px;
          padding: 0.78rem 1rem;
          font-size: 0.875rem;
          color: #111;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.15s;
          background: #fafafa;
        }

        .lr-input:focus {
          border-color: #bbb;
          background: #fff;
        }

        .lr-input::placeholder {
          color: #ccc;
        }

        .lr-pw-wrap {
          position: relative;
        }

        .lr-pw-wrap .lr-input {
          padding-right: 2.75rem;
        }

        .lr-eye {
          position: absolute;
          right: 0.9rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #ccc;
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.15s;
        }

        .lr-eye:hover {
          color: #888;
        }

        .lr-error {
          font-size: 0.78rem;
          color: #dc2626;
          margin-bottom: 0.75rem;
          font-weight: 400;
        }

        .lr-btn {
          width: 100%;
          background: #dc2626;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          border: none;
          border-radius: 100px;
          padding: 1rem 1.5rem;
          cursor: pointer;
          margin-top: 0.25rem;
          transition: background 0.15s, transform 0.1s, opacity 0.15s;
        }

        .lr-btn:hover:not(:disabled) {
          background: #b91c1c;
        }

        .lr-btn:active:not(:disabled) {
          transform: scale(0.985);
        }

        .lr-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .lr-root { flex-direction: column; }
          .lr-left { width: 100%; min-height: 42vh; padding: 2rem; }
          .lr-right { width: 100%; padding: 2.5rem 1.5rem; }
          .lr-headline-wrap { margin-bottom: 2rem; }
        }
      `}</style>

      <div className="lr-root">
        {/* ── Left panel ── */}
        <div className="lr-left">
          <span className="lr-brand">RestoRefine</span>

          <div className="lr-headline-wrap">
            <span className="lr-headline">CONTENT<br />ADMIN</span>
            <span className="lr-italic">Studio<span className="lr-dot">.</span></span>
            <p className="lr-desc">
              Internal CMS for managing blog posts and content on the RestoRefine platform.
            </p>
          </div>

          <span className="lr-footer">Admin Access Only — © 2026</span>
        </div>

        {/* ── Right panel ── */}
        <div className="lr-right">
          <div className="lr-form-wrap">
            <p className="lr-eyebrow">Sign In</p>
            <p className="lr-subtitle">Use your admin credentials to continue.</p>

            <form onSubmit={handleLogin}>
              <div className="lr-field">
                <label className="lr-label">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="lr-input"
                  placeholder="admin@restorefine.co.uk"
                />
              </div>

              <div className="lr-field">
                <label className="lr-label">Password</label>
                <div className="lr-pw-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="lr-input"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="lr-eye"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && <p className="lr-error">{error}</p>}

              <button type="submit" disabled={loading} className="lr-btn">
                {loading ? "Signing in…" : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
