import { redirect } from "next/navigation";
import { clients } from "@/lib/clients";

// The bare domain opens the current launch (first entry in lib/clients.ts)
export default function Home() {
  redirect(`/c/${clients[0].slug}`);
}
