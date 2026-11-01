import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PixelForge — Image, Video, PDF & File Tools",
  description:
    "Edit images, create videos, manage PDFs, and convert files directly in your browser. No uploads, no account required.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-stone-900 font-sans">
        {children}
      </body>
    </html>
  );
}
