import { Inter_Tight } from "next/font/google";

/** The v2 display face; sets --font-display wherever its `variable` class is applied */
export const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-display", display: "swap" });
