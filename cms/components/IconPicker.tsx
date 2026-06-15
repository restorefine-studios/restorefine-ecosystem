"use client";

import { useState, useRef, useEffect } from "react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Curated shortlist shown by default before the user searches.
const POPULAR_ICON_NAMES = [
  "Search","Share2","Target","Palette","TrendingUp","Wrench","Clock","Star","Heart","Zap",
  "Globe","Shield","Award","BarChart2","BarChart","Users","MessageSquare","Phone","Mail","MapPin",
  "Lightbulb","Rocket","CheckCircle","Check","ArrowRight","ArrowUpRight","Code","Database","Server",
  "Lock","Key","Camera","Video","Mic","ShoppingCart","CreditCard","Package","Truck","Book",
  "FileText","Clipboard","PenTool","Layers","Layout","Monitor","Smartphone","Tablet","Wifi",
  "Cloud","Download","Upload","RefreshCw","Settings","Sliders","ToggleLeft","Eye","EyeOff",
  "Bell","Calendar","Compass","Cpu","Edit","Flag","Folder","Gift","Home","Image",
  "Info","Link","List","Maximize","Minus","Plus","Tag","Trash","User","Volume2",
  "Briefcase","Building","Coffee","Flame","Headphones","MessageCircle","Music","Navigation",
  "Scissors","Send","ThumbsUp","Tool","Twitter","Youtube","Instagram","Linkedin",
];

// Every Lucide icon component, minus the deprecated "...Icon"-suffixed aliases.
const ALL_ICON_NAMES = Object.keys(Icons).filter((name) => {
  const exp = (Icons as unknown as Record<string, unknown>)[name];
  if (typeof exp !== "object" || exp === null) return false;
  if (!/^[A-Z]/.test(name) || name === "Icon") return false;
  if (name.endsWith("Icon") && Object.prototype.hasOwnProperty.call(Icons, name.slice(0, -4))) return false;
  return true;
}).sort();

const MAX_SEARCH_RESULTS = 150;

interface Props {
  value: string;
  onChange: (name: string) => void;
}

export default function IconPicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (btnRef.current && !btnRef.current.contains(e.target as Node)) {
        const dropdown = document.getElementById("icon-picker-dropdown");
        if (dropdown && !dropdown.contains(e.target as Node)) setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  function openDropdown() {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setPos({ top: rect.bottom + 6, left: rect.left, width: Math.max(rect.width, 320) });
    setOpen(o => !o);
  }

  const filtered = search
    ? ALL_ICON_NAMES.filter(n => n.toLowerCase().includes(search.toLowerCase())).slice(0, MAX_SEARCH_RESULTS)
    : POPULAR_ICON_NAMES;
  const SelectedIcon = value ? (Icons[value as keyof typeof Icons] as LucideIcon) : null;

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={openDropdown}
        className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 transition text-sm text-gray-700 w-full"
      >
        {SelectedIcon
          ? <><SelectedIcon className="w-4 h-4 text-red-500 flex-shrink-0" /><span className="font-medium">{value}</span></>
          : <span className="text-gray-400">Select an icon (optional)</span>
        }
        <Icons.ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-auto flex-shrink-0" />
      </button>

      {open && (
        <div
          id="icon-picker-dropdown"
          style={{ position: "fixed", top: pos.top, left: pos.left, width: pos.width, zIndex: 9999 }}
          className="bg-white border border-gray-200 rounded-xl shadow-2xl p-3"
        >
          <div className="flex gap-2 mb-3">
            <input
              autoFocus
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={`Search ${ALL_ICON_NAMES.length.toLocaleString()} icons...`}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-gray-400"
            />
            {value && (
              <button type="button" onClick={() => { onChange(""); setOpen(false); }}
                className="text-xs text-red-400 hover:text-red-600 font-semibold px-2">
                Clear
              </button>
            )}
          </div>
          {!search && (
            <p className="text-[10px] text-gray-400 mb-2 -mt-1">Popular icons — search for more</p>
          )}
          <div className="grid grid-cols-6 gap-1 max-h-56 overflow-y-auto pr-1">
            {filtered.map(name => {
              const Icon = Icons[name as keyof typeof Icons] as LucideIcon;
              if (!Icon) return null;
              return (
                <button key={name} type="button" title={name}
                  onClick={() => { onChange(name); setOpen(false); setSearch(""); }}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-red-50 transition group ${value === name ? "bg-red-50 ring-1 ring-red-300" : ""}`}
                >
                  <Icon className={`w-5 h-5 ${value === name ? "text-red-500" : "text-gray-500 group-hover:text-red-500"}`} />
                  <span className="text-[8px] text-gray-400 truncate w-full text-center leading-tight">{name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
