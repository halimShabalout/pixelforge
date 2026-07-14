"use client";

import { useEffect, useState } from "react";

const FORMATS = [
  { id: "jpeg", label: "JPEG", desc: "Best for photos" },
  { id: "png", label: "PNG", desc: "Supports transparency" },
  { id: "webp", label: "WebP", desc: "Optimized for web" },
  { id: "gif", label: "GIF", desc: "Animated images" },
] as const;

export let getConvertValues: () => {
  format: "jpeg" | "png" | "webp" | "gif";
} = () => ({
  format: "webp",
});

export default function ConvertPanel() {
  const [format, setFormat] = useState<"jpeg" | "png" | "webp" | "gif">("webp");

  useEffect(() => {
    getConvertValues = () => ({ format });
  }, [format]);

  return (
    <div className="space-y-4">
      <p className="text-xs text-stone-500">Target format</p>
      <div className="space-y-2">
        {FORMATS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFormat(f.id)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border-2 text-left transition-all ${
              format === f.id
                ? "border-indigo-400 bg-indigo-50"
                : "border-stone-200 hover:border-stone-300"
            }`}
          >
            <div>
              <p className={`text-sm font-semibold ${format === f.id ? "text-indigo-700" : "text-stone-700"}`}>
                .{f.label}
              </p>
              <p className="text-[10px] text-stone-400">{f.desc}</p>
            </div>
            {format === f.id && (
              <span className="w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px]">
                ✓
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
