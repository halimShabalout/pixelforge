"use client";

import { useRef } from "react";
import { useEditor } from "@/lib/editor-context";

export default function UploadButton() {
  const { loadImage, image, clearImage } = useEditor();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadImage(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) loadImage(file);
  };

  if (image) {
    return (
      <div className="px-3 pb-3">
        <div className="rounded-lg border border-stone-200 bg-stone-50 p-2.5">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-8 h-8 rounded bg-stone-200 bg-cover bg-center shrink-0"
              style={{ backgroundImage: `url(${image.url})` }}
            />
            <div className="min-w-0">
              <p className="text-xs font-medium text-stone-700 truncate">{image.name}</p>
              <p className="text-[10px] text-stone-400">
                {image.width} × {image.height}px · {(image.size / 1024).toFixed(0)} KB
              </p>
            </div>
          </div>
          <button
            onClick={clearImage}
            className="w-full text-xs text-stone-500 hover:text-red-500 hover:bg-red-50 border border-stone-200 hover:border-red-200 rounded-md py-1.5 transition-colors"
          >
            Remove image
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 pb-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-full rounded-lg border-2 border-dashed border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 hover:border-indigo-300 transition-colors py-4 px-3 flex flex-col items-center gap-1.5 group"
      >
        <span className="text-xl">🖼️</span>
        <span className="text-xs font-medium text-indigo-600">Upload Image</span>
        <span className="text-[10px] text-stone-400">PNG, JPG, WebP up to 20MB</span>
      </button>
    </div>
  );
}
