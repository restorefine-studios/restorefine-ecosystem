import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "RestoRefine terms and conditions of service.",
  robots: { index: false, follow: false },
};

export default function Terms() {
  return (
    <main className="bg-white min-h-screen px-6 md:px-12 lg:px-24 py-32">
      <div className="max-w-3xl mx-auto">
        <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">
          Legal
        </span>
        <h1 className="text-5xl font-black uppercase tracking-tight text-zinc-900 mb-10">
          Terms &amp; <span className="text-red-600">Conditions</span>
        </h1>

        <div className="prose prose-zinc max-w-none text-zinc-600 leading-relaxed space-y-6 text-sm">
          <p>
            These Terms and Conditions govern your use of the RestoRefine website and the services provided by RestoRefine Ltd, registered in Scotland. By accessing our website or engaging our services, you agree to these terms.
          </p>

          <h2 className="text-zinc-900 font-black uppercase tracking-tight text-lg mt-8">Services</h2>
          <p>
            RestoRefine provides branding, web design, print, merchandise, social media, and photography services to the hospitality industry. All services are subject to a separate client agreement or proposal agreed in writing before work commences.
          </p>

          <h2 className="text-zinc-900 font-black uppercase tracking-tight text-lg mt-8">Intellectual Property</h2>
          <p>
            All creative work produced by RestoRefine remains the intellectual property of RestoRefine until full payment is received. Upon receipt of full payment, ownership of agreed deliverables transfers to the client as specified in the project agreement.
          </p>

          <h2 className="text-zinc-900 font-black uppercase tracking-tight text-lg mt-8">Payments</h2>
          <p>
            Payment terms are outlined in each project proposal. RestoRefine reserves the right to pause work on any project where payment is overdue.
          </p>

          <h2 className="text-zinc-900 font-black uppercase tracking-tight text-lg mt-8">Limitation of Liability</h2>
          <p>
            RestoRefine shall not be liable for any indirect, incidental, or consequential loss arising from the use of our services. Our total liability to any client shall not exceed the total fees paid for the relevant project.
          </p>

          <h2 className="text-zinc-900 font-black uppercase tracking-tight text-lg mt-8">Governing Law</h2>
          <p>
            These terms are governed by the laws of Scotland and England &amp; Wales. Any disputes shall be subject to the exclusive jurisdiction of the Scottish courts.
          </p>

          <h2 className="text-zinc-900 font-black uppercase tracking-tight text-lg mt-8">Contact</h2>
          <p>
            RestoRefine Ltd · 272 Bath Street · Glasgow · G2 4JR
            <br />
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
