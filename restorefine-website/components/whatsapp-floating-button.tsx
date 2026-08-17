"use client";

import Image from "next/image";
import { pushGTMEvent } from "@/lib/gtm";

const WHATSAPP_HREF = `https://wa.me/441414835850?text=${encodeURIComponent("Hi RestoRefine Studios, I'd like to find out more about your services.")}`;

export function WhatsAppFloatingButton() {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with RestoRefine Studios on WhatsApp"
      onClick={() => pushGTMEvent("whatsapp_click", { location: "page" })}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl"
    >
      <Image src="/whatsapp.svg" alt="WhatsApp" width={28} height={28} className="brightness-0 invert" />
    </a>
  );
}
