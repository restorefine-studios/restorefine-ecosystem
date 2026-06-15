import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "RestoRefine cookie policy — how we use cookies on our website.",
  robots: { index: false, follow: false },
};

export default function CookiePolicy() {
  return (
    <main className="bg-white min-h-screen px-6 md:px-12 lg:px-24 py-32">
      <div className="max-w-3xl mx-auto">
        <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">
          Legal
        </span>
        <h1 className="text-5xl font-black uppercase tracking-tight text-zinc-900 mb-10">
          Cookie <span className="text-red-600">Policy</span>
        </h1>

        <div className="prose prose-zinc max-w-none text-zinc-600 leading-relaxed space-y-6 text-sm">
          <p>
            This Cookie Policy explains how RestoRefine Ltd uses cookies and similar tracking technologies on <strong>www.restorefine.co.uk</strong>.
          </p>

          <h2 className="text-zinc-900 font-black uppercase tracking-tight text-lg mt-8">What Are Cookies</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. They help us understand how visitors interact with our site and improve your experience.
          </p>

          <h2 className="text-zinc-900 font-black uppercase tracking-tight text-lg mt-8">Cookies We Use</h2>
          <p>
            We use the following types of cookies:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-zinc-800">Essential cookies</strong> — required for the website to function correctly.
            </li>
            <li>
              <strong className="text-zinc-800">Analytics cookies</strong> — we use Google Analytics to understand site traffic and improve our content. This data is anonymised.
            </li>
            <li>
              <strong className="text-zinc-800">Performance cookies</strong> — Vercel Speed Insights and Analytics to monitor site performance.
            </li>
          </ul>

          <h2 className="text-zinc-900 font-black uppercase tracking-tight text-lg mt-8">Managing Cookies</h2>
          <p>
            You can control and delete cookies through your browser settings. Disabling cookies may affect the functionality of certain parts of our website.
          </p>

          <h2 className="text-zinc-900 font-black uppercase tracking-tight text-lg mt-8">Contact</h2>
          <p>
            If you have questions about our use of cookies, please contact us at{" "}
            <a href="mailto:hello@restorefine.com" className="text-red-600 hover:underline">
              hello@restorefine.com
            </a>.
          </p>

          <p className="text-zinc-400 text-xs mt-10">Last updated: April 2025</p>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200">
          <Link
            href="/"
            className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
