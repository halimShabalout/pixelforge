"use client";

import { useRef, useState } from "react";
import { useEditor } from "@/lib/editor-context";

export default function PreviewArea() {
  const { image, isProcessing, uploadError, loadImage } = useEditor();
  const dropRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadImage(file);
  };

  if (isProcessing) {
    return (
      <div className="flex-1 flex items-center justify-center bg-stone-50">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin mx-auto" />
          <p className="text-sm text-stone-500">Loading image...</p>
        </div>
      </div>
    );
  }

  if (!image) {
    return (
      <div
        ref={dropRef}
        className={`flex-1 flex items-center justify-center transition-colors ${
          isDragging ? "bg-indigo-50" : "bg-stone-50"
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) loadImage(file);
          }}
        />
        <div className="text-center space-y-4 max-w-xs">
          <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center transition-colors ${isDragging ? "bg-indigo-100" : "bg-stone-100"}`}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="2" width="24" height="24" rx="4" stroke={isDragging ? "#6366f1" : "#94a3b8"} strokeWidth="1.5" strokeDasharray="4 2" />
              <path d="M14 10v8M10 14l4-4 4 4" stroke={isDragging ? "#6366f1" : "#94a3b8"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {uploadError ? (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3">
              <p className="text-xs text-red-600">{uploadError}</p>
            </div>
          ) : (
            <>
              <div>
                <p className="text-stone-700 font-medium text-sm">
                  {isDragging ? "Drop your image here" : "No image loaded"}
                </p>
                <p className="text-stone-400 text-xs mt-1">
                  Drag & drop or use the Upload button in the sidebar
                </p>
              </div>
              <button
                onClick={() => inputRef.current?.click()}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium underline underline-offset-2"
              >
                Browse files
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-stone-50 relative overflow-hidden p-6">
      {/* Checkerboard for transparency */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "repeating-conic-gradient(#000 0% 25%, transparent 0% 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative max-w-full max-h-full flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.url}
          alt={image.name}
          className="max-w-full max-h-[calc(100vh-14rem)] object-contain rounded-lg shadow-md"
          style={{ display: "block" }}
        />
      </div>

      {/* Image info badge */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm border border-stone-200 rounded-full px-3 py-1 text-[10px] text-stone-500 flex items-center gap-2 shadow-sm">
        <span>{image.width} × {image.height}px</span>
        <span className="w-px h-3 bg-stone-200" />
        <span>{image.type.split("/")[1].toUpperCase()}</span>
        <span className="w-px h-3 bg-stone-200" />
        <span>{(image.size / 1024).toFixed(0)} KB</span>
      </div>
    </div>
  );
}
