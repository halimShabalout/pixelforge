import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PixelForge — Image Editor",
  description: "Resize, compress, crop, convert and edit images directly in your browser.",
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
