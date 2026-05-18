import type { Metadata } from "next";
import { Geist, Plus_Jakarta_Sans } from "next/font/google";
import { TopNav } from "@/components/top-nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Asli — Indonesian commodities, by name",
  description:
    "A traceability platform for Indonesian commodity exports. Every product carries a Digital Product ID — a face, a story, a satellite-verified origin, and a fair share to the farmer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-dvh flex flex-col">
        <TopNav />
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
