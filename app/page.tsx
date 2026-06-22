import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center bg-stone-50 px-6">
        <div className="text-center max-w-md space-y-6">
          <div className="flex justify-center">
            <span className="flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-200">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="3" y="3" width="11" height="11" rx="2.5" fill="white" />
                <rect x="18" y="3" width="11" height="11" rx="2.5" fill="white" opacity="0.6" />
                <rect x="3" y="18" width="11" height="11" rx="2.5" fill="white" opacity="0.6" />
                <rect x="18" y="18" width="11" height="11" rx="2.5" fill="white" opacity="0.3" />
              </svg>
            </span>
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-stone-900">
              Pixel<span className="text-indigo-600">Forge</span>
            </h1>
            <p className="text-stone-500 mt-2 text-base leading-relaxed">
              Edit, resize, compress, and convert images — right in your browser. No uploads to servers, no account required.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 text-xs text-stone-400">
            {["Resize", "Compress", "Crop", "Rotate", "Convert", "Adjust"].map((f) => (
              <span key={f} className="px-2.5 py-1 bg-white border border-stone-200 rounded-full">
                {f}
              </span>
            ))}
          </div>

          <Link
            href="/editor"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm shadow-indigo-200 text-sm"
          >
            Open Editor
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <p className="text-[11px] text-stone-600">
            All processing happens locally in your browser. Your images never leave your device.
          </p>
        </div>
      </main>
    </div>
  );
}
