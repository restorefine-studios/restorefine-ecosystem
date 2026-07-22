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
              <strong className="text-zinc-800">Necessary cookies</strong> — required for the website to function correctly. We do not currently set any of these beyond what your browser needs to load the site.
            </li>
            <li>
              <strong className="text-zinc-800">Analytics cookies</strong> — Google Analytics and Microsoft Clarity, used to understand site traffic and improve our content. These only load if you select &ldquo;Accept All&rdquo; on our cookie banner.
            </li>
            <li>
              <strong className="text-zinc-800">Performance monitoring</strong> — Vercel Speed Insights and Analytics, used to monitor site performance. These are cookieless and collect no personal data, so they run regardless of your cookie choice below.
            </li>
          </ul>

          <h2 className="text-zinc-900 font-black uppercase tracking-tight text-lg mt-8">Your Choices</h2>
          <p>
            When you first visit our site, a banner lets you <strong className="text-zinc-800">Accept All</strong> or <strong className="text-zinc-800">Reject All</strong> analytics cookies. If you reject, Google Analytics and Microsoft Clarity will not load on your device. You can change your choice at any time using the &ldquo;Cookie Settings&rdquo; link in our website footer.
          </p>

          <h2 className="text-zinc-900 font-black uppercase tracking-tight text-lg mt-8">Managing Cookies</h2>
          <p>
            You can also control and delete cookies through your browser settings. Disabling cookies may affect the functionality of certain parts of our website.
          </p>

          <h2 className="text-zinc-900 font-black uppercase tracking-tight text-lg mt-8">Contact</h2>
          <p>
            If you have questions about our use of cookies, please contact us at{" "}
            <a href="mailto:hello@restorefine.com" className="text-red-600 hover:underline">
              hello@restorefine.com
            </a>.
          </p>

          <p className="text-zinc-400 text-xs mt-10">Last updated: July 2026</p>
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
