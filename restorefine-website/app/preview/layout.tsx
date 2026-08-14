import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preview",
  robots: { index: false, follow: false },
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="sticky top-0 z-[100] bg-red-600 text-white text-center text-[11px] font-bold uppercase tracking-widest py-1.5">
        Preview — draft, not published
      </div>
      {children}
    </div>
  );
}
