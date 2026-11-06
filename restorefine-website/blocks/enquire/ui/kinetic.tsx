import type { CSSProperties, ReactNode } from "react";
import "./kinetic.css";

/*
 * Kinetic answer faces. The answer's name is the hero, animated in a way that acts
 * it out (Logo Design gets a selection box and a weight morph, ASAP dashes in, Flexible
 * stretches...), set as extruded 3D type on a slowly orbiting stage, with one small live
 * prop above it. The real label is in the button for screen readers; this is decoration.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;
type Mode = "static" | "rise" | "flap" | "assemble" | "shuffle" | "dash" | "drop" | "weight" | "fonts" | "stretch" | "launch" | "type" | "roll";

const anim = (name: string, extra: Vars = {}): Vars => ({ animationName: name, ...extra });
/** Deterministic scatter, so server and browser render the same */
const rand = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/** Splits the title into words of letters; each letter carries its stagger index and scatter */
function Letters({ text }: { text: string }) {
  let n = 0;
  return (
    <>
      {text.split(" ").map((word, w, all) => (
        <span key={w} className="kc-word">
          <span className="kc-mask">
            {Array.from(word).map((ch) => {
              const i = n++;
              const style: Vars = {
                "--i": i,
                "--x": `${Math.round((rand(i, 1) - 0.5) * 70)}px`,
                "--y": `${Math.round((rand(i, 2) - 0.5) * 50)}px`,
                "--r": `${Math.round((rand(i, 3) - 0.5) * 140)}deg`,
              };
              return (
                <span key={i} className="kc-l" style={style}>
                  {ch}
                </span>
              );
            })}
          </span>
          {w < all.length - 1 && " "}
        </span>
      ))}
    </>
  );
}

/** Budget amounts roll like an odometer; non-digits stay put */
function Odometer({ text }: { text: string }) {
  let d = 0;
  return (
    <>
      {Array.from(text).map((ch, k) => {
        if (!/\d/.test(ch)) return <span key={k}>{ch}</span>;
        const digit = Number(ch);
        const i = d++;
        return (
          <span key={k} className="kc-digit">
            <span className="kc-reel" style={{ "--i": i, "--to": `${-(10 + digit)}em` } as Vars}>
              {Array.from({ length: 20 }, (_, j) => (
                <span key={j}>{j % 10}</span>
              ))}
              <span>{digit}</span>
            </span>
          </span>
        );
      })}
    </>
  );
}

const titleClass = "font-[family-name:var(--v2-display)] text-[1.375rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[1.625rem]";

function Title({ text, mode }: { text: string; mode: Mode }) {
  if (mode === "roll")
    return (
      <span className={`kc-title ${titleClass}`}>
        <Odometer text={text} />
      </span>
    );
  if (mode === "type")
    return (
      <span className={`kc-title ${titleClass}`}>
        <span className="kc-typed">
          {text}
          <span className="kc-caret" />
        </span>
      </span>
    );
  if (mode === "static") return <span className={`kc-title ${titleClass}`}>{text}</span>;
  return (
    <span className={`kc-title ${titleClass}`}>
      <Letters text={text} />
    </span>
  );
}

/* ---------------------------------------------------------------- props */

const P = "kp absolute";

function SelectionBox({ children }: { children: ReactNode }) {
  const handle = "absolute h-2 w-2 rounded-[2px] border border-current bg-[var(--card-bg)] kp";
  return (
    <span className="kp relative inline-block" style={anim("kp-grow", { transformOrigin: "left top" })}>
      <span className="kp absolute -inset-x-2 -inset-y-1.5 border border-dashed border-current opacity-50" style={anim("kp-box")} />
      {[["-left-3 -top-2.5"], ["-right-3 -top-2.5"], ["-left-3 -bottom-2.5"], ["-right-3 -bottom-2.5 !border-red-600"]].map(([pos], i) => (
        <span key={i} className={`${handle} ${pos}`} style={anim("kp-handle", { animationDelay: `${i * 40}ms` })} />
      ))}
      {children}
      <svg viewBox="0 0 12 16" className="kp absolute -bottom-6 -right-6 h-5 w-4 drop-shadow" style={anim("kp-drag")} aria-hidden="true">
        <path d="M0 0 L0 13 L3.6 9.6 L6.4 15.4 L8.6 14.4 L5.9 8.7 L10.6 8.4 Z" fill="#dc2626" stroke="var(--card-bg)" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/* Menus: a little menu writes itself, dotted leaders draw, prices slide in, today's pick is circled */
function MenuProp() {
  const rows = [
    ["Starters", "£8"],
    ["Mains", "£16"],
    ["Desserts", "£7"],
    ["Drinks", "£4"],
  ];
  return (
    <div className="relative w-full rounded-lg px-3 py-2" style={{ background: "color-mix(in srgb, currentColor 5%, transparent)" }}>
      <p className="mb-1 text-center font-[family-name:var(--v2-script)] text-base leading-none text-red-600">Menu</p>
      {rows.map(([name, price], i) => (
        <div key={name} className="flex items-end gap-1 text-[10px] font-medium leading-[1.55]">
          <span className="kp inline-block" style={anim("kp-row", { animationDelay: `${i * 0.12}s` })}>
            {name}
          </span>
          <span className="kp mb-[3px] h-px flex-1 origin-left border-b border-dotted border-current opacity-40" style={anim("kp-leader", { animationDelay: `${0.15 + i * 0.12}s` })} />
          <span className="inline-block h-[1.55em] overflow-hidden">
            <span className={`kp block ${i === 1 ? "text-red-600" : ""}`} style={anim("kp-price", { animationDelay: `${0.25 + i * 0.12}s` })}>
              {price}
            </span>
          </span>
        </div>
      ))}
      <span className="kp pointer-events-none absolute left-2 right-2 top-[2.05rem] h-[1.15rem] rounded-full border-[1.5px] border-red-600" style={anim("kp-circle")} />
    </div>
  );
}

/* Flyers: one sheet grows through the ISO sizes A4 → A1 inside their outlines, the label rolls */
function PaperSizes() {
  const sizes = [
    ["A1", 46, 65],
    ["A2", 32.5, 46],
    ["A3", 23, 32.5],
    ["A4", 16.3, 23],
  ] as const;
  return (
    <div className="flex w-full flex-row-reverse items-end gap-3">
      <div className="relative h-[65px] w-[46px]">
        {sizes.map(([n, w, h]) => (
          <span key={n} className="absolute bottom-0 left-0 rounded-[2px] border border-dashed border-current opacity-30" style={{ width: w, height: h }} />
        ))}
        <span className="kp absolute bottom-0 left-0 rounded-[2px] bg-red-600 shadow-[0_6px_14px_-6px_rgba(220,38,38,0.8)]" style={anim("kp-asize", { animationTimingFunction: "cubic-bezier(0.65,0,0.35,1)" })}>
          <span className="absolute left-[18%] right-[18%] top-[16%] h-[6%] rounded-full bg-white/80" />
          <span className="absolute left-[18%] right-[38%] top-[28%] h-[5%] rounded-full bg-white/50" />
        </span>
      </div>
      <span className="mb-0.5 inline-flex h-6 items-center overflow-hidden rounded-full bg-current px-2.5">
        <span className="inline-block h-[1em] overflow-hidden text-[11px] font-bold leading-none text-[var(--card-bg)]">
          <span className="kp block" style={anim("kp-alabel", { animationTimingFunction: "cubic-bezier(0.65,0,0.35,1)" })}>
            {["A4", "A3", "A2", "A1"].map((n) => (
              <span key={n} className="block h-[1em]">
                {n}
              </span>
            ))}
          </span>
        </span>
      </span>
    </div>
  );
}

/* Posters: a poster unrolls from its rail on the wall, two pins pop in */
function PosterProp() {
  return (
    <div className="relative mx-auto h-[76px] w-[58px]">
      <span className="absolute -left-1 -right-1 top-0 h-1.5 rounded-full bg-current" />
      <span className="kp absolute inset-x-0 top-1.5 bottom-0 origin-top overflow-hidden rounded-b-[3px] bg-current shadow-[0_10px_18px_-10px_rgba(0,0,0,0.6)]" style={anim("kp-unroll")}>
        <span className="absolute -right-4 -top-3 h-12 w-12 rounded-full bg-red-600" />
        <span className="absolute bottom-2.5 left-2 font-[family-name:var(--v2-display)] text-[15px] font-black uppercase leading-[0.85] tracking-[-0.04em] text-[var(--card-bg)]">
          Big
          <br />
          Night
        </span>
        <span className="absolute bottom-1 left-2 h-[2px] w-6 rounded-full bg-red-600" />
      </span>
      <span className="kp absolute left-0.5 top-0.5 h-2 w-2 rounded-full bg-red-600 ring-2 ring-[var(--card-bg)]" style={anim("kp-pin")} />
      <span className="kp absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-red-600 ring-2 ring-[var(--card-bg)]" style={anim("kp-pin", { animationDelay: "0.12s" })} />
    </div>
  );
}

/* Packaging: a real 3D box turning slowly, its flaps fold shut and red tape seals it */
function Box3D() {
  const s = 34; // cube edge in px
  const h = s / 2;
  const face = "absolute left-0 top-0 [backface-visibility:hidden]";
  return (
    <div className="mx-auto flex h-[76px] w-full items-center justify-center" style={{ perspective: 420 }}>
      <div className="kp relative" style={anim("kp-box-turn", { width: s, height: s, transformStyle: "preserve-3d", animationDuration: "9s", animationTimingFunction: "linear" })}>
        <span className={face} style={{ width: s, height: s, background: "#27272a", transform: `translateZ(${h}px)` }}>
          <span className="absolute bottom-1.5 left-1.5 font-[family-name:var(--v2-display)] text-[9px] font-bold text-white">R.</span>
          <span className="absolute right-1.5 top-1.5 h-2.5 w-3.5 rounded-[1px] border border-white/40" />
        </span>
        <span className={face} style={{ width: s, height: s, background: "#3f3f46", transform: `rotateY(90deg) translateZ(${h}px)` }} />
        <span className={face} style={{ width: s, height: s, background: "#18181b", transform: `rotateY(180deg) translateZ(${h}px)` }} />
        <span className={face} style={{ width: s, height: s, background: "#3f3f46", transform: `rotateY(-90deg) translateZ(${h}px)` }} />
        <span className={face} style={{ width: s, height: s, background: "#09090b", transform: `rotateX(-90deg) translateZ(${h}px)` }} />
        {/* inside of the box, seen while the flaps are open */}
        <span className={face} style={{ width: s, height: s, background: "#52525b", transform: `rotateX(90deg) translateZ(${h - 1}px)` }} />
        {/* the two top flaps, hinged on the left and right top edges */}
        <span className="absolute left-0 top-0" style={{ width: s, height: s, transformStyle: "preserve-3d", transform: `rotateX(90deg) translateZ(${h}px)` }}>
          <span className="kp absolute left-0 top-0 h-full bg-[#52525b]" style={anim("kp-flap3d-l", { width: h, transformOrigin: "0 50%", animationTimingFunction: "cubic-bezier(0.16,1,0.3,1)" })} />
          <span className="kp absolute right-0 top-0 h-full bg-[#71717a]" style={anim("kp-flap3d-r", { width: h, transformOrigin: "100% 50%", animationTimingFunction: "cubic-bezier(0.16,1,0.3,1)" })} />
          <span className="kp absolute inset-y-0 left-1/2 w-1.5 -translate-x-1/2 origin-top bg-red-600" style={anim("kp-tape")} />
        </span>
      </div>
    </div>
  );
}

/* Photography: the focus ring turns, the shutter fires (iris snaps, flash), a polaroid ejects and develops */
function CameraProp() {
  return (
    <div className="relative mx-auto h-[76px] w-[88px]">
      {/* polaroid, behind the body, slides up out of the top */}
      <span className="kp absolute left-[22px] top-[20px] z-0 h-[40px] w-[34px] rounded-[2px] bg-white p-[3px] pb-[9px] shadow-[0_6px_12px_-6px_rgba(0,0,0,0.45)] ring-1 ring-black/10" style={anim("kp-eject")}>
        <span className="relative block h-full w-full overflow-hidden rounded-[1px] bg-zinc-800">
          <span className="kp absolute inset-0" style={anim("kp-develop", { background: "linear-gradient(160deg,#fca5a5 0%,#dc2626 45%,#18181b 100%)" })} />
          <span className="kp absolute bottom-[3px] left-[3px] h-[7px] w-[7px] rounded-full bg-white/80" style={anim("kp-develop")} />
        </span>
      </span>
      {/* body */}
      <span className="kp absolute bottom-0 left-0 z-10 h-[50px] w-[88px]" style={anim("kp-cam-body", { transformOrigin: "50% 100%" })}>
        <span className="absolute left-[10px] top-[-5px] h-[8px] w-[20px] rounded-t-[3px] bg-current" />
        <span className="kp absolute right-[12px] top-[-4px] h-[5px] w-[11px] rounded-t-[2px] bg-red-600" style={anim("kp-shutter-btn")} />
        <span className="absolute inset-0 rounded-[9px] bg-current" />
        <span className="absolute right-[10px] top-[9px] h-[6px] w-[9px] rounded-[2px] bg-white/25" />
        {/* lens */}
        <span className="absolute left-1/2 top-1/2 h-[38px] w-[38px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-700 ring-[3px] ring-[var(--card-bg)]">
          <span className="kp absolute inset-[2px] rounded-full border-[2px] border-dashed border-white/35" style={anim("kp-focus-ring", { animationTimingFunction: "cubic-bezier(0.65,0,0.35,1)" })} />
          <span className="absolute inset-[7px] overflow-hidden rounded-full bg-zinc-950">
            <span className="kp absolute inset-0 rounded-full" style={anim("kp-aperture", { background: "conic-gradient(from 0deg,#3f3f46 0 16.6%,#27272a 0 33.3%,#3f3f46 0 50%,#27272a 0 66.6%,#3f3f46 0 83.3%,#27272a 0)" })} />
            <span className="absolute left-[22%] top-[22%] h-[22%] w-[22%] rounded-full bg-white/40" />
          </span>
        </span>
      </span>
      {/* flash burst */}
      <span className="kp absolute right-[4px] top-[16px] z-20 h-7 w-7 rounded-full" style={anim("kp-burst", { background: "radial-gradient(circle,#fff 0%,rgba(255,255,255,0.7) 30%,transparent 70%)" })} />
    </div>
  );
}

/* Launch campaigns: a megaphone blasts, waves ripple out, engagement flies off */
function BullhornProp() {
  const bits = [
    { c: "♥", x: 46, y: -14, d: 0 },
    { c: "@", x: 54, y: 6, d: 0.12 },
    { c: "%", x: 40, y: 18, d: 0.24 },
    { c: "★", x: 58, y: -4, d: 0.36 },
  ];
  return (
    <div className="relative h-[70px] w-full">
      <span className="kp absolute left-1 top-[14px]" style={anim("kp-horn", { transformOrigin: "20% 60%" })}>
        <svg viewBox="0 0 64 44" className="h-[42px] w-[60px]" aria-hidden="true">
          <path d="M8 16 H18 L46 3 V41 L18 28 H8 Q4 28 4 24 V20 Q4 16 8 16 Z" fill="currentColor" />
          <path d="M46 3 Q52 22 46 41" fill="none" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
          <path d="M14 28 L18 40 H24 L21 28" fill="currentColor" opacity="0.7" />
          <rect x="9" y="19" width="6" height="6" rx="1.5" fill="#dc2626" />
        </svg>
      </span>
      {[0, 1, 2].map((i) => (
        <span key={i} className="kp absolute left-[48px] top-[11px] h-[48px] w-[30px] rounded-[50%] border-r-[2.5px] border-red-600" style={anim("kp-wave", { animationDuration: "1.4s", animationTimingFunction: "ease-out", animationDelay: `${i * 0.28}s` })} />
      ))}
      {bits.map((b) => (
        <span key={b.c} className="kp absolute left-[62px] top-[28px] flex h-5 w-5 items-center justify-center rounded-full bg-current text-[10px] font-bold" style={anim("kp-emit", { "--ex": `${b.x}px`, "--ey": `${b.y}px`, animationDelay: `${b.d}s` })}>
          <span className="text-[var(--card-bg)]">{b.c}</span>
        </span>
      ))}
    </div>
  );
}

/* Content creation: a photo post, a reel and a text post are dealt into a fan, then they're ready */
function ContentStack() {
  const card = "absolute bottom-0 left-1/2 h-[54px] w-[40px] overflow-hidden rounded-[6px] shadow-[0_10px_18px_-10px_rgba(0,0,0,0.55)]";
  return (
    <div className="relative mx-auto h-[72px] w-full" style={{ perspective: 400 }}>
      <span className={`kp ${card} bg-current`} style={anim("kp-deal", { "--fx": "-34px", "--fr": "-12deg", animationDelay: "0s" })}>
        <span className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-red-600" />
        <span className="absolute bottom-1.5 left-1.5 right-3 h-1 rounded-full bg-white/60" />
      </span>
      <span className={`kp ${card} bg-red-600`} style={anim("kp-deal", { "--fx": "0px", "--fr": "0deg", animationDelay: "0.14s" })}>
        <span className="absolute left-1/2 top-1/2 h-0 w-0 -translate-x-[35%] -translate-y-1/2 border-y-[7px] border-l-[11px] border-y-transparent border-l-white" />
        <span className="absolute inset-x-1.5 bottom-1.5 h-0.5 rounded-full bg-white/40">
          <span className="kp block h-full origin-left rounded-full bg-white" style={anim("kp-reel", { animationTimingFunction: "linear" })} />
        </span>
      </span>
      <span className={`kp ${card} ring-1 ring-black/10`} style={anim("kp-deal", { "--fx": "34px", "--fr": "12deg", animationDelay: "0.28s", background: "var(--card-bg)" })}>
        <span className="absolute left-1.5 top-2 font-[family-name:var(--v2-display)] text-[13px] font-bold leading-none">Aa</span>
        <span className="absolute bottom-3 left-1.5 right-2 h-[3px] rounded-full bg-current opacity-50" />
        <span className="absolute bottom-1.5 left-1.5 right-4 h-[3px] rounded-full bg-current opacity-25" />
      </span>
      <span className="kp absolute right-1 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-base font-semibold leading-none text-white shadow" style={anim("kp-plus")}>
        +
      </span>
      <span className="kp absolute left-0 top-0 rounded-full bg-current px-2 py-1 text-[9px] font-semibold" style={anim("kp-ready")}>
        <span className="text-[var(--card-bg)]">✓ 3 posts ready</span>
      </span>
    </div>
  );
}

/* Custom apparel: the tee spins round in 3D, changes colour each turn, and gets a fresh print */
function TeeSpin() {
  const tee = "M22 3 L12 8 L2 18 L10 26 L15 22 V58 H55 V22 L60 26 L68 18 L58 8 L48 3 C 45 10, 25 10, 22 3 Z";
  return (
    <div className="ml-auto flex h-[72px] w-[86px] items-center justify-center" style={{ perspective: 300 }}>
      <div className="kp relative h-[60px] w-[70px]" style={anim("kp-tee-spin", { transformStyle: "preserve-3d", animationDuration: "6s", animationTimingFunction: "cubic-bezier(0.65,0,0.35,1)" })}>
        <svg viewBox="0 0 70 60" className="absolute inset-0 h-full w-full drop-shadow-[0_8px_8px_rgba(0,0,0,0.18)]" aria-hidden="true">
          <path d={tee} className="kp" style={anim("kp-tee-colour", { animationDuration: "6s", animationTimingFunction: "steps(1, end)" })} stroke="rgba(9,9,11,0.25)" strokeWidth="1" />
          <path d="M22 3 C 25 10, 45 10, 48 3" fill="none" stroke="rgba(9,9,11,0.25)" strokeWidth="1" />
        </svg>
        <span className="kp absolute left-1/2 top-[22px] flex h-[18px] w-[18px] -translate-x-1/2 items-center justify-center rounded-full bg-red-600 text-[8px] font-bold text-white ring-2 ring-white/70" style={anim("kp-print-stamp", { animationDuration: "2s" })}>
          R.
        </span>
      </div>
    </div>
  );
}

/* Branding merch: a turntable of branded products (mug, cap, tote) turning and pausing on each */
function MerchCarousel() {
  const r = 30;
  const items = [
    // mug
    <svg key="mug" viewBox="0 0 34 34" className="h-full w-full" aria-hidden="true">
      <path d="M25 12 h3 a5 5 0 0 1 0 10 h-3" fill="none" stroke="currentColor" strokeWidth="3" />
      <rect x="5" y="7" width="21" height="23" rx="3" fill="currentColor" />
      <circle cx="15.5" cy="18.5" r="5" fill="#dc2626" />
      <text x="15.5" y="20.6" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="#fff">R.</text>
    </svg>,
    // cap
    <svg key="cap" viewBox="0 0 34 34" className="h-full w-full" aria-hidden="true">
      <path d="M5 22 C 5 10, 29 10, 29 22 Z" fill="#dc2626" />
      <path d="M3 22 H 33 Q 31 26 22 26 H 3 Z" fill="currentColor" />
      <circle cx="17" cy="10.5" r="1.6" fill="currentColor" />
      <text x="17" y="19.5" textAnchor="middle" fontSize="6" fontWeight="700" fill="#fff">R.</text>
    </svg>,
    // tote
    <svg key="tote" viewBox="0 0 34 34" className="h-full w-full" aria-hidden="true">
      <path d="M12 11 V8 a5 5 0 0 1 10 0 V11" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M6 11 H28 L26 31 H8 Z" fill="currentColor" />
      <text x="17" y="24" textAnchor="middle" fontSize="8" fontWeight="700" fill="#dc2626">R.</text>
    </svg>,
  ];
  return (
    <div className="ml-auto flex h-[72px] w-[96px] items-end justify-center" style={{ perspective: 260 }}>
      <span className="absolute bottom-[10px] h-[10px] w-[72px] rounded-[50%] bg-current opacity-10" />
      <div className="kp relative mb-[14px] h-[36px] w-[36px]" style={anim("kp-turntable", { transformStyle: "preserve-3d", animationDuration: "6s" })}>
        {items.map((item, i) => (
          <span key={i} className="absolute inset-0 [backface-visibility:hidden]" style={{ transform: `rotateY(${i * 120}deg) translateZ(${r}px)` }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* Promotional: a giveaway box flips its lid open and branded goodies spring out */
function Giveaway() {
  const goodies = [
    { key: "pen", x: -26, y: -40, r: -28, d: 0, el: <span className="block h-[30px] w-[6px] rounded-full bg-current"><span className="block h-[8px] w-[6px] rounded-t-full bg-red-600" /></span> },
    { key: "badge", x: 0, y: -50, r: 0, d: 0.08, el: <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white ring-2 ring-white">R.</span> },
    { key: "star", x: 26, y: -38, r: 24, d: 0.16, el: <span className="block text-[20px] leading-none text-red-600">★</span> },
  ];
  return (
    <div className="relative ml-auto mr-2 h-[72px] w-[80px]" style={{ perspective: 260 }}>
      {goodies.map((g) => (
        <span key={g.key} className="kp absolute bottom-[18px] left-1/2 z-0" style={anim("kp-goodie", { "--gx": `${g.x}px`, "--gy": `${g.y}px`, "--gr": `${g.r}deg`, animationDelay: `${g.d}s` })}>
          <span className="block -translate-x-1/2">{g.el}</span>
        </span>
      ))}
      <span className="absolute bottom-0 left-1/2 z-10 h-[26px] w-[48px] -translate-x-1/2 rounded-b-[4px] bg-current">
        <span className="absolute inset-y-0 left-1/2 w-[7px] -translate-x-1/2 bg-red-600" />
      </span>
      <span className="kp absolute bottom-[26px] left-1/2 z-20 ml-[-27px] h-[9px] w-[54px] rounded-[3px] bg-red-600 shadow" style={anim("kp-lid", { transformOrigin: "0% 100%" })}>
        <span className="absolute -top-[7px] left-1/2 h-[8px] w-[16px] -translate-x-1/2 rounded-t-full border-[2px] border-b-0 border-red-600" />
      </span>
    </div>
  );
}

/* Videography: the side monitor swings open and plays back, the lens zooms, REC blinks, film feeds out */
function CinemaCamera() {
  return (
    <div className="relative ml-auto h-[76px] w-[104px]" style={{ perspective: 300 }}>
      {/* film strip feeding out of the top, frames scrolling */}
      <span className="kp absolute left-[30px] top-[2px] z-0 h-[16px] w-[52px] origin-bottom-left overflow-hidden rounded-[2px] bg-zinc-900" style={anim("kp-film-out", { animationDuration: "4s" })}>
        <span className="kp absolute inset-y-0 left-0 flex w-[200%] items-center gap-[3px] px-[2px]" style={anim("kp-film-scroll", { animationDuration: "1.2s", animationTimingFunction: "linear" })}>
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className={`h-[9px] w-[11px] shrink-0 rounded-[1px] ${i % 3 === 1 ? "bg-red-600" : "bg-zinc-500"}`} />
          ))}
        </span>
        <span className="absolute inset-x-0 top-[1px] h-[2px] bg-[repeating-linear-gradient(90deg,#fff_0_2px,transparent_2px_5px)] opacity-60" />
        <span className="absolute inset-x-0 bottom-[1px] h-[2px] bg-[repeating-linear-gradient(90deg,#fff_0_2px,transparent_2px_5px)] opacity-60" />
      </span>
      {/* top handle */}
      <span className="absolute left-[24px] top-[16px] z-10 h-[7px] w-[34px] rounded-t-[4px] border-[3px] border-b-0 border-current" />
      {/* body */}
      <span className="absolute bottom-[4px] left-[18px] z-10 h-[46px] w-[52px] rounded-[8px] bg-current">
        <span className="absolute right-[6px] top-[6px] flex items-center gap-[3px]">
          <span className="kp h-[6px] w-[6px] rounded-full bg-red-600" style={anim("kp-rec", { animationDuration: "1s", animationTimingFunction: "steps(1)" })} />
          <span className="text-[6px] font-bold leading-none text-[var(--card-bg)]">REC</span>
        </span>
        <span className="absolute bottom-[6px] left-[6px] h-[8px] w-[14px] rounded-[2px] bg-white/20" />
      </span>
      {/* lens barrel: zooms out and back, focus ring turns */}
      <span className="kp absolute bottom-[12px] left-[68px] z-10 flex h-[30px] w-[22px] origin-left items-center" style={anim("kp-zoom", { animationTimingFunction: "cubic-bezier(0.65,0,0.35,1)" })}>
        <span className="h-[24px] w-full rounded-r-[3px] bg-zinc-700" />
        <span className="absolute -right-[4px] h-[30px] w-[8px] overflow-hidden rounded-[3px] bg-zinc-800">
          <span className="kp absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.35)_0_1.5px,transparent_1.5px_4px)]" style={anim("kp-ring-scroll", { animationTimingFunction: "cubic-bezier(0.65,0,0.35,1)" })} />
        </span>
      </span>
      {/* flip-out monitor on the left edge, hinged */}
      <span className="kp absolute bottom-[14px] left-[18px] z-20 h-[28px] w-[38px] origin-left" style={anim("kp-monitor", { transformStyle: "preserve-3d", animationTimingFunction: "cubic-bezier(0.16,1,0.3,1)" })}>
        <span className="absolute inset-0 rounded-[4px] bg-zinc-800 p-[3px] [backface-visibility:hidden]">
          <span className="relative block h-full w-full overflow-hidden rounded-[2px]" style={{ background: "linear-gradient(150deg,#fca5a5 0%,#dc2626 50%,#18181b 100%)" }}>
            <span className="absolute left-1/2 top-[38%] h-0 w-0 -translate-x-[35%] -translate-y-1/2 border-y-[4px] border-l-[6px] border-y-transparent border-l-white" />
            <span className="absolute inset-x-[3px] bottom-[3px] h-[2px] rounded-full bg-white/35">
              <span className="kp block h-full origin-left rounded-full bg-white" style={anim("kp-playback", { animationTimingFunction: "linear" })} />
            </span>
          </span>
        </span>
        <span className="absolute inset-0 rounded-[4px] bg-zinc-700 [backface-visibility:hidden] [transform:rotateY(180deg)]" />
      </span>
    </div>
  );
}

/* Budget: coins drop into stacks; more stacks (and notes) per tier */
function MoneyProp({ level }: { level: number }) {
  const stacks = Array.from({ length: level }, (_, i) => 2 + i + (i === level - 1 ? 1 : 0));
  return (
    <div className="relative ml-auto flex h-[72px] items-end gap-[5px] pr-1" style={{ perspective: 300 }}>
      {level >= 4 && (
        <span className="absolute bottom-[2px] left-[-6px] h-[26px] w-[44px]" aria-hidden="true">
          {[-14, -4, 6].map((r, i) => (
            <span key={r} className="kp absolute bottom-0 left-0 h-[22px] w-[40px] origin-bottom-left rounded-[3px] border border-white/30 bg-[#18181b]" style={anim("kp-note", { "--nr": `${r}deg`, animationDelay: `${i * 0.08}s` })}>
              <span className="absolute left-1/2 top-1/2 flex h-[12px] w-[12px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-red-500 text-[7px] font-bold text-red-500">£</span>
            </span>
          ))}
        </span>
      )}
      {stacks.map((n, s) => (
        <span key={s} className="relative flex w-[20px] flex-col-reverse items-center">
          {Array.from({ length: n }, (_, c) => (
            <span
              key={c}
              className="kp -mt-[3px] block h-[7px] w-[20px] rounded-[50%] border-b-[2px] border-[#991b1b] bg-red-600"
              style={anim("kp-coin-drop", { animationDelay: `${s * 0.12 + c * 0.09}s` })}
            />
          ))}
        </span>
      ))}
    </div>
  );
}

const PROPS: Record<string, () => ReactNode> = {
  "brand-identity": () => (
    <div className="flex gap-1.5">
      {["bg-current", "bg-red-600", "bg-current opacity-40", "bg-current opacity-15"].map((c, i) => (
        <span key={i} className={`kp h-5 w-5 rounded-full ${c}`} style={anim("kp-swatch", { "--a": `${[22, -22, 22, -22][i]}px`, "--b": `${[66, 0, -22, -44][i]}px` })} />
      ))}
    </div>
  ),
  "brand-strategy": () => (
    <div className="relative ml-auto h-10 w-10">
      <span className={`${P} inset-0 rounded-full border-2 border-red-600`} style={anim("kp-reticle")} />
      <span className={`${P} inset-0 rounded-full bg-red-600/40`} style={anim("kp-ping")} />
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current opacity-30" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current opacity-30" />
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600" />
    </div>
  ),
  rebranding: () => (
    <div className="flex items-center gap-2" style={{ perspective: 200 }}>
      <span className="kp h-6 w-6" style={anim("kp-morph")} />
      <span className="text-xs font-medium opacity-50">v1 → v2</span>
    </div>
  ),
  "web-design": () => (
    <div className="relative w-28 overflow-hidden rounded-md border border-current/20 p-1.5" style={{ borderColor: "color-mix(in srgb, currentColor 20%, transparent)" }}>
      <div className="mb-1 flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className={`h-1 w-1 rounded-full ${i ? "bg-current opacity-30" : "bg-red-600"}`} />
        ))}
      </div>
      <div className="flex gap-1">
        <span className="kp h-5 flex-1 rounded-sm bg-red-600" style={anim("kp-block-a", { animationTimingFunction: "cubic-bezier(0.7,0,0.2,1)" })} />
        <span className="kp h-5 flex-1 rounded-sm bg-current opacity-20" style={anim("kp-block-b", { animationTimingFunction: "cubic-bezier(0.7,0,0.2,1)" })} />
      </div>
      <span className="kp pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent" style={anim("kp-shimmer", { animationTimingFunction: "linear" })} />
    </div>
  ),
  "website-development": () => (
    <code className="kp block font-mono text-[11px] leading-none" style={anim("kp-code", { animationTimingFunction: "steps(16, end)" })}>
      <span className="text-red-600">&lt;</span>
      <span>Site</span> <span className="opacity-50">live</span>
      <span className="text-red-600"> /&gt;</span>
    </code>
  ),
  ecommerce: () => (
    <div className="flex w-full items-start justify-between">
      <span className="kp relative mt-0.5 origin-top rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white" style={anim("kp-tag", { animationTimingFunction: "cubic-bezier(0.33,0,0.67,1)" })}>
        £49
      </span>
      <span className="kp relative rounded-full bg-current px-2.5 py-1" style={anim("kp-press")}>
        <span className="text-[10px] font-semibold text-[var(--card-bg)]">Add to cart</span>
        <span className="kp absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white" style={anim("kp-badge")}>
          1
        </span>
      </span>
    </div>
  ),
  seo: () => (
    <div className="flex items-center gap-2">
      <span className="flex h-7 items-center overflow-hidden rounded-md bg-red-600 px-1.5 text-sm font-semibold text-white">
        #
        <span className="inline-block h-[1.25rem] overflow-hidden leading-[1.25rem]">
          <span className="kp block" style={anim("kp-rank", { "--to": "-6.25rem" })}>
            {[7, 6, 5, 4, 3, 2, 1].map((n) => (
              <span key={n} className="block h-[1.25rem]">
                {n}
              </span>
            ))}
          </span>
        </span>
      </span>
      <span className="h-2 w-12 overflow-hidden rounded-full bg-current/10" style={{ background: "color-mix(in srgb, currentColor 12%, transparent)" }}>
        <span className="kp block h-full w-full rounded-full bg-red-600" style={anim("kp-climb")} />
      </span>
    </div>
  ),
  "website-redesign": () => (
    <div className="grid w-24 grid-cols-2 gap-1">
      <span className="kp h-4 rounded-sm bg-current" style={anim("kp-block-a")} />
      <span className="kp h-4 rounded-sm bg-red-600" style={anim("kp-block-b")} />
      <span className="col-span-2 h-2 rounded-sm bg-current opacity-15" />
    </div>
  ),
  photography: () => <CameraProp />,
  videography: () => <CinemaCamera />,
  "social-media": () => (
    <div className="flex w-full items-start justify-between">
      <span className="flex items-center gap-1 text-xs font-semibold">
        <svg viewBox="0 0 24 24" className="kp h-5 w-5 text-red-600" style={anim("kp-heart")} aria-hidden="true">
          <path fill="currentColor" d="M12 21s-8-5.2-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 5.8-8 11-8 11z" />
        </svg>
        1.2k
      </span>
      <span className="flex flex-col items-end gap-1">
        <span className="kp rounded-full rounded-br-sm bg-current px-2 py-0.5 text-[9px] font-medium text-[var(--card-bg)]" style={anim("kp-bubble-a")}>
          love this 🔥
        </span>
        <span className="kp rounded-full rounded-br-sm bg-red-600 px-2 py-0.5 text-[9px] font-medium text-white" style={anim("kp-bubble-b")}>
          where is it?
        </span>
      </span>
    </div>
  ),
  "launch-campaigns": () => <BullhornProp />,
  "content-creation": () => <ContentStack />,
  menus: () => <MenuProp />,
  flyers: () => <PaperSizes />,
  posters: () => <PosterProp />,
  packaging: () => <Box3D />,
  "custom-apparel": () => <TeeSpin />,
  "branding-merch": () => <MerchCarousel />,
  promotional: () => <Giveaway />,
  software: () => (
    <div className="w-full rounded-md bg-zinc-950 px-2 py-1.5 font-mono text-[10px] leading-tight text-white">
      <span className="kp block" style={anim("kp-code", { animationTimingFunction: "steps(14, end)" })}>
        <span className="text-red-500">$</span> npm run build <span className="text-green-400">✓</span>
      </span>
    </div>
  ),
  setup: () => (
    <div className="flex w-full items-center gap-2">
      <span className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: "color-mix(in srgb, currentColor 12%, transparent)" }}>
        <span className="kp block h-full origin-left rounded-full bg-red-600" style={anim("kp-progress", { animationTimingFunction: "cubic-bezier(0.65,0,0.35,1)" })} />
      </span>
      <span className="inline-block h-[1em] w-8 overflow-hidden text-right font-mono text-[11px] leading-none">
        <span className="kp block" style={anim("kp-pct", { animationTimingFunction: "steps(10, end)" })}>
          {Array.from({ length: 11 }, (_, i) => (
            <span key={i} className="block h-[1em]">
              {i * 10}%
            </span>
          ))}
        </span>
      </span>
    </div>
  ),
  asap: () => (
    <span className="pointer-events-none absolute inset-x-0 top-3 flex flex-col gap-2 overflow-hidden" aria-hidden="true">
      {[0.6, 1, 0.4].map((w, i) => (
        <span key={i} className="kp block h-[2px] rounded-full bg-red-600" style={anim("kp-speed", { width: `${w * 60}%`, animationDuration: `${0.7 + i * 0.2}s`, animationTimingFunction: "linear", animationDelay: `${-i * 0.3}s` })} />
      ))}
    </span>
  ),
  "1-2-weeks": () => (
    <div className="grid grid-cols-7 gap-1">
      {Array.from({ length: 14 }, (_, i) => (
        <span key={i} className={`kp h-2.5 w-2.5 rounded-[3px] ${i === 13 ? "bg-red-600" : "bg-current opacity-70"}`} style={anim("kp-cell", { animationDelay: `${i * 0.09}s` })} />
      ))}
    </div>
  ),
  "1-month": () => (
    <div className="relative h-11 w-10 text-center" style={{ perspective: 200 }}>
      <span className="absolute inset-0 flex flex-col overflow-hidden rounded-md bg-current">
        <span className="h-2.5 bg-red-600" />
        <span className="flex flex-1 items-center justify-center text-base font-bold text-[var(--card-bg)]">31</span>
      </span>
      <span className="kp absolute inset-0 flex origin-top flex-col overflow-hidden rounded-md bg-current shadow" style={anim("kp-tear", { animationTimingFunction: "cubic-bezier(0.5,0,0.3,1)" })}>
        <span className="h-2.5 bg-red-600" />
        <span className="flex flex-1 items-center justify-center text-base font-bold text-[var(--card-bg)]">1</span>
      </span>
    </div>
  ),
  "1-3-months": () => (
    <div className="flex w-full gap-1">
      {["M1", "M2", "M3"].map((m, i) => (
        <span key={m} className="relative h-5 flex-1 overflow-hidden rounded-md" style={{ background: "color-mix(in srgb, currentColor 10%, transparent)" }}>
          <span className="kp absolute inset-0 origin-left bg-red-600" style={anim("kp-month", { animationDelay: `${i * 0.35}s` })} />
          <span className="relative flex h-full items-center justify-center text-[9px] font-bold">{m}</span>
        </span>
      ))}
    </div>
  ),
  flexible: () => (
    <svg viewBox="0 0 20 36" className="kp ml-auto h-10 w-6 origin-bottom" style={anim("kp-spring", { animationTimingFunction: "cubic-bezier(0.33,0,0.67,1)" })} aria-hidden="true">
      <path d="M10 0 V4 L2 8 L18 12 L2 16 L18 20 L2 24 L18 28 L10 32 V36" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  ),
  other: () => (
    <svg viewBox="0 0 80 24" className="h-6 w-20" aria-hidden="true">
      <path d="M2 16 C 10 4, 18 22, 26 12 S 42 4, 48 14 S 66 20, 78 8" fill="none" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" className="kp" style={anim("kp-scribble", { strokeDasharray: 120 })} />
    </svg>
  ),
};

/** How each answer's name moves */
/* Only whole-word moves: per-letter 3D flips read as broken glyphs mid-move, so titles
   are otherwise static and the props carry the motion */
const MODES: Record<string, Mode> = {
  flexible: "stretch",
  other: "type",
};

/** Answers whose whole face is a moving object instead of a prop above the title */
function SpecialFace({ id, title }: { id: string; title: string }) {
  if (id === "logo-design")
    return (
      <div className="flex h-full items-center justify-center px-4">
        <SelectionBox>
          <span className={`kc-title ${titleClass}`}>{title}</span>
        </SelectionBox>
      </div>
    );
  if (id === "business-cards")
    return (
      <div className="flex h-full items-center justify-center" style={{ perspective: 500 }}>
        <span className="kp relative block h-[4.5rem] w-[8.5rem]" style={anim("kp-flip3d", { transformStyle: "preserve-3d", animationTimingFunction: "cubic-bezier(0.65,0,0.35,1)" })}>
          <span className="absolute inset-0 flex items-end rounded-lg bg-current p-2.5 shadow-lg [backface-visibility:hidden]">
            <span className={`kc-plain ${titleClass} !text-lg text-[var(--card-bg)]`}>{title}</span>
          </span>
          <span className="absolute inset-0 flex items-center justify-center rounded-lg bg-red-600 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="font-[family-name:var(--v2-display)] text-2xl font-bold text-white">R.</span>
          </span>
        </span>
      </div>
    );
  return null;
}

const SPECIAL = new Set(["logo-design", "business-cards"]);

/** The animated face of one answer card. `budget` (1 to 5, the tier) shows money that grows with it. */
export function KineticFace({ id, title, on, budget = 0 }: { id: string; title: string; on: boolean; budget?: number }) {
  const mode: Mode = MODES[id] ?? "static";
  const Prop = budget ? () => <MoneyProp level={budget} /> : PROPS[id];

  return (
    <div aria-hidden="true" data-on={on} className={`kc k-${mode} absolute inset-0 overflow-hidden rounded-[inherit]`}>
      <div className="kc-stage">
        {SPECIAL.has(id) ? (
          <SpecialFace id={id} title={title} />
        ) : (
          <div className="flex h-full flex-col justify-between p-4 sm:p-5">
            <div className="relative flex min-h-10 items-start">{Prop ? <Prop /> : null}</div>
            <div className="relative" style={id === "promotional" ? anim("kp-jolt", { animationDuration: "var(--k)", animationIterationCount: "infinite" }) : undefined}>
              <Title text={title} mode={mode} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
