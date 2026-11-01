"use client";

import { useEffect, useState } from "react";

export let getCompressValues: () => { quality: number } = () => ({ quality: 80 });

export default function CompressPanel() {
  const [quality, setQuality] = useState(80);

  useEffect(() => {
    getCompressValues = () => ({ quality });
  }, [quality]);

  const label =
    quality >= 85 ? "High quality" : quality >= 60 ? "Balanced" : "Smaller file";

  return (
    <div className="space-y-5">
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-xs text-stone-500">Quality</label>
          <span className="text-xs font-semibold text-indigo-600">{quality}%</span>
        </div>
        <input
          type="range"
          min={10}
          max={100}
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="w-full accent-indigo-600"
        />
        <div className="flex justify-between text-[10px] text-stone-400 mt-1">
          <span>Smaller</span>
          <span>Higher quality</span>
        </div>
      </div>

      <div className="rounded-lg bg-stone-50 border border-stone-200 p-3">
        <p className="text-xs font-medium text-stone-700">{label}</p>
        <p className="text-[10px] text-stone-400 mt-0.5">
          {quality >= 85
            ? "Best for printing or archiving"
            : quality >= 60
              ? "Good balance for web use"
              : "Optimized for fast loading"}
        </p>
      </div>
    </div>
  );
}
