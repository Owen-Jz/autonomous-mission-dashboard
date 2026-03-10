import type { Metadata } from "next";
import { Monda } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

const monda = Monda({
  variable: "--font-base",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Autonomous Mission Dashboard",
  description: "Operating system for autonomous departments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${monda.variable} antialiased bg-zinc-950 text-white flex h-screen overflow-hidden`}>
        <Sidebar className="flex-shrink-0" />
        <main className="flex-1 overflow-auto h-full p-2 lg:p-4">
          <div className="bg-[#111111] border border-zinc-900 rounded-2xl h-full overflow-y-auto no-scrollbar shadow-xl p-4 lg:p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
