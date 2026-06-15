import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Safe JSON-LD serialiser — escapes </script> sequences that could break out of a script tag
export function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/<\/script>/gi, "<\\/script>");
}
