import { mainServiceOptions, serviceTypeOptions } from "@/blocks/enquire/service-options";

/*
 * Server half of the enquiry spam guard (client half: lib/spam-guard.tsx).
 * "silent" rejections answer the bot with a fake success so it has no signal
 * to adapt to; everything else returns a real error the form can show.
 */

export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  mainService: string;
  serviceType: string;
  budget: string;
  timeline: string;
};

type Result = { ok: true; enquiry: Enquiry } | { ok: false; silent: boolean; reason: string };

const MIN_FILL_MS = 3000;
const MAX_LINKS = 3;
const EMAIL_RE = /^[^\s@<>"'()]+@[^\s@<>"'()]+\.[^\s@<>"'()]+$/;
const URL_PATTERN = String.raw`https?:\/\/|www\.|\[url|<a\s`;

function str(value: unknown, max: number): string | null {
  if (value === undefined || value === null) return "";
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > max ? null : trimmed;
}

async function verifyTurnstile(token: unknown, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured yet
  if (typeof token !== "string" || !token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
    const outcome = (await res.json()) as { success?: boolean };
    return outcome.success === true;
  } catch {
    return false;
  }
}

export async function checkEnquiry(data: Record<string, unknown>, ip: string | null): Promise<Result> {
  const fail = (reason: string, silent = true): Result => ({ ok: false, silent, reason });

  if (typeof data.website === "string" && data.website.trim() !== "") return fail("honeypot");
  if (typeof data.elapsedMs !== "number" || data.elapsedMs < MIN_FILL_MS) return fail("too fast or no timer");

  const fields = {
    name: str(data.name, 100),
    email: str(data.email, 200),
    phone: str(data.phone, 40),
    company: str(data.company, 200),
    message: str(data.message, 5000),
    mainService: str(data.mainService, 50),
    serviceType: str(data.serviceType, 50),
    budget: str(data.budget, 50),
    timeline: str(data.timeline, 300),
  };
  for (const [key, value] of Object.entries(fields)) {
    if (value === null) return fail(`bad ${key}`, false);
  }
  const enquiry = fields as Enquiry;

  if (!enquiry.name) return fail("missing name", false);
  if (!EMAIL_RE.test(enquiry.email)) return fail("bad email", false);
  if (new RegExp(URL_PATTERN, "i").test(enquiry.name)) return fail("link in name");
  if ((enquiry.message.match(new RegExp(URL_PATTERN, "gi")) ?? []).length > MAX_LINKS) return fail("too many links");
  if (enquiry.mainService && !mainServiceOptions.some((o) => o.id === enquiry.mainService)) return fail("unknown service");
  if (enquiry.serviceType && !serviceTypeOptions[enquiry.mainService]?.some((o) => o.id === enquiry.serviceType)) {
    return fail("unknown service type");
  }

  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return fail("turnstile", false);
  }

  return { ok: true, enquiry };
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
