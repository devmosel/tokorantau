import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";
import { SITE } from "@/lib/constants";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const viewport: Viewport = { colorScheme: "only light" };

export const metadata: Metadata = {
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: "Order delicious food online from TokoRantau, Trier.",
  // The design is light-only: tell Dark Reader and similar extensions not to recolour it.
  other: { "darkreader-lock": "", "color-scheme": "only light" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={rubik.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans">{children}</body>
    </html>
  );
}
