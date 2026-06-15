"use client";

import { useState, useEffect, useCallback } from "react";

export interface TocItem {
  id: string;
  label: string;
  children?: TocItem[];
}

interface TocProps {
  title: string;
  items: TocItem[];
}

export function TableOfContents({ title, items }: TocProps) {
  const [activeId, setActiveId] = useState<string>("");

  // Flatten all IDs for observation
  const allIds = items.flatMap((item) =>
    item.children ? [item.id, ...item.children.map((c) => c.id)] : [item.id]
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveId(id);
          });
        },
        { rootMargin: "-5% 0px -35% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const isActive = (id: string) => activeId === id;
  const isChildActive = (item: TocItem) =>
    item.children?.some((c) => c.id === activeId) ?? false;

  if (items.length === 0) return <aside className="hidden lg:block" />;

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28">
        <div className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          <p className="text-[9px] font-black uppercase tracking-[0.35em] text-zinc-400 mb-3">
            Guide Contents
          </p>
          <h3 className="text-sm font-bold text-zinc-900 leading-snug mb-4 pr-2">
            {title}
          </h3>
          <div className="h-px bg-zinc-100 mb-3" />
          <nav className="space-y-0.5">
            {items.map((item) => {
              const active = isActive(item.id);
              const childActive = isChildActive(item);

              return (
                <div key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`w-full text-left py-2 pr-3 rounded-lg text-[12.5px] leading-snug transition-all duration-200 ${
                      active || childActive
                        ? "border-l-2 border-red-600 pl-2.5 text-red-600 bg-red-50/70 font-semibold"
                        : "pl-3 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50"
                    }`}
                  >
                    <span className="line-clamp-1">{item.label}</span>
                  </button>

                  {item.children && (
                    <div className="ml-3 mt-0.5 space-y-0.5 border-l border-zinc-100 pl-2">
                      {item.children.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => scrollTo(child.id)}
                          className={`w-full text-left py-1.5 pr-3 rounded-lg text-[11.5px] leading-snug transition-all duration-200 ${
                            isActive(child.id)
                              ? "pl-2 text-red-500 font-semibold"
                              : "pl-2 text-zinc-400 hover:text-zinc-700"
                          }`}
                        >
                          <span className="line-clamp-1">{child.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}
