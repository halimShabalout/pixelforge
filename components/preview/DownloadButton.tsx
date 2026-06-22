"use client";

import { useEditor } from "@/lib/editor-context";

export default function DownloadButton() {
  const { image, activeTool } = useEditor();

  if (!image) return null;

  const handleDownload = () => {
    // Placeholder — actual processing logic added later per tool
    const a = document.createElement("a");
    a.href = image.url;
    a.download = image.name;
    a.click();
  };

  return (
    <div className="shrink-0 flex justify-end items-center px-5 py-3 border-t border-stone-200 bg-white">
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm shadow-indigo-200"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Download
      </button>
    </div>
  );
}
