import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "RestoRefine privacy policy — how we collect, use, and protect your data.",
  robots: { index: false, follow: false },
};

export default function PrivacyPolicy() {
  return (
    <main className="bg-white min-h-screen px-6 md:px-12 lg:px-24 py-32">
      <div className="max-w-3xl mx-auto">
        <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">
          Legal
        </span>
        <h1 className="text-5xl font-black uppercase tracking-tight text-zinc-900 mb-10">
          Privacy <span className="text-red-600">Policy</span>
        </h1>

        <div className="prose prose-zinc max-w-none text-zinc-600 leading-relaxed space-y-6 text-sm">
          <p>
            RestoRefine Ltd (&ldquo;RestoRefine&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit{" "}
            <strong>www.restorefine.co.uk</strong> or engage our services.
          </p>

          <h2 className="text-zinc-900 font-black uppercase tracking-tight text-lg mt-8">Information We Collect</h2>
          <p>
            We may collect personal information you voluntarily provide when you submit an enquiry form, contact us by email, or engage our services. This may include your name, email address, phone number, and business details.
          </p>

          <h2 className="text-zinc-900 font-black uppercase tracking-tight text-lg mt-8">How We Use Your Information</h2>
          <p>
            We use the information we collect to respond to your enquiries, deliver our services, send relevant communications, and improve our website and offerings. We do not sell or share your personal data with third parties for marketing purposes.
          </p>

          <h2 className="text-zinc-900 font-black uppercase tracking-tight text-lg mt-8">Data Retention</h2>
          <p>
            We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by law.
          </p>

          <h2 className="text-zinc-900 font-black uppercase tracking-tight text-lg mt-8">Your Rights</h2>
          <p>
            Under UK GDPR, you have the right to access, correct, or request deletion of your personal data. To exercise these rights, please contact us at{" "}
            <a href="mailto:hello@restorefine.com" className="text-red-600 hover:underline">
              hello@restorefine.com
            </a>.
          </p>

          <h2 className="text-zinc-900 font-black uppercase tracking-tight text-lg mt-8">Contact</h2>
          <p>
            RestoRefine Ltd · 272 Bath Street · Glasgow · G2 4JR · United Kingdom
            <br />
            Email:{" "}
            <a href="mailto:hello@restorefine.com" className="text-red-600 hover:underline">
              hello@restorefine.com
            </a>
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
