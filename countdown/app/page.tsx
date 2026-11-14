import { redirect } from "next/navigation";
import { clients } from "@/lib/clients";

// countdown.restorefine.co.uk on its own has nothing to show, so live it goes to the main site.
// Locally it opens the first client's countdown to save typing /c/<slug>.
export default function Home() {
  redirect(process.env.NODE_ENV === "development" ? `/c/${clients[0].slug}` : "https://restorefine.co.uk");
}
